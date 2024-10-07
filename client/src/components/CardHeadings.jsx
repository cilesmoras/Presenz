import { Link } from "react-router-dom";

export default function CardHeadings({ title, buttonLinkLabel, redirectTo }) {
  return (
    <div className="border-b border-gray-200 bg-white pb-5 mb-5">
      <div className="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
        <div className="ml-4 mt-2">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            {title}
          </h3>
        </div>
        <div className="ml-4 mt-2 flex-shrink-0">
          {buttonLinkLabel && (
            <Link
              to={redirectTo}
              className="relative inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              {buttonLinkLabel}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
