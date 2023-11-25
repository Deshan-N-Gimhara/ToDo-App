import { Link, useNavigate } from "react-router-dom";
import { RouteData } from "../../constants/RouteData";
import { useEffect, useState } from "react";
import UserService from "../../services/UserService";

const Login = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    const savedUser = localStorage.getItem("loggedUser");
    if (savedUser) {
      navigate(RouteData.Home);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    setError("");
    if (!loginData.email) {
      setError("Please enter email.");
      return false;
    } else if (!loginData.password) {
      setError("Please enter password.");
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }
    // console.log(loginData);

    UserService.login(loginData)
      .then((response) => {
        if (response.status === 200) {
          localStorage.setItem("loggedUser", JSON.stringify(response.data));
          navigate(RouteData.Home);
        } else {
          setError(response.message);
        }
      })
      .catch((error) => {
        console.error(error.message);
        setError("Invalid credentials");
      });
  };

  return (
    <div>
      {/* Login W */}
      <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
        <div className="w-full p-6 m-auto mt-10 bg-white rounded-md shadow-md lg:max-w-xl">
          <h1 className="text-3xl font-semibold text-center text-blue-700 underline">
            Sign in
          </h1>

          <p className="w-full text-center text-red-600">{error}</p>
          <form className="mt-10" onSubmit={handleSubmit}>
            <div className="mb-6">
              <input
                placeholder="Email"
                type="email"
                name="email"
                onChange={handleChange}
                className="block w-full h-12 px-4 py-2 mt-2 text-purple-700 bg-[#eaeaea] border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <div className="mb-6">
              <input
                placeholder="Password"
                type="password"
                name="password"
                onChange={handleChange}
                className="block w-full h-12 px-4 py-2 mt-2 text-purple-700 bg-[#eaeaea] border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <a href="#" className="text-xs text-purple-600 hover:underline">
              Forget Password?
            </a>
            <div className="mt-6">
              <button className="w-auto px-5 ml-[210px] py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-700 rounded-2xl hover:bg-blue-600 focus:outline-none focus:bg-purple-600">
                Login
              </button>
            </div>
          </form>

          <p className="mt-8 text-xs font-light text-center text-gray-700">
            {" "}
            Don't have an account?{" "}
            <Link
              to={RouteData.SignUp}
              className="font-medium text-purple-600 hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
