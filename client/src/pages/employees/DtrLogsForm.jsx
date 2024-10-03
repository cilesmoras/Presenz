import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useQueryClient } from "react-query";
import { z } from "zod";
import { Input, Select } from "../../components/inputs";
import { Button } from "../../components/ui";
import { insertAttendanceLog } from "../../lib/dal/attendanceLogsDAL";

export default function DtrLogsForm({
  employee,
  logData,
  setLogData,
  selectedDate,
}) {
  const isAddMode = !logData;
  const [error, setError] = useState("");
  const queryClient = useQueryClient();

  const schema = z.object({
    logTime: z.string().trim().min(1, { message: "Please select a time." }),
    punchType: z.coerce.number(),
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      logTime: "",
      punchType: punchType[0].id,
    },
  });

  async function onSubmit(data) {
    try {
      const attendanceType = 1; // finger ang type
      const logTime = `${dayjs(selectedDate).format("YYYY-MM-DD")} ${
        data.logTime
      }`;
      const log = {
        employeeIdNumber: employee.id_number,
        punchType: data.punchType,
        attendanceType,
        logTime,
      };
      console.log(log);
      const result = await insertAttendanceLog(log);
      if (!result.success) {
        setError("Failed to insert log.");
        return;
      }

      reset();
      queryClient.invalidateQueries([
        "employee-logs",
        employee.id_number,
        dayjs(selectedDate).format("YYYY-MM"),
      ]);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4 mb-4">
          <Controller
            name="logTime"
            control={control}
            render={({ field: { ref, ...rest } }) => (
              <Input
                {...rest}
                type="time"
                label="Time"
                step="1"
                error={errors?.logTime?.message}
              />
            )}
          />
          <Controller
            name="punchType"
            control={control}
            render={({ field: { ref, ...rest } }) => (
              <Select {...rest} label="Type" options={punchType} />
            )}
          />
        </div>
        {error && (
          <p className="text-sm text-red-600 py-2 text-right">
            Something went wrong lagi!
          </p>
        )}
        <div className="flex justify-end gap-3 items-stretch">
          <Button
            type="button"
            variant="secondary"
            onClick={() => setLogData(null)}
          >
            Cancel
          </Button>
          <Button type="submit" variant={isAddMode ? "primary" : "success"}>
            {isAddMode ? "Insert log" : "Update log"}
          </Button>
        </div>
      </form>
    </>
  );
}

const punchType = [
  {
    id: 0,
    name: "In",
  },
  {
    id: 1,
    name: "Out",
  },
];
