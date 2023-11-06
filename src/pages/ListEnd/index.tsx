import { LayoutHome } from "../../componentes/Layout";

import { useNavigate } from "react-router-dom";

import Swal from 'sweetalert2'

import { Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useState, useCallback, useEffect } from "react";

import { api } from "../../service/api";

interface DataType {
  key: string;
  nomeEnd: string;
  bairro: number;
  cidade: string;
  name: string;
  estado: string;
  cep: string;
  id: number;
}

export function ListEnd() {

    const navigate = useNavigate()

     const[end, setEnd] = useState()
  const columns: ColumnsType<DataType> = [
    {
      title: "Endereço",
      dataIndex: "nomeEnd",
      key: "nomeEnd",
    },
    {
      title: "Bairro",
      dataIndex: "bairro",
      key: "bairro",
    },
    {
      title: "Cidade ",
      dataIndex: "cidade",
      key: "cidade",
    },
    {
      title: "Numero",
      key: "numero",
      dataIndex: "numero",
    },
    {
      title: "Complemento",
      key: "complemento",
      dataIndex: "complemento",
    },
    {
      title: "Cep",
      key: "cep",
      dataIndex:"cep",
      render: (cep: string) => addMascaraCep(cep),
    },
    {
      title: "Estado",
      key: "estado",
      dataIndex: "estado",
    },
    {
      title: "Cidade",
      key: "cidade",
      dataIndex: "cidade",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record: DataType) => (
        <Space size="middle">
          <a onClick={() => newEnd(record.id)}>Editar</a>
          <a onClick={() => delet(record.id)}>Delete</a>
        </Space>
      ),
    },
  ];

  function newEnd(id: number){
     navigate(`/newend/${id}`)
  }

  function addMascaraCep(cep:string) {
     const cepString = String(cep);
 
     return (
         cepString.slice(0, 2) +
         "." +
         cepString.slice(2, 5) +
         "-" +
         cepString.slice(5)
     );
 }

  const delet = useCallback((id: number) => {
     function removEnd() {
         Swal.fire({
             text: "Você realmente deseja Excluir?",
             icon: 'warning',
             showCancelButton: true,
             confirmButtonColor: '#3085d6',
             cancelButtonColor: '#d33',
             confirmButtonText: 'Sim!',
             cancelButtonText: 'Não'
         }).then(async (result) => {
             if (result.isConfirmed) {
                 await api.delete(`/endereco/${id}`);
                 listEdn();
             }
         });
     }
     removEnd();
 }, []);


  const listEdn = useCallback(() => {
       async function request() {
            let nomeEnd = '', bairro = '', numero = '', cidade = '', cep = '', estado = '', nome = ''
            const response = await api.get(
                 `/endereco/lista/page?nomeEnd=${nomeEnd}&bairro=${bairro}&numero=${numero}&cidade=${cidade}&cep=${cep}&estado=${estado}&name=${nome}`
                 )
                 console.log(response)
         setEnd(response.data.list);
     }

     request()

 }, [])

 useEffect(()=>{
     listEdn()
 },[])

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
        Lista de Endereços
      </h1>

      <Table
        columns={columns}
        dataSource={end}
        style={{
          margin: "4rem",
        }}
      />
    </LayoutHome>
  );
}
