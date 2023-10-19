import React from "react";

import { useState, useContext } from "react";

import { ThemeContext } from "../../context/auth";

import {
  Button,
  Checkbox,
  ConfigProvider,
  Form,
  Input,
  Radio,
  theme,
  Switch,
} from "antd";

import "./styles.css";

const onFinish = (values: FieldType) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

type FieldType = {
  username: string;
  password: string;
  remember: boolean;
};

export function Login() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div>
      <Switch onClick={toggleTheme}></Switch>
      <Form
        className="form"
        name="basic"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        style={{
          backgroundColor: theme === "light" ? "#f00" : "#ff0",
        }}
        autoComplete="off"
      >
        <div className="inputs">
          <Form.Item
            label="Username"
            name="username"
            rules={[
              { required: true, message: "Por favor informe o usuario!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Por favor insira a senha!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 8, span: 16 }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>

            <a href="">Criar conta!</a>
          </Form.Item>
        </div>
      </Form>
      {/* </ConfigProvider> */}
    </div>
  );
}
