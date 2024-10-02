export default function EmployeesDetails({ data }) {
  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Employee Information
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          Details and everything.
        </p>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
        <dl className="sm:divide-y sm:divide-gray-200">
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Name</dt>
            <dd className="mt-1 text-right text-sm font-semibold text-gray-900 sm:col-span-2 sm:mt-0">
              {data.first_name} {data?.middle_name} {data.last_name}
            </dd>
          </div>
          {/* <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Date hired</dt>
            <dd className="mt-1 text-right text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              January 17, 2021
            </dd>
          </div> */}
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
              Employment type
            </dt>
            <dd className="mt-1 text-right text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              {data.employment_type_name}
            </dd>
          </div>
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Job title</dt>
            <dd className="mt-1 text-right text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              {data.job_title}
            </dd>
          </div>
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
            <dt className="text-sm  font-medium text-gray-500">
              Division/Department
            </dt>
            <dd className="mt-1 text-right text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              {data.department_name}
            </dd>
          </div>
          {/* <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Shift</dt>
            <dd className="mt-1 text-right text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              8:00 am to 12:00 noon - 1:00 pm to 5:00 pm
            </dd>
          </div> */}
        </dl>
      </div>
    </div>
  );
}
