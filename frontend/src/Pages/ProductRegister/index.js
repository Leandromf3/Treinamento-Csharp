import { Alert, Button, Form, Input, InputNumber, message } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LockOutlined, TagsOutlined , BarcodeOutlined, MedicineBoxOutlined, FieldBinaryOutlined } from '@ant-design/icons';
import './styleRegisterProduct.css';

const ApiHost ='https://localhost:7178/Product';


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
        productName:nameInput,
        productPrice:priceInput,
        productCode:codInput,
        productQuant:quantidadeInput,
    };
    
    const regProduct = async (data)=>{
        const tolkienn = JSON.parse(localStorage.getItem('TOKEN_TEST'));
        const response = await fetch(ApiHost+'/createProduct',{
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ tolkienn.value
            },
            body: JSON.stringify(data)
        })
        const resp = await response.json();
        console.log(resp);
        if(typeof resp.value == 'undefined'){
            setError('Cadastro inválido!');
            setTimeout(() => {
              setError('');
              form.resetFields();
            }, 2000);
            navigate('/home/prodRegister');
           
          }else{
           setSuccess('Cadastrado com sucesso!');
           setTimeout(() => {
            navigate(`/home`, { state: { token: resp } } );
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