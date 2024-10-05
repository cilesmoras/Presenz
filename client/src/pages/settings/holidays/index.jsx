import React from "react";
import CardHeadings from "../../../components/CardHeadings";
import HolidaysTable from "./HolidaysTable";

export default function Holidays() {
  return (
    <>
      <CardHeadings
        title="Holidays"
        buttonLinkLabel="Create new holiday"
        redirectTo="/holidays/create"
      />
      <div className="bg-white rounded-md">
        <HolidaysTable />
      </div>
    </>
  );
}
