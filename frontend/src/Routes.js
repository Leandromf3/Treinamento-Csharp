import React from "react";
import { Routes, Route, BrowserRouter, useLocation } from "react-router-dom";
import Home from './Pages/Home';
import Sale from './Pages/Sale';
import SaleList from './Pages/SaleList';
import DealUpdate from './Pages/DealUpdate';
import Lead from './Pages/Lead';
import LeadList from './Pages/LeadList';
import LeadUpdate from './Pages/LeadUpdate';
import Upload from './Pages/upload';
import Contact from './Pages/Contact';
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
                    <Route exact path = '/home/Lead' element = {<Lead/>}/>
                    <Route exact path = '/home/leadCreate' element = {<Lead/>}/>
                    <Route exact path = '/home/dealUpdate/:id' element = {<DealUpdate/>}/>
                    <Route exact path = '/home/leadList' element = {<LeadList/>}/>
                    <Route exact path = '/home/leadUpdate/:id' element = {<LeadUpdate/>}/>
                    <Route exact path = '/home/upload' element = {<Upload/>}/>
                    <Route exact path = '/home/contactCreate' element = {<Contact/>}/>
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