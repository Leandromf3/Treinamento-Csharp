import React, { useEffect, useState } from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { message, Select, Upload } from 'antd';
const { Dragger } = Upload

const ApiHost = 'https://localhost:7178/Sale';
const ApiHost2 = 'https://localhost:7178/User';

function App(){
const [optionsLead, setLeadOptions] = useState([]);
const [selectedLead, setSelectedLead] = useState(null);

const tolkienn = JSON.parse(localStorage.getItem('TOKEN_TEST'));

const props = {
  name: 'file',
  multiple: false,
  action: `${ApiHost}/upload?content=${selectedLead}`,
  headers:{'Authorization': localStorage.getItem('TOKEN_TEST')},
  onChange(info) {
    const { status } = info.file;
    console.log(info.file);
    if (status !== 'uploading') {
      //console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} arquivo enviado!`);
      const formData = new FormData();
      formData.append('file', info.file.originFileOjb);
      formData.append('leadId', selectedLead);
    } else if (status === 'error') {
      message.error(`${info.file.name} ocorreu um erro ao enviar o arquivo!`);
    }
  },
  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files);
  },
  onDrop(e){
    console.log('Dropped files', e.dataTransfer.files);
  }
};

useEffect(() => {
  const fetchLead = async () => {
    try {
      const resLead = await fetch(ApiHost2 + '/getUsers',{
        headers: {Authorization: 'Bearer '+ tolkienn.value}});
      const data = await resLead.json();
      const optionsLead = data.map(users => ({ value: users.sT_EMAIL, label: users.sT_LOGIN }));
      console.log(data)
      setLeadOptions(optionsLead);
    } catch (error) {
      console.error('Erro ao obter as empresas:', error);
    }
  };

  fetchLead();
}, []);
  

return(
<>
<Select
      defaultValue="Selecione a venda para vincular o arquivo"
      style={{ width: 300 }}
      onChange={(value) => setSelectedLead(value)}
      options = {optionsLead}
      />
  <Dragger {...props}>
    <p className="ant-upload-drag-icon">
      <InboxOutlined />
    </p>
    <p className="ant-upload-text">Clique aqui ou arraste seu arquivo</p>
    <p className="ant-upload-hint">
      Por favor verifique todas as informações do arquivo que sera enviado.
      <br/>
      Não é permitido qualquer tipo de upload de informações confidenciais</p>
  </Dragger>
  <p/>

  
</>
)
};
export default App;