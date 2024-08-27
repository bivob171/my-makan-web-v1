"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { CardLoding } from "../NewsFeed/PostLodaing/CardLoding";
import Link from "next/link";

export const AgentPage = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("desc");
  const [sortBy, setSortBy] = useState("createdAt");
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const [country, setCountry] = useState("");
  const [stateName, setStateName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [countryFind, setCountryFind] = useState("");
  const [stateNameFind, setStateNameFind] = useState("");
  const [companyNameFind, setCompanyNameFind] = useState("");
  const [isFetchingAgent, setIsFetchingAgent] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();

  const getAllPosts = async (token) => {
    setIsFetchingAgent(true);
    try {
      let url = `http://localhost:4000/agent/all-get?sortBy=${sortBy}&sortOrder=${sortOrder}&page=${page}&limit=${limit}`;
      if (countryFind) url += `&country=${countryFind}`;
      if (stateNameFind) url += `&state=${stateNameFind}`;
      if (companyNameFind) url += `&companyName=${companyNameFind}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const allPostsList = await response.json();
      setHasMore(allPostsList.length === limit);
      setAllPosts((prevAgents) =>
        page === 1 ? allPostsList : [...prevAgents, ...allPostsList]
      );
      setLoading(false);
    } catch (error) {
      console.error("Error fetching:", error);
    } finally {
      setIsFetchingAgent(false);
    }
  };

  useEffect(() => {
    const userRole = localStorage.getItem("role");
    const token = localStorage.getItem(`${userRole}AccessToken`);
    getAllPosts(token);
  }, [
    sortOrder,
    sortBy,
    limit,
    page,
    companyNameFind,
    countryFind,
    stateNameFind,
  ]);

  const lastPostElementRef = useCallback(
    (node) => {
      if (isFetchingAgent) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isFetchingAgent, hasMore]
  );

  const find = (country, stateName, companyName) => {
    setCountryFind(country);
    setStateNameFind(stateName);
    setCompanyNameFind(companyName);
    setPage(1);
    setLimit(0);
    setAllPosts([]);
  };

  const findReset = () => {
    setCountryFind("");
    setCountry("");
    setStateNameFind("");
    setStateName("");
    setCompanyNameFind("");
    setCompanyName("");
    setPage(1);
    setAllPosts([]);
  };

  // Company search
  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedCompanyDropdown, setSelectedCompanyDropdown] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [search, setSearch] = useState("");
  const [pageco, setPageco] = useState(1);
  const limitco = 10;
  const [isFetching, setIsFetching] = useState(false);
  const [hasMoreco, setHasMoreco] = useState(true);
  const containerRef = useRef(null);

  useEffect(() => {
    fetchCompanies();
  }, [search, pageco]);

  const fetchCompanies = async () => {
    setIsFetching(true);
    try {
      const response = await axios.get(`http://localhost:4000/company`, {
        params: {
          search,
          page: pageco,
          limit: limitco,
        },
      });
      const newCompanies = response.data;
      setHasMoreco(newCompanies.length === limitco);
      setCompanies((prevCompanies) =>
        pageco === 1 ? newCompanies : [...prevCompanies, ...newCompanies]
      );
    } catch (error) {
      console.error("Error fetching companies:", error);
    } finally {
      setIsFetching(false);
    }
  };

  const handleInputChangeCompany = (e) => {
    const searchTerm = e.target.value;
    setSearch(searchTerm);
    setSelectedCompany(searchTerm);
    setPageco(1);
    setCompanies([]);
    setHasMoreco(true);
  };

  const handleCompanyChange = (company) => {
    setSelectedCompany(company.Office_name_english);
    setCompanyName(company.Office_name_english);
    setSelectedCompanyDropdown(false);
  };

  const handleScroll = () => {
    const container = containerRef.current;
    if (
      container.scrollTop + container.clientHeight >=
        container.scrollHeight - 5 &&
      !isFetching &&
      hasMoreco
    ) {
      setPageco((prevPage) => prevPage + 1);
    }
  };

  // Country search
  const [data, setData] = useState([]);
  const [loadingCountry, setLoadingCountry] = useState(true);
  const [errorCountry, setErrorCountry] = useState(null);
  const [pageCountry, setPageCountry] = useState(1);
  const [searchCountry, setSearchCountry] = useState("");
  const limitCountry = 10;
  const [isFetchingCountry, setIsFetchingCountry] = useState(false);
  const [hasMoreCountry, setHasMoreCountry] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCountryDropdown, setSelectedCountryDropdown] = useState(false);
  const [statesArray, setStateArray] = useState([]);

  useEffect(() => {
    fetchCountries();
  }, [searchCountry, pageCountry]);

  const fetchCountries = async () => {
    setIsFetchingCountry(true);
    try {
      const response = await axios.get(`http://localhost:4000/country`, {
        params: {
          search: searchCountry,
          page: pageCountry,
          limit: limitCountry,
        },
      });
      const newCountries = response.data;
      setHasMoreCountry(newCountries.length === limitCountry);
      setData((prevCountries) =>
        pageCountry === 1 ? newCountries : [...prevCountries, ...newCountries]
      );
    } catch (error) {
      setErrorCountry("Error fetching countries.");
      console.error("Error fetching countries:", error);
    } finally {
      setIsFetchingCountry(false);
    }
  };

  const handleInputChangeCountry = (e) => {
    const searchTerm = e.target.value;
    setSearchCountry(searchTerm);
    setSelectedCountry(searchTerm);
    setCountry(searchTerm);
    setPageCountry(1);
    setData([]);
    setHasMoreCountry(true);
  };

  const handleCountryChange = (country) => {
    setSelectedCountry(country.name);
    setCountry(country.name);
    setSelectedCountryDropdown(false);
    setStateArray(country.states);
  };

  const handleScrollCountry = () => {
    const container = containerRef.current;
    if (
      container.scrollTop + container.clientHeight >=
        container.scrollHeight - 5 &&
      !isFetchingCountry &&
      hasMoreCountry
    ) {
      setPageCountry((prevPage) => prevPage + 1);
    }
  };

  const [selectedState, setSelectedState] = useState("");
  const [selectedStateDropdown, setSelectedStateDropdown] = useState(false);
  const [searchQueryState, setSearchQueryState] = useState("");

  const handleStateChange = (value) => {
    setSelectedState(value.name);
    setStateName(value.name);
    setSelectedStateDropdown(false);
    setSearchQueryState("");
  };

  const handleStateInputChange = (e) => {
    setSelectedState(e.target.value);
    setSearchQueryState(e.target.value);
    setStateName(e.target.value);
    setSelectedStateDropdown(true);
    setSelectedCountryDropdown(false);
  };

  const filteredStates = statesArray.filter((state) =>
    state.name?.toLowerCase().includes(searchQueryState.toLowerCase())
  );

  return (
    <div className="pb-[30px]">
      <div className="page-content">
        <div className="container">
          <div className="w-auto py-[20px] px-[25px] bg-white grid lg:grid-cols-4 rounded-md items-center gap-6 mb-10">
            <div>
              <div className="relative">
                <div className="relative">
                  <input
                    className="appearance-none border-2 pl-10 border-gray-300 hover:border-gray-400 transition-colors rounded-md w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:ring-purple-600 focus:border-purple-600 focus:shadow-outline"
                    id="username"
                    type="text"
                    value={selectedCountry}
                    onChange={handleInputChangeCountry}
                    onClick={() => {
                      setSelectedCountryDropdown(true);
                      setSelectedStateDropdown(false);
                    }}
                    placeholder="Search country..."
                  />
                  <div className="absolute right-0 inset-y-0 flex items-center">
                    <Image
                      width={100}
                      height={100}
                      src="/countryicon1.png"
                      className="-ml-1 mr-3 h-5 w-5 text-gray-400 hover:text-gray-500"
                      alt="Mountain"
                    />
                  </div>
                </div>
                {selectedCountryDropdown && (
                  <div
                    onMouseLeave={() => setSelectedCountryDropdown(false)}
                    ref={containerRef}
                    onScroll={handleScrollCountry}
                    className="font-noto absolute top-[5px] -left-[0px] bg-white border shadow-lg w-[360px] pb-[11px] rounded-b-[10px] mt-[40px] py-[10px] transition-all ease-in-out duration-500 opacity-100 z-50 rounded-[7px] h-[250px] overflow-auto"
                  >
                    <div>
                      {data.length > 0 ? (
                        data.map((country, i) => (
                          <p
                            key={i}
                            onClick={() => handleCountryChange(country)}
                            className="font-noto font-normal cursor-pointer text-[#95004A] text-[14px] leading-[36px] w-[360px] h-[30px] hover:bg-[#EBEBEB] flex items-center pt-[1px] pl-[20px] mb-[3px]"
                          >
                            {country.name}
                          </p>
                        ))
                      ) : (
                        <>
                          {!isFetchingCountry && data?.length === 0 && (
                            <p className="font-noto font-normal text-[#95004A] text-[14px] leading-[36px] w-[332px] h-[30px] flex items-center pt-[6px] pl-[20px] mb-[3px]">
                              No country name found
                            </p>
                          )}
                        </>
                      )}
                      {isFetchingCountry && (
                        <p className="font-noto font-normal text-[#95004A] text-[14px] leading-[36px] w-[332px] h-[30px] flex items-center pt-[6px] pl-[20px] mb-[3px]">
                          Loading...
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div>
              <div className="relative">
                <div className="relative">
                  <input
                    className="appearance-none border-2 pl-10 border-gray-300 hover:border-gray-400 transition-colors rounded-md w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:ring-purple-600 focus:border-purple-600 focus:shadow-outline"
                    id="username"
                    type="text"
                    value={selectedState}
                    onChange={handleStateInputChange}
                    onClick={() => {
                      setSelectedCountryDropdown(false);
                      setSelectedStateDropdown(true);
                    }}
                    placeholder="Search State..."
                  />
                  <div className="absolute right-0 inset-y-0 flex items-center">
                    <Image
                      width={100}
                      height={100}
                      src="/stateicon.png"
                      className="-ml-1 mr-3 h-5 w-5 text-gray-400 hover:text-gray-500"
                      alt="Mountain"
                    ></Image>
                  </div>
                </div>

                {selectedStateDropdown && (
                  <div
                    onMouseLeave={() => setSelectedStateDropdown(false)}
                    className="font-noto absolute top-[5px] -left-[0px] bg-white border shadow-lg w-[360px] pb-[11px] rounded-b-[10px] mt-[40px] py-[10px] transition-all ease-in-out duration-500 opacity-100 z-50 rounded-[7px] h-[250px] overflow-auto"
                  >
                    <div>
                      {filteredStates?.length > 0 ? (
                        filteredStates?.map((state, i) => (
                          <p
                            key={i}
                            onClick={() => handleStateChange(state)}
                            className="font-noto font-normal cursor-pointer text-[#95004A] text-[14px] leading-[36px] w-[360px] h-[30px] hover:bg-[#EBEBEB] flex items-center pt-[1px] pl-[20px] mb-[3px]"
                          >
                            {state?.name}
                          </p>
                        ))
                      ) : (
                        <p className="font-noto font-normal text-[#95004A] text-[14px] leading-[36px] w-[332px] h-[30px] flex items-center pt-[6px] pl-[20px] mb-[3px]">
                          No state found
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div>
              <div className="relative">
                <div className="relative">
                  <input
                    className="appearance-none border-2 pl-10 border-gray-300 hover:border-gray-400 transition-colors rounded-md w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:ring-purple-600 focus:border-purple-600 focus:shadow-outline "
                    id="username"
                    type="text"
                    value={selectedCompany}
                    onChange={handleInputChangeCompany}
                    onClick={() => setSelectedCompanyDropdown(true)}
                    placeholder="Search Company..."
                  />
                  <div className="absolute right-0 inset-y-0 flex items-center">
                    <Image
                      width={100}
                      height={100}
                      src="/companyicon.png"
                      className="-ml-1 mr-3 h-5 w-5 text-gray-400 hover:text-gray-500"
                      alt=""
                    />
                  </div>
                </div>
                {selectedCompanyDropdown && (
                  <div
                    onMouseLeave={() => setSelectedCompanyDropdown(false)}
                    ref={containerRef}
                    onScroll={handleScroll}
                    className="font-noto absolute top-[5px] -left-[0px] bg-white border shadow-lg w-[360px] pb-[11px] rounded-b-[10px] mt-[40px] py-[10px] transition-all ease-in-out duration-500 opacity-100 z-50 rounded-[7px] h-[250px] overflow-auto"
                  >
                    <div>
                      {companies?.length > 0 ? (
                        companies?.map((company, i) => (
                          <p
                            key={i}
                            onClick={() => handleCompanyChange(company)}
                            className="font-noto font-normal cursor-pointer text-[#95004A] text-[14px] leading-[36px] w-[360px] h-[30px] hover:bg-[#EBEBEB] flex items-center pt-[1px] pl-[20px] mb-[3px]"
                          >
                            {company.Office_name_english}
                          </p>
                        ))
                      ) : (
                        <p className="font-noto font-normal text-[#95004A] text-[14px] leading-[36px] w-[332px] h-[30px] flex items-center pt-[6px] pl-[20px] mb-[3px]">
                          No company name found
                        </p>
                      )}
                      {isFetching && (
                        <p className="font-noto font-normal text-[#95004A] text-[14px] leading-[36px] w-[332px] h-[30px] flex items-center pt-[6px] pl-[20px] mb-[3px]">
                          Loading...
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div>
              <button
                type="button"
                onClick={() => find(country, stateName, companyName)}
                className="inline-block rounded bg-primary px-6 py-2 text-[16px] uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong font-bold w-[100px]"
              >
                Find
              </button>
              <button
                type="button"
                onClick={findReset}
                className="inline-block rounded bg-primary px-6 py-2 text-[16px] uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong font-bold w-[100px] ml-[30px]"
              >
                Reset
              </button>
            </div>
          </div>

          <div className="">
            {loading && (
              <div>
                <CardLoding />
              </div>
            )}
            {!loading && allPosts?.length === 0 && (
              <div className="text-center text-gray-500 mt-4">
                No posts available.
              </div>
            )}
            {!loading && allPosts?.length > 0 && (
              <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
                {allPosts?.map((data) => {
                  const { language } = data;
                  const dateStr = data?.createdAt;

                  const dateObj = new Date(dateStr);

                  const options = { year: "numeric", month: "short" };
                  const formattedDate = dateObj.toLocaleDateString(
                    "en-US",
                    options
                  );

                  const formatLanguages = (language) => {
                    if (language.length === 0) {
                      return "";
                    } else if (language.length === 1) {
                      return language[0];
                    } else if (language.length === 2) {
                      return `${language[0]} and ${language[1]}`;
                    } else {
                      const firstLanguages = language.slice(0, 2).join(", ");
                      const remainingCount = language.length - 2;
                      return `${firstLanguages} and ${remainingCount} more language${
                        remainingCount > 1 ? "s" : ""
                      }`;
                    }
                  };
                  return (
                    <div
                      ref={lastPostElementRef}
                      className={`delay-150 duration-200 ease-in-out hover:shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] w-full bg-white rounded-lg relative border-[#E8E8E8] border-[1px] transition shadow-[#615DFA] p-2`}
                      style={{
                        backgroundImage: `url(${data?.coverImage})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        backgroundAttachment: "scroll",
                        backgroundOrigin: "padding-box",
                        backgroundClip: "border-box",
                        backgroundColor: "transparent",
                      }}
                      key={data._id}
                    >
                      {/* <div className="rounded-t-lg h-[140px] relative">
                        <Image
                          width={100}
                          height={100}
                          className="object-cover object-top w-full h-full rounded-t-lg"
                          src={data?.image}
                          alt="Mountain"
                        />
                        <div className="absolute top-1/2 right-0 transform -translate-x-1/2 -translate-y-0">
                          <div className="mx-auto h-[75px] w-[75px] border-4 border-[#615DFA] relative rounded-full z-30">
                            <Image
                              width={100}
                              height={100}
                              className="object-cover h-[70px] w-[70px] rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                              src={data?.image}
                              alt="Woman looking front"
                            />
                          </div>
                        </div>
                      </div> */}
                      <div
                        className={`px-6 pt-8 m-4 backdrop-blur-lg rounded-lg bg-[black]/50`}
                      >
                        <div className="absolute -top-4 -right-4">
                          <div className="mx-auto h-[90px] w-[90px] border-4 border-[#615DFA] relative rounded-full z-30">
                            <Image
                              width={100}
                              height={100}
                              className="object-cover h-[80px] w-[80px] rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                              src={data?.image}
                              alt="Woman looking front"
                            />
                          </div>
                        </div>
                        <div className="text-start space-y-[10px]">
                          <h2 className="font-semibold leading-[15px] text-[20px] !mb-6 font-mono mt-2 uppercase !text-[white]">
                            {data?.fullName}
                          </h2>
                          <h2 className="font-semibold leading-[17px] text-[15px] !text-[white]">
                            Total Posts:{" "}
                            <span className="font-normal font-mono">
                              {/* {data.properties} */}
                              {data?.totalPost}
                            </span>
                          </h2>
                          <h2 className="font-semibold leading-[17px] text-[15px] !text-[white]">
                            Urgent Posts:{" "}
                            <span className="font-normal font-mono">
                              {/* {data.properties} */}
                              {data?.totalUrgentPost}
                            </span>
                          </h2>
                          <h2 className="font-semibold leading-[17px] text-[15px] !text-[white]">
                            Sponsored Posts:{" "}
                            <span className="font-normal font-mono">
                              {/* {data.properties} */}
                              {data?.totalSponsoredPost}
                            </span>
                          </h2>
                          <h2 className="font-semibold leading-[17px] -mb-0 mt-[5px] text-[15px] !text-[white]">
                            language:{" "}
                            <span className="font-normal font-mono">
                              {formatLanguages(language)}
                            </span>
                          </h2>
                          <h2 className="font-semibold leading-[17px] mt-[5px] text-[15px] !text-[white]">
                            Country:{" "}
                            <span className="font-normal font-mono">
                              {data?.country}
                            </span>
                          </h2>
                        </div>
                        <hr className="mt-4 mb-2 mx-8 border-white" />
                        <center>
                          <Link href={`${"/user/agent-profile"}/${data._id}`}>
                            <button
                              type="button"
                              className="text-center mb-3 text-[#ffffff] hover:text-[#fffffff6] font-semibold  hover:font-bold "
                              data-twe-ripple-init
                            >
                              View Profile
                            </button>
                          </Link>
                        </center>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
            {isFetchingAgent && (
              <div className="mb-[20px] mt-[40px] text-center">
                <p>Loading more Agent...</p>
              </div>
            )}
            {!hasMore && allPosts.length !== 0 && (
              <div className="mb-[20px] mt-[40px] text-center">
                <p>No more Agent to load.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
