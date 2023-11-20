import React, { useEffect, useState } from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { message, Select, Upload } from 'antd';
const { Dragger } = Upload



function App(){
const [optionsLead, setLeadOptions] = useState([]);
const [selectedLead, setSelectedLead] = useState(null);

const props = {
  name: 'file',
  multiple: false,
  action: `http://localhost:8000/api/bitrix/upload?content=${selectedLead}`,
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
      const resLead = await fetch('http://localhost:8000/api/bitrix' + '/leadList',{
        headers: {Authorization: localStorage.getItem('TOKEN_TEST')}});
      const data = await resLead.json();
      const optionsLead = data.map(lead => ({ value: lead.ID, label: lead.TITLE }));
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
      defaultValue="Selecione o lead para vincular o arquivo"
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