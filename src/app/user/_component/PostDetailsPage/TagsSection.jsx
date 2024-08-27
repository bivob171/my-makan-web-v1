import React from "react";

const TagsSection = ({ tags, handleRelatedPosts }) => {
  return (
    <div className="bg-[#fff] rounded px-4 pt-2 pb-4">
      <h2 className="text-[2vw] !mb- text-[#444]">Related tags</h2>
      <div className="flex justify-start items-center gap-2">
        {tags?.map((data, i) => {
          return (
            <span
              key={i}
              onClick={() =>
                handleRelatedPosts({
                  type: "tag",
                  value: data,
                })
              }
              class="inline-flex cursor-pointer cursor-pointer items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10"
            >
              {data}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default TagsSection;
