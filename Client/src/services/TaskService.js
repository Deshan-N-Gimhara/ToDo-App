import axios from "axios";

const BaseUrl = "http://localhost:8080/api/v1/task";

// get task list by user id
const getTaskListByUserId = async (userId) => {
  const response = await axios({
    method: "get",
    url: `${BaseUrl}/get-task-list-by-user-id/${userId}`,
    headers: { "Content-Type": "application/json;" },
  });
  return response.data;
};

// save task
const saveTask = async (data) => {
  const response = await axios({
    method: "post",
    url: `${BaseUrl}/save-task`,
    data: data,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
  return response.data;
};

// delete function
const deleteTask = async (taskId) => {
  const response = await axios({
    method: "delete",
    url: `${BaseUrl}/delete-task/${taskId}`,
    headers: { "Content-Type": "application/json;" },
  });
  return response.data;
};

// update task
const updateTask = async (data) => {
  const response = await axios({
    method: "put",
    url: `${BaseUrl}/update-task`,
    data: data,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
  return response.data;
};

const TaskService = {
  getTaskListByUserId,
  saveTask,
  deleteTask,
  updateTask,
};

export default TaskService;
