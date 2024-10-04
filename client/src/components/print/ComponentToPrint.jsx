import React, { forwardRef } from "react";
import DtrTemplate from "./DtrTemplate";
import "./Print.css";

const ComponentToPrint = forwardRef((props, ref) => {
  // console.log("props", props);
  return (
    // <div ref={ref} className="dtr-main-container">
    <div ref={ref} className="flex mx-auto">
      <DtrTemplate data={props} />
      <DtrTemplate data={props} />
    </div>
  );
});
export default ComponentToPrint;
