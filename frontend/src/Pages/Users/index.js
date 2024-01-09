import { Alert, Avatar, Button, Form, List, Popconfirm, Radio, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import {DownloadOutlined } from '@ant-design/icons';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import { saveAs } from 'file-saver';
import './styleUser.css';

const positionOptions = ['top', 'bottom', 'both'];
const alignOptions = ['start', 'center', 'end'];

const App = ({}) => {
    const navigate = useNavigate();
    const [position, setPosition] = useState('bottom');
    const [align, setAlign] = useState('center');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [form] = Form.useForm(); 
    const [data, setData] = useState([]);
   

    const deleteCompany = async (id) => {
        
        const response = await axios.delete(`http://localhost:8000/api/bitrix/userDelete?id=${id}`,{
        headers: {Authorization: localStorage.getItem('TOKEN_TEST')}}
        );
        fetchData();
        const resp = await response;
        
        if(resp.error != undefined){
            setError(resp.error.message);
            setTimeout(() => {
              setError('');
              form.resetFields();
            }, 2000);
            navigate('/home');
        }else{
        setSuccess('Apagado com sucesso!');
        setTimeout(() => {
            setSuccess('');
            }, 2000);
            navigate('/home/Users');
        } 
    }

    const getID = async (id)=>{
        try{
            navigate(`/home/companyUpdate/${id}`);
        }catch(error){
            console.error('ERROR!', error);
            navigate('/');
        }
    }

    const reactiveUser = async (id)=>{
        const response = await axios.get(`http://localhost:8000/api/bitrix/userReactive?id=${id}`,{
            headers: {Authorization: localStorage.getItem('TOKEN_TEST')}});
            fetchData();

            const resp = await response;

            if(resp.error != undefined){
                setError(resp.error.message);
                setTimeout(() => {
                  setError('');
                  form.resetFields();
                }, 2000);
                navigate('/home/Users');
            }else{
            setSuccess('Ativado!');
            setTimeout(() => {
                setSuccess('');
                }, 2000);
                navigate('/home/Users');
            }
    }
    
        useEffect(() => {
            fetchData();
        }, []);
        const fetchData = async () => {
            const tolkienn = JSON.parse(localStorage.getItem('TOKEN_TEST'));
            const response = await axios.get('https://localhost:7178/User/getUsers',{
                headers: {Authorization: `Bearer ${tolkienn.value}`}}
            );
            setData(response.data);
            if(response.error != undefined){
                setError(response.error.message);
                setTimeout(() => {
                    setError('');
                    form.resetFields();
                }, 2000);
                navigate('/');
            }
        };

    const handleClickDelete = (id) => {
        deleteCompany(id);
    }
    const handleClickUpdate = (id) => {
        getID(id);
    }
    const handleClickReactive = (id) => {
        reactiveUser(id);
    }
    console.log(data)
    return (
        <> 
        {error && <Alert message={error} type="error" showIcon />}
        {success && <Alert message={success} type="success" showIcon />}
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
            title={item.sT_LOGIN} 
            description={'Tipo de usuário: '+ item.sT_ROLE}
            />
                <>
                    <Button type='primary' disabled={(item.status==false? true : false)} onClick={()=>handleClickUpdate(item.id)}>Update</Button>
                    <Button type='primary' disabled={(item.status==false? true : false)} danger onClick={()=>handleClickDelete(item.id)}>Inativar</Button>
                </>
            </List.Item>
            )}
            />
            </>
            );
        };
        export default App;