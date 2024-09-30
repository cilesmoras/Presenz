import { Button, PageHeading } from "./../../components/ui";
import "../../components/css/input.css";
import { useState } from "react";
import { Select } from "../../components/inputs";
import { createEmployee } from "./EmployeesService";
import { useNavigate } from "react-router-dom";
import FormDialog from "../../components/mui/Formdialog";

export default function EmployeesCreate() {
  const [formValue, setFormValue] = useState();
  const navigate = useNavigate();
  const [errMsg, setErrMsg] = useState();
  const userId = 1;
  const [employeeData, setEmployeeData] = useState({
    employmentType: "1",
    jobTitle: "1",
    department: "1",
    idNumber: "",
    firstName: "",
    midName: "",
    lastName: "",
    createdBy: userId,
  });
  const [jobTitle, setJobTitle] = useState([
    { id: "1", name: "Administrative Officer I" },
    { id: "2", name: "Sheriff I" },
  ]);
  const [department, setDepartment] = useState([
    { id: "1", name: "Admin Division" },
    { id: "2", name: "Legal Division" },
  ]);
  const [employmentType, setEmploymentType] = useState([
    { id: "1", name: "Permanent" },
    { id: "2", name: "Contractual" },
    { id: "3", name: "Job Order" },
  ]);

  const handleChange = (e) => {
    setEmployeeData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    if (
      employeeData.idNumber == "" ||
      employeeData.firstName == "" ||
      employeeData.midName == "" ||
      employeeData.lastName == ""
    ) {
      return setErrMsg("Input fields must not empty!");
    }
    try {
      let data = await createEmployee(employeeData);
      console.log(data);
    } catch (error) {
      setErrMsg(error);
    }
  };
  return (
    <div className="mx-auto max-w-3xl sm:px-6 lg:px-8">
      <div className="sm:flex-auto">
        <PageHeading>Create employee</PageHeading>
      </div>
      <div
        className="overflow-hidden rounded-lg bg-white shadow"
        style={{ display: "flex", position: "relative" }}
      >
        <div className="px-4 py-5 sm:p-6" style={{ width: "100%" }}>
          <div
            style={{
              display: "flex",
              justifyItems: "space-between",
              width: "100%",
            }}
          >
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Personal Information
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Use a permanent address where you can receive mail.
              </p>
            </div>
            <div>
              <Button
                style={{
                  position: "absolute",
                  right: "3rem",
                  height: "2.5rem",
                  top: "1.5rem",
                }}
                type="button"
                variant="danger"
                onClick={handleSubmit}
              >
                Add Employee
              </Button>
            </div>
            <div
              style={{
                height: "12px",
                position: "absolute",
                right: "3rem",
                top: "5rem",
              }}
            >
              {errMsg ? <p style={{ color: "red" }}>{errMsg}</p> : ""}
            </div>
          </div>
          <div
            className="input-container"
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <div className="left">
              <div className="text-field">
                <input
                  type="number"
                  id="id"
                  name="idNumber"
                  placeholder=" "
                  onChange={handleChange}
                />
                <label htmlFor="id">Id number</label>
              </div>
              <div className="text-field">
                <input
                  required
                  type="text"
                  id="firstname"
                  name="firstName"
                  placeholder=" "
                  onChange={handleChange}
                />
                <label htmlFor="firstname">First name</label>
              </div>
              <div className="text-field">
                <input
                  required
                  type="text"
                  id="midname"
                  name="midName"
                  placeholder=" "
                  onChange={handleChange}
                />
                <label htmlFor="midname">Midle name</label>
              </div>
              <div className="text-field">
                <input
                  required
                  type="text"
                  id="lastname"
                  name="lastName"
                  placeholder=" "
                  onChange={handleChange}
                />
                <label htmlFor="lastname">Last name</label>
              </div>
            </div>
            <div className="rights">
              <div className="input-select">
                <p>Job Title</p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "1rem",
                  }}
                >
                  <Select
                    options={jobTitle}
                    name="jobTitle"
                    onChange={handleChange}
                  />
                  <FormDialog
                    title2={"New job title"}
                    formValue={formValue}
                    setFormValue={setFormValue}
                  />
                </div>
              </div>
              <div className="input-select">
                <p>Department</p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "1rem",
                  }}
                >
                  <Select
                    options={department}
                    name="department"
                    onChange={handleChange}
                  />
                  <FormDialog
                    title2={"New department"}
                    formValue={formValue}
                    setFormValue={setFormValue}
                  />
                </div>
              </div>
              <div className="input-select">
                <p>Employment Type</p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "1rem",
                  }}
                >
                  <Select
                    options={employmentType}
                    name="employmentType"
                    onChange={handleChange}
                  />
                  <FormDialog
                    title2={"New employment type"}
                    formValue={formValue}
                    setFormValue={setFormValue}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
