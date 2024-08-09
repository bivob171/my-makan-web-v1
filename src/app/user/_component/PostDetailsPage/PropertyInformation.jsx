import React from "react";

const PropertyInformation = ({ item }) => {
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
            <td className="border-r pl-3">{item?.type}</td>
            <td className="border-r pl-3">{item?.postType}</td>
            <td className="border-r pl-3">For {item?.for}</td>
            <td className="border-r pl-3">{item?.propertyCategory}</td>
            <td className="border-r pl-3">{item?.propertyType}</td>
            <td className="pl-3">{item?.parking}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  
  );
};

export default PropertyInformation;
