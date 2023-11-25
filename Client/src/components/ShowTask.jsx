import PropTypes from "prop-types";
import { Select } from "antd";
import { HiPencilAlt, HiOutlineTrash } from "react-icons/hi";

import { useState } from "react";
import TaskService from "../services/TaskService";

import PopUp from "./PopUp";

function ShowTask({ task, setDeleteTaskId, updateTaskList }) {
  const handleChange = (value) => {
    const obj = {
      ...task,
      status: value,
    };
    // console.log(`Update status : `, obj);
    TaskService.updateTask(obj)
      .then((res) => {
        if (res.status === 200) {
          // console.log(res);
          updateTaskList(res.data.taskId, res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteFunc = () => {
    const tid = task?.taskId;
    TaskService.deleteTask(task?.taskId)
      .then((res) => {
        if (res?.status === 200) {
          setDeleteTaskId(tid);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="flex justify-between items-center w-[90%] mx-auto bg-blue-100 rounded p-1 mb-1">
      <div className="w-[70%]">
        <div className="flex items-center justify-between w-full">
          <p className="text-lg font-bold">{task?.name}</p>
          <p className="text-md">Due : {task?.date}</p>
        </div>
        <p>{task?.description}</p>
      </div>

      <div className="flex items-center">
        <HiPencilAlt
          className="w-5 h-5 mx-1 cursor-pointer hover:text-blue-400"
          onClick={showModal}
        />

        <PopUp
          isModalOpen={isModalOpen}
          task={task}
          setIsModalOpen={setIsModalOpen}
          updateTaskList={updateTaskList}
        />

        <HiOutlineTrash
          className="w-5 h-5 mx-1 cursor-pointer hover:text-blue-400"
          onClick={deleteFunc}
        />

        <Select
          defaultValue={task?.status}
          style={{ width: 120 }}
          onChange={handleChange}
          options={[
            { value: "Todo", label: "Todo" },
            { value: "In Progress", label: "In Progress" },
            { value: "Done", label: "Done" },
          ]}
        />
      </div>
    </div>
  );
}
ShowTask.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    status: PropTypes.string,
    date: PropTypes.string,
  }),
};
export default ShowTask;
