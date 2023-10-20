import React, { useContext } from "react";
import { Login } from "./pages/Login";
import { ThemeContextProvider, ThemeContext } from "./context/auth";

import { ConfigProvider } from "antd";

import "./index.css";

export function App() {
  const { theme } = useContext(ThemeContext);

  const lightTheme = {
    colorPrimary: "green",
    colorTextBase: "balck",
    colorBgContainer: "white",
  };

  const darkTheme = {
    colorPrimary: "black",
    colorTextBase: "white",
    colorBgContainer: "#190513",
  };
  return (
    <ConfigProvider
      theme={{
        token: theme === "light" ? lightTheme : darkTheme,
        components:{
          Button:{
            colorPrimary: theme === "light" ? "#74099b" : "#274653"
          }
        }
      }}
    >
      <Login />
    </ConfigProvider>
  );
}

export default App;
