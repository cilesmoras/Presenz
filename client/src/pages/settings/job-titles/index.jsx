import React from "react";
import CardHeadings from "../../../components/CardHeadings";
import JobTitlesTable from "./JobTitlesTable";

export default function JobTitles() {
  return (
    <>
      <CardHeadings
        title="Job titles"
        buttonLinkLabel="Create new title"
        redirectTo="/job-titles/create"
      />
      <div className="bg-white rounded-md">
        <JobTitlesTable />
      </div>
    </>
  );
}
