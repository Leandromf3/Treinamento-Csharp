import { Alert, Button, Form, Input, Modal, Select, message } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { LockOutlined, UserOutlined, LeftOutlined, AuditOutlined , InboxOutlined } from '@ant-design/icons';
import axios from "axios";
import bcrypt from "bcryptjs";

const ApiHost ='https://localhost:7178/User';
const tolkienn = JSON.parse(localStorage.getItem('TOKEN_TEST'));

export default function Body(){
    const navigate = useNavigate(); 
    const [formData, setFormData] = useState({
        userCode: '',
        user:'',
        userName:'',
        userAccess:'',
        userEmail:'',
      });
    const [password, setPassword] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [dataUpdate, setDataUpdate] = useState({});
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const params = useParams();
    const [messageApi, contextHolder] = message.useMessage();
    const [form] = Form.useForm();
 
    const fetchData = async () => {
        try {
          const response = await axios.get(ApiHost+`/getUserById?id=${params.id}`,{
            headers: {Authorization: `Bearer ${tolkienn.value}`}}
          );
          setDataUpdate(response.data[0]);
          setFormData({
            userCode: response.data[0].id || '',
            user: response.data[0].sT_LOGIN || '',
            userName: response.data[0].sT_NAME || '',
            userAccess: response.data[0].sT_ROLE || '',
            userEmail: response.data[0].sT_EMAIL || '',
          });
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    
      useEffect(() => {
        fetchData();
      }, []);
      
      const userUpdate = async (data) => {
        const response = await fetch(ApiHost + '/update', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tolkienn.value}` 
          },
          body: JSON.stringify(data) 
         }
          );
       const resp = await response.json();
       console.log(resp);
        if(resp.error != undefined){
          setError(resp.error.message);
          setTimeout(()=>{
            setError('Ocorreu um erro inesperado..');
            form.resetFields();
          }, 2000);
        }else{
          setSuccess('Informações atualizadas');
          setTimeout(() => {
            navigate(`/home/Users`);
          }, 2000);
        }
      };
      
      const handleUserInputChange = (value) => {
        setFormData((prevData)=>({
          ...prevData,
          user: value
        }));
      }
    
      const handleNameChange = (value) => {
        setFormData((prevData)=>({
          ...prevData,
          userName: value
        }));
      }
    
      const handleRole = (value) => {
        setFormData((prevData)=>({
          ...prevData,
          userAccess: value
        }));
      }
    
      const handleEmailChange = (value) => {
        setFormData((prevData)=>({
          ...prevData,
          userEmail: value
        }));
      }
    
      const handlePassInputChange = (value) => {
        setFormData((prevData)=>({
          ...prevData,
          userPassword: value
        }))
      }

    const modalVisibleClick = () => {
      setModalVisible(true);
    }

    const handleCardClick = () =>{
      bcrypt.compare(password, dataUpdate.sT_PASSWORD, function(err, result){
        if(err){
          setError('Ocorreu um erro inesperado. Tente novamente!');
          return;
        }
        if(result){
          const data = {
            ...formData,
            informationData: dataUpdate
          };
          userUpdate(data);
          return;
        }else{
          setError('Senha incorreta!');
        }

      })
      
    }
    return( 
      <div>
          <div>
          {error && <Alert message={error} type="error" showIcon />}
          {success && <Alert message={success} type="success" showIcon />}
          </div>
        <Form onFinish={modalVisibleClick} >
        

        <span className="title-Content">Alterar Usuário</span>
        
        <Form.Item required rules={[{required:true, 
          message:'Digite o usuário'}]}>
        <Input  placeholder="Usuario" prefix={<UserOutlined/>} value={formData.user} onChange={(e) => handleUserInputChange(e.target.value)} />
        </Form.Item>

        <Form.Item required rules={[{required:true,
        message:'Informe seu nome'}]} value={formData.userName}>
        <Input placeholder="Nome" prefix={<AuditOutlined />} value={formData.userName} onChange={(e) => handleNameChange(e.target.value)}/>
        </Form.Item>

        <Form.Item required rules={[{required:true,
        message:'Infome o nível de acesso!'}]}>
        <Select value={formData.userAccess} onChange={handleRole} 
        options={[
          { value:'admin', label:'Admin' },
          { value:'Padrao', label:'Usuario comum' }
        ]} />
        </Form.Item>

        <Form.Item required rules={[{required:true,
        message:'Informe o email'}]}>
        <Input placeholder="Email" prefix={<InboxOutlined />} value={formData.userEmail} onChange={(e) => handleEmailChange(e.target.value)}/>
        </Form.Item>

        <Modal
          title="Confirmar alterações"
          visible={modalVisible}
          onCancel={() => setModalVisible(false)}
          onOk={handleCardClick}>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Insira a senha' }]}>

            <Input.Password placeholder="Digite sua senha"
              onChange={(e) => setPassword(e.target.value)}/>
          </Form.Item>
        </Modal>
          <div >
          <Button type="primary" onClick={modalVisibleClick}>Alterar usuário</Button>
          </div>
        

        </Form>
        </div>
        );
    }