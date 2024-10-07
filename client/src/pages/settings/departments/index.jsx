import React from "react";
import CardHeadings from "../../../components/CardHeadings";
import DepartmentsTable from "./DepartmentsTable";

export default function Departments() {
  return (
    <>
      <CardHeadings title="Departments" />
      <div className="bg-white rounded-md">{<DepartmentsTable />}</div>
    </>
  );
}
