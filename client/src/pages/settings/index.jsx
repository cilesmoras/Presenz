import { Outlet } from "react-router-dom";
import { VerticalNavigation } from "../../components/ui/";

export default function Settings() {
  return (
    <div className="h-screen">
      <div className="grid md:grid-cols-12 gap-4 py-6 px-2 sm:p-6 md:px-8 md:py-9">
        <aside className="md:col-span-3">
          <VerticalNavigation navigation={navigation} />
        </aside>
        <div className="shadow bg-white py-6 px-4 sm:p-6 rounded-md md:col-span-9">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

const navigation = [
  { name: "Holidays", href: "/holidays", current: true },
  // { name: "Break time", href: "/break-time", current: false },
  { name: "Job titles", href: "/job-titles", current: false },
  { name: "Departments", href: "/departments", current: false },
  // { name: "Shift schedules", href: "/shift-schedules", current: false },
  // { name: "Documents", href: "#", current: false },
  // { name: "Reports", href: "#", current: false },
];
