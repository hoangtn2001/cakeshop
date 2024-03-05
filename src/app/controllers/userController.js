const express = require('express');
const app = express();
const dboperations = require('../../../dboperations/dbop_user'); 
const body = require('body-parser');
const { json } = require('body-parser');
const nodemailer =  require('nodemailer');
const axios = require('axios');
app.use(body.urlencoded({extended: true}));
app.use(body.json());
const env = require('dotenv');
let link = process.env.Link_local;
const jwt = require("jsonwebtoken");


class user {
    getRegister(req, res, next){
        res.render('dangky');
    }
    getLogin(req, res, next){                                                                                     
            res.render('dangnhap');        
    }  
    apiloginSuccess(req, res, next){ 
        let user = req.body.user;
        let password = req.body.password;
        dboperations.checkLogin(user,password).then(result=>{
            if(result[2])
            {    
                  if(result[2] == 1) {
                    let token = result[0];
                    let refreshToken = result[1];
                    let role = result[2];
                    res.status(200).send({token,refreshToken,role});
                  }
                  else if(result[2] == 2){
                    let token = result[0];
                    let refreshToken = result[1];
                    let role = result[2];
                    res.status(200).send({token,refreshToken,role});
                  }     
                  else{
                    res.status(401).json('lỗi');
                  }                                      
            }
            else{
                res.status(401).json("lỗi");
            }
        })    
} 
loginSuccess(req, res, next){ 
    let user = req.body.username;
    let password = req.body.password;
    axios.post(`${link}/login/api`,{user,password},{ withCredentials: true})
    .then(function (response) {
        res.cookie("Token",response.data.token, {
            httpOnly: true,
            secure:false,
             withCredentials: true,
            path: "/",
            sameSite: "strict",
          }); 
          res.cookie("refreshToken",response.data.refreshToken, {
              httpOnly: true,
              secure:false,
               withCredentials: true,
              path: "/",
              sameSite: "strict",
            });
    if(response.data.role == 1)
    {
        res.redirect('/admin');
    }
    else if(response.data.role == 2)
    {
        res.redirect('/cakeshop')
    }
    }).catch(function (error) {
        let message = 'Sai tên đăng nhập, hoặc mật khẩu';
        res.render('dangnhap',{message});
        console.log(error);
      })     
} 


apiregisterSuccess(req, res, next){ 
    let email = req.body.email;
    let name = req.body.name;
    let password = req.body.password;
    let address = req.body.address;
    let phone = req.body.phone;
    let sex = req.body.sex;
    dboperations.addUser(email, name, phone, sex, password, address).then(result=>{  
        if(result == true)
        {
            res.status(200).send({result});
        }
        else{
            res.status(200).send({result});
        }
    })     
} 
registerSuccess(req, res, next){ 
    let email = req.body.email;
    let name = req.body.fullname;
    let password = req.body.password;
    let address = req.body.address;
    let phone = req.body.phone;
    let sex = req.body.sex;
    axios.post(`${link}/login/register/api`,{email,name,password,address,phone,sex})
    .then(function (response) {
        if(response.data.result == true)
        {
            res.redirect("/login");
        }
        else{
            let message = "Đăng ký thất bại, có thể Email này đã được sử dụng, mời bạn thử lại!!";
            res.render('dangky',{message});
        }
   
    }).catch(function (error) {
        console.log(error);
      })       
} 



apilogOut(req, res, next){
    dboperations.logOut().then(result =>{
        res.clearCookie("Token");
        res.clearCookie("refreshToken");
        res.redirect('/login');
    })
}
getForgetPasswword(req, res, next){
    res.render('quenmatkhau');
}
getchangepass(req,res){
    res.render('doimatkhau');
}
apigetinfor(req,res){
    const token = req.headers.token;
    const accessToken = token.split(" ")[1];
    const checkToken = jwt.verify(accessToken, process.env.JWT_ACCESS_KEY);
    let id_user= checkToken.id;
    dboperations.getinfor(id_user).then(result =>{
        let user = result;
        res.status(200).send({user})
})  
}
getinfor(req,res){
    const refreshToken = req.cookies.refreshToken;
    axios.get(`${link}/login/getinfor/api`,{headers:{token: req.cookies.Token, refress: req.cookies.refreshToken}})
    .then(function (response) {
        let user = response.data.user;
        const token = req.cookies.Token;
      let name = '';
      if(token){
        const accessToken = token.split(" ")[1];
        const checkToken = jwt.verify(accessToken, process.env.JWT_ACCESS_KEY);
        name = checkToken.name;
      }
        res.render('thongtintaikhoan',{user, name});
   
    }).catch(function (error) {
        if(error.response.status == 403){
    dboperations.requestRefreshToken(refreshToken).then(result =>{
        console.log(result);
        if(result == 2){
            res.status(401).json("You're not authenticated");
        }
        if(result == 3){
            res.status(403).json("Refresh token is not valid");
        }
    res.cookie("Token",result[0], {
        httpOnly: true,
        secure:false,
        path: "/",
        sameSite: "strict",
      }); 
      res.cookie("refreshToken",result[1], {
          httpOnly: true,
          secure:false,
          path: "/",
          sameSite: "strict",
        }); 
   res.redirect('/login/getinfor');   
})
.catch(function (error){
    res.redirect('/login');
    console.log(error)
})
        }else{
            res.redirect('/login');
            console.log(error);
        }
       
      })        
}

apipostinfor(req,res){
    const token = req.body.token;
    const accessToken = token.split(" ")[1];
    const checkToken = jwt.verify(accessToken, process.env.JWT_ACCESS_KEY);
    let id_user= checkToken.id;
    let name = req.body.name;
    let address = req.body.address;
    let phone = req.body.phone;
    let sex = req.body.sex;
    dboperations.postinfor(id_user,name,address,phone,sex).then(result =>{
        if(result == true)
        {
            res.status(200).send({result});
        }
        else{
            let message = "Cập nhật thất bại";
            res.status(200).send({message});
        }
        
})  
}
postinfor(req,res){
    const refreshToken = req.cookies.refreshToken;
    const token = req.cookies.Token;
    const accessToken = token.split(" ")[1];
    const checkToken = jwt.verify(accessToken, process.env.JWT_ACCESS_KEY);
    let id_user= checkToken.id;
    let name = req.body.fullname;
    let address = req.body.address;
    let phone = req.body.phone;
    let sex = req.body.sex;
    axios.post(`${link}/login/getinfor/api`,{token,name,address,phone,sex},{headers:{token: req.cookies.Token}})
    .then(function (response) {
        if(response.data.result == true)
        {
            res.redirect("/login/getinfor");
        }
        else{
            let message = response.data.message;
            const token = req.cookies.Token;
      let name = '';
      if(token){
        const accessToken = token.split(" ")[1];
        const checkToken = jwt.verify(accessToken, process.env.JWT_ACCESS_KEY);
        name = checkToken.name;
      }
            res.render('thongtintaikhoan',{message, name});
        }
   
    }).catch(function (error) {
        if(error.response.status == 403){
            dboperations.requestRefreshToken(refreshToken).then(result =>{
                console.log(result);
                if(result == 2){
                    res.status(401).json("You're not authenticated");
                }
                if(result == 3){
                    res.status(403).json("Refresh token is not valid");
                }
            res.cookie("Token",result[0], {
                httpOnly: true,
                secure:false,
                path: "/",
                sameSite: "strict",
              }); 
              res.cookie("refreshToken",result[1], {
                  httpOnly: true,
                  secure:false,
                  path: "/",
                  sameSite: "strict",
                }); 
           res.redirect('/login/getinfor');   
        })
        .catch(function (error){
            res.redirect('/login');
            console.log(error)
        })
                }else{
                    res.redirect('/login');
                    console.log(error);
                }
              
      })        
}

apipostchangepass(req, res, next){ 
    let oldpass = req.body.oldpass;
   let password = req.body.password;
   const token = req.body.token;
    const accessToken = token.split(" ")[1];
    const checkToken = jwt.verify(accessToken, process.env.JWT_ACCESS_KEY);
    let id_user= checkToken.id;
    let message;
    dboperations.updatePass(id_user, password, oldpass).then(result=>{  
        if(result == true)
        {
            res.status(200).send({result});
     
        }
        else{
            message = "Đổi mật khẩu thất bại! vui lòng thử lại";
            res.status(200).send({message});
       
        }
    })   
} 
postchangepass(req, res, next){ 
    const refreshToken = req.cookies.refreshToken;
    let oldpass = req.body.old;
   let password = req.body.new;
   const token = req.cookies.Token;
    axios.post(`${link}/login/changepass/api`,{token,oldpass,password}, {headers:{token: req.cookies.Token}})
    .then(function (response) {
        if(response.data.result == true)
        {
            res.redirect("/login");
        }
        else{
            let message = response.data.message;
            const token = req.cookies.Token;
      let name = '';
      if(token){
        const accessToken = token.split(" ")[1];
        const checkToken = jwt.verify(accessToken, process.env.JWT_ACCESS_KEY);
        name = checkToken.name;
      }
            res.render('doimatkhau',{message, name});
        }
   
    }).catch(function (error) {
        if(error.response.status == 403){
            dboperations.requestRefreshToken(refreshToken).then(result =>{
                console.log(result);
                if(result == 2){
                    res.status(401).json("You're not authenticated");
                }
                if(result == 3){
                    res.status(403).json("Refresh token is not valid");
                }
            res.cookie("Token",result[0], {
                httpOnly: true,
                secure:false,
                path: "/",
                sameSite: "strict",
              }); 
              res.cookie("refreshToken",result[1], {
                  httpOnly: true,
                  secure:false,
                  path: "/",
                  sameSite: "strict",
                }); 
           res.redirect('/login/changepass');   
        })
        .catch(function (error){
            res.redirect('/login');
            console.log(error)
        })
                }else{
                    res.redirect('/login');
                    console.log(error);
                }
        
      })        
} 


apisendMail(req, res) {
    let email = req.body.email;
    dboperations.forgotpass(email).then(result =>{
        if(result == false)
        {
            res.status(200).send({result});
        }
        else{
            var transporter =  nodemailer.createTransport({ // config mail server
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                    user: 'trinhnam011a@gmail.com', //Tài khoản gmail vừa tạo
                    pass: 'zoxglithypvmnxsr' //Mật khẩu tài khoản gmail vừa tạo
                },
                tls: {
                    // do not fail on invalid certs
                    rejectUnauthorized: false
                }
            });
            var mainOptions = { // thiết lập đối tượng, nội dung gửi mail
                from: 'Hệ thống bánh ShopCake',
                to: email,
                subject: 'Hệ thống bánh ShopCake',
                text: "Mật khẩu của bạn tạm thời là: " + result,             
            }
            transporter.sendMail(mainOptions, function(err, info){
                if (err) {
                    console.log(err);
                    res.redirect('/login');
                } else {
                    console.log('Message sent: ' +  info.response);
                    res.redirect('/login');
                }
            });
            res.status(200).send({result});
        }
    });
}

sendMail(req, res) {
    let email = req.body.email;
    axios.post(`${link}/login/forgetpass/api`,{email})
    .then(function (response) {
        if(response.data.result == false)
        {
            let message = "Email có thể không đúng! Vui lòng thử lại!";
            res.render('quenmatkhau',{message});
           
        }
        else{
            res.redirect("/login");
        }
   
    }).catch(function (error) {
        console.log(error);
      })     
    
}
}

module.exports = new user;