import { useState } from "react";
import { useNavigate } from "react-router-dom";
import hsacLogo from "../../assets/HSAC-Icon.png";
import { login } from "./LoginServices";

export default function Login() {
  const navigate = useNavigate();
  const [err, setErr] = useState();
  const [loginDetails, setLoginDetails] = useState({
    username: "",
    password: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loginDetails.username == "" || loginDetails.password == "") {
      return setErr("Please fill up all the fields.");
    }
    try {
      const result = await login(loginDetails);
      if (!result.success) {
        setErr(result.message);
        return;
      }

      localStorage.setItem("auth", JSON.stringify(result.data));
      navigate("/employees");
    } catch (error) {
      console.log("client error", error);
      setErr(error.response.data);
      return;
    }
  };

  const handleInput = (e) => {
    setLoginDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <>
      <div className="flex h-screen">
        <div className="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <img
                className="h-40 w-auto mx-auto"
                src={hsacLogo}
                alt="Your Company"
              />
              <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
                Sign in to your account
              </h2>
            </div>

            <div className="mt-8">
              <div className="mt-6">
                <form className="space-y-6">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Username
                    </label>
                    <div className="mt-1">
                      <input
                        id="username"
                        name="username"
                        type="text"
                        onChange={handleInput}
                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Password
                    </label>
                    <div className="mt-1">
                      <input
                        id="password"
                        name="password"
                        type="password"
                        onChange={handleInput}
                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <button
                      onClick={handleSubmit}
                      className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Sign in
                    </button>
                  </div>
                </form>
                <div
                  className="errMsg"
                  style={{
                    height: "3rem",
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {err && <p className="text-red-600 text-sm">{err}</p>}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="relative hidden w-0 flex-1 lg:block">
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src="/bg.jpg"
            alt="background login page"
          />
        </div>
      </div>
    </>
  );
}
