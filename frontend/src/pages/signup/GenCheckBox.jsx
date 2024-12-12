import React from "react";

const GenCheckBox = ({ value, handleGenderCheckBox }) => {
  return (
    <>
      <div className="form-control flex">
        <label className="label gap-2 cursor-pointer">
          <span className="label-text">male</span>
          <input
            onChange={() => handleGenderCheckBox("male")}
            type="checkbox"
            checked={value === "male"}
            className="checkbox"
          />
        </label>
      </div>
      <div className="form-control flex">
        <label className="label gap-2 cursor-pointer">
          <span className="label-text">female</span>
          <input
            onChange={() => handleGenderCheckBox("female")}
            type="checkbox"
            checked={value === "female"}
            className="checkbox"
          />
        </label>
      </div>
    </>
  );
};

export default GenCheckBox;
