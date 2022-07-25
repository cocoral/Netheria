import React, { useState, useEffect } from "react";
import "./index.css";
import { Typography, Form, notification, Row, Col, Card, Space } from "antd";
import TotalRunPanel from "Components/TotalPanel";
import BenchmarkCard from "Components/BenchmarkCard";
import AccelerateCard from "Components/AccelerateCard";
import HardwareTargets from "Components/HardwareTargets";
import { getHardware, saveBenchmark, saveAccelerate } from "API";

const { Title } = Typography;

const data = [
  { provider: "AWS", instance: "m4.large", cpu: 2, memory: 8 },
  { provider: "AWS", instance: "m4.xlarge", cpu: 4, memory: 16 },
  { provider: "AWS", instance: "m4.2xlarge", cpu: 8, memory: 32 },
  { provider: "AWS", instance: "m4.4xlarge", cpu: 16, memory: 64 },
  { provider: "GCP", instance: "n2-standard-2", cpu: 2, memory: 8 },
  { provider: "GCP", instance: "n2-standard-4", cpu: 4, memory: 16 },
  { provider: "GCP", instance: "n2-standard-8", cpu: 8, memory: 32 },
  { provider: "GCP", instance: "n2-standard-16", cpu: 16, memory: 64 },
];

const OctomizePage = () => {
  const [hasBenchmark, setHasBenchmark] = useState();
  const [hasAccelerate, setHasAccelerate] = useState();
  const [form] = Form.useForm();
  const [hardwareTargets, setHardwareTargets] = useState([]);
  const [detailsCounter, setDetailsCounter] = useState(0);

  const fetchHardware = async () => {
    try {
      const data = await getHardware();
      setHardwareTargets(data?.data);
    } catch (e) {
      console.error("failed get hardwares: ", e);
    }
  };

  useEffect(() => {
    fetchHardware();
  }, []);

  const onFinish = async (values) => {
    const {
      benchmark_engine,
      benchmark_num_trials,
      benchmark_runs_per_trial,
      hardware_targets,
      accelerate_engine,
      accelerate_kernel_trials,
    } = values;

    // If not hardware target selected, console error.
    if (!values.hardware_targets) {
      console.error("no hardware target selected");
    } else {
      // Formate the form into correct shape
      // Need to get VCPU and memory from hardwareTargets
      const hardwareDetails = hardware_targets?.map((hardware) => ({
        ...hardware,
        ...hardwareTargets.find(
          (item) =>
            item.provider === hardware.provider &&
            item.instance === hardware.instance,
        ),
      }));

      const benchmarkData = { hardware: hardwareDetails };
      if (hasBenchmark) {
        benchmarkData.engine = benchmark_engine;
        benchmarkData.num_trials = benchmark_num_trials;
        benchmarkData.runs_per_trial = benchmark_runs_per_trial;
      }

      const accelerateData = { hardware: hardwareDetails };
      if (hasAccelerate) {
        if (accelerate_engine === "TVM") {
          accelerateData.engine = {
            [accelerate_engine]: { kernel_trials: accelerate_kernel_trials },
          };
        } else {
          accelerateData.engine = accelerate_engine;
        }
      }

      try {
        await saveBenchmark(benchmarkData);
        await saveAccelerate(accelerateData);
        notification["success"]({
          message: "Congrats! ",
          description: "Your task is successfully added to the queue.",
        });
      } catch (e) {
        console.error(e);
        notification["error"]({
          message: "Opps, somthing went wrong",
        });
      }
    }
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
