import React, { useState } from "react";
import "./index.css";
import {
  Typography,
  Card,
  Form,
  Input,
  InputNumber,
  Select,
  Row,
  Col,
  Checkbox,
  Space,
} from "antd";
import TotalRunPanel from "Components/TotalPanel";
import BenchmarkCard from "Components/BenchmarkCard";
import AccelerateCard from "Components/AccelerateCard";
import HardwareTargets from "Components/HardwareTargets";

const { Title, Paragraph } = Typography;
const { Option } = Select;

const hardwares = [
  {
    provider: "AWS",
    instance: "m4.large",
    cpu: 2,
    memory: 8,
  },
  {
    provider: "AWS",
    instance: "m4.xlarge",
    cpu: 4,
    memory: 16,
  },
  {
    provider: "AWS",
    instance: "m4.2xlarge",
    cpu: 8,
    memory: 32,
  },
  {
    provider: "AWS",
    instance: "m4.4xlarge",
    cpu: 16,
    memory: 64,
  },
  {
    provider: "GCP",
    instance: "n2-standard-2",
    cpu: 2,
    memory: 8,
  },
  {
    provider: "GCP",
    instance: "n2-standard-4",
    cpu: 4,
    memory: 16,
  },
  {
    provider: "GCP",
    instance: "n2-standard-8",
    cpu: 8,
    memory: 32,
  },
  {
    provider: "GCP",
    instance: "n2-standard-16",
    cpu: 16,
    memory: 64,
  },
];

const OctomizePage = () => {
  const [hasBenchmark, setHasBenchmark] = useState();
  const [hasAccelerate, setHasAccelerate] = useState();
  const [form] = Form.useForm();
  const [hardwareTargets, setHardwareTargets] = useState(hardwares);
  const [detailsCounter, setDetailsCounter] = useState(0);

  const onFinish = (values) => {
    // Formate the form into correct shape
    // Calculate VCPU and memory

    console.log("Received values of form: ", values);
  };

  const submitForm = (e) => {
    form.submit();
  };

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col xl={18} md={16} xs={24}>
          <Card>
            <Title level={2} className="title-2">
              Octomize
            </Title>
            <Form form={form} name="config_octomize" onFinish={onFinish}>
              <Space
                direction="vertical"
                size="middle"
                style={{
                  display: "flex",
                }}
              >
                <BenchmarkCard
                  setHasBenchmark={setHasBenchmark}
                  hasBenchmark={hasBenchmark}
                />
                <AccelerateCard
                  setHasAccelerate={setHasAccelerate}
                  hasAccelerate={hasAccelerate}
                />
                <HardwareTargets
                  hardwareTargets={hardwareTargets}
                  form={form}
                  setDetailsCounter={setDetailsCounter}
                />
              </Space>
            </Form>
          </Card>
        </Col>
        <Col xl={6} md={8} xs={24}>
          <TotalRunPanel
            onSubmit={submitForm}
            form={form}
            detailsCounter={detailsCounter}
            hardwareTargets={hardwareTargets}
          />
        </Col>
      </Row>
    </>
  );
};

export default OctomizePage;
