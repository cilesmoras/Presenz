import { NavLink } from "react-router-dom";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const normalLink = "text-gray-600 hover:bg-gray-50 hover:text-gray-900";
const activeLink = "bg-gray-200 text-gray-900";

export function VerticalNavigation({ navigation }) {
  return (
    <nav className="space-y-1" aria-label="Sidebar">
      {navigation.map((item) => (
        <NavLink
          key={item.name}
          to={item.href}
          // className={classNames(
          //   item.current
          //     ? "bg-gray-200 text-gray-900"
          //     : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
          //   "flex items-center px-3 py-2 text-sm font-medium rounded-md"
          // )}
          className={({ isActive }) =>
            (isActive ? activeLink : normalLink) +
            " flex items-center px-3 py-2 text-sm font-medium rounded-md"
          }
        >
          <span className="truncate">{item.name}</span>
        </NavLink>
      ))}
    </nav>
  );
}
