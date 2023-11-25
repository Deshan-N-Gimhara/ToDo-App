import { useEffect } from "react";
import { useState } from "react";
import CreateTask from "./../components/CreateTask";
import FilterOptions from "./../components/FilterOptions";
import ShowTask from "./../components/ShowTask";
import { useNavigate } from "react-router-dom";
import { RouteData } from "../constants/RouteData";
import TaskService from "../services/TaskService";

function Home() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [filterTasks, setFilterTasks] = useState();
  const [user, setUser] = useState();
  const [deleteTaskId, setDeleteTaskId] = useState();

  useEffect(() => {
    const savedUser = localStorage.getItem("loggedUser");
    if (!savedUser) {
      navigate(RouteData.Login);
    } else {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  useEffect(() => {
    if (user) {
      TaskService.getTaskListByUserId(user?.userId)
        .then((res) => {
          //   console.log(res);
          if (res.status === 200) {
            setTasks(res?.data);
            setFilterTasks(res?.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [user]);

  useEffect(() => {
    const filtereTasks = filterTasks?.filter((t) => t?.taskId !== deleteTaskId);
    setTasks(filtereTasks);
    setFilterTasks(filtereTasks);
  }, [deleteTaskId]);

  const updateTaskList = (taskIdToFind, newTask) => {
    const taskIndex = tasks.findIndex((task) => task.taskId === taskIdToFind);

    if (taskIndex !== -1) {
      const updatedTasks = [...tasks];
      updatedTasks.splice(taskIndex, 1, newTask);
      setTasks(updatedTasks);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedUser");
    navigate(RouteData.Login);
  };

  //   console.log(filterOptions);
  return (
    <div>
      {user && (
        <div className="flex items-center justify-end w-full gap-3 px-10 py-5">
          <p className="text-lg text-right text-black">
            User name : <span className="font-bold">{user?.name}</span>
          </p>
          <p
            className="text-blue-600 duration-100 ease-in-out cursor-pointer hover:underline"
            onClick={handleLogout}
          >
            Logout
          </p>
        </div>
      )}
      <div className="bg-[#0766AD] w-[80%] h-auto mx-auto rounded-lg pt-5 mt-5 pb-12">
        <p className="font-sans text-6xl font-bold text-center text-white">
          Task Manager
        </p>

        {/*  task create */}
        <CreateTask setTasks={setTasks} user={user} />

        {/* filter option section */}
        <FilterOptions
          setFilterTasks={setFilterTasks}
          tasks={tasks}
          filterTasks={filterTasks}
        />

        {/* show created tasks */}
        {filterTasks?.map((t, i) => (
          <>
            <div key={i}>
              <ShowTask
                task={t}
                setDeleteTaskId={setDeleteTaskId}
                updateTaskList={updateTaskList}
              />
            </div>
          </>
        ))}
      </div>
    </div>
  );
}

export default Home;
