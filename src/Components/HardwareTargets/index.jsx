import React, { useState } from "react";
import {
  Typography,
  Form,
  Select,
  Row,
  Col,
  Button,
  Space,
  Divider,
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

const { Paragraph, Title } = Typography;
const { Option } = Select;

const HardwareTargets = ({ hardwareTargets, form, setDetailsCounter }) => {
  // A counter to force instance to update
  const [counter, setCounter] = useState(0);
  const hardwareMap = {};

  const selectedHardwares = form
    ?.getFieldValue("hardware_targets")
    ?.filter((hardware) => hardware?.provider && hardware?.instance);

  hardwareTargets.forEach((target) => {
    // Skip if already selected
    const shouldSkip = selectedHardwares?.find(
      (item) =>
        item?.provider === target?.provider &&
        item?.instance === target?.instance,
    );
    if (shouldSkip) return;
    if (hardwareMap[target.provider]) {
      hardwareMap[target.provider].push(target);
    } else {
      hardwareMap[target.provider] = [target];
    }
  });

  const providers = Object.keys(hardwareMap);

  const getInstances = (fieldName) => {
    return hardwareMap[
      form.getFieldValue("hardware_targets")[fieldName]?.provider
    ];
  };

  const getDetails = (fieldName) => {
    const instance =
      form.getFieldValue("hardware_targets")[fieldName]?.instance;
    const provider =
      form.getFieldValue("hardware_targets")[fieldName]?.provider;

    return hardwareTargets?.find(
      (item) => item.instance === instance && item.provider === provider,
    );
  };

  return (
    <>
      <Title level={3} className="title-3">
        Hardware Targets
      </Title>
      <Row>
        <Col lg={8}>
          <Paragraph strong className="mb-0">
            Provider
          </Paragraph>
        </Col>
        <Col lg={8}>
          <Paragraph strong className="mb-0">
            Instance
          </Paragraph>
        </Col>
        <Col lg={3}>
          <Paragraph strong className="mb-0">
            VCPU
          </Paragraph>
        </Col>
        <Col lg={4}>
          <Paragraph strong className="mb-0">
            MEMORY(GIB)
          </Paragraph>
        </Col>
        <Col lg={1}></Col>
      </Row>

      <Divider className="mb-1 mt-1" />

      <Form.List name="hardware_targets">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Space
                key={key}
                style={{
                  display: "flex",
                  marginBottom: 8,
                }}
                align="baseline"
                className="hardware-content"
              >
                <Row gutter={16}>
                  <Col lg={8}>
                    <Form.Item
                      {...restField}
                      name={[name, "provider"]}
                      rules={[
                        {
                          required: true,
                          message: "Missing provider",
                        },
                      ]}
                    >
                      <Select
                        placeholder="Select a provider"
                        onChange={(e) => {
                          setCounter((prev) => prev + 1);
                          setDetailsCounter((prev) => prev + 1);
                          // TODO: clear instance field
                        }}
                        allowClear
                      >
                        {providers.map((provider) => (
                          <Option key={provider} value={provider}>
                            {provider}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col lg={8}>
                    <Form.Item
                      {...restField}
                      name={[name, "instance"]}
                      rules={[
                        {
                          required: true,
                          message: "Missing instance",
                        },
                      ]}
                      key={counter}
                    >
                      <Select
                        placeholder="Select a instance"
                        onChange={() => {
                          setDetailsCounter((prev) => prev + 1);
                        }}
                        allowClear
                      >
                        {getInstances(name)?.map((instance) => (
                          <Option
                            key={instance.instance}
                            value={instance.instance}
                          >
                            {instance.instance}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col lg={3}>{getDetails(name)?.cpu}</Col>
                  <Col lg={4}>{getDetails(name)?.memory}</Col>
                  <Col lg={1}>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Col>
                </Row>
              </Space>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
                Add a hardware target
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </>
  );
};

export default HardwareTargets;
