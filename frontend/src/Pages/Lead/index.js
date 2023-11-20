import { Alert, Button, Form, Input, InputNumber,  Select, Upload } from "antd";
import { useEffect, useState } from "react";
import { UploadOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import './style.css';

const ApiHost ='http://127.0.0.1:8000/api/bitrix';


export default function Body(){
    const navigate = useNavigate(); 
    const [titleInput, setTitleInput ] = useState('');
    const [NameInput, setNameInput] = useState('');
    const [ContactInput, setContactInput] = useState(null);
    const [priceInput, setPriceInput] = useState('');
    const [contactOptions, setContactOptions] = useState([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [form] = Form.useForm();
   
    
    const data = {
        title:titleInput,
        Name:NameInput,
        contact:ContactInput,
        price:priceInput,
    };
    
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
    fetchContact();
    }, []);

    const lead = async (data)=>{
        const response = await fetch(ApiHost+'/leadCreate',{
            method:'POST',
            body: data,
            headers:{
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('TOKEN_TEST')
            },
            body: JSON.stringify(data)
        }) 
        const resp = await response.json();
        if(resp == 'ERRO'){
          setError('Ocorreu um erro, verifique as informações colocadas');
          setTimeout(() => {
            setError('');
            form.resetFields();
          }, 2000);
          
          navigate('/home/leadCreate');
        }else{
         setSuccess('Cadastro efetuado com sucesso!');
         setTimeout(() => {
          navigate('/home/leadList');
         }, 2000);
          
        }
    }
    
    
    const handleTitleInputChange = (e) => {
        setTitleInput(e.target.value);
      }
      
      const handleNameInputChange = (e) => {
        setNameInput(e.target.value);
      }
      
      const handleContactInputChange = (value) => {
        setContactInput(value);
      }
      const handlePriceInputChange = (value) => {
        setPriceInput(value);
      }

    const handleCardClick = () =>{
        lead(data);
    }
    return(
        <Form onFinish={handleCardClick}>
        {error && <Alert message={error} type="error" showIcon />}
        {success && <Alert message={success} type="success" showIcon />}

        <span className="title-Content">CRIAR LEAD</span>

        <Form.Item  name='title' label='Titulo' required rules={[{required:true, 
          message:'Insira o titulo'}]}>
        <Input onChange={handleTitleInputChange} />
        </Form.Item>

        <Form.Item  name='name' label='Nome' required rules={[{required:true, 
          message:'Insira o nome'}]}>
        <Input onChange={handleNameInputChange} />
        </Form.Item>

        <Form.Item  name='contact' label='Contato' required rules={[{required:true, 
          message:'Selecione o contato'}]}>
        <Select
      defaultValue="Selecione o contato"
      style={{ width: 180 }}
      onChange={handleContactInputChange}
      options = {contactOptions}
      />
        </Form.Item>    

        <Form.Item  name='price' label='Valor' required rules={[{required:true, 
          message:'Insira um valor'}]}>
        <InputNumber  onChange={handlePriceInputChange} />
      </Form.Item>
    
        <Button htmlType="submit" type="primary">Criar</Button>
        
        </Form>
        );
    }