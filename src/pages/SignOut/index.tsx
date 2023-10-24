import { Link } from "react-router-dom";
import { SelectorTheme } from "../../componentes/SelectorTheme";

import "./styles.css";
import { Button, Form, Input, Space } from "antd";

const onFinish = (values: any) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

type FieldType = {
  username?: string;
  userEmail?: string;
  password?: string;
};

export function SignOut() {
  return (
    <div id="bod">
      <div className="mai">
        <h1>Bloco de Notas</h1>
        <Form
          className="form"
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 700 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <SelectorTheme />
          <div className="inputs">
            <Form.Item<FieldType>
              label="Nome"
              name="username"
              rules={[{ required: true, message: "Por favor insira o nome!" }]}
            >
              <Input placeholder="Nome" />
            </Form.Item>

            <Form.Item<FieldType>
              label="Email"
              name="userEmail"
              rules={[{ required: true, message: "Por favor insira o email!" }]}
            >
              <Input placeholder="user@email.com"/>
            </Form.Item>

            <Form.Item<FieldType>
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Por favor informe a senha!" },
              ]}
            >
              <Input.Password />
            </Form.Item>
          </div>
         
         <Space
         style={{
          padding: 10,
          marginLeft: "25%",
        }}
         >
            <Button type="primary" htmlType="submit">
              Gravar
            </Button>
            <Link to={'/'}>Ir para login</Link>

         </Space>
         
        </Form>
      </div>
    </div>
  );
}
