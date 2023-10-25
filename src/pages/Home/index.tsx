import React, { useContext } from "react";
import { ThemeContext } from "../../context/authTheme";
// import './index.css';
import { Layout, Space } from "antd";
import { SelectorTheme } from "../../componentes/SelectorTheme";

const { Header, Footer, Sider, Content } = Layout;

export function Home() {
  const { theme } = useContext(ThemeContext);

  return (
    <Space direction="vertical" style={{ width: "100%", height: "100%" }}>
      <Layout>
        <Sider
          style={{
            background: theme === "light" ? "#bae0ff" : "#001d66",
          }}
        >
          ola
        </Sider>
        <Layout>
          <Header
            style={{
              background: theme === "light" ? "#bfbfbf" : "#141414",
             
            }}
          >
            <SelectorTheme />
          </Header>
          <Content
            style={{
              background: theme === "light" ? "#f5f5f5" : "#434343",
              height: "75vh"
            }}
          >
            Content
          </Content>
          <Footer
            style={{
              background: theme === "light" ? "white" : "black",
            }}
          >
            Footer
          </Footer>
        </Layout>
      </Layout>
    </Space>
  );
}
