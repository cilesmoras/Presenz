import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Navbar } from "../components/ui/";
import NotificationContainer from "../components/ui/toast-notification/NotificationContainer";
import { authSession } from "../lib/dal/authDAL";

export default function Admin() {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = authSession();

  useEffect(() => {
    if (!auth) navigate("/");
  }, [location]);

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
