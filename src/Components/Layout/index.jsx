import { HomeFilled, BarChartOutlined } from "@ant-design/icons";
import { Typography, Layout, Menu, Space } from "antd";
import OctomizePage from "Containers/OctomizePage";

const { Content, Sider } = Layout;

function getItem(key, icon) {
  return {
    key,
    icon,
  };
}

const { Title, Paragraph } = Typography;

const items = [
  getItem("1", <HomeFilled />),
  getItem("2", <BarChartOutlined />),
];

const BasicLayout = () => {
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider collapsed={true} theme="light">
        <div className="logo" />
        <Menu defaultSelectedKeys={["1"]} mode="inline" items={items} />
      </Sider>
      <Layout className="site-layout">
        <Content
          style={{
            margin: "0 auto",
            maxWidth: "1284px",
            width: "100%",
          }}
        >
          <div
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            <Space
              direction="vertical"
              size="large"
              style={{
                display: "flex",
              }}
            >
              <div>
                <Title style={{ marginBottom: 0 }} className="title-1">
                  Shufflenet-v2.onnx
                </Title>
                <Paragraph>Created three days ago by Mike Johnson</Paragraph>
              </div>
              <OctomizePage />
            </Space>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default BasicLayout;
