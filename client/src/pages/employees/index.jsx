import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { Input } from "../../components/inputs";
import { PageCaption, PageHeading } from "./../../components/ui";
import { fetchEmployees } from "./EmployeesService";
import EmployeesTable from "./EmployeesTable";

export default function Employees() {
  const { data, isLoading } = useQuery(["employees"], fetchEmployees);

  return (
    <>
      <div className="sm:flex sm:items-center mb-6">
        <div className="sm:flex-auto">
          <PageHeading>Employees</PageHeading>
          <PageCaption>
            List of all the employees registered in the system.
          </PageCaption>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <Link to="create" className="btn bg-indigo text-sm">
            Create new employee
          </Link>
        </div>
      </div>
      <div className="max-w-[20rem] mb-4">
        <Input type="search" placeholder="Search here" />
      </div>
      {isLoading ? <p>Loading...</p> : <EmployeesTable employees={data} />}
    </>
  );
}
