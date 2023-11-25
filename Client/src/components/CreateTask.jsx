import { Button, Form, Input, DatePicker } from "antd";
import { useState } from "react";
import TaskService from "../services/TaskService";

function CreateTask({ setTasks, user }) {
  const [date, setDate] = useState([]);

  const onFinish = async (values) => {
    let formData = {
      ...values,
      date: date,
      userId: user?.userId,
      status: "Todo",
    };
    // console.log("Success:", formData);
    TaskService.saveTask(formData)
      .then((res) => {
        if (res.status === 200) {
          setTasks((prevTasks) => [...prevTasks, res.data]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onChange = (date, dateString) => {
    setDate(dateString);
  };

  return (
    <div className="w-[90%] mx-auto">
      <p className="text-lg font-bold text-white">Create a task</p>
      <div className="px-3 py-4 mx-auto border-2 border-white border-solid rounded-md ">
        <Form
          name="basic"
          style={{}}
          onFinish={onFinish}
          autoComplete="off"
          className="flex items-center justify-between"
        >
          {/* //   <div> */}
          <Form.Item name="name">
            <Input
              placeHolder="Task Title"
              className="my-0"
              defaultValue={""}
            />
          </Form.Item>

          <Form.Item name="description">
            <Input placeHolder="Description" className="" defaultValue={""} />
          </Form.Item>
          <DatePicker onChange={onChange} className="" />

          <Button type="primary" htmlType="submit" className="bg-[#29ADB2]">
            Add Task
          </Button>
          {/* </div> */}
        </Form>
      </div>
    </div>
  );
}

export default CreateTask;
