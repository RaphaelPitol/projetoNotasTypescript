import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { ThemeContext } from "../../context/authTheme";
import { SelectorTheme } from '../../componentes/SelectorTheme';
import { useAuth } from './../../context/authUser';
import {
  Button,
  Checkbox,
  Form,
  Input,
  Space,
} from "antd";
import "./styles.css";

type FieldType = {
  username: string;
  password: string;
  remember: boolean;
};

export function Signin() {
  const { theme } = useContext(ThemeContext);
  const { signin } = useAuth();

  const navigate = useNavigate()

  const onFinish = (values: FieldType) => {
    
    signin({ email: values.username, password: values.password });
  };

  function createUser (){
    navigate("/register")
  }
  

  return (
    

    <div id="body">
      <div className="main">
        <h1 style={{
          textAlign: "center",
          fontSize: "3.5rem",
          paddingTop: "2rem",
          marginLeft: "-2rem",
        }}>Treinamento</h1>
        <Form
          className="form"
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
          >
          <div className="theme">
          <SelectorTheme />

          </div>
          <div className="inputs">
            <Form.Item
              label="Username"
              name="username"
              rules={[
                { required: true, message: "Por favor informe o usuario!" },
              ]}
              >
              <Input type="email" placeholder="user@email.com" />
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
            <Button type="link" onClick={createUser}>Criar Conta</Button>
            </Form.Item>

             

           <Form.Item
                wrapperCol={{ offset: 4 }}>
              <Button type="primary" htmlType="submit" block>
                Entrar
              </Button>
           </Form.Item>
           

          
              
          </div>
        </Form>
      </div>
    </div>
  );
}
