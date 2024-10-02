import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "../components/ui/";
import NotificationContainer from "../components/ui/toast-notification/NotificationContainer";

export default function Admin() {
  return (
    <>
      <Navbar />
      <main className="gap-4 py-6 px-2 sm:p-6 md:px-8 md:py-9">
        <Outlet />
      </main>
      <NotificationContainer />
    </>
  );
}
