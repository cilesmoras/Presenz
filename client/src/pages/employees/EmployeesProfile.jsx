import { TrashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { Button, PageCaption, PageHeading } from "../../components/ui";
import DeleteModal from "../../components/ui/DeleteModal";
import { useNotificationContext } from "../../context/NotificationContext";
import EmployeesDetails from "./EmployeesDetails";
import EmployeesLogs from "./EmployeesLogs";
import { deleteEmployee, fetchEmployeeByIdNumber } from "./EmployeesService";

export default function EmployeesProfile() {
  const { idNumber } = useParams();
  const navigate = useNavigate();
  const { data, isLoading } = useQuery(["employees", idNumber], () =>
    fetchEmployeeByIdNumber(idNumber)
  );
  const { handleNotification } = useNotificationContext();
  const [deleteModalIsOpen, setDeleteModelIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    try {
      setIsDeleting(true);
      const result = await deleteEmployee(data.id);
      if (result.success) {
        handleNotification("success", "Success", result.message);
        navigate("/employees");
      }
    } catch (error) {
      console.error(error);
      handleNotification(
        "error",
        "Something went wrong",
        "Failed to delete employee."
      );
    } finally {
      setIsDeleting(false);
    }
  }

  if (isLoading) return <p>Loading...</p>;

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
          <Button
            type="button"
            variant="danger"
            onClick={() => setDeleteModelIsOpen(true)}
          >
            <TrashIcon className="-ml-0.5 mr-2 h-5 w-5" />
            Delete
          </Button>
        </div>
      </div>
      <div className="grid lg:grid-cols-6 gap-6">
        <div className="lg:col-span-4">
          <div>
            <EmployeesLogs idNumber={idNumber} />
            {/* <StatsCard data={stats} /> */}
          </div>
        </div>
        <div className="lg:col-span-2">
          <EmployeesDetails data={data} />
        </div>
      </div>
      <DeleteModal
        itemName={data.first_name}
        open={deleteModalIsOpen}
        setOpen={setDeleteModelIsOpen}
        handleDelete={handleDelete}
        isDeleting={isDeleting}
      />
    </>
  );
}

const stats = [
  { name: "Absences", stat: "3" },
  { name: "Leaves", stat: "2" },
  { name: "Undertime", stat: "00:23" },
  { name: "Total worked hours", stat: "24:28" },
];
