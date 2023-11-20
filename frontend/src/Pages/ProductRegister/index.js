import { Alert, Button, Form, Input, InputNumber, message } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LockOutlined, TagsOutlined , BarcodeOutlined, MedicineBoxOutlined, FieldBinaryOutlined } from '@ant-design/icons';
import './styleRegisterProduct.css';

const ApiHost ='http://localhost:8000/api/bitrix';


export default function Body(){
    const navigate = useNavigate(); 
    const [nameInput, setNameInput ] = useState('');
    const [priceInput, setPriceInput] = useState('');
    const [codInput, setCodInput] = useState('');
    const [quantidadeInput, setQuantidadeInput] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [form] = Form.useForm();


    const data = {
        name:nameInput,
        price:priceInput,
        codigo:codInput,
        quantidade:quantidadeInput,
    };
    
    const regProduct = async (data)=>{
        console.log(data);
        const response = await fetch(ApiHost+'/productCreate',{
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('TOKEN_TEST')
            },
            body: JSON.stringify(data)
        })
        const resp = await response.json();

        if(resp.error != undefined){
          setError(resp.error.message);
          setTimeout(() => {
            setError('');
            form.resetFields();
          }, 2000);    
        }else{
         setSuccess('Cadastro feito com sucesso!');
         setTimeout(() => {
          setSuccess('');
          navigate('/home/prodRegister');
         }, 2000);
          
        }
    }
    
    const handleNameInputChange = (e) => {
        setNameInput(e.target.value);
    }

    const handlePriceInputChange = (e) => {
        setPriceInput(e.target.value);
    }

    const handleQuantInputChange = (e) => {
        setQuantidadeInput(e.target.value);
    }

    const handleCodInputChange = (e) => {
        setCodInput(e.target.value);
    }

    const handleCardClick = () =>{
        setTimeout(() => {
            regProduct(data);
        }, 2000)
    }

    return( 
      <>
          {error && <Alert message={error} type="error" showIcon />}
          {success && <Alert message={success} type="success" showIcon />}
        <Form onFinish={handleCardClick} className="">
        

        <span className='title-Content'>Registrar produto</span>
        
        <Form.Item className="name-Prod" name='name-Prod' required rules={[{required:true, 
          message:'Digite o nome do produto'}]}>
        <Input className="product-name" placeholder="Nome do produto" prefix={<MedicineBoxOutlined />} onChange={handleNameInputChange} />
        </Form.Item>

    <Form.Item className="price" name='Preco' required rules={[{required:true, 
          message:'Informe o preço'}]} >
        <Input className="price" placeholder="Preço" prefix={<TagsOutlined />} onChange={handlePriceInputChange} />
    </Form.Item>

    <Form.Item className="codigo" name="codigo" rules={[{required:true, 
          message:'informe o código'}]}>
        <Input className="cod" placeholder="Código" prefix={<BarcodeOutlined   />}  onChange={handleCodInputChange}/>
    </Form.Item>

    <Form.Item className="quantidade" name="quantidade" rules={[{required:true, 
          message:'É necessário digitar a senha novamente'}]}>
        <Input className="quant" placeholder="Quantidade" prefix={<FieldBinaryOutlined />} onChange={handleQuantInputChange}/>
    </Form.Item>

          <div className="btn-regis-product">
          <Button htmlType="submit" type="primary" >Criar Produto</Button>
          </div>
        </Form>
        </>
        );
    }