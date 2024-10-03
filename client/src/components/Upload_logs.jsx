import React, { useEffect, useState } from "react";
import { Db } from "../utils/ConnectMethod";
import { Button, PageHeading } from "./ui";

const Upload_logs = () => {
  const [color, setColor] = useState("black");
  const userId = 1;
  const [logs, setLogs] = useState([]);
  const [msg, setMsg] = useState("No file to upload");
  const cleanup = (logs) => {
    let newlogs = logs?.map((log) => {
      if (!log) return;
      return {
        id: log[0]?.trim(),
        logTime: log[1],
        punchType: log[3],
        attendanceType: log[4],
      };
    });
    return newlogs;
  };

  const handleUploadLogs = async () => {
    if (logs.length) {
      setMsg("Uploading please wait......");
      try {
        const response = await Db.post("/logs/insertlogs", logs);
        setMsg(response.data);
        setLogs((log) => {
          (log.id = ""), (log.punchType = ""), (log.logTime = "");
        });
        setColor("green");
        setMsg("Upload Successfull!");
      } catch (error) {
        console.log(error);
      }
    } else {
      setMsg("Choose file first!");
    }
  };
  const showFile = async (e) => {
    e.preventDefault();
    if (e.target.result == null) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const text = e.target.result;
        const array = text
          .split("\n")
          .filter((line) => line)
          .map((line) => {
            return line.split("\t");
          });

        setLogs(cleanup(array));
      };
      reader.readAsText(e.target.files[0]);
    }
  };

  useEffect(() => {
    console.log("logs", logs);
  }, [logs]);

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
      <div className="overflow-hidden rounded-lg bg-white shadow">
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
      </div>
    </div>
  );
};

export default Upload_logs;
