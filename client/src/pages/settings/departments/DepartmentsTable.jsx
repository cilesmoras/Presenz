import React from "react";
import { useQuery } from "react-query";
import { fetchDepartments } from "../../../lib/dal/departmentsDAL";

export default function DepartmentsTable() {
  const { data: departments, isLoading } = useQuery(
    ["departments"],
    fetchDepartments
  );

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
                    Name
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {departments?.map((dep) => (
                  <tr key={dep.id}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-900 sm:pl-0">
                      {dep.name}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
