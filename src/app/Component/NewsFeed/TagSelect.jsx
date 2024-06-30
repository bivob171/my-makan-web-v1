import React from "react";
import clsx from "clsx";
import Select from "react-select";

const TagSelect = ({ tags, setTags }) => {
  const options = [
    { value: "developer", label: "developer" },
    { value: "web developer", label: "web developer" },
    { value: "react developer", label: "react developer" },
    { value: "mern stack", label: "mern stack" },
    { value: "javascript", label: "javascript" },
    { value: "typescript", label: "typescript" },
    { value: "php", label: "php" },
    { value: "python", label: "python" },
  ];

  const handleChange = (tags) => {
    if (tags.length <= 5) {
      setTags(tags);
    } else {
      alert("You can only select up to 5 tags.");
    }
  };

  return (
    <Select
      isMulti
      value={tags}
      onChange={handleChange}
      options={options}
      className={clsx("!rounded-lg cursor-pointer")}
      placeholder="Select your Tags"
    />
  );
};

export default TagSelect;
