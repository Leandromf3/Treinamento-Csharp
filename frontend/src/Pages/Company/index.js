import { Alert, Button, Form, Input, InputNumber, Select } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './style.css';

const ApiHost ='http://127.0.0.1:8000/api/bitrix';


export default function Body(){
    const navigate = useNavigate(); 
    const [form] = Form.useForm();
    const [titleInput, setTitleInput ] = useState('');
    const [companyTypeInput, setCompanyTypeInput] = useState('');
    const [industryInput, setIndustryInput] = useState('');
    const [employeesInput, setEmployeesInput] = useState('');
    const [currencyIDInput, setCurrencyIDInput]= useState('');
    const [revenueInput,setRevenueInput] = useState('');
    const [phoneInput,setPhoneInput] = useState('');
    const [cnpjInput, setCnpjInput] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const {Option} = Select;
    
    const data = {
        title:titleInput,
        companyType:companyTypeInput,
        industry:industryInput,
        employees:employeesInput,
        currency:currencyIDInput,
        revenue:revenueInput,
        phone:phoneInput,
        cnpj:cnpjInput,
    };
    
    const company = async (data)=>{
      const response = await fetch(ApiHost+'/companyCreate',{
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
          navigate('/home/companyCreate');
        }else{
         setSuccess('Cadastro efetuado com sucesso!');
         setTimeout(() => {
          navigate('/home/companyList');
         }, 2000);
        }
        
    }
    
    
    const handleTitleInputChange = (e) => {
        setTitleInput(e.target.value);
      }
      
      const handleCompanyTypeInputChange = (value) => {
        setCompanyTypeInput(value);
      }
      
      const handleIndustryInputChange = (value) => {
        setIndustryInput(value);
      }
      const handleEmployeeInputChange = (value) => {
        setEmployeesInput(value);
      }
      const handleCurrencyInputChange = (value) => {
        setCurrencyIDInput(value);
      }
      const handleRevenueInputChange = (value) => {
        setRevenueInput(value);
      }
      const handlePhoneInputChange = (e) => {
        setPhoneInput(e.target.value);
      }
      const handleCnpjInputChange =(e) => {
        setCnpjInput(e.target.value);
      } 
    const handleCardClick = () =>{
      setTimeout(() => {
        company(data);
      }, 2000)
        

    }
 
    const selectAfter = (
      <Select
        defaultValue="Escolher moeda"
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
    );
   
    return(
        <Form form={form} onFinish={handleCardClick}>
        {error && <Alert message={error} type="error" showIcon />}
        {success && <Alert message={success} type="success" showIcon />}

        <span className="title-Content">ADICIONAR EMPRESA</span>

        <Form.Item id="title" name='title' label='Titulo' required rules={[{required:true, message:'Insira o titulo'}]}>
        <Input  onChange={handleTitleInputChange} />
        </Form.Item>

       <Form.Item name='industry' label='Tipo da industria' required 
       rules={[{required:true, message:'Selecione um tipo'}]}>
        <Select
      defaultValue="Selecione a industria"
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


<Form.Item name='companyType' label='Tipo de empresa' required 
       rules={[{required:true, message:'Selecione um valor'}]}>
        <Select
      defaultValue="Escolha o tipo"
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

    
<Form.Item name='employees' label='Quantidade de funcionarios' required 
       rules={[{required:true, message:'Selecione uma quantidade'}]}>
<Select
      defaultValue="Selecione o número de funcionários"
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

<Form.Item name='revenue' label='Insira um valor válido' required 
       rules={[{required:true, message:'insira um valor'}]}>
      <InputNumber addonAfter={selectAfter} defaultValue={0} onChange={handleRevenueInputChange}/>
</Form.Item>

<Form.Item name='cnpj' label='CNPJ da empresa' required 
       rules={[{required:true, message:'Insira um valor válido'}]}>
      <Input placeholder = "cnpj" onChange={handleCnpjInputChange} />
</Form.Item>

      <Form.Item name='phone' label='Telefone' required 
       rules={[{required:true, message:'Inválido'}]}>
      <Input placeholder = "Telefone" onChange={handlePhoneInputChange} rules ={[{required: true},]} />
      </Form.Item>
      
      <Button htmlType="submit" type="primary" >Criar</Button>
        
        </Form>
        );
    }