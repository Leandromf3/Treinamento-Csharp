import { Alert, Button, Form, Input, Radio, Select } from "antd";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const ApiHost = 'http://127.0.0.1:8000/api/bitrix';

export default function Body() {
  const navigate = useNavigate();
  const [companyOptions, setCompanyOptions] = useState([]);
  const [contactOptions, setContactOptions] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [form] = Form.useForm();
  const [dataUpdate, setDataUpdate] = useState({});
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    typeid: '',
    category: '',
    stage: '',
    company: '',
    contact: '',
    description: ''
  });
  const params = useParams();

  useEffect(() => {

    fetchCompanies()
    fetchContact();
    fetchData();
  }, []); 

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      id: params.id,
      title: dataUpdate.TITLE || '',
      typeid: dataUpdate.TYPE_ID || '',
      category: dataUpdate.CATEGORY_ID || '',
      stage: dataUpdate.STAGE_ID || '',
      company: dataUpdate.COMPANY_ID || '',
      contact: dataUpdate.CONTACT_ID || '',
      description: dataUpdate.UF_CRM_1698435318631 || '',
    }));
  }, [dataUpdate]);
  console.log(formData.description)
  const fetchCompanies = async () => {
      try {
        const resCompany = await fetch(ApiHost + '/companyList',{
          headers: {Authorization: localStorage.getItem('TOKEN_TEST')}});
        const data = await resCompany.json();
        const optionsCompany = data.map(company => ({ value: company.ID, label: company.TITLE }));
        setCompanyOptions(optionsCompany);
      } catch (error) {
        console.error('Erro ao obter as empresas:', error);
      }
    };

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
      const response = await axios.get(`http://localhost:8000/api/bitrix/dealGet?id=${params.id}`,{
        headers: {Authorization: localStorage.getItem('TOKEN_TEST')}});
      setDataUpdate(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const dealUpdate = async (data) => {
    console.log(data);
    const res = await fetch(ApiHost + '/dealUpdate', {
      method: 'PUT',
      headers: {
        'Authorization': localStorage.getItem('TOKEN_TEST'),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data) 
     }
      );
      if(res.error != undefined){
        setError(res.error.message);
        setTimeout(()=>{
          setError('');
          form.resetFields();
          navigate('/home');
        }, 2000);
        
      }else{
        setSuccess('Deal atualizado com sucesso!');
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
  
  const handleTypeInputChange = (e) => {
    const {value} = e.target;
    setFormData((prevData)=>({
      ...prevData,
      typeid: value
    }));
  }
  const handleCategoryInputChange = (e) => {
    const {value} = e.target;
    setFormData((prevData)=>({
      ...prevData,
      category: value
    }));
  }
  
  const handleStageInputChange = (e) => {
    const {value} = e.target;
    setFormData((prevData)=>({
      ...prevData,
      stage: value
    }));
  }
  const handleCompanyInputChange = (value) => {
    setFormData((prevData)=>({
      ...prevData,
      company: value
    }));
  }
  
  const handleContactInputChange = (value) => {
    setFormData((prevData)=>({
      ...prevData,
      contact: value
    }));
  }

  const handleDescriptionInputChange = (e) => {
    const {value} = e.target;
    setFormData((prevData)=>({
      ...prevData,
      description: value
    }));
  }

  const handleCardClick = () => {
    const data = {
      ...formData,
      informationData: dataUpdate
    };
    dealUpdate(data);
  };
  

  return (
    <Form onFinish={handleCardClick}>
        {error && <Alert message={error} type="error" showIcon />}
        {success && <Alert message={success} type="success" showIcon />}

        <span className='title-Content'>CRIAR NEGÓCIO</span>
        
        <Form.Item label='Titulo do negócio' required rules={[{required:true, 
          message:'Insira o titulo'}]}>
        <Input value={formData.title} onChange={handleTitleInputChange} />
        </Form.Item>

        <Form.Item label='Tipo' required rules={[{required:true, 
          message:'informe o tipo'}]}>
        <Input value={formData.typeid} name='typeid' onChange={handleTypeInputChange} />
        </Form.Item>

        <Form.Item label='Categoria' required rules={[{required:true, 
          message:'Informe a categoria'}]}>
        <Input value={formData.category} name='category' onChange={handleCategoryInputChange} />
        </Form.Item>

        <Form.Item label='Estágio do negócio' required rules={[{required:true, 
          message:'Selecione um dos valores acima!'}]}>
        <Radio.Group onChange={handleStageInputChange} value={formData.stage}>
            <Radio value={'NEW'}>Em desenvolvimento</Radio>
            <Radio value={'PREPARATION'}>Criar documentos</Radio>
            <Radio value={'PREPAYMENT_INVOICE'}>Fatura</Radio>
            <Radio value={'EXECUTING'}>Em andamento</Radio>
            <Radio value={'FINAL_INVOICE'}>Fatura final</Radio>
        </Radio.Group> 
        </Form.Item>
        

      <Form.Item label='Selecione a empresa' required rules={[{required:true, 
          message:'Selecione a empresa'}]}>
      <Select
      value={formData.company}
      style={{ width: 180 }}
      onChange={handleCompanyInputChange}
      options = {companyOptions}
      />
      </Form.Item>     

      <Form.Item label='Selecionar o contato' required rules={[{required:true, 
          message:'Selecione o contato'}]}>
      <Select
      value={formData.contact}
      style={{ width: 180 }}
      onChange={handleContactInputChange}
      options = {contactOptions}
      />    
    </Form.Item>


    <Form.Item label='Descrição' required rules={[{required:true, 
          message:'Informe a descrição'}]}>
        <Input value={formData.description} onChange={handleDescriptionInputChange}/>
</Form.Item>

        <Button htmlType="submit" type="primary" >Atualizar</Button>
        
        </Form>
        );
}
