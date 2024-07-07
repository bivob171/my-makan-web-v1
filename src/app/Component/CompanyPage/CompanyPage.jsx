// "use client";

// import React, { useEffect, useRef, useState } from "react";
// import Image from "next/image";
// import { MdNavigateNext } from "react-icons/md";
// import companyData from "@/data/companyData";

// export const CompanyPage = () => {
//   const [selectedCompany, setSelectedCompany] = useState("");
//   const [companyNameError, setCompanyNameError] = useState("");
//   const [selectedCompanyDropdown, setSelectedCompanyDropdown] = useState(false);
//   const [companies, setCompanies] = useState([]);
//   const [search, setSearch] = useState("");
//   const [page, setPage] = useState(1);
//   const limit = 10;
//   const [isFetching, setIsFetching] = useState(false);
//   const [hasMore, setHasMore] = useState(true);
//   const containerRef = useRef(null);
//   useEffect(() => {
//     fetchCompanies();
//   }, [search, page]);
//   console.log(companies);

//   const fetchCompanies = async () => {
//     setIsFetching(true);
//     try {
//       const response = await axios.get("https://q4m0gph5-4000.asse.devtunnels.ms/company", {
//         params: {
//           search,
//           page,
//           limit,
//         },
//       });
//       const newCompanies = response.data;
//       console.log("Fetched companies:", newCompanies); // Debug log
//       setHasMore(newCompanies.length === limit);
//       setCompanies((prevCompanies) => {
//         return page === 1 ? newCompanies : [...prevCompanies, ...newCompanies];
//       });
//     } catch (error) {
//       console.error("Error fetching companies:", error);
//       setCompanyNameError("Failed to fetch companies");
//     } finally {
//       setIsFetching(false);
//     }
//   };

//   const handleInputChange = (e) => {
//     const searchTerm = e.target.value;
//     setSearch(searchTerm);
//     setSelectedCompany(e.target.value);
//     setPage(1); // Reset to first page on search change
//     setCompanies([]); // Clear current companies
//     setHasMore(true); // Reset hasMore when search changes
//   };

//   const handleCompanyChange = (company) => {
//     setSelectedCompany(company.Office_name_english);
//     // Assuming setCompanyName is a function to set company name somewhere else
//     setCompanyName(company.Office_name_english);
//     setSelectedCompanyDropdown(false);
//   };
//   const handleScroll = () => {
//     const container = containerRef.current;
//     if (
//       container.scrollTop + container.clientHeight >=
//         container.scrollHeight - 5 &&
//       !isFetching &&
//       hasMore
//     ) {
//       setPage((prevPage) => prevPage + 1); // Increment page when user scrolls to the bottom
//     }
//   };

//   return (
//     <div>
//       <div className="page-content">
//         <div className="container">
//           <div className="w-auto py-[20px] px-[25px] bg-white lg:flex items-center justify-center gap-6 mb-[30px] rounded-md">
//             <div>
//               <div class="relative w-[100%]">
//                 <input
//                   class="appearance-none border-2 pl-10 border-gray-300 hover:border-gray-400 transition-colors rounded-md w-full !max-w-[350px] py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:ring-purple-600 focus:border-purple-600 focus:shadow-outline"
//                   id="username"
//                   type="text"
//                   placeholder="Search Company..."
//                   value={selectedCompany}
//                   onChange={handleInputChange}
//                   onClick={() => setSelectedCompanyDropdown(true)}
//                 />
//                 <div class="absolute right-0 inset-y-0 flex items-center">
//                   <Image
//                     src="/companyicon.png"
//                     width={100}
//                     height={100}
//                     className="-ml-1 mr-3 h-5 w-5 text-gray-400 hover:text-gray-500"
//                     alt="Mountain"
//                   />
//                 </div>
//               </div>
//             </div>

//             <div>
//               <button
//                 type="button"
//                 class="inline-block rounded bg-primary px-8 py-2 text-[16px] uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong font-bold w-full"
//               >
//                 Find
//               </button>
//             </div>
//           </div>
//           <div>
//             <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
//               {companies?.map((data) => (
//                 <div
//                   className="delay-150 duration-200 ease-in-out hover:shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] w-full bg-white rounded-lg relative border-[#E8E8E8] border-[1px] transition shadow-[#615DFA] hover:-translate-y-1 hover:scale-100"
//                   key={data.id}
//                 >
//                   <div class="rounded-t-lg h-[130px] overflow-hidden relative">
//                     <Image
//                       width={100}
//                       height={100}
//                       className="object-cover w-full h-[130px] backdrop-blur-sm bg-black/30 hover:backdrop-blur-none"
//                       src="https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
//                       alt="Mountain"
//                     />
//                   </div>
//                   <div className="px-[12px] py-2">
//                     <div class="text-start mt-[9px]">
//                       <div className="flex items-center justify-between cursor-pointer">
//                         <h2 class="font-semibold leading-[14px] text-[15px] text-[#222] -mb-0 hover:!text-[#615DFA] transition delay-150 duration-300 ease-in-out">
//                           {data.Office_name_english}
//                         </h2>
//                         <p className="font-semibold leading-[15px]  text-[18px] text-[#999] mb-[2px] cursor-pointer">
//                           <MdNavigateNext className="w-5 h-5" />
//                         </p>
//                       </div>

//                       <h2 class="font-medium leading-[10px] mt-[10px] text-[14px] text-[#777] ">
//                         95000 Active Agents
//                       </h2>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//             <div className="block-box load-more-btn mt-10">
//               <a href="#" className="item-btn">
//                 <i className="icofont-refresh" />
//                 Load More Posts
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// "use client";

// import React, { useEffect, useRef, useState } from "react";
// import Image from "next/image";
// import axios from "axios"; // Ensure axios is imported
// import { MdNavigateNext } from "react-icons/md";

// export const CompanyPage = () => {
//   const [selectedCompany, setSelectedCompany] = useState("");
//   const [companyNameError, setCompanyNameError] = useState("");
//   const [selectedCompanyDropdown, setSelectedCompanyDropdown] = useState(false);
//   const [suggestedCompanies, setSuggestedCompanies] = useState([]);
//   const [search, setSearch] = useState("");
//   const [page, setPage] = useState(1);
//   const limit = 10;
//   const [isFetching, setIsFetching] = useState(false);
//   const [hasMore, setHasMore] = useState(true);
//   const containerRef = useRef(null);

//   useEffect(() => {
//     fetchCompanies();
//   }, [search, page]);

//   const fetchCompanies = async () => {
//     setIsFetching(true);
//     try {
//       const response = await axios.get("https://q4m0gph5-4000.asse.devtunnels.ms/company", {
//         params: {
//           search,
//           page,
//           limit,
//         },
//       });
//       const newCompanies = response.data;
//       setHasMore(newCompanies.length === limit);
//       setSuggestedCompanies((prevCompanies) => {
//         return page === 1 ? newCompanies : [...prevCompanies, ...newCompanies];
//       });
//     } catch (error) {
//       console.error("Error fetching companies:", error);
//       setCompanyNameError("Failed to fetch companies");
//     } finally {
//       setIsFetching(false);
//     }
//   };

//   const handleInputChange = (e) => {
//     const searchTerm = e.target.value;
//     setSearch(searchTerm);
//     setSelectedCompany(e.target.value);
//     setPage(1); // Reset to first page on search change
//     setSuggestedCompanies([]); // Clear current companies
//     setHasMore(true); // Reset hasMore when search changes
//   };

//   const handleCompanyChange = (company) => {
//     setSelectedCompany(company.Office_name_english);
//     setSelectedCompanyDropdown(false);
//   };

//   const handleFindClick = () => {};

//   const handleScroll = () => {
//     const container = containerRef.current;
//     if (
//       container.scrollTop + container.clientHeight >=
//         container.scrollHeight - 5 &&
//       !isFetching &&
//       hasMore
//     ) {
//       setPage((prevPage) => prevPage + 1); // Increment page when user scrolls to the bottom
//     }
//   };

//   // result company

//   const [companies, setCompanies] = useState([]);
//   const [searchCompany, setSearchCompany] = useState("");
//   const [pageCompany, setPageCompany] = useState(1);
//   const limitCompany = 10;
//   const [isFetchingCompany, setIsFetchingCompany] = useState(false);
//   const [hasMoreCompany, setHasMoreCompany] = useState(true);

//   useEffect(() => {
//     fetchResultCompanies();
//   }, [searchCompany, pageCompany]);

//   const fetchResultCompanies = async () => {
//     setHasMoreCompany(true);
//     try {
//       const response = await axios.get("https://q4m0gph5-4000.asse.devtunnels.ms/company", {
//         params: {
//           search: searchCompany,
//           page: pageCompany,
//           limit: limitCompany,
//         },
//       });
//       const newCompanies = response.data;
//       setHasMoreCompany(newCompanies.length === limitCompany);
//       setCompanies((prevCompanies) => {
//         return page === 1 ? newCompanies : [...prevCompanies, ...newCompanies];
//       });
//     } catch (error) {
//       console.error("Error fetching companies:", error);
//     } finally {
//       setIsFetchingCompany(false);
//     }
//   };

//   const handleScrollResult = () => {
//     const container = containerRef.current;
//     if (
//       container.scrollTop + container.clientHeight >=
//         container.scrollHeight - 5 &&
//       !isFetchingCompany &&
//       hasMoreCompany
//     ) {
//       setPageCompany((prevPage) => prevPage + 1); // Increment page when user scrolls to the bottom
//     }
//   };

//   useEffect(() => {
//     const container = containerRef.current;
//     container.addEventListener("scroll", handleScrollResult);
//     return () => container.removeEventListener("scroll", handleScrollResult);
//   }, [isFetchingCompany, hasMoreCompany]);

//   return (
//     <div ref={containerRef} className="h-screen overflow-auto">
//       <div className="page-content">
//         <div className="container">
//           <div className="w-auto py-[20px] px-[25px] bg-white lg:flex items-center justify-center gap-6 mb-[30px] rounded-md">
//             <div>
//               <div className="relative w-[100%]">
//                 <input
//                   className="appearance-none border-2 pl-10 border-gray-300 hover:border-gray-400 transition-colors rounded-md w-full !max-w-[350px] py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:ring-purple-600 focus:border-purple-600 focus:shadow-outline"
//                   id="username"
//                   type="text"
//                   placeholder="Search Company..."
//                   value={selectedCompany}
//                   onChange={handleInputChange}
//                   onClick={() => setSelectedCompanyDropdown(true)}
//                 />
//                 <div className="absolute right-0 inset-y-0 flex items-center">
//                   <Image
//                     src="/companyicon.png"
//                     width={100}
//                     height={100}
//                     className="-ml-1 mr-3 h-5 w-5 text-gray-400 hover:text-gray-500"
//                     alt="Mountain"
//                   />
//                 </div>
//               </div>
//               {selectedCompanyDropdown && (
//                 <div
//                   onMouseLeave={() => setSelectedCompanyDropdown(false)}
//                   ref={containerRef}
//                   onScroll={handleScroll}
//                   className="font-noto absolute   bg-white border shadow-lg max-w-[350px] pb-[11px] rounded-b-[10px] mt-[10px] py-[10px] transition-all ease-in-out duration-500 opacity-100 z-50 rounded-[7px] h-[250px] overflow-auto"
//                 >
//                   <div>
//                     {suggestedCompanies?.length > 0 ? (
//                       suggestedCompanies?.map((company, i) => (
//                         <p
//                           key={i}
//                           onClick={() => handleCompanyChange(company)}
//                           className="font-noto font-normal cursor-pointer text-[#95004A] text-[14px] leading-[36px] w-[360px] h-[30px] hover:bg-[#EBEBEB] flex items-center pt-[1px] pl-[20px] mb-[3px]"
//                         >
//                           {company.Office_name_english}
//                         </p>
//                       ))
//                     ) : (
//                       <p className="font-noto font-normal text-[#95004A] text-[14px] leading-[36px] w-[332px] h-[30px] flex items-center pt-[6px] pl-[20px] mb-[3px]">
//                         No company name found
//                       </p>
//                     )}
//                     {isFetching && (
//                       <p className="font-noto font-normal text-[#95004A] text-[14px] leading-[36px] w-[332px] h-[30px] flex items-center pt-[6px] pl-[20px] mb-[3px]">
//                         Loading...
//                       </p>
//                     )}
//                   </div>
//                 </div>
//               )}
//             </div>

//             <div>
//               <button
//                 type="button"
//                 onClick={handleFindClick}
//                 className="inline-block rounded bg-primary px-8 py-2 text-[16px] uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong font-bold w-full"
//               >
//                 Find
//               </button>
//             </div>
//           </div>
//           <div>
//             <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
//               {companies?.map((data) => (
//                 <div
//                   className="delay-150 duration-200 ease-in-out hover:shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] w-full bg-white rounded-lg relative border-[#E8E8E8] border-[1px] transition shadow-[#615DFA] hover:-translate-y-1 hover:scale-100"
//                   key={data.id}
//                 >
//                   <div className="rounded-t-lg h-[130px] overflow-hidden relative">
//                     <Image
//                       width={100}
//                       height={100}
//                       className="object-cover w-full h-[130px] backdrop-blur-sm bg-black/30 hover:backdrop-blur-none"
//                       src="https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
//                       alt="Mountain"
//                     />
//                   </div>
//                   <div className="px-[12px] py-2">
//                     <div className="text-start mt-[9px]">
//                       <div className="flex items-center justify-between cursor-pointer">
//                         <h2 className="font-semibold leading-[14px] text-[15px] text-[#222] -mb-0 hover:!text-[#615DFA] transition delay-150 duration-300 ease-in-out">
//                           {data.Office_name_english}
//                         </h2>
//                         <p className="font-semibold leading-[15px]  text-[18px] text-[#999] mb-[2px] cursor-pointer">
//                           <MdNavigateNext className="w-5 h-5" />
//                         </p>
//                       </div>
//                       <h2 className="font-medium leading-[10px] mt-[10px] text-[14px] text-[#777]">
//                         95000 Active Agents
//                       </h2>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//             {isFetching && <div>Loading more companies...</div>}
//             {!hasMore && <div>No more companies to load.</div>}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import axios from "axios"; // Ensure axios is imported
import { MdNavigateNext } from "react-icons/md";
import { CardLoding } from "../NewsFeed/PostLodaing/CardLoding";

export const CompanyPage = () => {
  const [selectedCompany, setSelectedCompany] = useState("");
  const [companyNameError, setCompanyNameError] = useState("");
  const [selectedCompanyDropdown, setSelectedCompanyDropdown] = useState(false);
  const [suggestedCompanies, setSuggestedCompanies] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;
  const [isFetching, setIsFetching] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const containerRef = useRef(null);
  const containerRefResult = useRef(null);

  useEffect(() => {
    fetchCompanies();
  }, [search, page]);

  const fetchCompanies = async () => {
    setIsFetching(true);
    try {
      const response = await axios.get(
        "https://q4m0gph5-4000.asse.devtunnels.ms/company",
        {
          params: {
            search,
            page,
            limit,
          },
        }
      );
      const newCompanies = response.data;
      setHasMore(newCompanies.length === limit);
      setSuggestedCompanies((prevCompanies) => {
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
    setSelectedCompany(searchTerm);
    setPage(1); // Reset to first page on search change
    setSuggestedCompanies([]); // Clear current companies
    setHasMore(true); // Reset hasMore when search changes
  };

  const handleCompanyChange = (company) => {
    setSelectedCompany(company.Office_name_english);
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

  // Result company state and functions
  const [companies, setCompanies] = useState([]);
  const [searchCompany, setSearchCompany] = useState("");
  const [pageCompany, setPageCompany] = useState(1);
  const [limitCompany, setlimitCompany] = useState(10);
  const [isFetchingCompany, setIsFetchingCompany] = useState(false);
  const [hasMoreCompany, setHasMoreCompany] = useState(true);
  const [loadingCompany, setLoadingCompany] = useState(true);

  useEffect(() => {
    fetchResultCompanies();
  }, [searchCompany, pageCompany]);

  const fetchResultCompanies = async () => {
    setIsFetchingCompany(true);
    try {
      const response = await axios.get(
        "https://q4m0gph5-4000.asse.devtunnels.ms/company",
        {
          params: {
            name: searchCompany,
            page: pageCompany,
            limit: limitCompany,
          },
        }
      );
      const newCompanies = response.data;
      setHasMoreCompany(newCompanies.length === limitCompany);
      setCompanies((prevCompanies) => {
        return pageCompany === 1
          ? newCompanies
          : [...prevCompanies, ...newCompanies];
      });
      setLoadingCompany(false);
    } catch (error) {
      console.error("Error fetching companies:", error);
    } finally {
      setIsFetchingCompany(false);
    }
  };

  const handleScrollResult = () => {
    const containerM = containerRefResult.current;
    if (
      containerM.scrollTop + containerM.clientHeight >=
        containerM.scrollHeight - 5 &&
      !isFetchingCompany &&
      hasMoreCompany
    ) {
      setPageCompany((prevPage) => prevPage + 1); // Increment page when user scrolls to the bottom
    }
  };

  useEffect(() => {
    const containerM = containerRefResult.current;
    containerM.addEventListener("scroll", handleScrollResult);
    return () => containerM.removeEventListener("scroll", handleScrollResult);
  }, [isFetchingCompany, hasMoreCompany]);
  const handleFindClick = async (selectedCompany) => {
    setSearchCompany(selectedCompany);
    setlimitCompany(0);
  };
  return (
    <div ref={containerRefResult} className="h-screen overflow-auto">
      <div className="page-content">
        <div className="container">
          <div className="w-auto py-[20px] px-[25px] bg-white lg:flex items-center justify-center gap-6 mb-[30px] rounded-md">
            <div>
              <div className="relative w-[100%]">
                <input
                  className="appearance-none border-2 pl-10 border-gray-300 hover:border-gray-400 transition-colors rounded-md w-full !max-w-[350px] py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:ring-purple-600 focus:border-purple-600 focus:shadow-outline"
                  id="username"
                  type="text"
                  placeholder="Search Company..."
                  value={selectedCompany}
                  onChange={handleInputChange}
                  onClick={() => setSelectedCompanyDropdown(true)}
                />
                <div className="absolute right-0 inset-y-0 flex items-center">
                  <Image
                    src="/companyicon.png"
                    width={100}
                    height={100}
                    className="-ml-1 mr-3 h-5 w-5 text-gray-400 hover:text-gray-500"
                    alt="Company Icon"
                  />
                </div>
              </div>
              {selectedCompanyDropdown && (
                <div
                  onMouseLeave={() => setSelectedCompanyDropdown(false)}
                  ref={containerRef}
                  onScroll={handleScroll}
                  className="font-noto absolute bg-white border shadow-lg max-w-[350px] pb-[11px] rounded-b-[10px] mt-[10px] py-[10px] transition-all ease-in-out duration-500 opacity-100 z-50 rounded-[7px] h-[250px] overflow-auto"
                >
                  <div>
                    {suggestedCompanies.length > 0 ? (
                      suggestedCompanies.map((company, i) => (
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

            <div>
              <button
                type="button"
                onClick={() => handleFindClick(selectedCompany)}
                className="inline-block rounded bg-primary px-8 py-2 text-[16px] uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong font-bold w-full"
              >
                Find
              </button>
            </div>
          </div>
          <div>
            {loadingCompany && (
              <div>
                <CardLoding />
              </div>
            )}
            {!loadingCompany && companies?.length === 0 && (
              <div className="text-center text-gray-500 mt-4">
                No company available.
              </div>
            )}
            {!loadingCompany && companies.length > 0 && (
              <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
                {companies?.map((data) => (
                  <div
                    className="delay-150 duration-200 ease-in-out hover:shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] w-full bg-white rounded-lg relative border-[#E8E8E8] border-[1px] transition shadow-[#615DFA] hover:-translate-y-1 hover:scale-100"
                    key={data.id}
                  >
                    <div className="rounded-t-lg h-[130px] overflow-hidden relative">
                      <Image
                        width={100}
                        height={100}
                        className="object-cover w-full h-[130px] backdrop-blur-sm bg-black/30 hover:backdrop-blur-none"
                        src="https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
                        alt="Mountain"
                      />
                    </div>
                    <div className="px-[12px] py-2">
                      <div className="text-start mt-[9px]">
                        <div className="flex items-center justify-between cursor-pointer">
                          <h2 className="font-semibold leading-[14px] text-[15px] text-[#222] -mb-0 hover:!text-[#615DFA] transition delay-150 duration-300 ease-in-out">
                            {data.Office_name_english}
                          </h2>
                          <p className="font-semibold leading-[15px]  text-[18px] text-[#999] mb-[2px] cursor-pointer">
                            <MdNavigateNext className="w-5 h-5" />
                          </p>
                        </div>
                        <h2 className="font-medium leading-[10px] mt-[10px] text-[14px] text-[#777]">
                          95000 Active Agents
                        </h2>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {isFetchingCompany && (
              <div className="mb-[20px] mt-[40px] text-center">
                <p>Loading more companies...</p>
              </div>
            )}
            {!hasMoreCompany && (
              <div className="mb-[20px] mt-[40px] text-center">
                <p>No more companies to load.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
