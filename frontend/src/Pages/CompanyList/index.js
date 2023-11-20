import { Avatar, Button, List, Popconfirm, Radio, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import {DownloadOutlined } from '@ant-design/icons';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import { saveAs } from 'file-saver';


const positionOptions = ['top', 'bottom', 'both'];
const alignOptions = ['start', 'center', 'end'];

const url ='https://b24-q0ahqa.bitrix24.com.br/crm/leads/details/';
const App = ({}) => {
    const navigate = useNavigate();
    const [position, setPosition] = useState('bottom');
    const [align, setAlign] = useState('center');  
    const [data, setData] = useState([]);

   

    const deleteCompany = async (id) => {
        try{
            await axios.delete(`http://localhost:8000/api/bitrix/companyDelete?id=${id}`,{
            headers: {Authorization: localStorage.getItem('TOKEN_TEST')}}
            );
            fetchData();
        }catch(error){
            console.error('ERRO!',error);
        }
    }

    const getID = async (id)=>{
        try{
            navigate(`/home/companyUpdate/${id}`);
        }catch(error){
            console.error('ERROR!', error);
        }
    }
    
        useEffect(() => {
            fetchData();
        }, []);
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/bitrix/companyList',{
                    headers: {Authorization: localStorage.getItem('TOKEN_TEST')}}
                );
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

    const handleClickDelete = (id) => {
        deleteCompany(id);
    }
    const handleClickUpdate = (id) => {
        getID(id);
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
            description={'CNPJ: '+item.UF_CRM_1698435704849}
            />
                <Button type='primary' onClick={()=>handleClickUpdate(item.ID)}>Update</Button>
                <Button type='primary' danger onClick={()=>handleClickDelete(item.ID)}>Delete</Button>
            </List.Item>
            )}
            />
            </>
            );
        };
        export default App;