import { Avatar, Button, List, Popconfirm, Radio, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';


const positionOptions = ['top', 'bottom', 'both'];
const alignOptions = ['start', 'center', 'end'];

const url ='https://b24-q0ahqa.bitrix24.com.br/crm/deal/details/';
const App = ({}) => {
    const navigate = useNavigate();
    const [position, setPosition] = useState('bottom');
    const [align, setAlign] = useState('center');  
    const [data, setData] = useState([]);


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
                headers:{Authorization: localStorage.getItem('TOKEN_TEST')}
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
                const response = await axios.get('http://localhost:8000/api/bitrix/dealList',{
                    headers:{Authorization: localStorage.getItem('TOKEN_TEST')}
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
            title={<a href={url+item.ID+'/'}>{item.TITLE}</a>}
            description={item.UF_CRM_1698435318631}
            />
                <Button type='primary' onClick={()=>handleClickGetId(item.ID)}>Update</Button>
                <Button type='primary' danger onClick={()=>handleClickDelete(item.ID)} >Delete</Button>
            </List.Item>
            )}
            />
            </>
            );
        };
        export default App;