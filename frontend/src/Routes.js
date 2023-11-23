import React from "react";
import { Routes, Route, BrowserRouter, useLocation } from "react-router-dom";
import Home from './Pages/Home';
import Sale from './Pages/Sale';
import SaleList from './Pages/SaleList';
import Upload from './Pages/upload';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Users from './Pages/Users';
import ProdRegister from './Pages/ProductRegister';
import ProductList from './Pages/ProductList';
import ProductUpdate from './Pages/ProductUpdate';


export default ()=>{
    return(
        <BrowserRouter>
            <Routes>
                <Route exact path = '/' element={<Login/>}></Route> 
                <Route exact path = '/home' element = {<Home/>} >
                    <Route exact path = '/home/saleCreate' element = {<Sale/>}/>
                    <Route exact path = '/home/saleList' element = {<SaleList/>}/>
                    <Route exact path = '/home/upload' element = {<Upload/>}/>
                    <Route exact path = '/home/Users' element = {<Users/>}/>
                    <Route exact path = '/home/prodRegister' element = {<ProdRegister/>}/>
                    <Route exact path = '/home/productList' element = {<ProductList/>}/>
                    <Route exact path = '/home/productUpdate/:id' element = {<ProductUpdate/>}/>
                </Route>
                <Route exact path="/register" element = {<Register/>}/>
        </Routes>
       </BrowserRouter>
    )
}