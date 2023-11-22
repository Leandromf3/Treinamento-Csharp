import { Avatar, Button, List, Popconfirm, Radio, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

const apihost = 'https://localhost:7178/Sale';

const positionOptions = ['top', 'bottom', 'both'];
const alignOptions = ['start', 'center', 'end'];

const url ='https://b24-q0ahqa.bitrix24.com.br/crm/deal/details/';
const App = ({}) => {
    const navigate = useNavigate();
    const [position, setPosition] = useState('bottom');
    const [align, setAlign] = useState('center');  
    const [data, setData] = useState([]);
    const tolkien = JSON.parse(localStorage.getItem('TOKEN_TEST'));

    const getID = async (id)=>{
    try{
        navigate(`/home/dealUpdate/${id}`);
    }catch(error){
        console.error('ERROR!', error);
    }
    }

    const deleteDeal = async(id)=>{
        try{
            await axios.delete(`http://localhost:8000/api/bitrix/dealDelete?id=${id}`,{
                headers:{Authorization: 'Bearer '+ tolkien.value}
            });
            fetchData();
        }catch(error){
            console.error('ERRO!',error);
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

    const handleClickGetId = (id) => {
        getID(id);
    }
    const handleClickDelete = (id) => {
        deleteDeal(id);
    }
    
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
            title={<a href={url+item.ID+'/'}>{item.vendedor}</a>}
            description={handleDate(item)}
            />

            </List.Item>
            )}
            />
            </>
            );
        };
        export default App;