import React from "react";

const PlaceInput = ({ title, placeholder, desc }) => {
  return (
    <div className="flex flex-col mt-4">
      <span className="text-[#000] text-2xl font-medium text-left">
        {title}
      </span>
      <span className="text-[#555]">{desc}</span>
      <input
        type="text"
        className="w-full py-2 px-4 bg-[#00000000] border border-[#9e9e9e] rounded-xl outline-none mt-1"
        placeholder={placeholder}
      />
    </div>
  );
};

export default PlaceInput;
