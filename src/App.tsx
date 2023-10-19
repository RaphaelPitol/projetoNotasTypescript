import React, { useContext } from "react";
import { Login } from "./pages/Login";
import { ThemeContextProvider, ThemeContext } from "./context/auth";

import { ConfigProvider } from "antd";

import "./index.css";

export function App() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const lightTheme = {
    colorPrimary: "green",
    colorTextBase: "balck",
    colorBgContainer: "white",
  };

  const darkTheme = {
    colorPrimary: "black",
    colorTextBase: "white",
    colorBgContainer: "black",
  };
  return (
    <ConfigProvider
      theme={{
        token: theme === "light" ? lightTheme : darkTheme,
      }}
    >
      <Login />
    </ConfigProvider>
  );
}

export default App;
