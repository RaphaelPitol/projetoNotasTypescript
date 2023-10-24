
import { Link } from "react-router-dom";

import { useContext, useState, useCallback } from "react";

import { ThemeContext } from "../../context/authTheme"

import {SelectorTheme} from '../../componentes/SelectorTheme'

import {useAuth} from './../../context/authUser'

import {
  Button,
  Checkbox,
  Form,
  Input,
  Space,
} from "antd";

import "./styles.css";




const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

type FieldType = {
  username: string;
  password: string;
  remember: boolean;
};

export function Signin() {
  const {theme} = useContext(ThemeContext);

  const[user, setUser] = useState({})

  const{ signin }= useAuth()
  
  function handleSignin(){
      signin({email: user.username, password:user.password})
  }
  const onFinish = useCallback((values: FieldType) => {
    function login(){
      setUser(values)
    }
    login()
  },[]);

  return (
    <div id="body">
    <div
      className="main"
     
    >
      <h1
     style={{
      textAlign: "center",
      fontSize: "3.5rem",
      marginLeft: "-4%",
     }} 
      >Bloco de Notas</h1>
      <Form
        className="form"
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        style={{
          backgroundColor: theme === "light" ? "#6a6475" : "#5b5b56",
        }}
        
        autoComplete="off"
        >
          <SelectorTheme/>
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
          </Form.Item>

          
            <Space
            style={{
              padding: 20,
              marginLeft: "15%"
            }}
            >
              <Button type="primary" htmlType="submit" onClick={handleSignin}>
                Entrar
              </Button>
             <Link to={'/register'}>Criar Conta</Link>
            </Space>
         
         
        </div>
      </Form>
      </div>
    </div>
  );
}
