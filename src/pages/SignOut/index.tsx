import { Link, useNavigate } from "react-router-dom";
import { SelectorTheme } from "../../componentes/SelectorTheme";
import Swal from 'sweetalert2'

import { api } from "../../service/api";

import "./styles.css";
import { Button, Form, Input, Space } from "antd";
import { useCallback } from "react";



const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

type FieldType = {
  name?: string;
  email?: string;
  password?: string;
};

export function SignOut() {

  const navigate = useNavigate()


  const creat = useCallback((value: FieldType)=>{
      async function creatUser() {
        api.post('/users', value)
        .then(() => {
          Swal.fire(
            'Cadastrado com Sucesso!',
            'success'
          )
          navigate("/");
        })
        .catch(error => {
          if (error.response) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: (error.response.data.message)
            })
          } else {
            alert("Não foi possivel Cadastrar!")
          }
        })
      }
      creatUser()
  },[])
  

  
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
          onFinish={creat}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <SelectorTheme />
          <div className="inputs">
            <Form.Item<FieldType>
              label="Nome"
              name="name"
              rules={[{ required: true, message: "Por favor insira o nome!" }]}
            >
              <Input placeholder="Nome" />
            </Form.Item>

            <Form.Item<FieldType>
              label="Email"
              name="email"
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
