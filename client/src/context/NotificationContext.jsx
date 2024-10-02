import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/20/solid";
import moment from "moment";
import { createContext, useContext, useState } from "react";

export const NotificationContext = createContext();

export function useNotificationContext() {
  return useContext(NotificationContext);
}

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);

  function ShowNotification(icon, title, message) {
    let notificationProperties = null;
    notificationProperties = {
      id: parseInt(moment(new Date()).format("MMDDHHmmss")),
      icon: icon,
      title: title,
      message: message,
    };
    setNotifications([...notifications, notificationProperties]);
  }

  function handleNotification(type, title, message) {
    let icon;

    switch (type) {
      case "success":
        icon = (
          <CheckCircleIcon
            className="h-6 w-6 text-green-400"
            aria-hidden="true"
          />
        );
        break;
      case "error":
        icon = (
          <ExclamationCircleIcon
            className="h-6 w-6 text-red-400"
            aria-hidden="true"
          />
        );
        break;
      case "info":
        icon = (
          <InformationCircleIcon
            className="h-6 w-6 text-blue-400"
            aria-hidden="true"
          />
        );
        break;
    }

    ShowNotification(icon, title, message);
  }

  return (
    <NotificationContext.Provider
      value={{
        handleNotification,
        notifications,
        setNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}
