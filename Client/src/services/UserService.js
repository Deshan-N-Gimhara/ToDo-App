import axios from "axios";

const BaseUrl = "http://localhost:8080/api/v1/user";

//login
const login = async (data) => {
  //console.log(data);
  const response = await axios({
    method: "post",
    url: `${BaseUrl}/login`,
    data: data,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
  return response.data;
};

const UserService = {
  login,
};

export default UserService;
