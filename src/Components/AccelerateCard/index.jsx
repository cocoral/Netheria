import React, { useState } from "react";
import { Typography, Card, Form, InputNumber, Select, Checkbox } from "antd";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
const { Paragraph } = Typography;
const { Option } = Select;

const AccelerateCard = ({ hasAccelerate, setHasAccelerate }) => {
  const [engine, setEngine] = useState(null);
  const onCheckBenchMark = (e) => {
    setHasAccelerate(e.target.checked);
  };

  const onEngineChange = (value) => {
    setEngine(value);
  };

  return (
    <Card>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Checkbox
          style={{ alignItems: "center" }}
          onChange={onCheckBenchMark}
          className={hasAccelerate && "mb-2"}
        >
          <Paragraph strong className="mb-0">
            Accelerate
          </Paragraph>
          <Paragraph className="mb-0">
            Optimize "this model" using the selected engine for the selected
            hardware target
          </Paragraph>
        </Checkbox>
        {hasAccelerate ? <UpOutlined className="mb-2" /> : <DownOutlined />}
      </div>
      {hasAccelerate && (
        <>
          <Form.Item
            name="accelerate_engine"
            label="Engine"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              placeholder="Select an engine to run modal on"
              onChange={onEngineChange}
              allowClear
            >
              <Option value="ONNX">ONNX</Option>
              <Option value="TVM">TVM</Option>
            </Select>
          </Form.Item>
          {engine === "TVM" && (
            <Form.Item
              name="accelerate_kernel_trials"
              label="Kernel Trials"
              dependencies={["accelerate_engine"]}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <InputNumber min={1} max={2000} />
            </Form.Item>
          )}
        </>
      )}
    </Card>
  );
};

export default AccelerateCard;
