import React, { useEffect, useState } from 'react';
import { Link, Outlet, json, useNavigate } from 'react-router-dom';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PlusCircleOutlined,
  UnorderedListOutlined,
  PlusSquareOutlined,
  ToTopOutlined,
  UserAddOutlined,
  PoweroffOutlined,
  QqOutlined,
  CloseOutlined 
} from '@ant-design/icons';
import { Layout, Menu, Button, theme, Spin, Dropdown } from 'antd';

import './styleHome.css';
const { Header, Sider, Content } = Layout;

const App = () => {
  const navigate = useNavigate();
  const logout = () => {
  localStorage.clear();
  navigate('/');
  }
verifyToken();

  
  function verifyToken(){
    const token = JSON.parse(localStorage.getItem('TOKEN_TEST'));
    if(token){
      const today = new Date().getTime();
      if(today < token.time){
        return token.value;
      }else{
        alert('Token expirado!');
        logout();
      }
    }else{
      logout();
    }
  }
let user = '';
const tokenJson = JSON.parse(localStorage.getItem('TOKEN_TEST'));
if(tokenJson == null){
  logout();
}else{
const base64Url = tokenJson.value.split('.')[1];
  if(base64Url){
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const payload = decodeURIComponent(window.atob(base64).split('').map(function(c){
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
  user = JSON.parse(payload); 
  }else{
    logout();
  }
}


function getItem(label, key, icon, children){
    return {
      key, 
      icon, 
      children, 
      label
    };
  }

  
  if(localStorage.getItem('TOKEN_TEST') == null){
    navigate('/');
  }
  
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    setLoading(true)
    setTimeout(()=>{
      setLoading(false);
      
    },2000)
  }, []);  

  const itemsHeader = [
    {
      label: <a href="https://www.antgroup.com">1st menu item</a>,
      key: '0',
    },
    {
      label: <a href="https://www.aliyun.com">2nd menu item</a>,
      key: '1',
    },
    {
      type: 'divider',
    },
    {
      label: '3rd menu item',
      key: '3',
    },
] 

  const items = [
    {
      key: '1',
      icon: <PlusCircleOutlined />,
      label: 'Criar uma venda',
      path: '/home/saleCreate',
      
    },
    {
      key: '2',
      icon: <UnorderedListOutlined/>,
      label: 'Extrato vendas',
      path: '/home/saleList',
    },
    {
      key: '3',
      icon: <PlusCircleOutlined />,
      label: 'Criar um novo Lead',
      path: '/home/leadCreate',
    },
    {
    key: '4',
    icon: <UnorderedListOutlined/>,
    label: 'Exibir Leads',
    path: '/home/leadList',
  },
  {
    key: '5',
    icon: <UnorderedListOutlined/>,
    label: 'Exibir produtos',
    path: '/home/productList'
  },
  {
    key: '6',
    icon:<ToTopOutlined />,
    label: 'Vincular arquivo',
    path: '/home/upload'
  },
  {
    key: '7',
    icon:<UserAddOutlined />,
    label: 'Adicionar contato',
    path: '/home/contactCreate'
  },
  {
    key: '8',
    icon:<UserAddOutlined/>,
    label: 'Usuarios',
    path: '/home/Users'
  },
  {
    key: '9',
    icon:<CloseOutlined/>,
    label: 'Cadastrar produtos',
    path: '/home/prodRegister'
  }
  ];
  return (
    <Layout className=''>  
      <Sider trigger={null} collapsible collapsed={collapsed} className='sider' >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['0']}
          item ={items}
        >
            {items.map((item) => (
              <Menu.Item key={item.key} icon={item.icon}>
                <Link to={item.path}>{item.label}</Link>
              </Menu.Item>
            ))}
            <Menu.Item className='Btn-logout' key="logout" onClick={()=> logout()} icon={<PoweroffOutlined />}>
              Deslogar-se
            </Menu.Item>
        </Menu>
            
      </Sider>
      <Layout>
        <Header
          style={{
            display: 'flex',
            alignItems:'center',
            padding: '5px',
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          <div className='home-name' >
            < span onClick={()=> logout()}><QqOutlined />{user.user_name}</span>
          </div>
         
        </Header>
        <Content className='teste'
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 540,
            background: colorBgContainer,
          }}
        >{
        loading? 
        <Spin tip="Loading" size="small">
        <div className="content" />
      </Spin>:
          <Outlet 
          /> }

        </Content>
      </Layout>
    </Layout>
  );
}; 
export default App;
