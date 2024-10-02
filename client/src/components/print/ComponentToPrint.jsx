import React, { forwardRef } from "react";
import DtrTemplate from "./DtrTemplate";
import "./Print.css";

const incharge = import.meta.env.VITE_IN_CHARGE;

const ComponentToPrint = forwardRef((props, ref) => {
  // console.log("props", props);
  return (
    <div ref={ref} className="dtr-main-container">
      <DtrTemplate data={props} />
      <DtrTemplate data={props} />
    </div>
  );
});
export default ComponentToPrint;
