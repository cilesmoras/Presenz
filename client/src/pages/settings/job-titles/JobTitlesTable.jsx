import React, { useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { Link } from "react-router-dom";
import DeleteModal from "../../../components/ui/DeleteModal";
import { useNotificationContext } from "../../../context/NotificationContext";
import { deleteJobTitle, fetchJobTitles } from "../../../lib/dal/jobTitlesDAL";

export default function JobTitlesTable() {
  const queryClient = useQueryClient();
  const { handleNotification } = useNotificationContext();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedJobTitle, setSelectedJobTitle] = useState();
  const [isDeleting, setIsDeleting] = useState(false);
  const { data: jobTitles, isLoading } = useQuery(
    ["job-titles"],
    fetchJobTitles
  );

  function handleSelectedJobTitleDelete(data) {
    setSelectedJobTitle(data);
    setOpenDeleteModal(true);
  }

  async function handleDeleteJobTitle() {
    try {
      setIsDeleting(true);
      const result = await deleteJobTitle(selectedJobTitle?.id);
      if (!result.success) throw new Error("Failed to delete job title");
      handleNotification("success", "Success", result.message);
      queryClient.invalidateQueries(["job-titles"]);
    } catch (error) {
      console.error(error);
      handleNotification("error", "Something went wrong", error.message);
    } finally {
      setIsDeleting(false);
      setOpenDeleteModal(false);
    }
  }

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <div className="mt-4 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                  >
                    Title
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">Action</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {jobTitles?.map((a) => (
                  <tr key={a.id}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                      {a.title}
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0 flex gap-2 justify-end">
                      <Link
                        to={`/job-titles/${a.id}/edit`}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        Edit<span className="sr-only">, {a.title}</span>
                      </Link>
                      <span
                        onClick={() => handleSelectedJobTitleDelete(a)}
                        className="text-indigo-600 hover:text-indigo-900 cursor-pointer"
                      >
                        Delete<span className="sr-only">, {a.title}</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <DeleteModal
        itemName={selectedJobTitle?.title}
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
        handleDelete={handleDeleteJobTitle}
        isDeleting={isDeleting}
      />
    </>
  );
}
