import React from "react";
import {
  Typography,
  Card,
  Form,
  InputNumber,
  Select,
  Row,
  Col,
  Checkbox,
} from "antd";
import { DownOutlined, UpOutlined } from "@ant-design/icons";

const { Paragraph } = Typography;
const { Option } = Select;

const BenchmarkCard = ({ hasBenchmark, setHasBenchmark }) => {
  const onCheckBenchMark = (e) => {
    setHasBenchmark(e.target.checked);
  };

  const onEngineChange = () => {};

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
          className={hasBenchmark && "mb-2"}
        >
          <Paragraph strong className="mb-0">
            Benchmark
          </Paragraph>
          <Paragraph className="mb-0">
            Benchmark "this model" using the selected engine and hardware
            target, sans optimization.
          </Paragraph>
        </Checkbox>
        {hasBenchmark ? <UpOutlined className="mb-2" /> : <DownOutlined />}
      </div>

      {hasBenchmark && (
        <>
          <Form.Item
            name="benchmark_engine"
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
          <Row gutter={16}>
            <Col xl={12} xs={24}>
              <Form.Item
                name="benchmark_num_trials"
                label="Number of Trials"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <InputNumber min={1} max={1000} />
              </Form.Item>
            </Col>
            <Col xl={12} xs={24}>
              <Form.Item
                name="benchmark_runs_per_trial"
                label="Runs Per Trial"
                dependencies={["benchmark_num_trials"]}
                rules={[
                  {
                    required: true,
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (
                        !value ||
                        getFieldValue("benchmark_num_trials") * value <= 1000
                      ) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(
                          "num_trials * runs_per_trial should be smaller than 1000",
                        ),
                      );
                    },
                  }),
                ]}
              >
                <InputNumber min={1} max={1000} />
              </Form.Item>
            </Col>
          </Row>
        </>
      )}
    </Card>
  );
};

export default BenchmarkCard;
