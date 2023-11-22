import { Alert, Button, Form, Input, InputNumber, Select } from "antd";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useForm } from "antd/es/form/Form";

const ApiHost = 'http://127.0.0.1:8000/api/bitrix';

export default function Body() {
  const navigate = useNavigate();
  const [dataUpdate, setDataUpdate] = useState({});
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [form] = useForm();
  const {Option} = Select;
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    companyType: '',
    industry: '',
    employees: '',
    currency: '',
    revenue: '',
    cnpj: '',
    phone: '',
  });
  const params = useParams();

  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      id: params.id,
      title: dataUpdate.TITLE || '',
      companyType: dataUpdate.COMPANY_TYPE || '',
      industry: dataUpdate.INDUSTRY || '',
      employees: dataUpdate.EMPLOYEES ,
      currency: dataUpdate.CURRENCY_ID ,
      revenue: dataUpdate.REVENUE || '',
      cnpj: dataUpdate.UF_CRM_1698435704849 || '',
      phone: dataUpdate.PHONE || '',
    }));
  }, [dataUpdate]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/bitrix/companyGet?id=${params.id}`,{
        headers: {Authorization: localStorage.getItem('TOKEN_TEST')}}
      );
      setDataUpdate(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  const companyUpdate = async (data) => {
    const response = await fetch(ApiHost + '/companyUpdate', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('TOKEN_TEST')
      },
      body: JSON.stringify(data) 
     }
      );
   const resp = await response.json();
   console.log(resp);
    if(resp.error != undefined){
      setError(resp.error.message);
      setTimeout(()=>{
        setError('');
        form.resetFields();
        navigate(`/home/companyUpdate/${params.id}`)
      }, 2000);
    }else{
      setSuccess('Empresa atualizada com sucesso!');
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
  
  const handleCompanyTypeInputChange = (value) => {
    setFormData((prevData)=>({
      ...prevData,
      companyType: value
    }));  }
  
  const handleIndustryInputChange = (value) => {
    setFormData((prevData)=>({
      ...prevData,
      industry: value
    }));  
  }
  const handleEmployeeInputChange = (value) => {
    setFormData((prevData)=>({
      ...prevData,
      employees: value
    }));
  }
  const handleCurrencyInputChange = (value) => {
    setFormData((prevData)=>({
      ...prevData,
      currency: value
    }));
  }
  const handleRevenueInputChange = (e) => {
    const {value} = e.target;
    setFormData((prevData)=>({
      ...prevData,
      revenue: value
    }));
  }
  const handlePhoneInputChange = (e) => {
    const {value} = e.target;
    setFormData((prevData)=>({
      ...prevData,
      phone: value
    }));
  }
  const handleCnpjInputChange =(e) => {
    const {value} = e.target;
    setFormData((prevData)=>({
      ...prevData,
      cnpj: value
    }));
  }
  
  const selectAfter = (
    <Select
      value={formData.currency}
      style={{
        width: 150,
      }}
      onChange={handleCurrencyInputChange}
    >
      <Option value="USD">Dólar</Option>
      <Option value="EUR">Euro</Option>
      <Option value="GBP">Libra esterlina</Option>
      <Option value="CNY">Yuan chinês</Option>
      <Option value="BRL">Real</Option>
    </Select>
  )

  const handleCardClick = () => {
    const data = {
      ...formData,
      informationData: dataUpdate
    };
    companyUpdate(data);
  };

  return ( 
    <Form onFinish={handleCardClick}>
    {error && <Alert message={error} type="error" showIcon />}
    {success && <Alert message={success} type="success" showIcon />}

    <span className="title-Content">ATUALIZAR EMPRESA</span>

    <Form.Item label='Nome da empresa' required rules={[{required:true, message:'Insira o titulo'}]}>
    <Input value={formData.title} onChange={handleTitleInputChange} />
    </Form.Item>

   <Form.Item label='Tipo da industria' required 
   rules={[{required:true, message:'Selecione um tipo'}]}>
    <Select
  value={formData.industry}
  style={{ width: 180 }}
  onChange={handleIndustryInputChange}
  options={[
    { value: 'BANKING', label: 'Bancário' },
    { value: 'ENTERTAINMENT', label: 'Entretenimento' },
    { value: 'MANUFACTURING', label: 'Fabricação' },
    { value: 'TELECOM', label: 'Telecomunicações'},
    { value: 'GOVERNMENT', label: 'Governo'},
    { value: 'DELIVERY', label: 'Entrega'},
    { value: 'NOTPROFIT', label: 'Sem fins lucrativos'},
    { value: 'IT', label: 'Tecnologia' },
    { value: 'FINANCE', label: 'Finanças' },
    { value: 'CONSULTING', label: 'Consultoria'},
    { value: 'OTHER', label: 'Outra' },
  ]}
/>
</Form.Item>


<Form.Item label='Tipo de empresa' required 
   rules={[{required:true, message:'Selecione um valor'}]}>
    <Select
  value={formData.companyType}
  style={{ width: 180 }}
  onChange={handleCompanyTypeInputChange}
  options={[
    { value: 'CUSTOMER', label: 'Cliente' },
    { value: 'PARTNER', label: 'Parceiro' },
    { value: 'SUPPLIER', label: 'Fornecedor' },
    { value: 'COMPETITOR', label: 'Concorrente'},
    {value: 'OTHER', label:'Outro'}
  ]}
/>
</Form.Item>


<Form.Item label='Quantidade de funcionarios' required 
   rules={[{required:true, message:'Selecione uma quantidade'}]}>
<Select
  value={formData.employees}
  style={{ width: 270 }}
  onChange={handleEmployeeInputChange}
  options={[
    { value: 'EMPLOYEES_1', label: '1-49 funcionários' },
    { value: 'EMPLOYEES_2', label: '50-250 funcionários' },
    { value: 'EMPLOYEES_3', label: '251-500 funcionários' },
    { value: 'EMPLOYEES_4', label: 'mais de 500 funcionários' },
  ]}
/>  
</Form.Item>

<Form.Item label='Valor da empresa' required 
   rules={[{required:true, message:'insira um valor válido'}]}>
  <InputNumber value={formData.revenue} 
  formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
    parser={(value) => value.replace(/\$\s?|(,*)/g, '')} 
    addonAfter={selectAfter} onChange={handleRevenueInputChange}/> 
</Form.Item>

<Form.Item label='CNPJ da empresa' required 
   rules={[{required:true, message:'Insira um valor válido'}]}>
  <Input value={formData.cnpj} placeholder = "cnpj" onChange={handleCnpjInputChange} />
</Form.Item>

  <Form.Item label='Telefone' required >
  <Input value={formData.phone} placeholder = "Telefone" onChange={handlePhoneInputChange} rules ={[{required: true},]} />
  </Form.Item>
  
  <Button htmlType="submit" type="primary" >Atualizar empresa</Button>
    
    </Form>
    );
}
