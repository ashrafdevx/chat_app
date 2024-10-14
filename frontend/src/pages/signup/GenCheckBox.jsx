import React from "react";

const GenCheckBox = () => {
  return (
    <>
      <div className="form-control flex">
        <label className="label gap-2 cursor-pointer">
          <span className="label-text">male</span>
          <input type="checkbox" defaultChecked className="checkbox" />
        </label>
      </div>
      <div className="form-control flex">
        <label className="label gap-2 cursor-pointer">
          <span className="label-text">female</span>
          <input type="checkbox" defaultChecked className="checkbox" />
        </label>
      </div>
    </>
  );
};

export default GenCheckBox;
