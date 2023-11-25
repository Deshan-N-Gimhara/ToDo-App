import { useEffect } from "react";
import { RouteData } from "../../constants/RouteData";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const savedUser = localStorage.getItem("loggedUser");
    if (savedUser) {
      navigate(RouteData.Home);
    }
  }, []);
  return (
    <div>
      {/* Login W */}
      <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
        <div className="w-full p-6 m-auto mt-10 bg-white rounded-lg shadow-md lg:max-w-xl">
          <h1 className="text-3xl font-semibold text-center text-blue-700 underline">
            Sign Up
          </h1>
          <form className="mt-10">
            <div className="mb-8">
              <input
                type="name"
                placeholder="Name"
                className="block w-full h-12 px-4 py-2 mt-2 text-purple-700 bg-[#eaeaea] border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>

            <div className="mb-8">
              <input
                placeholder="Email"
                type="email"
                className="block w-full h-12 px-4 py-2 mt-2 text-purple-700 bg-[#eaeaea] border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <div className="mb-2">
              <input
                placeholder="Password"
                type="password"
                className="block w-full h-12 px-4 py-2 mt-2 text-purple-700 bg-[#eaeaea] border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>

            <div className="mt-6 ">
              <button className="w-auto px-5 ml-[210px] py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-700 rounded-3xl hover:bg-blue-600 focus:outline-none focus:bg-purple-600">
                Sign Up
              </button>
            </div>
          </form>

          <p className="mt-8 text-xs font-light text-center text-gray-700">
            {" "}
            Already have an account?{" "}
            <Link
              to={RouteData.Login}
              className="font-medium text-purple-600 hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
