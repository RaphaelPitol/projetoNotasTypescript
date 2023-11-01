import React, { ReactNode, useContext } from "react";
import { useNavigate } from "react-router-dom";
// import './index.css';
import { ThemeContext } from "../../context/authTheme";
import { useAuth } from "../../context/authUser";
import { Layout, Space, MenuProps, Menu} from "antd";
import { CarOutlined, HomeOutlined, LogoutOutlined } from "@ant-design/icons";
import { SelectorTheme } from "../SelectorTheme";

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
    getItem("Cadastrar", "newend", null),
    getItem("Listar", "listend", null),
  ]),
  getItem("Sair", "logout", <LogoutOutlined />),
];

export function LayoutHome({ children }: { children: ReactNode }) {
  const { theme } = useContext(ThemeContext);

  const navigate = useNavigate();

  const { signOut, user } = useAuth();

  const onClick: MenuProps["onClick"] = (e) => {
   
    if (e.key === "logout") {
      signOut();
      navigate("/")
    }
    if (e.key === "newcar") {
      navigate("/newcar");
    }
    if (e.key === "listcar") {
      navigate("/listcar");
    }
    if (e.key === "listend") {
      navigate("/listend");
    }
  };

  function home(){
    navigate("/")
  }

  return (
    <Space direction="vertical" style={{ width: "100%" }} size={[0, 48]}>
      <Layout>
        <Sider
          style={{
            background: theme === "light" ? "#e9e33bd3" : "black",
            textAlign: "center",
            lineHeight: "120px",
            minHeight: "100vh",
          }}
          // theme={theme}
          >
          <span onClick={home}
          style={{
            cursor: "pointer",
            fontSize: "1.5rem",
          }}
          >Project Training</span>
          <Menu
            onClick={onClick}
            style={{ width: 200,
              background: theme === "light" ?"#e9e33bd3" : "black",
            }}
            mode="vertical"
            items={items}
            theme={theme}
          />
        </Sider>
        <Layout>
          <Header
            style={{
              background: theme === "light" ? "#62a2d0" : "black",
              height: 80,
              paddingInline: 50,
              lineHeight: "64px",
              display:"flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 50
            }}
            >
              <h4>Ola {user?.name}</h4>
            <SelectorTheme />
          </Header>
          <Content style={{
            // background: theme === "light" ? "#3ba0e9" : "black",
          }}>{children}</Content>
          <Footer
            style={{
              background: theme === "light" ? "#7dbcea" : "black",
              textAlign: "center",
            }}
          >
            Footer
          </Footer>
        </Layout>
      </Layout>
    </Space>
  );
}
