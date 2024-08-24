"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

export const AddCompanyPage = () => {
  const [companyName, setCompanyName] = useState("");
  const [error, setError] = useState("");
  const [companyNameError, setCompanyNameError] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedCompanyDropdown, setSelectedCompanyDropdown] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;
  const [isFetching, setIsFetching] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const containerRef = useRef(null);
  const router = useRouter();
  useEffect(() => {
    fetchCompanies();
  }, [search, page]);

  const fetchCompanies = async () => {
    setIsFetching(true);
    try {
      const response = await axios.get(`http://api.mymakan.ae/company`, {
        params: {
          search,
          page,
          limit,
        },
      });
      const newCompanies = response.data;
      console.log("Fetched companies:", newCompanies);
      setHasMore(newCompanies.length === limit);
      setCompanies((prevCompanies) => {
        return page === 1 ? newCompanies : [...prevCompanies, ...newCompanies];
      });
    } catch (error) {
      console.error("Error fetching companies:", error);
      setCompanyNameError("Failed to fetch companies");
    } finally {
      setIsFetching(false);
    }
  };

  const handleInputChange = (e) => {
    const searchTerm = e.target.value;
    setSearch(searchTerm);
    setSelectedCompany(e.target.value);
    setPage(1);
    setCompanies([]);
    setHasMore(true);
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
      hasMore
    ) {
      setPage((prevPage) => prevPage + 1); // Increment page when user scrolls to the bottom
    }
  };

  const updateAgentAccount = async () => {
    try {
      const updateCreateData = {
        companyName: selectedCompany,
      };
      const token = localStorage.getItem("agentAccessToken");
      const response = await fetch(
        `http://api.mymakan.ae/agent/update-profile`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updateCreateData),
        }
      );
      if (!response.ok) {
        setError(` ${response.status}`);
      }
      const data = await response.json();
      router.push("/user/profile/about");
      toast.success("Company Name updated successfully.", {
        style: {
          whiteSpace: "nowrap",
        },
      });
      setRender((prev) => !prev);
    } catch (error) {
      console.error("", error);
      setError(` ${error}`);
    }
  };
  return (
    <div className="col-lg-8 ">
      <div className="forum-topic-add">
        <div className="block-box">
          <form>
            <p className="top-[12px]  text-[15px] font-semibold text-black text-opacity-70">
              Please add your company name!
              <br />
            </p>
            <div>
              <div className="relative">
                <div className="">
                  <label
                    htmlFor="companyName"
                    className="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-[#2682d5] focus-within:ring-1 focus-within:ring-[#2682d5]"
                  >
                    <input
                      type="text"
                      id="companyName"
                      value={selectedCompany}
                      onChange={handleInputChange}
                      onClick={() => setSelectedCompanyDropdown(true)}
                      className="py-2 px-3 peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 w-full"
                      placeholder="companyName, *"
                    />

                    <span className=" pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs peer-focus:text-[#2682d5]">
                      Company Name
                    </span>
                  </label>
                  {companyNameError && (
                    <p className="text-red-500 text-[13px] mt-[3px]">
                      {companyNameError}
                    </p>
                  )}
                </div>
                {selectedCompanyDropdown && (
                  <div
                    onMouseLeave={() => setSelectedCompanyDropdown(false)}
                    ref={containerRef}
                    onScroll={handleScroll}
                    className="font-noto absolute top-[5px] -left-[0px] bg-white border  w-full pb-[11px] rounded-b-[10px] mt-[40px] py-[10px] transition-all ease-in-out duration-500 opacity-100 z-50 rounded-[7px] h-[250px] overflow-auto"
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

            <div className=" w-[500px] h-[220px]"></div>

            <div className="form-group">
              <button
                onClick={updateAgentAccount}
                type="button"
                className="submit-btn"
                name="btn-add"
              >
                Update Now
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
