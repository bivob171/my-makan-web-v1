import React from "react";

const PropertyInformation = () => {
  return (
    <div className="my-10">
      <h2>Property Information</h2>
      <table class="table-auto w-[80%]">
        <tbody className="">
          <tr className="border-b !h-[50px]">
            <td className="">Type</td>
            <td className="font-semibold">Townhouse</td>
            <td>Furnishing</td>
            <td className="font-semibold">Unfurnished</td>
          </tr>
          <tr className="border-b !h-[50px]">
            <td>Purpose</td>
            <td className="font-semibold">For Sale</td>
            <td>Tru Check TM on</td>
            <td className="font-semibold">11 July 2024</td>
          </tr>
          <tr className="border-b !h-[50px]">
            <td>Reference no.</td>
            <td className="font-semibold">Bayut - H4L-3606217</td>
            <td>Added on</td>
            <td className="font-semibold">4 July 2024</td>
          </tr>
          <tr className="border-b !h-[50px]">
            <td>Completion</td>
            <td className="font-semibold">Off-Plan</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PropertyInformation;
