const express = require('express');
const route = express.Router();
const cate = require('../model/Category');
const trangchuController = require('../src/app/controllers/trangchuController');
const multipleUploadController = require('../src/app/controllers/multipleUploadController');
const middlewareController = require('../src/app/controllers/middlewareController');

let fs = require('fs');
const { response, Router } = require('express');

route.get('/product/api/:idcate', trangchuController.apigethomeproduct);       
route.get('/product/api', trangchuController.apigethomeproduct);             
route.get('/product/category/:idcate',trangchuController.gethomeproduct);

route.get('/product/id/api/:Id_product',trangchuController.apigetProductById); 
route.get('/product/id/:Id_product',trangchuController.getProductById);
route.get('/product/search',trangchuController.gethomeproduct);
route.get('/product', trangchuController.gethomeproduct);

route.get('/cart/inf/confirm/delete/api/:id',middlewareController.verifyTokenUser ,trangchuController.apideleteBill); //api
route.get('/cart/inf/confirm/delete/:id',trangchuController.deleteBill); 
route.get('/cart/inf/api/:detail',middlewareController.verifyTokenUser , trangchuController.apigetcartinf); //api
route.get('/cart/infapi/:detail/:id',middlewareController.verifyTokenUser , trangchuController.apigetDetailBill); //api
route.get('/cart/inf/:detail/:id', trangchuController.getDetailBill);
route.post('/cart/inf/api',middlewareController.verifyTokenUser , trangchuController.apipostcartinf); //api

route.post('/cart/inf', trangchuController.postcartinf);

route.get('/cart/inf/:detail', trangchuController.getcartinf);
route.get('/cart/api',middlewareController.verifyTokenUser , trangchuController.apigetcart); //api
route.post('/cart/api',middlewareController.verifyTokenUser , trangchuController.apipostcart); // api
route.get('/cart/apidele/:id', middlewareController.verifyTokenUser, trangchuController.apideleteproductcart); //api
route.get('/cart/:id', trangchuController.deleteproductcart);


route.get('/cart', trangchuController.getcart);
route.post('/cart', trangchuController.postcart);

route.get('/introduce',trangchuController.getintroduce);
route.get("/history/api",middlewareController.verifyTokenUser,trangchuController.apihistory); //api
route.get("/history",trangchuController.history);

route.post('/contact/api',middlewareController.verifyTokenUser,trangchuController.apipostContact); //api
route.post('/contact',trangchuController.postContact);
route.get('/contact',trangchuController.getcontact);

route.get('/api',trangchuController.apigethome); 
route.get('/',trangchuController.gethome);


module.exports = route;