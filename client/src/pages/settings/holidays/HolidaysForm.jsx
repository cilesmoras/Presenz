import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { z } from "zod";
import { Input } from "../../../components/inputs";
import { Button } from "../../../components/ui";
import { useNotificationContext } from "../../../context/NotificationContext";
import { insertHoliday, updateHoliday } from "../../../lib/dal/holidaysDAL";

export default function HolidaysForm() {
  const { id } = useParams();
  const isAddMode = !id;
  const { handleNotification } = useNotificationContext();

  const schema = z.object({
    name: z.string().trim().min(1, { message: "Please enter a name." }),
    holidayStart: z.coerce.date(),
    holidayEnd: z.coerce.date(),
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      holidayStart: "",
      holidayEnd: "",
    },
  });

  async function onSubmit(data) {
    const { name, holidayStart, holidayEnd } = data;
    const startDate = dayjs(holidayStart).format("YYYY-MM-DD");
    const endDate = dayjs(holidayEnd).format("YYYY-MM-DD");
    const newData = { name, holidayStart: startDate, holidayEnd: endDate };
    const result = isAddMode
      ? await insertHoliday(newData)
      : await updateHoliday(newData, id);
    if (!result.success) {
      handleNotification("error", "Something went wrong", result.message);
      return console.error(`submit error: ${result.message}`);
    }

    handleNotification("success", "Saved successfully", result.message);
    isAddMode ? reset() : navigate(`/holidays`);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <h3 className="text-base font-semibold leading-6 text-gray-900">
        {isAddMode ? "Create holiday" : "Edit holiday"}
      </h3>
      <div className="py-3 space-y-4 sm:w-full lg:w-1/2">
        <Controller
          name="name"
          control={control}
          render={({ field: { ref, ...rest } }) => (
            <Input
              {...rest}
              type="text"
              label="Name"
              error={errors?.name?.message}
            />
          )}
        />
        <Controller
          name="holidayStart"
          control={control}
          render={({ field: { ref, ...rest } }) => (
            <Input
              {...rest}
              type="date"
              label="Start"
              error={errors?.holidayStart?.message}
            />
          )}
        />
        <Controller
          name="holidayEnd"
          control={control}
          render={({ field: { ref, ...rest } }) => (
            <Input
              {...rest}
              type="date"
              label="End"
              error={errors?.holidayEnd?.message}
            />
          )}
        />
        <div className="flex gap-3 justify-end">
          <Button
            type="button"
            variant="secondary"
            onClick={() =>
              navigate(isAddMode ? `/employees/` : `/employees/${idNumber}`)
            }
          >
            Cancel
          </Button>
          <button
            type="submit"
            className="inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {isSubmitting ? "Saving..." : "Save holiday"}
          </button>
        </div>
      </div>
    </form>
  );
}
