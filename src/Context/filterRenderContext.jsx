"use client";

import { createContext, useState } from "react";

export const FilterRenderContext = createContext();

const FilterRenderProvider = ({ children }) => {
  const [filterRenderAgentPost, setfilterRenderAgentPost] = useState(false);
  const [filterRenderBuyerPost, setfilterRenderBuyerPost] = useState(false);
  const [filterRenderAllPost, setfilterRenderAllPost] = useState(false);
  const [filterRenderRelatedPost, setfilterRenderRelatedPost] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  const [postType, setPostType] = useState("");
  const [forPost, setForPost] = useState("");
  const [towersorBuildingName, setTowersorBuildingName] = useState("");
  const [propertyCategoryName, setPropertyCategory] = useState("");
  const [propertyTypeName, setPropertyType] = useState("");
  const [parking, setParking] = useState("");
  const [sellType, setSellType] = useState([]);
  const [tags, setTags] = useState([]);
  const [lata, setLata] = useState("");
  const [lon, setLon] = useState("");
  const [formatted_address, setFormatted_address] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");

  return (
    <FilterRenderContext.Provider
      value={{
        filterRenderAgentPost,
        setfilterRenderAgentPost,
        filterRenderBuyerPost,
        setfilterRenderBuyerPost,
        filterRenderAllPost,
        setfilterRenderAllPost,
        selectedType,
        setSelectedType,
        postType,
        setPostType,
        forPost,
        setForPost,
        towersorBuildingName,
        setTowersorBuildingName,
        propertyCategoryName,
        setPropertyCategory,
        propertyTypeName,
        setPropertyType,
        parking,
        setParking,
        sellType,
        setSellType,
        tags,
        setTags,
        lata,
        setLata,
        lon,
        setLon,
        formatted_address,
        setFormatted_address,
        country,
        setCountry,
        state,
        setState,
        city,
        setCity,
        filterRenderRelatedPost,
        setfilterRenderRelatedPost,
      }}
    >
      {children}
    </FilterRenderContext.Provider>
  );
};

export default FilterRenderProvider;
