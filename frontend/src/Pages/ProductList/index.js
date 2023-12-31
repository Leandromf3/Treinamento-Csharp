import { Avatar, Button, List, Popconfirm, Radio, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import {DownloadOutlined } from '@ant-design/icons';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import { saveAs } from 'file-saver';


const positionOptions = ['top', 'bottom', 'both'];
const alignOptions = ['start', 'center', 'end'];

const App = ({}) => {
    const navigate = useNavigate();
    const [position, setPosition] = useState('bottom');
    const [align, setAlign] = useState('center');  
    const [data, setData] = useState([]);
    const tolkienn = JSON.parse(localStorage.getItem('TOKEN_TEST'));

   

    const deleteCompany = async (id) => {
        try{
            await axios.delete(`http://localhost:8000/api/bitrix/companyDelete?id=${id}`,{
            headers: {Authorization: 'Bearer '+ tolkienn.value}}
            );
            fetchData();
        }catch(error){
            console.error('ERRO!',error);
        }
    }

    const getID = async (id)=>{
        try{
            navigate(`/home/productUpdate/${id}`);
        }catch(error){
            console.error('ERROR!', error);
        }
    }
    
        useEffect(() => {
            fetchData();
        }, []);
        const fetchData = async () => {
            try {
                const response = await axios.get('https://localhost:7178/Product/getProduct',{
                    headers: {Authorization:'Bearer '+ tolkienn.value}}
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
console.log(data)
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
            title={<a href={item.productCode+'/'}>{item.productName}</a>}
            description={'Preço: R$ '+item.productPrice }
            />
                <Button type='primary' onClick={()=>handleClickUpdate(item.id)}>Update</Button>
                <Button type='primary' danger onClick={()=>handleClickDelete(item.id)}>Delete</Button>
            </List.Item>
            )}
            />
            </>
            );
        };
        export default App;