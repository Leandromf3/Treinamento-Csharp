import { Alert, Button, Form, Input, Select, message } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LockOutlined, UserOutlined, LeftOutlined, AuditOutlined , InboxOutlined } from '@ant-design/icons';
import './styleRegister.css';

const ApiHost ='https://localhost:7178/User';


export default function Body(){
    const navigate = useNavigate(); 
    const [userInput, setUserInput ] = useState('');
    const [passInput, setPassInput] = useState('');
    const [roleInput, setRoleInput] = useState('');
    const [emailInput, setEmailInput] = useState('');
    const [nameInput, setNameInput] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [messageApi, contextHolder] = message.useMessage();
    const [form] = Form.useForm();


    const data = {
        ST_LOGIN:userInput,
        ST_PASSWORD:passInput,
        ST_ROLE:roleInput,
        ST_EMAIL:emailInput,
        ST_NAME:nameInput
    };
    
    const regUser = async (data)=>{
        const response = await fetch(ApiHost+'/register',{
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        
        const resp = await response;
        if(resp.status != 200){
          setError("Ocorreu um erro, verifique as informações e tente novamente");
          setTimeout(() => {
            setError('');
            form.resetFields();
          }, 2000);    
        }else{
         setSuccess('Cadastro efetuado com sucesso!');
         setTimeout(() => {
          navigate('/');
         }, 2000);
          
        }
    }
 
    
    const handleUserInputChange = (e) => {
        setUserInput(e.target.value);
      }

      const handlePassInputChange = (e) => {
        setPassInput(e.target.value);
      }
      
    const handleRole = (value) => {
      setRoleInput(value);
    }

    const handleEmailChange = (e) => {
      setEmailInput(e.target.value);
    }

    const handleNameChange = (e) => {
      setNameInput(e.target.value);
    }

    const handleCardClick = () =>{
        setTimeout(() => {
            regUser(data);
        }, 2000)
    }

    return( 
      <div className="div-for-Register">
          <div className="div-alert">
          {error && <Alert message={error} type="error" showIcon />}
          {success && <Alert message={success} type="success" showIcon />}
          </div>
        <Form onFinish={handleCardClick} className="form-Register-body">
        

        <span className='title-container-register'>Registrar Usuário</span>
        
        <Form.Item className="regisUser" name='Usuario' required rules={[{required:true, 
          message:'Digite o usuário'}]}>
        <Input className="User-Regis-Input" placeholder="Usuario" prefix={<UserOutlined/>} onChange={handleUserInputChange} />
        </Form.Item>

        <Form.Item className="regisName" name='Name' required rules={[{required:true,
        message:'Informe seu nome'}]}>
        <Input className="Name-regis-Input" placeholder="Name" prefix={<AuditOutlined />} onChange={handleNameChange}/>
        </Form.Item>

        <Form.Item className="regisRole" name='Role'  required rules={[{required:true,
        message:'Infome o nível de acesso!'}]}>
        <Select className="Role-regis-Input" defaultValue='Selecione o nível de acesso' onChange={handleRole} 
        options={[
          { value:'admin', label:'Admin' },
          { value:'Padrao', label:'Usuario comum' }
        ]} />
        </Form.Item>

        <Form.Item className="regisEmail" name='Email' required rules={[{required:true,
        message:'Informe o email'}]}>
        <Input className="Email-regis-Input" placeholder="Email" prefix={<InboxOutlined />} onChange={handleEmailChange}/>
        </Form.Item>

        <Form.Item className="regisPass" name='Senha' required hasFeedback rules={[{required:true, 
          message:'Informe a senha'}]}  >
        <Input.Password className="Password-Regis-Input" placeholder="Senha" prefix={<LockOutlined className="site-form-item-icon" />} onChange={handlePassInputChange} />
        </Form.Item>

        <Form.Item className="regisRePass" name="Repass" required dependencies={['Senha']} hasFeedback rules={[{required:true, 
          message:'É necessário digitar a senha novamente'}, ({getFieldValue}) => ({
            validator(_,value){
                if(!value || getFieldValue('Senha')=== value){
                    return Promise.resolve();
                }
                return Promise.reject(new Error('As senhas não coincidem'));
            }
          }),
    ]}>
        <Input.Password className="RePass-regis-Input" placeholder="Confirmação da senha" prefix={<LockOutlined className="site-form-item-icon" />} />
        </Form.Item>
          <div className="btn-regis-cont">
          <Button htmlType="submit" type="primary" >Criar usuário</Button>
          <Button style={{backgroundColor:'#63ccff', color:'white'}} onClick={()=>{(navigate('/'))}}><LeftOutlined/></Button>
          </div>
        </Form>
        </div>
        );
    }