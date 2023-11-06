import React, { useState, useEffect, useContext, useCallback } from "react";

import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { ThemeContext } from "../../context/authTheme";
import { api } from "../../service/api";
import { LayoutHome } from "../../componentes/Layout";
import { Button, Form, Input, Select } from "antd";
import Swal from "sweetalert2";

type LayoutType = Parameters<typeof Form>[0]["layout"];

interface TypeValue {
  key: string;
  id: number;
  cep: string;
  nomeEnd: string;
  bairro: string;
  numero: number;
  cidade: string;
  estado: string;
  user_id: string;
  complemento: string;
}
interface User {
  name: string;
  id: number;
}

const ESTADOS = [
  "AC",
  "AL",
  "AP",
  "AM",
  "BA",
  "CE",
  "DF",
  "ES",
  "GO",
  "MA",
  "MT",
  "MS",
  "MG",
  "PA",
  "PB",
  "PR",
  "PE",
  "PI",
  "RJ",
  "RN",
  "RS",
  "RO",
  "RR",
  "SC",
  "SP",
  "SE",
  "TO",
];

export function NewEnd() {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const { id } = useParams();
  const [user, setUser] = useState([]);
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState<LayoutType>("horizontal");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const filteredOptions = ESTADOS.filter((o) => !selectedItems.includes(o));

  const createEnd = useCallback((value: TypeValue) => {
    console.log(value)
    async function create() {
      if (!id) {
        try {
          await api.post("/endereco", value);
          Swal.fire("Salvo com Sucesso!", "success");
          navigate("/listend");
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
        await api.put("/endereco", value);
        Swal.fire("Editado com Sucesso!", "success");
        navigate("/listend");
      }
    }
    create();
  }, []);

  const update = useCallback(() => {
    async function fetchData() {
      if (id) {
        try {
          const response = await api.get(`/endereco/id/id?id=${id}`);
          const endData = response.data;
          console.log(endData.cep);


          form.setFieldsValue({
            id: endData.id,
            nomeEnd: endData.nomeEnd,
            bairro: endData.bairro,
            numero: endData.numero,
            cidade: endData.cidade,
            estado: endData.estado,
            cep: endData.cep.toString(),
            complemento: endData.complemento,
            user_id: endData.user_id,
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
          paddingTop: 20
        }}
      >
        Cadostro de endereços
      </h1>
      <Form
        className="formCar"
        layout={formLayout}
        form={form}
        onFinish={createEnd}
        style={{ maxWidth: formLayout === "inline" ? "none" : 600 }}
      >
        <Form.Item<TypeValue> name="id"></Form.Item>
        <Form.Item<TypeValue>
          label="Cep"
          name="cep"
          rules={[{ required: true, message: "Por favor insira o cep!" }]}
        >
          <Input placeholder="Digite seu endereço"/>
        </Form.Item>
        <Form.Item<TypeValue>
          label="Endereço"
          name="nomeEnd"
          rules={[{ required: true, message: "Por favor insira o Endereço!" }]}
        >
          <Input placeholder="Digite seu endereço" />
        </Form.Item>
        <Form.Item<TypeValue>
          label="Bairro"
          name="bairro"
          rules={[{ required: true, message: "Por favor insira a bairro!" }]}
        >
          <Input placeholder="digite o bairro..." />
        </Form.Item>

        <Form.Item<TypeValue>
          label="Numero"
          name="numero"
          rules={[{ required: true, message: "Por favor insira a bairro!" }]}
        >
          <Input placeholder="digite o bairro..." />
        </Form.Item>
        <Form.Item<TypeValue>
          label="Cidade"
          name="cidade"
          rules={[{ required: true, message: "Por favor insira a cidade!" }]}
        >
          <Input placeholder="qual cidade?" />
        </Form.Item>
        <Form.Item
          label="Estado"
          name="estado"
          rules={[{ required: true, message: "Por favor insira o estado" }]}
        >
          <Select
            showSearch
            placeholder="insira o estado..."
            dropdownStyle={{
              background: theme === "light" ? "#e6edf1" : "black",
            }}
            value={selectedItems}
            onChange={setSelectedItems}
            style={{ width: "100%" }}
            options={filteredOptions.map((item) => ({
              value: item,
              label: item,
            }))}
          />
        </Form.Item>

        <Form.Item<TypeValue>
          label="Nome"
          name="user_id"
          wrapperCol={{ offset: 1, span: 20 }}
          rules={[{ required: true, message: "Por favor insira o estado!" }]}
        >
          <Select
            showSearch
            placeholder="Nome..."
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
        <Form.Item<TypeValue>
          label="Complemento"
          name="complemento"
          wrapperCol={{ offset: 1, span: 18 }}
        >
          <Input placeholder="Complemnto...." />
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
