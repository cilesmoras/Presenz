import { TrashIcon } from "@heroicons/react/24/outline";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { Button, PageCaption, PageHeading } from "../../components/ui";
import EmployeesDetails from "./EmployeesDetails";
import EmployeesLogs from "./EmployeesLogs";
import { fetchEmployeeByIdNumber } from "./EmployeesService";

export default function EmployeesProfile() {
  const { idNumber } = useParams();
  const { data, isLoading, isFetching } = useQuery(
    ["employees", idNumber],
    () => fetchEmployeeByIdNumber(idNumber)
  );
  const navigate = useNavigate();

  if (isLoading || isFetching) return <p>Loading...</p>;

  return (
    <>
      <div className="sm:flex sm:items-center mb-6">
        <div className="sm:flex-auto">
          <PageHeading>
            {data?.first_name} {data?.middle_name} {data?.last_name}
          </PageHeading>
          <PageCaption>
            Details, date and time record of the employee
          </PageCaption>
        </div>
        <div className="justify-stretch mt-6 flex flex-col-reverse space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-y-0 sm:space-x-3 sm:space-x-reverse md:mt-0 md:flex-row md:space-x-3">
          <Button type="button" onClick={() => navigate(`edit`)}>
            Edit
          </Button>
          {/* <Button type="button" variant="primary">
            <PrinterIcon className="-ml-0.5 mr-2 h-5 w-5" />
            Print DTR
          </Button> */}
          <Button type="button" variant="danger">
            <TrashIcon className="-ml-0.5 mr-2 h-5 w-5" />
            Delete
          </Button>
        </div>
      </div>
      <div className="grid lg:grid-cols-6 gap-6">
        <div className="lg:col-span-4">
          <div>
            <EmployeesLogs id={idNumber} />
            {/* <StatsCard data={stats} /> */}
          </div>
        </div>
        <div className="lg:col-span-2">
          <EmployeesDetails data={data} />
        </div>
      </div>
    </>
  );
}

const stats = [
  { name: "Absences", stat: "3" },
  { name: "Leaves", stat: "2" },
  { name: "Undertime", stat: "00:23" },
  { name: "Total worked hours", stat: "24:28" },
];
