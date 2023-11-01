import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../service/api';
import Swal from 'sweetalert2'


import { LayoutHome } from '../../componentes/Layout';
import { Space, Table} from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface DataType {
  key: string;
  name: string;
  ano: number;
  marca: string;
  user: string;
  id: number
}


export function ListCar(){

  
const columns: ColumnsType<DataType> = [

  {
    title: 'Name',
    dataIndex: 'nome',
    key: 'nome',
  },
  {
    title: 'Marca',
    dataIndex: 'marca',
    key: 'marca',
  },
  {
    title: 'Ano ',
    dataIndex: 'ano_fabricacao',
    key: 'ano_fabricacao',
  },
  {
    title: 'Priprietario',
    key: 'name',
    dataIndex: 'name',
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record: DataType) => (
      <Space size="middle">
        <a onClick={()=>newCar(record.id)}>Editar</a>
        <a onClick={() => delet(record.id)}>Delete</a>
      </Space>
    )
  },
];
  
const navigate = useNavigate()
const [car, setCars] = useState<DataType[]|undefined>()

function newCar(carId: number){
  console.log(carId)
  navigate(`/newcar/${carId}`)
}
  
  const delet = useCallback((carId: number)=>{
    
    async function handleRemoveCar() {
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
              await api.delete(`/cars/${carId}`);
              listCars();
          }
      });

     listCars()
  }
  handleRemoveCar()
  },[])
     

     const listCars = useCallback(() => {
          async function request() {
              const response = await api.get('/cars');
              setCars(response.data);
          }
  
          request()
  
      }, [])
  
      useEffect(() => {
          listCars()
      }, [])

     return(
      <LayoutHome>
        <h1
        style={{
          fontFamily: "sans-serif",
          textAlign: "center",
          fontSize: "3rem"
        }}
        >Lista de Carros</h1>
        <Table columns={columns} dataSource={car}
        style={{
          margin: "4rem"
        }}
        />
      </LayoutHome>
     )
}