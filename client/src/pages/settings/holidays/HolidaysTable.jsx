import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Select } from "../../../components/inputs";
import DeleteModal from "../../../components/ui/DeleteModal";
import { useNotificationContext } from "../../../context/NotificationContext";
import {
  deleteHoliday,
  fetchDHolidaysDistinctYears,
  fetchHolidaysByYear,
} from "../../../lib/dal/holidaysDAL";

export default function HolidaysTable() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [yearParams, setYearParams] = useSearchParams();
  const queryYear = yearParams.get("year");
  const [selectedDeleteHoliday, setSelectedDeletedHoliday] = useState();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { handleNotification } = useNotificationContext();
  const [years, setYears] = useState([]);

  const { data: holidays, isLoading: isLoadingHolidays } = useQuery(
    ["holidays", queryYear],
    () => fetchHolidaysByYear(queryYear)
  );

  const distinctYears = useQuery(
    ["holidays-years"],
    fetchDHolidaysDistinctYears
  );

  useEffect(() => {
    if (queryYear || distinctYears.isLoading) return;
    navigate(`/holidays?year=${distinctYears.data[0].year}`);
  }, [distinctYears.data]);

  useEffect(() => {
    if (distinctYears.isLoading) return;
    const result = distinctYears.data.map((a) => ({
      id: a.year,
      name: a.year,
    }));

    setYears(result);
  }, [distinctYears.data, distinctYears.isLoading]);

  function handleSelectedHolidayDelete(data) {
    setSelectedDeletedHoliday(data);
    setOpenDeleteModal(true);
  }

  async function handleDeleteHoliday() {
    try {
      setIsDeleting(true);
      const result = await deleteHoliday(selectedDeleteHoliday?.id);
      if (result.success) {
        handleNotification("success", "Success", result.message);
        queryClient.invalidateQueries(["holidays"]);
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
      setOpenDeleteModal(false);
    }
  }

  if (!queryYear || isLoadingHolidays || distinctYears.isLoading)
    return <p>Loading data...</p>;

  return (
    <>
      <div className="mt-4 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="flex mb-4">
              <Select
                options={years}
                value={queryYear}
                onChange={(e) => setYearParams({ year: e.target.value })}
              />
            </div>
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Start
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    End
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {holidays?.map((holiday) => (
                  <tr key={holiday.id}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                      {holiday.name}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {dayjs(holiday.holiday_start).format("MMMM DD, YYYY")}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {dayjs(holiday.holiday_end).format("MMMM DD, YYYY")}
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0 flex gap-2 justify-end">
                      <Link
                        to={`/holidays/${holiday.id}/edit`}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        Edit<span className="sr-only">, {holiday.name}</span>
                      </Link>
                      <span
                        onClick={() => handleSelectedHolidayDelete(holiday)}
                        className="text-indigo-600 hover:text-indigo-900 cursor-pointer"
                      >
                        Delete<span className="sr-only">, {holiday.name}</span>
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
        itemName={selectedDeleteHoliday?.name}
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
        handleDelete={handleDeleteHoliday}
        isDeleting={isDeleting}
      />
    </>
  );
}
