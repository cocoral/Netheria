import { Card, Button, Row, Col, Typography } from "antd";

const { Paragraph, Title } = Typography;

function TotalPanel({
  onSubmit,
  form,
  detailsCounter,
  hardwareTargets = [],
  hasTask,
}) {
  const selectedTargets = form
    ?.getFieldValue("hardware_targets")
    ?.filter((hardware) => hardware?.provider && hardware?.instance)
    ?.map((hardware) => ({
      ...hardware,
      ...hardwareTargets?.find(
        (item) =>
          item?.provider === hardware?.provider &&
          item?.instance === hardware?.instance,
      ),
    }));

  return (
    <Card>
      <div style={{ textAlign: "right" }}>
        <Paragraph strong>Total Runs</Paragraph>
        <Title level={3} className="mt-0">
          {selectedTargets?.length || 0}
        </Title>
      </div>
      {selectedTargets?.map(({ provider, instance, cpu }) => (
        <Row key={`${provider}-${instance}`}>
          <Col span={22}>
            <Paragraph strong className="mb-0">
              {instance}
            </Paragraph>
            <Paragraph type="secondary">{cpu} cores</Paragraph>
          </Col>
          <Col span={2} style={{ textAlign: "right" }}>
            {1}
          </Col>
        </Row>
      ))}
      <Button
        type="primary"
        block
        onClick={onSubmit}
        size="large"
        disabled={!selectedTargets?.length || !hasTask}
      >
        Octomize
      </Button>
    </Card>
  );
}
export default TotalPanel;
