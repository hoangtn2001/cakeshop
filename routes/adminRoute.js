const express = require('express');
const route = express.Router();
const cate = require('../model/Category');
const adminController = require('../src/app/controllers/adminController');
const middlewareController = require('../src/app/controllers/middlewareController');
const multipleUploadController = require('../src/app/controllers/multipleUploadController');

route.get('/lock/apilock/:iduser/:state',middlewareController.verifyTokenAdmin,adminController.apilockuser);
route.get('/lock/:iduser/:state',adminController.lockuser);
route.get('/fepro/apifepro/:idpro/:state',middlewareController.verifyTokenAdmin,adminController.apifepro);
route.get('/fepro/:idpro/:state',adminController.fepro);
route.get('/prostate/apiprostate/:idpro/:state',middlewareController.verifyTokenAdmin,adminController.apiprostate);
route.get('/prostate/:idpro/:state',adminController.prostate);
route.get('/destroybill/apidestroubill/:id',middlewareController.verifyTokenAdmin,adminController.apisendMail);
route.get('/destroybill/:id',adminController.sendMail);
route.get('/confirm/apiconfirm/:id',middlewareController.verifyTokenAdmin,adminController.apiupState);
 route.get('/confirm/:id',adminController.upState);
 route.get('/confirms/apiconfirms/:id/:btn',middlewareController.verifyTokenAdmin,adminController.apiupStates);
 route.get('/confirms/:id/:btn',adminController.upStates);

route.post('/multipleUpload/:id', multipleUploadController.multipleUpload);
 route.post('/product/admin/multipleUpload/:id', multipleUploadController.multipleUpload);
route.post("/product/add/apiadd",middlewareController.verifyTokenAdmin,adminController.apiaddproduct);
route.post("/product/add",adminController.addproduct);
route.get("/product/add/apiadd",middlewareController.verifyTokenAdmin,adminController.apigetaddproduct);
route.get("/product/add",adminController.getaddproduct);
route.get('/product/apiproduct',middlewareController.verifyTokenAdmin,adminController.apigetproduct);
route.get('/product',adminController.getproduct);

route.get('/category/apicate',middlewareController.verifyTokenAdmin,adminController.apigetcategory);
route.get('/category/apiprocart/:id',middlewareController.verifyTokenAdmin,adminController.apigetprooncate);
route.get('/category/procart/:id',adminController.getprooncate);
 route.get('/category',adminController.getcategory);
 route.post('/category/update/apiup/:id',middlewareController.verifyTokenAdmin,adminController.apiupdatecate);
 route.post('/category/update/:id',adminController.updatecate);
 route.post('/category/delete/apidele/:id',middlewareController.verifyTokenAdmin,adminController.apideletecate);
route.post('/category/delete/:id',adminController.deletecate);
route.post('/category/apiaddcate/add',middlewareController.verifyTokenAdmin,adminController.apiaddcate);
 route.post('/category/add',adminController.addcate);

route.get('/bill/apibill/:id',middlewareController.verifyTokenAdmin,adminController.apigetAllBill);
 route.get('/bill/:id',adminController.getAllBill);

 route.get('/product/search/apisearch',middlewareController.verifyTokenAdmin,adminController.apigetprosearch);
 route.get('/product/search',adminController.getprosearch);
 route.get('/search/api',middlewareController.verifyTokenAdmin,adminController.apigetUsearch);
route.get('/search',adminController.getUsearch);

route.get('/revenue/api',middlewareController.verifyTokenAdmin, adminController.apirevenue);
 route.get('/revenue', adminController.revenue);
route.get('/comment/apifeedback/:id',middlewareController.verifyTokenAdmin, adminController.apigetcomment);
 route.get('/comment/:id', adminController.getcomment);

route.post('/delete/apidelete/:id',middlewareController.verifyTokenAdmin,adminController.apideletepro);
route.post('/delete/:id',adminController.deletepro);
route.post('/update/apiupdate/:id',middlewareController.verifyTokenAdmin,adminController.apiupdatepro);
 route.post('/update/:id',adminController.updatepro);

route.get('/probill/apiprobill/:user/:cart',middlewareController.verifyTokenAdmin, adminController.apigetProUs);
 route.get('/probill/:user/:cart', adminController.getProUs);
route.get('/ubill/apiubill/:id',middlewareController.verifyTokenAdmin,adminController.apigetBill);
route.get('/ubill/:id',adminController.getBill);
route.get('/apiuser',middlewareController.verifyTokenAdmin,adminController.apigetUser);
route.get('/',adminController.getUser);

module.exports = route;