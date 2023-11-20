import { Alert, Button, Form, Input, Radio, Select } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import './styleDeal.css';

const ApiHost ='http://127.0.0.1:8000/api/bitrix';


export default function Body(){
  const location = useLocation();
    const navigate = useNavigate(); 
    const [titleInput, setTitleInput ] = useState('');
    const [typeInput, setTypeInput] = useState('');
    const [categoryInput, setCategoryInput] = useState('');
    const [stageInput, setStageInput] = useState(null);
    const [companyInput, setCompanyInput] = useState('');
    const [contactInput, setContactInput] = useState('');
    const [cepInput, setCepInput] = useState('');
    const [descriptionInput, setDescriptionInput] = useState('');
    const [companyOptions, setCompanyOptions] = useState([]);
    const [contactOptions, setContactOptions] = useState([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [form] = Form.useForm();
    
    console.log(location.state);


    useEffect(() => {
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


      fetchCompanies();
      fetchContact();
    }, []);



    const data = {
        title:titleInput,
        typeid:typeInput,
        category:categoryInput,
        stage:stageInput,
        company:companyInput,
        contact:contactInput,
        cep:cepInput,
        description:descriptionInput
    };
    
    const deal = async (data)=>{
        const response = await fetch(ApiHost+'/Deal',{
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
          
          navigate('/home/dealCreate');
        }else{
         setSuccess('Cadastro efetuado com sucesso!');
         setTimeout(() => {
          navigate('/home/dealList');
         }, 2000);
          
        }
    }
    
    
    const handleTitleInputChange = (e) => {
        setTitleInput(e.target.value);
      }
      
      const handleTypeInputChange = (e) => {
        setTypeInput(e.target.value);
      }
      const handleCategoryInputChange = (e) => {
        setCategoryInput(e.target.value);
      }
      
      const handleStageInputChange = (e) => {
        setStageInput(e.target.value);
      }
      const handleCompanyInputChange = (value) => {
        setCompanyInput(value);
      }
      
      const handleContactInputChange = (value) => {
        setContactInput(value);
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

        <span className='title-Content'>CRIAR NEGÓCIO</span>
        
        <Form.Item  name='title' label='Titulo' required rules={[{required:true, 
          message:'Insira o titulo'}]}>
        <Input onChange={handleTitleInputChange} />
        </Form.Item>

        <Form.Item  name='Type' label='Tipo' required rules={[{required:true, 
          message:'informe o tipo'}]}>
        <Input onChange={handleTypeInputChange} />
        </Form.Item>

        <Form.Item  name='category' label='Categoria' required rules={[{required:true, 
          message:'Informe a categoria'}]}>
        <Input onChange={handleCategoryInputChange} />
        </Form.Item>

        <Form.Item name='stageInput' label='Estágio do negócio' required rules={[{required:true, 
          message:'Selecione um dos valores acima!'}]}>
        <Radio.Group onChange={handleStageInputChange} value={stageInput}>
            <Radio value={'NEW'}>Em desenvolvimento</Radio>
            <Radio value={'PREPARATION'}>Criar documentos</Radio>
            <Radio value={'PREPAYMENT_INVOICE'}>Fatura</Radio>
            <Radio value={'EXECUTING'}>Em andamento</Radio>
            <Radio value={'FINAL_INVOICE'}>Fatura final</Radio>
        </Radio.Group> 
        </Form.Item>
        

      <Form.Item name='company' label='Selecione a empresa' required rules={[{required:true, 
          message:'Selecione a empresa'}]}>
      <Select
      defaultValue="Selecione a Empresa"
      style={{ width: 180 }}
      onChange={handleCompanyInputChange}
      options = {companyOptions}
      />
      </Form.Item>     

      <Form.Item name='contact' label='Selecionar o contato' required rules={[{required:true, 
          message:'Selecione o contato'}]}>
      <Select
      defaultValue="Selecione o contato"
      style={{ width: 180 }}
      onChange={handleContactInputChange}
      options = {contactOptions}
      />    
    </Form.Item>

    <Form.Item name='cep' label='CEP' required rules={[{required:true, 
          message:'Informe o CEP'}]}>
        <Input onChange={handleCepInputChange}/>
</Form.Item>

    <Form.Item name='desc' label='Descrição' required rules={[{required:true, 
          message:'Informe a descrição'}]}>
        <Input onChange={handleDescriptionInputChange}/>
</Form.Item>

        <Button htmlType="submit" type="primary" >Criar</Button>
        
        </Form>
        );
    }