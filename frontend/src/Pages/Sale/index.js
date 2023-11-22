import { Alert, Button, Form, Input, Radio, Select } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import './styleSale.css';

const ApiHost ='https://localhost:7178/Product';
const ApiHost2 = 'https://localhost:7178/User';
const ApiHost3 = 'https://localhost:7178/Sale'


export default function Body(){
  const generateRandomCode = () => {
    return Math.floor(Math.random() * 100000); 
  };


  const location = useLocation();
    const navigate = useNavigate(); 
    const [codigoInput, setCodigoInput ] = useState(generateRandomCode());
    const [productInput, setProductInput] = useState([]);
    const [userInput, setUserInput] = useState('');
    const [cepInput, setCepInput] = useState('');
    const [descriptionInput, setDescriptionInput] = useState('');
    const [productOptions, setProductOptions] = useState([]);
    const [userOptions, setUserOptions] = useState([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [form] = Form.useForm();
    
    
  const tolkien = JSON.parse(localStorage.getItem('TOKEN_TEST'))
  
    useEffect(() => {
      const fetchCompanies = async () => {
        try {
          const resProd = await fetch(ApiHost + '/getProduct',{
            headers: {Authorization: 'Bearer '+ tolkien.value}
          });
          const data = await resProd.json();
          const optionsCompany = data.map(prod => ({ value: prod.productCode, label: prod.productName }));
          setProductOptions(optionsCompany);
        } catch (error) {
          console.error('Erro ao obter as empresas:', error);
        }
      };
  const fetchContact = async () =>{
    try {
      const resContact = await fetch(ApiHost2 + '/getUsers',{
        headers: {Authorization: 'Bearer '+ tolkien.value}});
      const data = await resContact.json();
      const optionsContact = data.map(users =>({value:users.sT_LOGIN, label: users.sT_NAME}))
      setUserOptions(optionsContact)      
    } catch (error) {
      console.error('erro',error)
    }
  }

      fetchCompanies();
      fetchContact();
    }, []);

    

    const data = {
        code:codigoInput,
        productCode:productInput,
        seller:userInput,
        cep:cepInput,
        obs:descriptionInput
    };
    
    const deal = async (data)=>{
        const response = await fetch(ApiHost3+'/createSale',{
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + tolkien.value
            },
            body: JSON.stringify(data)
        })         
        console.log(response);

        const resp = await response;
        if(resp.status != 200){
          setError('Ocorreu um erro, verifique as informações colocadas');
          setTimeout(() => {
            setError('');
            form.resetFields();
          }, 2000);
          
          navigate('/home/dealCreate');
        }else{
         setSuccess('Cadastro efetuado com sucesso!');
         setTimeout(() => {
          setSuccess('');
          navigate('/home');
         }, 2000);
          
        }
    }

    
    const handleCodigoInputChange = (e) => {
      const value = parseInt(e);
      setCodigoInput(value);
      }
      const handleProductInputChange = (value) => {
        setProductInput(value);
      }
      
      const handleUserInputChange = (value) => {
        setUserInput(value);
      }

      const handleCepInputChange = (e) => {
        setCepInput(e.target.value)
      }

      const handleDescriptionInputChange = (e) => {
        setDescriptionInput(e.target.value);
      }

    const handleCardClick = () =>{
        deal(data);
    }
    
    return(
        <Form onFinish={handleCardClick}>
        {error && <Alert message={error} type="error" showIcon />}
        {success && <Alert message={success} type="success" showIcon />}

        <span className='title-Content'>CRIAR VENDA</span>
        
        <Form.Item  name='codigo' label='Código' defaultValue={codigoInput} required>
        <Input defaultValue={codigoInput} disabled/>
        </Form.Item>   

      <Form.Item name='prod' label='Selecione os produtos' required rules={[{required:true, 
          message:'Selecione a empresa'}]}>
      <Select
      placeholder='Selecione os produtos'
      mode="multiple"
      style={{ width: 180 }}
      onChange={handleProductInputChange}
      options = {productOptions}
      />
      </Form.Item>     

      <Form.Item name='contact' label='Selecionar o vendedor' required rules={[{required:true, 
          message:'Selecione o contato'}]}>
      <Select
      placeholder='Selecione o vendedor'
      style={{ width: 180 }}
      onChange={handleUserInputChange}
      options = {userOptions}
      />    
    </Form.Item>

    <Form.Item name='cep' label='CEP' required rules={[{required:true, 
          message:'Informe o CEP'}]}>
        <Input onChange={handleCepInputChange}/>
</Form.Item>

    <Form.Item name='desc' label='Descrição'>
        <Input onChange={handleDescriptionInputChange}/>
</Form.Item>

        <Button htmlType="submit" type="primary" >Criar</Button>
        
        </Form>
        );
    }