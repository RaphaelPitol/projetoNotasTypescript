import { LayoutHome } from "../../componentes/Layout";

import React, { useState, useEffect, useContext, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import { api } from "../../service/api";
import { ThemeContext } from "../../context/authTheme";
import "./styles.css";

import { Button, Form, Input, Select } from "antd";
import Swal from "sweetalert2";

type LayoutType = Parameters<typeof Form>[0]["layout"];

interface TypeValue {
  id: number;
  nome: string;
  marca: string;
  ano_fabricacao: string;
  user_id: number;
}

interface User {
  name: string;
  id: number;
}

export function NewCar() {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const { id } = useParams();
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState<LayoutType>("horizontal");

  const [user, setUser] = useState([]);
  

  const createCar = useCallback((value: TypeValue) => {
    async function createCar() {
      if (!id) {
        try {
          await api.post("/cars", value);
          Swal.fire("Salvo com Sucesso!", "success");
          navigate("/listcar");
        } catch (error: any) {
          if (error.response) {
            alert("Erro do servidor:");
          } else if (error.request) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Servidor não respondeu!",
              footer: '<a href="">Tente mais tarde!</a>',
            });
          }
        }
      }

      if (id) {
        await api.put("/cars", value);
        Swal.fire("Editado com Sucesso!", "success");
        navigate("/listcar");
      }
    }
    createCar();
  }, []);

  const update = useCallback(() => {
    async function fetchData() {
      if (id) {
        try {
          const response = await api.get(`/cars/${id}`);
          const carData = response.data;

          form.setFieldsValue({
            id: carData.id,
            nome: carData.nome,
            marca: carData.marca,
            ano_fabricacao: carData.ano_fabricacao,
            user_id: carData.user_id,
          });
        } catch (error) {
          Swal.fire("error");
        }
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    async function listUsers() {
      const response = await api.get("/users");
      setUser(response.data);
      if (id) update();
    }
    listUsers();
  }, []);

  return (
    <LayoutHome>
      <h1
        style={{
          textAlign: "center",
          fontFamily: "sans-serif",
          fontSize: "3rem",
          paddingTop: 50,
        }}
      >
        Cadostro de Carros
      </h1>
      <Form
        className="formCar"
        layout={formLayout}
        form={form}
        onFinish={createCar}
        style={{ maxWidth: formLayout === "inline" ? "none" : 600 }}
      >
        <Form.Item<TypeValue> name="id"></Form.Item>
        <Form.Item<TypeValue>
          label="Nome do Carango"
          name="nome"
          rules={[{ required: true, message: "Por favor insira o nome!" }]}
        >
          <Input placeholder="Nome do Carango" />
        </Form.Item>
        <Form.Item<TypeValue>
          label="Marca do Carango"
          name="marca"
          rules={[{ required: true, message: "Por favor insira a marca!" }]}
        >
          <Input placeholder="Marca do Carango" />
        </Form.Item>
        <Form.Item<TypeValue>
          label=" Data de Fabricação"
          name="ano_fabricacao"
          rules={[{ required: true, message: "Por favor insira o ano!" }]}
        >
          <Input placeholder="Data de Fabricação" type="date" />
        </Form.Item>
        <Form.Item<TypeValue>
          label="Proprietario"
          name="user_id"
          wrapperCol={{ offset: 2, span: 18 }}
          rules={[
            { required: true, message: "Por favor insira o proprietario!" },
          ]}
        >
          <Select
            showSearch
            placeholder="Selecione o proprietario..."
            optionFilterProp="children"
            dropdownStyle={{
              background: theme === "light" ? "#e6edf1" : "black",
            }}
            filterOption={(inputValue: string, option?: User) =>
              (option?.name ?? "").toLowerCase().includes(inputValue)
            }
            fieldNames={{ label: "name", value: "id" }}
            options={user}
          />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 9, span: 10 }}>
          <Button type="primary" htmlType="submit" block>
            Gravar
          </Button>
        </Form.Item>
      </Form>
    </LayoutHome>
  );
}
