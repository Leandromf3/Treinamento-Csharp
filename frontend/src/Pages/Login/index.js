import { Alert, Button, Form, Input, } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import './styleLogin.css';

const ApiHost ="https://localhost:7178/User";//'http://localhost:8000/api/bitrix';


export default function Body(){
    const navigate = useNavigate(); 
    const [form] = Form.useForm();
    const [UserInput, setUserInput ] = useState('');
    const [PasswordInput, setPasswordInput] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    
    const data = {
        ST_LOGIN:UserInput,
        ST_PASSWORD:PasswordInput,
    };
    
    const User = async (data)=>{
      const response = await fetch(ApiHost+'/login',{
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        const resp = await response.json();
        console.log(resp);
        const dateTime = new Date();
        
        dateTime.setMinutes(dateTime.getMinutes()+30);
        const timeToken={
          value: resp.value,
          time: dateTime.getTime()
        }
        localStorage.setItem('TOKEN_TEST', JSON.stringify(timeToken));

        if(typeof resp.value == 'undefined'){
          setError('Login inválido!');
          setTimeout(() => {
            setError('');
            form.resetFields();
          }, 2000);
          navigate('/');
         
        }else{
         setSuccess('Login efetuado com sucesso!');
         setTimeout(() => {
          navigate(`/home`, { state: { token: resp } } );
         }, 2000);
        }
    }
    const handleUserInputChange = (e) => {
        setUserInput(e.target.value);
      }
      const handlePasswordInputChange =(e) => {
        setPasswordInput(e.target.value);
      }
    const handleCardClick = () => {
      setTimeout(() => {
        User(data);
      }, 2000)
    }
    const registerUser = () => {
      navigate('/register');
    }

    return(
      <div class="div-for">
          <div className="div-alert">
          {error && <Alert message={error} type="error" showIcon />}
          {success && <Alert message={success} type="success" showIcon />}
          </div>
        <Form form={form} onFinish={handleCardClick} className="form-Login-body">

        <span className="title-container">Login</span>

        <Form.Item className="User" name='User' required rules={[{required:true, message:'Insira o titulo'}]}>
        <Input className="User-Input" prefix={<UserOutlined className="user-Prefix"/>} placeholder="Usuario" onChange={handleUserInputChange} />
        </Form.Item>

        <Form.Item className="Password" name='Password' required 
              rules={[{required:true, message:'Insira um valor válido'}]}>
              <Input.Password className="Password-Input" prefix={<LockOutlined className="user-Prefix" />} placeholder = "Senha" onChange={handlePasswordInputChange} />
        </Form.Item>
      
      <div className="btn-cont">
      <Button htmlType="submit" type="primary" >Entrar</Button>
      <Button type="subnmit" style={{backgroundColor:'#63ccff', color:'white'}} onClick={()=>{registerUser()}}>Registrar-se</Button>    
      </div> 
       </Form>
        </div>);
    }