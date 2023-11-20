import { Alert, Button, Form, Input, InputNumber, Radio, Select } from "antd";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useForm } from "antd/es/form/Form";

const ApiHost = 'http://127.0.0.1:8000/api/bitrix';

export default function Body() {
  const navigate = useNavigate();
  const [contactOptions, setContactOptions] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [form] = useForm();
  const [dataUpdate, setDataUpdate] = useState({id: '',
  title: '',
  name: '',
  contact: '',
  price: '',});
  const [formData, setFormData] = useState({
  id: '',
  title: '',
  name: '',
  contact: '',
  price: '',
  } 
  );
  const params = useParams();

  useEffect(() => {
    const fetchContact = async () =>{
      try {
        const resContact = await fetch(ApiHost + '/contactList',{
          headers: {Authorization: localStorage.getItem('TOKEN_TEST')}});
        const data = await resContact.json();
        const optionsContact = data.map(contact=>({value:contact.ID, label: contact.NAME +" "+ contact.SECOND_NAME}))
        setContactOptions(optionsContact)      
      } catch (error) {
        console.error('erro',error)
      }
    }
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/bitrix/leadGet?id=${params.id}`,{
          headers: {Authorization: localStorage.getItem('TOKEN_TEST')}});
        setDataUpdate(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
    fetchContact();  
      }, []);


useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      id: params.id,
      title: dataUpdate.TITLE || '',
      name: dataUpdate.NAME || '',
      contact: dataUpdate.CONTACT_ID || '',
      price:dataUpdate.OPPORTUNITY || '',
    }));
  }, [dataUpdate]);
  

  const dealUpdate = async (data) => {
    const res = await fetch(ApiHost + '/leadUpdate', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('TOKEN_TEST')
      },
      body: JSON.stringify(data) 
     }
      );
      if(res.error != undefined){
        setError(res.error.message);
        setTimeout(()=>{
          setError('');
          form.resetFields();
        }, 2000);
        navigate('/home');
      }else{
        setSuccess('Lead atualizado com sucesso!');
        setTimeout(() => {
          navigate(`/home`);
         }, 2000);
      }
  };

  const handleTitleInputChange = (e) => {
    const {value} = e.target;
    setFormData((prevData)=>({
      ...prevData,
      title: value
    }));
  }
  
  const handleNameInputChange = (e) => {
    const {value} = e.target;
    setFormData((prevData)=>({
      ...prevData,
      name: value
    }));
  }
  
  const handleValueInputChange = (value) => {
    setFormData((prevData)=>({
      ...prevData,
      price: value
    }));
  }

  const handleContactInputChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      contact: value
    }))
  }
 

  const handleCardClick = () => {
    const data = {
      ...formData,
      informationData: dataUpdate
    };
    dealUpdate(data);
  };
  

  return (
      <Form onFinish={handleCardClick} >
      {error && <Alert message={error} type="error" showIcon />}
      {success && <Alert message={success} type="success" showIcon />}

      <span className="title-Content">ATUALIZAR LEAD</span>

      <Form.Item label='Titulo' required rules={[{required:true,
        message:'Insira o titulo'}]}>
      <Input value={formData.title} name="title" onChange={handleTitleInputChange} />
      </Form.Item>

      <Form.Item label='Nome' required rules={[{required:true, 
        message:'Insira o nome'}]}>
      <Input value={formData.name} name="name" onChange={handleNameInputChange} />
      </Form.Item>

      <Form.Item label='Contato' required rules={[{required:true, 
        message:'Selecione o contato'}]}>
      <Select
    value={formData.contact}
    style={{ width: 180 }}
    onChange={handleContactInputChange}
    options = {contactOptions}
    />
      </Form.Item>    

      <Form.Item label='Valor' required rules={[{required:true, 
        message:'Insira um valor'}]}>
      <InputNumber value={formData.price} 
      formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
      parser={(value) => value.replace(/\$\s?|(,*)/g, '')} name="price" onChange={handleValueInputChange} /> <strong>R$</strong>
    </Form.Item >
  
      <Button htmlType="submit" type="primary">Atualizar</Button>
      
      </Form>
      );
  }
