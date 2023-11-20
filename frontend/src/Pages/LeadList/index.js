import { Button,  List, Radio, Space } from 'antd';
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
    const [selectionMode, setSelectionMode] = useState('both');

    var requestOptions = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem(`hering__token`)}`,
          ContentType: "application/json",
        },
        redirect: "follow",
      };
   

    const getID = async (id)=>{
    try{
        navigate(`/home/leadUpdate/${id}`);
    }catch(error){
        console.error('ERROR!', error);
    }
    } 
    
    const consultPDF = async (select) => {
        try {
            const response = await axios.get(`http://localhost:8000/api/bitrix/leadConsultPdf?content=${select}`,{
                responseType: 'blob'
            },{
                headers: {Authorization: localStorage.getItem('TOKEN_TEST')}});
            const blob = new Blob([response.data],{type: 'application/octet-stream'});
            saveAs(blob, 'lead.pdf');
        } catch (error) {
            console.error('Erro ao consultar o PDF:', error);
        }
    };

    const consultExcel = async (select)=>{
        try {
            const response = await axios.get(`http://localhost:8000/api/bitrix/leadConsultExcel?content=${select}`,{
                responseType:'blob'
            },{
                headers: {Authorization: localStorage.getItem('TOKEN_TEST')}});
            const blob = new Blob([response.data],{type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
            saveAs(blob, 'lead.xlsx');
        } catch (error) {
            console.error("erro",error);
        }
    }

    const deleteDeal = async(id)=>{
        try{
            await axios.delete(`http://localhost:8000/api/bitrix/leadDelete?id=${id}`,{
                headers: {Authorization: localStorage.getItem('TOKEN_TEST')}});
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
                const response = await axios.get('http://localhost:8000/api/bitrix/leadList',{
                    headers: {Authorization: localStorage.getItem('TOKEN_TEST')}});
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
    const handleClickConsultPDF = (value)=>{
        consultPDF(value);
    }
    const handleClickConsultExcel = (value)=>{
        consultExcel(value);
    }

    return (
        <> 
        <Space
        direction="vertical"
        style={{
            marginBottom: '20px',
        }}
        size="middle"
        > <Radio.Group onChange={(e)=> setSelectionMode(e.target.value)} value={selectionMode}>
      <Radio value={'true'}>Todos com arquivos</Radio>
      <Radio value={'false'}>Todos sem arquivos</Radio>
      <Radio value={'both'}>Todos</Radio>
    </Radio.Group>
       <Button type="dashed" icon={<DownloadOutlined/>}  onClick={() => handleClickConsultPDF(selectionMode)}>Dowload lead PDF </Button>
       <Button type="dashed" icon={<DownloadOutlined/>}  onClick={() => handleClickConsultExcel(selectionMode)}>Dowload lead excel </Button>
       
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
            description={item.NAME}/>
                <Button type='primary' onClick={()=>handleClickGetId(item.ID)}>Update</Button>
                <Button type='primary' danger onClick={()=>handleClickDelete(item.ID)} >Delete</Button>
            </List.Item>
            )}
            />
            </>
            );
        };
        export default App;