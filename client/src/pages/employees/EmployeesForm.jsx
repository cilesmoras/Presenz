import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import * as z from "zod";
import "../../components/css/input.css";
import { Input, Select } from "../../components/inputs";
import { useNotificationContext } from "../../context/NotificationContext";
import { fetchDepartments } from "../../lib/dal/departmentsDAL";
import { fetchEmploymentTypes } from "../../lib/dal/employmentTypeDAL";
import { fetchJobTitles } from "../../lib/dal/jobTitlesDAL";
import { jobTitlesForSelectDropdownDTO } from "../../lib/dto/jobTitlesDTO";
import {
  createEmployee,
  fetchEmployeeByIdNumber,
  updateEmployee,
} from "./EmployeesService";

export default function EmployeesForm() {
  const { idNumber } = useParams();
  const isAddMode = !idNumber;
  const employee = useQuery(["employees", idNumber], () =>
    fetchEmployeeByIdNumber(idNumber)
  );
  const jobTitles = useQuery(["job-titles"], fetchJobTitles);
  const departments = useQuery(["deparments"], fetchDepartments);
  const employmentTypes = useQuery(["employment-types"], fetchEmploymentTypes);
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
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      idNumber: "",
      firstName: "",
      middleName: "",
      lastName: "",
      jobTitle: undefined,
      employmentType: undefined,
      department: undefined,
    },
  });

  useEffect(() => {
    if (
      jobTitles.isLoading ||
      employmentTypes.isLoading ||
      departments.isLoading
    )
      return;
    reset({
      idNumber: employee.data?.id_number ?? "",
      firstName: employee.data?.first_name ?? "",
      middleName: employee.data?.middle_name ?? "",
      lastName: employee.data?.last_name ?? "",
      jobTitle: employee.data?.job_title_id ?? jobTitles.data[0]?.id,
      employmentType:
        employee.data?.employment_type_id ?? employmentTypes.data[0]?.id,
      department: employee.data?.department_id ?? departments.data[0]?.id,
    });
  }, [employee.data, jobTitles.data, employmentTypes.data, departments.data]);

  async function onSubmit(data) {
    console.log(data);
    const result = isAddMode
      ? await createEmployee(data)
      : await updateEmployee(data, employee.data?.id);

    if (!result.success) {
      handleNotification("error", "Something went wrong", result.message);
      return console.error(`submit error: ${result.message}`);
    }

    handleNotification("success", "Saved successfully", result.message);
    isAddMode
      ? navigate("/employees")
      : navigate(`/employees/${data.idNumber}`);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <div className="shadow mx-auto max-w-3xl  sm:overflow-hidden sm:rounded-md">
        <div className="space-y-6 bg-white px-4 py-6 sm:p-6">
          <div>
            <h3 className="text-base font-semibold leading-6 text-gray-900">
              {isAddMode ? "Create employee" : "Edit employee"}
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Please fill up the required fields.
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
                  <Input {...rest} type="text" label="Middle name" optional />
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
          {jobTitles.isLoading ? (
            <p>Loading job titles dropdown...</p>
          ) : (
            <Controller
              name="jobTitle"
              control={control}
              render={({ field: { ref, ...rest } }) => (
                <Select
                  {...rest}
                  label="Job title"
                  options={jobTitlesForSelectDropdownDTO(jobTitles.data)}
                />
              )}
            />
          )}
          {departments.isLoading ? (
            <p>Loading departments dropdown...</p>
          ) : (
            <Controller
              name="department"
              control={control}
              render={({ field: { ref, ...rest } }) => (
                <Select
                  {...rest}
                  label="Department"
                  options={departments.data}
                />
              )}
            />
          )}
          {employmentTypes.isLoading ? (
            <p>Loading employment types dropdown...</p>
          ) : (
            <Controller
              name="employmentType"
              control={control}
              render={({ field: { ref, ...rest } }) => (
                <Select
                  {...rest}
                  label="Employment type"
                  options={employmentTypes.data}
                />
              )}
            />
          )}
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
