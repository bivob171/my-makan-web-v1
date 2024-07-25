import React from "react";

const PropertyInformation = ({ item }) => {
  return (
    <div className="my-10">
      <h2>Property Information</h2>
      <table class="table-auto w-[90%]">
        <tbody className="">
          <tr className="border-b !h-[50px]">
            <td className="">Type</td>
            <td className="">Post Type</td>
            <td className="font-semibold">For</td>
            <td>Property Category </td>
            <td className="font-semibold">Property Type</td>
            <td className="font-semibold">parking</td>
          </tr>
          <tr className="border-b !h-[50px]">
            <td>{item?.type}</td>
            <td>{item?.postType}</td>
            <td className="font-semibold">For {item?.for}</td>
            <td>{item?.propertyCategory}</td>
            <td className="font-semibold">{item?.propertyType}</td>
            <td className="font-semibold">{item?.parking}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PropertyInformation;
