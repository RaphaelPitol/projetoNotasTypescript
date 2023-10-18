import React from "react";

import { Button, Checkbox, Form, Input } from "antd";

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

const Login: React.FC = () => (
  <Form
    className="form"
    name="basic"
    labelCol={{ span: 6 }}
    wrapperCol={{ span: 16 }}
    initialValues={{ remember: true }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <div className="inputs">
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: "Por favor informe o usuario!" }]}
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
);

export default Login;
