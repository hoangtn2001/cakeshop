const express = require('express');
const route = express.Router();
const cate = require('../model/Category');
const userController = require('../src/app/controllers/userController');
const middlewareController = require('../src/app/controllers/middlewareController');



const { response } = require('express');

route.post('/getinfor/api',middlewareController.verifyTokenUser ,userController.apipostinfor); //api
route.post('/getinfor',userController.postinfor);
route.get('/getinfor/api',middlewareController.verifyTokenUser ,userController.apigetinfor); //api
route.get('/getinfor',userController.getinfor);
route.post('/forgetpass/api',userController.apisendMail); 
route.post('/forgetpass',userController.sendMail);
route.get('/forgetpass',userController.getForgetPasswword);
route.post("/changepass/api",middlewareController.verifyTokenUser ,userController.apipostchangepass); //api
route.post("/changepass",userController.postchangepass);
route.get("/changepass",userController.getchangepass);
route.post('/register/api',userController.apiregisterSuccess); 
route.post('/register',userController.registerSuccess);
route.get('/register',userController.getRegister);
route.post("/api",userController.apiloginSuccess);          
route.get('/logout',userController.apilogOut);
route.post("/",userController.loginSuccess);
route.get('/',userController.getLogin);

module.exports = route;