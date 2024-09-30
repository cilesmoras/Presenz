import { CreditCardIcon } from "@heroicons/react/24/outline";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

export default function EmployeesTable({ employees }) {
  return (
    <>
      <div className="overflow-hidden bg-white shadow sm:rounded-md">
        <ul role="list" className="divide-y divide-gray-200">
          {employees?.map((employee) => (
            <li key={employee.id}>
              <Link
                to={`${employee.id_number}`}
                className="block hover:bg-gray-50"
              >
                <div className="flex items-center px-4 py-4 sm:px-6">
                  <div className="flex min-w-0 flex-1 items-center">
                    <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                      <div>
                        <p className="truncate text-sm font-medium text-indigo-600">
                          {`${employee.first_name} ${employee?.middle_name} ${employee.last_name}`}
                        </p>
                        <p className="mt-2 flex items-center text-sm text-gray-500">
                          <CreditCardIcon
                            className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                            aria-hidden="true"
                          />
                          <span className="truncate">{employee.id_number}</span>
                        </p>
                      </div>
                      <div className="hidden md:block">
                        <div>
                          <p className="text-sm text-gray-900 sm:mt-2">
                            {employee.job_title}
                          </p>
                          <p className="mt-2 flex items-center text-sm text-gray-500">
                            {employee.department_name}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <ChevronRightIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
