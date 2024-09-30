import React from "react";
import { Link } from "react-router-dom";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import "./LargeButton.css";
const LargeButton = (props) => {
  return (
    <div>
      <Link
        to={props.to}
        className="large-button"
        style={{
          backgroundColor: props.backgroundColor,
          width: props.width,
          height: props.height,
        }}
      >
        <FingerprintIcon />
        <h1>{props.label}</h1>
      </Link>
    </div>
  );
};

export default LargeButton;
