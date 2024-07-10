"use client";

import { createContext, useState } from "react";

export const PostLocationValueContext = createContext();

const PostLocationValueProvider = ({ children }) => {
  const [lata, setLata] = useState("");
  const [lon, setLon] = useState("");
  const [formatted_address, setFormatted_address] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [price, setPrice] = useState("");
  const [sqft, setSqft] = useState("");
  const [forPost, setForPost] = useState("Sell");
  const [towersorBuildingName, setTowersorBuildingName] = useState("");
  const [towersorBuildingNameError, setTowersorBuildingNameError] =
    useState("");
  const [postType, setPostType] = useState("Available");
  const [selectedType, setSelectedType] = useState("Normal");
  const [propertyCategory, setPropertyCategory] = useState("Property Category");
  const [propertyCategoryError, setPropertyCategoryError] = useState("");
  const [propertyType, setPropertyType] = useState("Property Type");
  const [propertyTypeError, setPropertyTypeError] = useState("");
  const [parking, setParking] = useState("Parking");
  const [image, setImage] = useState([]);
  const [video, setVideo] = useState([]);
  const [propertyDocument, setPropertyDocument] = useState([]);
  const [tags, setTags] = useState([]);
  const [tagsError, setTagsError] = useState("");
  const [locationError, setLocationError] = useState("");
  const [sellType, setSellType] = useState([]);

  return (
    <PostLocationValueContext.Provider
      value={{
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
        title,
        setTitle,
        titleError,
        setTitleError,
        description,
        setDescription,
        descriptionError,
        setDescriptionError,
        price,
        setPrice,
        sqft,
        setSqft,
        forPost,
        setForPost,
        towersorBuildingName,
        setTowersorBuildingName,
        towersorBuildingNameError,
        setTowersorBuildingNameError,
        postType,
        setPostType,
        selectedType,
        setSelectedType,
        propertyCategory,
        setPropertyCategory,
        propertyTypeError,
        setPropertyTypeError,
        propertyCategoryError,
        setPropertyCategoryError,
        propertyType,
        setPropertyType,
        propertyTypeError,
        setPropertyTypeError,
        parking,
        setParking,
        image,
        setImage,
        video,
        setVideo,
        propertyDocument,
        setPropertyDocument,
        tags,
        setTags,
        locationError,
        setLocationError,
        sellType,
        setSellType,
        tagsError,
        setTagsError,
      }}
    >
      {children}
    </PostLocationValueContext.Provider>
  );
};

export default PostLocationValueProvider;
