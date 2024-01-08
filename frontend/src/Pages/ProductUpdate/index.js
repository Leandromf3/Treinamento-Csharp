import { Alert, Button, Form, Input, InputNumber, Select } from "antd";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useForm } from "antd/es/form/Form";

const ApiHost = 'https://localhost:7178/Product';

export default function Body() {
  const navigate = useNavigate();
  const [dataUpdate, setDataUpdate] = useState({});
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [form] = useForm();
  const {Option} = Select;
  const [formData, setFormData] = useState({
    productName:'',
    productPrice:'',
    productCode:'',
    productQuant:'',
  });
  const params = useParams();

  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      id: params.id,
      productName: dataUpdate.productName || '',
      productPrice: dataUpdate.productPrice || '',
      productCode: dataUpdate.productCode || '',
      productQuant: dataUpdate.productQuant ,
    }));
  }, [dataUpdate]);

  const fetchData = async () => {
    try {
      const response = await axios.get(ApiHost+`Get?id=${params.id}`,{
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

  const handleProductNameInputChange = (e) => {
    console.log(e)
    const {value} = e.target;
    setFormData((prevData)=>({
      ...prevData,
      productName: value
    }));
  }
  
  const handleProductPriceInputChange = (value) => {
    setFormData((prevData)=>({
      ...prevData,
      productPrice: value
    }));  }
  
  const handleProductCodeInputChange = (value) => {
    setFormData((prevData)=>({
      ...prevData,
      productCode: value
    }));  
  }
  const handleProductQuantInputChange = (value) => {
    setFormData((prevData)=>({
      ...prevData,
      productQuant: value
    }));
  }
  
  

  const handleCardClick = () => {
    const data = {
      ...formData,
      informationData: dataUpdate
    };
    companyUpdate(data);
  };

  return ( 
    <>
          {error && <Alert message={error} type="error" showIcon />}
          {success && <Alert message={success} type="success" showIcon />}
        <Form onFinish={handleCardClick} className="">

        <span className='title-Content'>Update produto</span>
        
        <Form.Item className="name-Prod" name='name-Prod' required rules={[{required:true, 
          message:'Digite o nome do produto'}]}>
        <Input className="product-name" placeholder="Nome do produto" prefix={<MedicineBoxOutlined />} onChange={handleProductNameInputChange} />
        </Form.Item>

    <Form.Item className="price" name='Preco' required rules={[{required:true, 
          message:'Informe o preço'}]} >
        <Input className="price" placeholder="Preço" prefix={<TagsOutlined />} onChange={handleProductPriceInputChange} />
    </Form.Item>

    <Form.Item className="codigo" name="codigo" rules={[{required:true, 
          message:'informe o código'}]}>
        <Input className="cod" placeholder="Código" prefix={<BarcodeOutlined   />}  onChange={handleProductCodeInputChange}/>
    </Form.Item>

    <Form.Item className="quantidade" name="quantidade" rules={[{required:true, 
          message:'É necessário digitar a senha novamente'}]}>
        <Input className="quant" placeholder="Quantidade" prefix={<FieldBinaryOutlined />} onChange={handleProductQuantInputChange}/>
    </Form.Item>

          <div className="btn-regis-product">
          <Button htmlType="submit" type="primary" >Criar Produto</Button>
          </div>
        </Form>
    </>
    );
}
