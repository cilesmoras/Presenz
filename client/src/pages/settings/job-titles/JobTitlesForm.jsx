import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import { Input } from "../../../components/inputs";
import { Button } from "../../../components/ui";
import { useNotificationContext } from "../../../context/NotificationContext";
import {
  fetchJobTitleById,
  insertJobTitle,
  updateJobTitle,
} from "../../../lib/dal/jobTitlesDAL";

export default function JobTitlesForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: jobTitle, isLoading: isLoadingJobTitle } = useQuery(
    ["job-titles", id],
    () => fetchJobTitleById(id)
  );
  const { handleNotification } = useNotificationContext();
  const isAddMode = !id;

  const schema = z.object({
    title: z.string().trim().min(1, { message: "Please enter a title." }),
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
    },
  });

  useEffect(() => {
    if (isLoadingJobTitle) return;
    reset({ title: jobTitle.title });
  }, [jobTitle, isLoadingJobTitle]);

  async function onSubmit(data) {
    const result = isAddMode
      ? await insertJobTitle(data)
      : await updateJobTitle(data, id);

    if (!result.success) {
      handleNotification("error", "Something went wrong", result.message);
      return console.error(`submit error: ${result.message}`);
    }

    handleNotification("success", "Saved successfully", result.message);
    isAddMode ? reset() : navigate(`/job-titles`);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <h3 className="text-base font-semibold leading-6 text-gray-900">
        {isAddMode ? "Create job title" : "Edit job title"}
      </h3>
      <div className="py-3 space-y-4 sm:w-full lg:w-1/2">
        <Controller
          name="title"
          control={control}
          render={({ field: { ref, ...rest } }) => (
            <Input
              {...rest}
              type="text"
              label="Title"
              error={errors?.title?.message}
            />
          )}
        />
        <div className="flex gap-3 justify-end">
          <Button
            type="button"
            variant="secondary"
            onClick={() => navigate("job-titles")}
          >
            Cancel
          </Button>
          <button
            type="submit"
            className="inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {isSubmitting ? "Saving..." : "Save title"}
          </button>
        </div>
      </div>
    </form>
  );
}
