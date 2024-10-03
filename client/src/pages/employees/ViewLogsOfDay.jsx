import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/reactv2";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import dayjs from "dayjs";

const statuses = {
  0: "text-green-700 bg-green-50 ring-green-600/20",
  1: "text-yellow-800 bg-yellow-50 ring-yellow-600/20",
  // "In progress": "text-gray-600 bg-gray-50 ring-gray-500/10",
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ViewLogsOfDayList({ logs, handleEdit, handleDelete }) {
  if (logs.length === 0) return <p>There are no logs on this date.</p>;
  return (
    <ul role="list" className="divide-y divide-gray-100">
      {logs.map((log) => (
        <li
          key={log.id}
          className="flex items-center justify-between gap-x-6 py-4"
        >
          <div className="min-w-0">
            <div className="flex items-start gap-x-3">
              <p className="text-sm font-semibold leading-6 text-gray-900">
                {dayjs(log.log_time).format("HH:mm")}
              </p>
              <p
                className={classNames(
                  statuses[log.punch_type],
                  "mt-0.5 whitespace-nowrap rounded-md px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset"
                )}
              >
                {log.punch_type === 0 ? "IN" : "OUT"}
              </p>
            </div>
          </div>
          <div className="flex flex-none items-center gap-x-4">
            <Menu as="div" className="relative flex-none">
              <MenuButton className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                <span className="sr-only">Open options</span>
                <EllipsisVerticalIcon aria-hidden="true" className="h-5 w-5" />
              </MenuButton>
              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
              >
                <MenuItem>
                  <a
                    href="#"
                    className="block px-3 py-1 text-sm leading-6 text-gray-900 data-[focus]:bg-gray-50"
                    onClick={() => handleEdit(log)}
                  >
                    Edit<span className="sr-only">, {log.id}</span>
                  </a>
                </MenuItem>
                <MenuItem>
                  <a
                    href="#"
                    className="block px-3 py-1 text-sm leading-6 text-gray-900 data-[focus]:bg-gray-50"
                    onClick={() => handleDelete(log)}
                  >
                    Delete<span className="sr-only">, {log.id}</span>
                  </a>
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
        </li>
      ))}
    </ul>
  );
}
