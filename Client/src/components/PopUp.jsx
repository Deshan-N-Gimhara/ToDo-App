import { Form, Input, DatePicker } from "antd";
import TaskService from "../services/TaskService";
import { Modal } from "antd";
import { useState, useEffect } from "react";
import moment from "moment";

function PopUp({ isModalOpen, setIsModalOpen, task, updateTaskList }) {
  const [form] = Form.useForm();
  const [date, setDate] = useState();

  useEffect(() => {
    if (task) {
      form.setFieldsValue({
        name: task.name,
        description: task.description,
        date: moment(task.date),
      });
      setDate(task.date);
    }
  }, [task, form]);

  const onFinish = async (values) => {
    let formData = {
      ...values,
      date: date,
      userId: task?.userId,
      status: task?.status,
      taskId: task?.taskId,
    };

    TaskService.updateTask(formData)
      .then((res) => {
        if (res.status === 200) {
          console.log(res);
          updateTaskList(res.data.taskId, res.data);
          handleCancel();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onChange = (date, dateString) => {
    setDate(dateString);
  };

  return (
    <>
      <Modal
        title="Update Task"
        centered
        visible={isModalOpen}
        onOk={() => form.submit()}
        okButtonProps={{ className: "model-ok-button" }}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          name="basic"
          className="justify-start block"
          style={{
            maxWidth: "90%",
            margin: "0 auto",
          }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <div className="justify-start block">
            <Form.Item name="name">
              <Input placeHolder="Task Title" className="" />
            </Form.Item>

            <Form.Item name="description">
              <Input placeHolder="Description" className="" />
            </Form.Item>

            <Form.Item name="date">
              <DatePicker onChange={onChange} className="" />
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </>
  );
}

export default PopUp;
