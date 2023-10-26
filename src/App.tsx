import { useContext, useEffect } from "react";

import { ThemeContext } from "./context/authTheme";

import { AuthProvider } from "./context/authUser";

import { ConfigProvider } from "antd";

import "./index.css";
import { Router } from "./routes";

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
        components: {
          Button: {
            colorPrimary: theme === "light" ? "#74099b" : "#274653",
          },
        },
      }}
    >
      <AuthProvider>
        <Router />
      </AuthProvider>
    </ConfigProvider>
  );
}

export default App;
