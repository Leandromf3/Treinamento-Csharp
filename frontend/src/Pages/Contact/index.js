import { Alert, Button, Form, Input, Radio } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './style.css';

const ApiHost ='http://127.0.0.1:8000/api/bitrix';


export default function Body(){
    const navigate = useNavigate(); 
    const [nameInput, setNameInput ] = useState('');
    const [secondNameInput, setSecondNameInput] = useState('');
    const [lastNameInput, setLastNameInput] = useState(null);
    const [typeInput, setTypeInput] = useState('');
    const [phoneInput, setPhoneInput] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [form] = Form.useForm();
    
    const data = {
        name:nameInput,
        secondName:secondNameInput,
        lastName:lastNameInput,
        type:typeInput,
        phone:phoneInput
    };
    
    const lead = async (data)=>{
        const response = await fetch(ApiHost+'/contactCreate',{
            method:'POST',
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
          
          navigate('/home/contactCreate');
        }else{
         setSuccess('Cadastro efetuado com sucesso!');
         setTimeout(() => {
          navigate('/home');
         }, 2000);
          
        }
    }
    
    
    const handleName = (e) => {
        setNameInput(e.target.value);
      }
      
      const handleSecondName = (e) => {
        setSecondNameInput(e.target.value);
      }
      
      const handleLastName = (e) => {
        setLastNameInput(e.target.value);
      }
      const handleType = (e) => {
        setTypeInput(e.target.value);
      }
      const handlePhone = (e) => {
        setPhoneInput(e.target.value);
      }

    const handleCardClick = () =>{
        lead(data);
    }
    return(
        <Form onFinish={handleCardClick}>
        {error && <Alert message={error} type="error" showIcon />}
        {success && <Alert message={success} type="success" showIcon />}

        <span className="title-Content">CRIAR CONTATO</span>

         <Form.Item  name='name' label='Primeiro nome' required rules={[{required:true, 
          message:'Insira o primeiro nome'}]}>
        <Input onChange={handleName} />
         </Form.Item>

         <Form.Item  name='secondName' label='Segundo nome' required rules={[{required:true, 
          message:'Insira o segundo nome'}]}>
        <Input  onChange={handleSecondName} />
        </Form.Item>

        <Form.Item  name='lastName' label='Ultimo nome' required rules={[{required:true, 
          message:'Insira o titulo'}]}>
        <Input onChange={handleLastName} />
        </Form.Item>

        <Form.Item  name='contact' label='Tipo do contato' required rules={[{required:true, 
          message:'Insira o titulo'}]}>
        <Radio.Group onChange={handleType} value={typeInput}>
            <Radio value={'CLIENT'}>Cliente</Radio>
            <Radio value={'SUPPLIER'}>Fornecedor</Radio>
            <Radio value={'PARTNER'}>Parceiro</Radio>
            <Radio value={'OTHER'}>Outro</Radio>
        </Radio.Group> 
        </Form.Item>

        <Form.Item  name='phone' label='Telefone' required rules={[{required:true, 
          message:'Insira o titulo'}]}>
        <Input placeholder="Telefone" onChange={handlePhone} />
      </Form.Item>

        <Button htmlType="submit" type="primary" >Criar</Button>
        
        </Form>
        );
    }