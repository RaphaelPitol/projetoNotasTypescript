import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../context/authTheme";
import { useAuth } from "./../../context/authUser";
// import './index.css';
import { Layout, Menu, Space } from "antd";
import type { MenuProps } from "antd";
import { CarOutlined, HomeOutlined, LogoutOutlined } from "@ant-design/icons";
import { SelectorTheme } from "../../componentes/SelectorTheme";

const { Header, Footer, Sider, Content } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Carros", "sub1", <CarOutlined />, [
    getItem("Cadastrar", "newcar", null),
    getItem("Listar", "listcar", null),
  ]),

  getItem("Endereço", "sub2", <HomeOutlined />, [
    getItem("Cadastrar", null, null),
    getItem("Listar", null, null),
  ]),
  getItem("Sair", "logout", <LogoutOutlined />),
];

export function Home() {
  const { theme } = useContext(ThemeContext);

  const navigate = useNavigate();

  const { signOut, user } = useAuth();

  const onClick: MenuProps["onClick"] = (e) => {
   
    if (e.key === "logout") {
      signOut();
    }
    if (e.key === "newcar") {
      navigate("/newcar");
    }
    if (e.key === "listcar") {
      navigate("/listcar");
    }
  };

  return (
    <Space direction="vertical" style={{ width: "100vw" }}>
      <Layout>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={(broken) => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
          theme={theme}
        >
          <Menu
            onClick={onClick}
            style={{ width: 200 }}
            mode="vertical"
            items={items}
            theme={theme}
          />
        </Sider>
        <Layout>
          <Header
            style={{
              background: theme === "light" ? "#bfbfbf" : "#141414",
              height: 80,
            }}
          >
            <h4>Bem vindo {user?.name}</h4>
            <SelectorTheme />
          </Header>

          <Content
            style={{
              background: theme === "light" ? "#f5f5f5" : "#434343",
              height: "70vh",
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
