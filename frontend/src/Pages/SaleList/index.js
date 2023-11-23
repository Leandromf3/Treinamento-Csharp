import { Avatar, Button, List, Modal, Popconfirm, Radio, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

const apihost = 'https://localhost:7178/Sale';


const url ='http://localhost:3000/home/saleExtract/';
const App = ({}) => {
    const navigate = useNavigate();
    const [position, setPosition] = useState('bottom');
    const [align, setAlign] = useState('center');  
    const [selectedItem, setSelectedItem] = useState([]);
    const [data, setData] = useState([]);
    const tolkien = JSON.parse(localStorage.getItem('TOKEN_TEST'));
    const [isModalOpen, setIsModalOpen] = useState(false);

        const showModal = (item) => {
            setSelectedItem(item);
            setIsModalOpen(true);
        };
        const handleOk = () => {
            setIsModalOpen(false);
        };
        const handleCancel = () => {
            setIsModalOpen(false);
        };
        const handleObs = (e)=>{
            if(e.obs ==''){
                return 'Não há observações'
            }
            else{
                return e.obs;
            }
        }

    
        useEffect(() => {
            fetchData();
        }, []);
        const fetchData = async () => {
            try {
                const response = await axios.get(apihost + '/getSale',{
                    headers:{Authorization: 'Bearer '+ tolkien.value}
                });
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

    
    const handleDate = (e) => {
        let datavenda = new Date(e.dataVenda);
        let dataFormatada = datavenda.toLocaleDateString('pt-BR');
        return dataFormatada;    
    }
    return (
        <>
        <Space
        direction="vertical"
        style={{
            marginBottom: '20px',
        }}
        size="middle"
        >
        </Space>
        
        <List
        pagination={{
            position,
            align,
        }}
        dataSource={data}
        
        renderItem={(item) => (
            <List.Item>
            <List.Item.Meta
            title={<a onClick={()=>showModal(item)} >{item.vendedor}</a>}
            description={'Data do pagamento: '+handleDate(item) }
            />
            <Modal title={"Extrato venda: "+selectedItem.cod} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <p>Nome do vendedor: {selectedItem.vendedor}</p>
                <p>Código da venda: {selectedItem.cod} </p>
                <p>Data da venda: {handleDate(selectedItem)}</p>
                <strong>Endereço</strong>
                <p>Estado: {selectedItem.estado}</p>
                <p>Cidade: {selectedItem.cidade}</p>
                <p>Rua: {selectedItem.rua}</p>
                <p>Observação: {handleObs(selectedItem)}</p>
                <strong>Valor: R$ {selectedItem.price}</strong>
            </Modal>
            </List.Item>
            )}
            />
            </>
            );
        };
        export default App;