import { ExclamationCircleIcon } from "@heroicons/react/20/solid";

export function Input(props) {
  const { label, optional, error, leadingAddOn, trailingAddOn, ...otherProps } =
    props;
  const normalField =
    "block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm";
  const errorField =
    "block w-full rounded-md border-red-300 pr-10 text-red-900 placeholder-red-300 focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm";

  return (
    <div>
      <div className="flex justify-between">
        {label && (
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            {label}
          </label>
        )}
        {optional && (
          <span className="text-sm text-gray-500 start-end">Optional</span>
        )}
      </div>
      <div className="relative mt-1 rounded-md shadow-sm">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <span className="text-gray-500 sm:text-sm">{leadingAddOn}</span>
        </div>
        <input
          name="email"
          id="email"
          className={`${error ? errorField : normalField} ${
            trailingAddOn ? "pr-12" : ""
          } ${leadingAddOn ? "pl-7" : ""}`}
          aria-invalid="true"
          aria-describedby="email-error"
          {...otherProps}
        />
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          <span className="text-gray-500 sm:text-sm">{trailingAddOn}</span>
        </div>
        {error && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <ExclamationCircleIcon
              className="h-5 w-5 text-red-500"
              aria-hidden="true"
            />
          </div>
        )}
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-600" id="email-error">
          {error}
        </p>
      )}
    </div>
  );
}
