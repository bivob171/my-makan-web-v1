"use client";

import { createContext, useEffect, useState } from "react";

export const EditPostLocationValueContext = createContext();

const EditPostLocationValueProvider = ({ children }) => {
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
  const [tags, setTags] = useState([]);
  const [tagsError, setTagsError] = useState("");
  const [locationError, setLocationError] = useState("");
  const [sellType, setSellType] = useState([]);
  const [media, setmedia] = useState([]);
  const [files, setFiles] = useState([]);
  const [newsFeedRender, setNewsFeedRender] = useState(false);

  // get the edit post

  const [postId, setPostId] = useState();

  useEffect(() => {
    setSelectedType(postId?.type);
    setTitle(postId?.title);
    setDescription(postId?.description);
    setPrice(postId?.price);
    setSqft(postId?.sqft);
    setPostType(postId?.postType);
    setForPost(postId?.for);
    setLata(postId?.location?.lat);
    setLon(postId?.location?.lng);
    setFormatted_address(postId?.location?.formatted_address);
    setCountry(postId?.location?.country);
    setState(postId?.location?.state);
    setCity(postId?.location?.city);
    setTowersorBuildingName(postId?.location?.towersorBuildingName);
    setPropertyCategory(postId?.propertyCategory);
    setPropertyType(postId?.propertyType);
    setParking(postId?.parking);
    setSellType(postId?.sellType);
    setTags(postId?.tags);
    setmedia(postId?.media);
    setFiles(postId?.media);
  }, [postId]);

  return (
    <EditPostLocationValueContext.Provider
      value={{
        media,
        setmedia,
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
        tags,
        setTags,
        locationError,
        setLocationError,
        sellType,
        setSellType,
        tagsError,
        setTagsError,
        newsFeedRender,
        setNewsFeedRender,
        files,
        setFiles,
        setPostId,
        postId,
      }}
    >
      {children}
    </EditPostLocationValueContext.Provider>
  );
};

export default EditPostLocationValueProvider;
