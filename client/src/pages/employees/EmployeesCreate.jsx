import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as z from "zod";
import "../../components/css/input.css";
import { Input, Select } from "../../components/inputs";
import { useNotificationContext } from "../../context/NotificationContext";
import { createEmployee } from "./EmployeesService";

export default function EmployeesCreate() {
  const { handleNotification } = useNotificationContext();
  const navigate = useNavigate();
  const userId = 1;

  const schema = z.object({
    idNumber: z.string().trim().min(1, { message: "Please enter an ID no." }),
    firstName: z
      .string()
      .trim()
      .min(1, { message: "Please enter a first name" }),
    lastName: z.string().trim().min(1, { message: "Please enter a last name" }),
    middleName: z.string().trim(),
    jobTitle: z.coerce.number(),
    employmentType: z.coerce.number(),
    department: z.coerce.number(),
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      idNumber: "",
      firstName: "",
      middleName: "",
      lastName: "",
      jobTitle: 1,
      employmentType: 1,
      department: 1,
    },
  });

  const jobTitle = [
    { id: "1", name: "Administrative Officer I" },
    { id: "2", name: "Sheriff I" },
  ];

  const department = [
    { id: "1", name: "Admin Division" },
    { id: "2", name: "Legal Division" },
  ];

  const employmentType = [
    { id: "1", name: "Permanent" },
    { id: "2", name: "Contractual" },
    { id: "3", name: "Job Order" },
  ];

  async function onSubmit(data) {
    const result = await createEmployee({ ...data, createdBy: userId });
    if (!result.success) {
      handleNotification("error", "Something went wrong", result.message);
      return console.error(`submit error: ${result.message}`);
    }

    handleNotification("success", "Saved successfully", result.message);
    navigate("/employees");
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <div className="shadow mx-auto max-w-3xl  sm:overflow-hidden sm:rounded-md">
        <div className="space-y-6 bg-white px-4 py-6 sm:p-6">
          <div>
            <h3 className="text-base font-semibold leading-6 text-gray-900">
              Employee Information
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Use a permanent address where you can recieve mail.
            </p>
          </div>
          <Controller
            name="idNumber"
            control={control}
            render={({ field: { ref, ...rest } }) => (
              <Input
                {...rest}
                type="text"
                label="ID no."
                error={errors?.idNumber?.message}
              />
            )}
          />

          <div className="grid grid-cols-8 gap-6">
            <div className="col-span-8 sm:col-span-3">
              <Controller
                name="firstName"
                control={control}
                render={({ field: { ref, ...rest } }) => (
                  <Input
                    {...rest}
                    type="text"
                    label="First name"
                    error={errors?.firstName?.message}
                  />
                )}
              />
            </div>
            <div className="col-span-8 sm:col-span-2">
              <Controller
                name="middleName"
                control={control}
                render={({ field: { ref, ...rest } }) => (
                  <Input {...rest} type="text" label="Middle name" />
                )}
              />
            </div>
            <div className="col-span-8 sm:col-span-3">
              <Controller
                name="lastName"
                control={control}
                render={({ field: { ref, ...rest } }) => (
                  <Input
                    {...rest}
                    type="text"
                    label="Last name"
                    error={errors?.lastName?.message}
                  />
                )}
              />
            </div>
          </div>
          <Controller
            name="jobTitle"
            control={control}
            render={({ field: { ref, ...rest } }) => (
              <Select {...rest} label="Job title" options={jobTitle} />
            )}
          />
          <Controller
            name="department"
            control={control}
            render={({ field: { ref, ...rest } }) => (
              <Select {...rest} label="Department" options={department} />
            )}
          />
          <Controller
            name="employmentType"
            control={control}
            render={({ field: { ref, ...rest } }) => (
              <Select
                {...rest}
                label="Employment type"
                options={employmentType}
              />
            )}
          />
        </div>
        <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
          <button
            type="submit"
            className="inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {isSubmitting ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </form>
  );
}
