import { DocumentIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { useNotificationContext } from "../context/NotificationContext";
import { insertBatchAttendanceLog } from "../lib/dal/attendanceLogsDAL";
import SpinnerIcon from "./ui/SpinnerIcon";

const Upload_logs = () => {
  const [color, setColor] = useState("black");
  const userId = 1;
  const [logs, setLogs] = useState([]);
  const [msg, setMsg] = useState("No file to upload");
  const [fileName, setFileName] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const { handleNotification } = useNotificationContext();

  // const {
  //   control,
  //   handleSubmit,
  //   reset,
  //   formState: { errors },
  // } = useForm({
  //   resolver: zodResolver(schema),
  //   defaultValues: {
  //     logTime: isAddMode ? "" : dayjs(logData?.log_time).format("HH:mm:ss"),
  //     punchType: isAddMode ? punchType[0].id : logData?.punch_type,
  //   },
  // });

  const cleanup = (logs) => {
    let newlogs = logs?.map((log) => {
      if (!log) return;
      return {
        employeeIdNumber: log[0]?.trim(),
        logTime: log[1],
        punchType: log[3],
        attendanceType: log[4],
      };
    });
    return newlogs;
  };

  const handleUploadLogs = async () => {
    if (logs.length == 0) return;
    try {
      setIsUploading(true);
      // const response = await insertAttendanceLog(logs);
      const response = await insertBatchAttendanceLog(logs);
      if (!response.success) {
        handleNotification(
          "error",
          "Something went wrong.",
          "Failed to upload the file."
        );
        return;
      }

      handleNotification("success", "Hurray!", "File successfully uploaded.");
      setLogs([]);
      setFileName(null);
    } catch (error) {
      console.log(error);
    } finally {
      setIsUploading(false);
    }
  };
  const showFile = async (e) => {
    e.preventDefault();
    console.log("e.target.result", e.target.result);
    if (e.target.result == null) {
      setFileName(e.target.files[0].name);
      const reader = new FileReader();
      console.log(reader);
      reader.onload = async (e) => {
        const text = e.target.result;
        const array = text
          .split("\n")
          .filter((line) => line.trim().length > 0)
          .map((line) => {
            return line.split("\t");
          });

        console.log("array", array);
        setLogs(cleanup(array));
      };
      reader.readAsText(e.target.files[0]);
    }

    e.target.value = null;
  };

  const punchType = (e) => {
    switch (e) {
      case (e = 0):
        return "Check in";
      case (e = 1):
        return "Check out";
      case (e = 4):
        return "Overtime in";
      case (e = 5):
        return "Overtime out";
      default:
        break;
    }
  };
  return (
    <div className="mx-auto max-w-3xl sm:px-6 lg:px-8">
      <div className="col-span-full">
        <label
          htmlFor="cover-photo"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          DTR file here
        </label>
        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
          <div className="text-center">
            <div className="text-center leading-6 text-gray-600">
              <label
                htmlFor="file-upload"
                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
              >
                <DocumentIcon
                  aria-hidden="true"
                  className="mx-auto h-12 w-12 mb-4 text-gray-300 hover:text-indigo-600"
                />
                <span>Upload a file</span>
                <input
                  onChange={(e) => showFile(e)}
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="sr-only"
                  accept=".dat"
                />
              </label>
            </div>
            <p className="text-xs leading-5 mt-1 text-gray-600">
              .dat file biometric machine
            </p>
            <p className="mt-3">{fileName}</p>
          </div>
        </div>
      </div>
      {logs.length > 0 && (
        <button
          type="button"
          disabled={isUploading}
          onClick={handleUploadLogs}
          className="w-full rounded-md mt-4 bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          {isUploading ? (
            <>
              <SpinnerIcon /> Uploading...
            </>
          ) : (
            "Begin upload"
          )}
        </button>
      )}
      <br />
      <br />
      {/* <div className="overflow-hidden rounded-lg bg-white shadow">
        <div className="upload">
          <PageHeading>Upload logs</PageHeading>
          <input
            type="file"
            accept=".dat"
            onChange={(e) => showFile(e)}
            onClick={() => {
              setMsg("");
            }}
          />
          <div>
            <Button
              style={{ width: "110px" }}
              type="button"
              variant="danger"
              onClick={handleUploadLogs}
            >
              Upload
            </Button>
          </div>
        </div>
        <div className="msg">
          {msg ? <p style={{ color: `${color}` }}>{msg}</p> : ""}
        </div>

        <div className="logs">
          <table className="min-w-full divide-y divide-gray-200 table-log">
            <thead className="bg-gray-50">
              <tr>
                <th>ID</th>
                <th>DATE / TIME</th>
                <th>PUNCH</th>
              </tr>
            </thead>
            <tbody>
              {logs?.map((log, i) => (
                <tr key={i}>
                  <td>{log.id}</td>
                  <td>{log.logTime}</td>
                  <td>{punchType(parseInt(log.punchType))}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div> */}
    </div>
  );
};

export default Upload_logs;
