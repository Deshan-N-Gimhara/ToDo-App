import { Button, DatePicker, Form, Input, Select } from "antd";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

function FilterOptions({ tasks, setFilterTasks, filterTasks }) {
  const onFinish = async (values) => {
    let formData = {
      ...values,
    };

    const name = values.name || "";

    let filtered = tasks;
    if (formData.type == "name") {
      filtered = filtered.filter((task) =>
        task?.name.toLowerCase().includes(name.toLowerCase())
      );
    } else if (formData.type == "description") {
      filtered = filtered.filter((task) =>
        task?.description.toLowerCase().includes(name.toLowerCase())
      );
    }
    setFilterTasks(filtered);
  };

  // filter by date
  const [date, setDate] = useState();
  const onChange = (date, dateString) => {
    setDate(dateString);
  };

  useEffect(() => {
    const data = filterTasks;
    if (date) {
      const filtered = data?.filter(
        (task) => new Date(task?.date).toISOString().split("T")[0] === date
      );
      setFilterTasks(filtered);
    } else {
      setFilterTasks(tasks);
    }
  }, [date]);

  // filter by status
  const [status, setStatus] = useState("");
  useEffect(() => {
    let data = tasks;
    if (status !== "all") {
      data = data?.filter((task) => task.status === status);
    }
    setFilterTasks(data);
  }, [status]);

  return (
    <div className="w-[90%] mx-auto">
      <div className="flex justify-between mx-auto mt-5 w-[50%]">
        <Form
          name="basic"
          style={
            {
              // maxWidth: "90%",
              // margin: "0 auto",
            }
          }
          onFinish={onFinish}
          autoComplete="off"
        >
          <div className="flex items-center justify-start">
            <Form.Item name="name">
              <Input placeholder="Search" type="text" />
            </Form.Item>
            <Form.Item name="type">
              <Select className="mx-1 w-[1000px]">
                <Select.Option value="name" selected>
                  Title
                </Select.Option>
                <Select.Option value="description">Decription</Select.Option>
                {/* <Select.Option value="date">Date</Select.Option> */}
              </Select>
            </Form.Item>

            <Button
              type="primary"
              htmlType="submit"
              className="mx-3 bg-gray-400"
            >
              Search
            </Button>
          </div>
        </Form>

        <Form.Item name="date">
          <DatePicker onChange={onChange} className="" />
        </Form.Item>

        <Select
          style={{ width: 120 }}
          onChange={(value) => {
            setStatus(value);
          }}
          options={[
            { value: "all", label: "All" },
            { value: "Todo", label: "Todo" },
            { value: "In Progress", label: "In Progress" },
            { value: "Done", label: "Done" },
          ]}
        />
      </div>
      <p className="mt-3 mb-3 text-xl font-bold text-left text-white">
        Task List{" "}
      </p>
    </div>
  );
}
FilterOptions.propTypes = {
  setFilterOptions: PropTypes.func,
};
export default FilterOptions;
