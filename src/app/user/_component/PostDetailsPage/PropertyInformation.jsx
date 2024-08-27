import React from "react";

const PropertyInformation = ({ item, handleRelatedPosts }) => {
  return (
    <div className="my-10">
      <h2>Property Information</h2>
      <div className="w-[95%] overflow-x-auto">
        <table className="table-auto w-full">
          <tbody>
            <tr className="border-b !h-[50px] bg-gray-100">
              <td className="border-r pl-3">Type</td>
              <td className="border-r pl-3">Post Type</td>
              <td className="border-r pl-3">For</td>
              <td className="border-r pl-3">Property Category</td>
              <td className="border-r pl-3">Property Type</td>
              <td className="pl-3">Parking</td>
            </tr>
            <tr className="border-b !h-[50px] text-[18px] font-bold">
              <td
                className="border-r pl-3 cursor-pointer"
                onClick={() =>
                  handleRelatedPosts({
                    type: "type",
                    value: item?.type,
                  })
                }
              >
                {item?.type}
              </td>
              <td
                className="border-r pl-3 cursor-pointer"
                onClick={() =>
                  handleRelatedPosts({
                    type: "postType",
                    value: item?.postType,
                  })
                }
              >
                {item?.postType}
              </td>
              <td
                className="border-r pl-3 cursor-pointer"
                onClick={() =>
                  handleRelatedPosts({
                    type: "for",
                    value: item?.for,
                  })
                }
              >
                For {item?.for}
              </td>
              <td
                className="border-r pl-3 cursor-pointer"
                onClick={() =>
                  handleRelatedPosts({
                    type: "propertyCategory",
                    value: item?.propertyCategory,
                  })
                }
              >
                {item?.propertyCategory}
              </td>
              <td
                className="border-r pl-3 cursor-pointer "
                onClick={() =>
                  handleRelatedPosts({
                    type: "propertyType",
                    value: item?.propertyType,
                  })
                }
              >
                {item?.propertyType}
              </td>
              <td
                className="pl-3 cursor-pointer"
                onClick={() =>
                  handleRelatedPosts({
                    type: "parking",
                    value: item?.parking,
                  })
                }
              >
                {item?.parking}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PropertyInformation;
