import React from "react";
import LargeButton from "./LargeButton";
import FingerprintIcon from "@mui/icons-material/Fingerprint";

export default function Dashboard() {
  // const arr = [
  //   { id: 1, salary: 10 },
  //   { id: 2, salary: 20 },
  //   { id: 3, salary: 30 },
  // ];

  // const sum = arr.reduce((accumulator, object) => {
  //   return accumulator + object.id;
  // }, 0);
  // console.log(sum);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "5rem",
      }}
    >
      <h1 style={{ fontSize: "5rem" }}>DASHBOARD</h1>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "auto",
          gap: "5rem",
        }}
      >
        <div>
          <LargeButton
            to={"/attendance-logs"}
            label={"Upload Logs"}
            backgroundColor={"#54AE58"}
            width={"10rem"}
            height={"6rem"}
          />
        </div>
        <div>
          <LargeButton
            to={"/employees"}
            label={"Print DTR"}
            backgroundColor={"#F29C37"}
            width={"10rem"}
            height={"6rem"}
          />
        </div>
        <div>
          <LargeButton
            to={"/register"}
            label={"New Employee"}
            backgroundColor={"#55BFD4"}
            width={"10rem"}
            height={"6rem"}
          />
        </div>
        <div>
          <LargeButton
            to={"/holidays"}
            label={"Settings"}
            backgroundColor={"#E9453F"}
            width={"10rem"}
            height={"6rem"}
          />
        </div>
      </div>
    </div>
  );
}
