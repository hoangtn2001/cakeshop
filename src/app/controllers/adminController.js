const express = require('express');
const app = express();
//const dboperationss = require('../../../dboperations/dbop_user'); 
const dboperations = require('../../../dboperations/dbop_admin.js'); 
const dboperationss = require('../../../dboperations/dbop_user'); 
const multipleUploadController = require('./multipleUploadController');
const body = require('body-parser');
const { json } = require('body-parser');
const nodemailer =  require('nodemailer');
const axios = require('axios');
app.use(body.urlencoded({extended: true}));
app.use(body.json());
const jwt = require("jsonwebtoken")
const env = require('dotenv');
let link = process.env.Link_local;

class admin{

    apigetUser(req,res){
        dboperations.getUser().then(result=>{
        res.status(200).send({result});   
    })
}


    getUser(req, res, next){ 
        axios.get(`${link}/admin/apiuser`,{headers:{token: req.cookies.Token, refress: req.cookies.refreshToken}})
        .then(function (response) {
            let result = response.data.result;
          const token = req.cookies.Token;
          const refreshToken = req.cookies.refreshToken;
          try{
          let name = '';
          if(token){
            const accessToken = token.split(" ")[1];
            const checkToken = jwt.verify(accessToken, process.env.JWT_ACCESS_KEY);
            name = checkToken.name;
          }
          res.render('ADkhachhang',{result, name});
        }catch(error){
          if(token){
            dboperationss.requestRefreshToken(refreshToken).then(result =>{
            //  console.log(result);
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
         res.redirect('/admin');   
      })
      .catch(function (error){
          res.redirect('/login');
          console.log(error)
      })
    }
        } 
        })
        .catch(function (error) {
          console.log(error);
        })    
    //     dboperations.getUser().then(result=>{
    //         const token = req.cookies.Token;
    //         let name = '';
    //         if(token){
    //           const accessToken = token.split(" ")[1];
    //           const checkToken = jwt.verify(accessToken, process.env.JWT_ACCESS_KEY);
    //           name = checkToken.name;
    //         }
    //     res.render('ADkhachhang',{result, name});
    // })
    }

    apigetBill(req, res, next){ 
        let idUser = req.params.id;
        dboperations.getBill(idUser).then(result=>{
        res.status(200).send({result});
    })
    }

    getBill(req, res, next){ 
        let idUser = req.params.id;
        axios.get(`${link}/admin/ubill/apiubill/${idUser}`,{headers:{token: req.cookies.Token, refress: req.cookies.refreshToken}})
        .then(function (response) {
            let result = response.data.result;
          const token = req.cookies.Token;
          const refreshToken = req.cookies.refreshToken;
          try{
          let name = '';
          if(token){
            const accessToken = token.split(" ")[1];
            const checkToken = jwt.verify(accessToken, process.env.JWT_ACCESS_KEY);
            name = checkToken.name;
          }
          res.render('ADdonhangcuakhach',{result, name});
        }catch(error){
          if(token){
            dboperationss.requestRefreshToken(refreshToken).then(result =>{
            //  console.log(result);
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
         res.redirect('/admin');   
      })
      .catch(function (error){
          res.redirect('/login');
          console.log(error)
      })
    }
        } 
        })
        .catch(function (error) {
          console.log(error);
        })    

        // let idUser = req.params.id;
        // dboperations.getBill(idUser).then(result=>{
        //     const token = req.cookies.Token;
        //     let name = '';
        //     if(token){
        //       const accessToken = token.split(" ")[1];
        //       const checkToken = jwt.verify(accessToken, process.env.JWT_ACCESS_KEY);
        //       name = checkToken.name;
        //     }
        
    //})
    }


    apigetProUs(req, res, next){ 
        let idUser = req.params.user;
        let idcar = req.params.cart;
        dboperations.getpro(idUser,idcar).then(result=>{
           
        res.status(200).send({result});
    })
    }
    getProUs(req, res, next){ 
        let idUser = req.params.user;
        let idcar = req.params.cart;
        axios.get(`${link}/admin/probill/apiprobill/${idUser}/${idcar}`,{headers:{token: req.cookies.Token, refress: req.cookies.refreshToken}})
        .then(function (response) {
            let result = response.data.result;
          const token = req.cookies.Token;
          const refreshToken = req.cookies.refreshToken;
          try{
          let name = '';
          if(token){
            const accessToken = token.split(" ")[1];
            const checkToken = jwt.verify(accessToken, process.env.JWT_ACCESS_KEY);
            name = checkToken.name;
          }
          res.render('ADsanphamcuakhach',{result, name});
        }catch(error){
          if(token){
            dboperationss.requestRefreshToken(refreshToken).then(result =>{
            //  console.log(result);
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
         res.redirect('/admin');   
      })
      .catch(function (error){
          res.redirect('/login');
          console.log(error)
      })
    }
        } 
        })
        .catch(function (error) {
          console.log(error);
        })    
 
    //     dboperations.getpro(idUser,idcar).then(result=>{
    //         const token = req.cookies.Token;
    //         let name = '';
    //         if(token){
    //           const accessToken = token.split(" ")[1];
    //           const checkToken = jwt.verify(accessToken, process.env.JWT_ACCESS_KEY);
    //           name = checkToken.name;
    //         }
    //     res.render('ADsanphamcuakhach',{result, name});
    // })
    }

    apiupState(req, res, next){ 
        let idbill = req.params.id;
        dboperations.upState(idbill).then(result=>{
        res.status(200).send({result});
    })
    }
    upState(req, res, next){ 
        let idbill = req.params.id;
            axios.get(`${link}/admin/confirm/apiconfirm/${idbill}`,{headers:{token: req.cookies.Token, refress: req.cookies.refreshToken}})
            .then(function (response) {
                let result = response.data.result;
              const token = req.cookies.Token;
              const refreshToken = req.cookies.refreshToken;
              try{
              let name = '';
              if(token){
                const accessToken = token.split(" ")[1];
                const checkToken = jwt.verify(accessToken, process.env.JWT_ACCESS_KEY);
                name = checkToken.name;
              }
              res.redirect(`/admin/ubill/${result}`);
            }catch(error){
              if(token){
                dboperationss.requestRefreshToken(refreshToken).then(result =>{
                //  console.log(result);
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
             res.redirect('/admin');   
          })
          .catch(function (error){
              res.redirect('/login');
              console.log(error)
          })
              }
            } 
            })
            .catch(function (error) {
              console.log(error);
            })    
        }
    apiupStates(req, res, next){ 
        let idbill = req.params.id;
        dboperations.upState(idbill).then(result=>{
            let thongbao = "thành công";
        res.status(200).send("thongbao");
    })
    }
    upStates(req, res, next){ 
        let idbill = req.params.id;
        let btn = req.params.btn;
        axios.get(`${link}/admin/confirms/apiconfirms/${idbill}/${btn}`,{headers:{token: req.cookies.Token, refress: req.cookies.refreshToken}})
        .then(function (response) {
          const token = req.cookies.Token;
          const refreshToken = req.cookies.refreshToken;
          try{
          let name = '';
          if(token){
            const accessToken = token.split(" ")[1];
            const checkToken = jwt.verify(accessToken, process.env.JWT_ACCESS_KEY);
            name = checkToken.name;
          }
          res.redirect(`/admin/ubill/${btn}`);
        }catch(error){
          if(token){
            dboperationss.requestRefreshToken(refreshToken).then(result =>{
            //  console.log(result);
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
         res.redirect('/admin');   
      })
      .catch(function (error){
          res.redirect('/login');
          console.log(error)
      })
          }
        } 
        })
        .catch(function (error) {
          console.log(error);
        })    
     
    }
    
    apisendMail(req, res) {
        let idBill = req.params.id;
        dboperations.destroyBill(idBill).then(result =>{
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
                    to: result[0].Email,
                    subject: 'Hệ thống bánh ShopCake',
                    text: `Đơn hàng có mã đơn: ${result[0].Id_bill}, tổng giá: ${result[0].Pay} VND, mua ngày: ${result[0].Date}, của bạn đã bị hủy ! xin lỗi vì trải nghiệm không tốt này, mời bạn đặt lại đơn hàng mới !!! `,             
                }
                transporter.sendMail(mainOptions, function(err, info){
                    if (err) {
                        console.log(err);
                        let a = 1;
                        res.status(200).send({a});
                    } else {
                        //console.log('Message sent: ' +  info.response);
                        let a = result[0].Id_user;
                        res.status(200).send({a});
                        res.redirect(`/admin/ubill/${result[0].Id_user}`);
                    }
                });
    
            
        });
    }

    sendMail(req, res) {
        let idBill = req.params.id;
        axios.get(`${link}/admin/destroybill/apidestroubill/${idBill}`,{headers:{token: req.cookies.Token, refress: req.cookies.refreshToken}})
        .then(function (response) {
            let result = response.data.a;
          try{
          if(result == 1){
            res.redirect('/admin');
          }
          else{
            res.redirect(`/admin/ubill/${result[0]}`);
          }
        }catch(error){
          if(token){
            dboperationss.requestRefreshToken(refreshToken).then(result =>{
            //  console.log(result);
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
         res.redirect('/admin');   
      })
      .catch(function (error){
          res.redirect('/login');
          console.log(error)
      })
    }
        } 
        })
        .catch(function (error) {
          console.log(error);
        })    
        // dboperations.destroyBill(idBill).then(result =>{
        //         var transporter =  nodemailer.createTransport({ // config mail server
        //             host: 'smtp.gmail.com',
        //             port: 465,
        //             secure: true,
        //             auth: {
        //                 user: 'trinhnam011a@gmail.com', //Tài khoản gmail vừa tạo
        //                 pass: 'zoxglithypvmnxsr' //Mật khẩu tài khoản gmail vừa tạo
        //             },
        //             tls: {
        //                 // do not fail on invalid certs
        //                 rejectUnauthorized: false
        //             }
        //         });
        //         var mainOptions = { // thiết lập đối tượng, nội dung gửi mail
        //             from: 'Hệ thống bánh ShopCake',
        //             to: result[0].Email,
        //             subject: 'Hệ thống bánh ShopCake',
        //             text: `Đơn hàng có mã đơn: ${resul[0].Id_bill}, tổng giá: ${result[0].Pay} VND, mua ngày: ${result[0].Date}, của bạn đã bị hủy ! xin lỗi vì trải nghiệm không tốt này, mời bạn đặt lại đơn hàng mới !!! `,             
        //         }
        //         transporter.sendMail(mainOptions, function(err, info){
        //             if (err) {
        //                 console.log(err);
        //                 res.redirect('/admin');
        //             } else {
        //                 //console.log('Message sent: ' +  info.response);
        //                 res.redirect(`/admin/ubill/${result[0].Id_user}`);
        //             }
        //         });
    
            
        // });
    }

    apilockuser(req, res, next){ 
        let iduser = req.params.iduser;
        let state = req.params.state;
        dboperations.lockuser(iduser,state).then(result=>{
        res.status(200).send({result});
    })
    }
    lockuser(req, res, next){ 
        let iduser = req.params.iduser;
        let state = req.params.state;

        axios.get(`${link}/admin/lock/apilock/${iduser}/${state}`,{headers:{token: req.cookies.Token, refress: req.cookies.refreshToken}})
        .then(function (response) {
          const token = req.cookies.Token;
          const refreshToken = req.cookies.refreshToken;
          try{
          let name = '';
          if(token){
            const accessToken = token.split(" ")[1];
            const checkToken = jwt.verify(accessToken, process.env.JWT_ACCESS_KEY);
            name = checkToken.name;
          }
          res.redirect("/admin");
        }catch(error){
          if(token){
            dboperationss.requestRefreshToken(refreshToken).then(result =>{
            //  console.log(result);
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
         res.redirect('/admin');   
      })
      .catch(function (error){
          res.redirect('/login');
          console.log(error)
      })
          }
        } 
        })
        .catch(function (error) {
          console.log(error);
        })    
    //     dboperations.lockuser(iduser,state).then(result=>{
    //     res.redirect("/admin");
    // })
    }

    apigetproduct(req, res, next){ 
        dboperations.getproduct().then(result=>{
        res.status(200).send({result});
    })
    }

    getproduct(req, res, next){ 
        axios.get(`${link}/admin/product/apiproduct`,{headers:{token: req.cookies.Token, refress: req.cookies.refreshToken}})
        .then(function (response) {
            let result = response.data.result;
          const token = req.cookies.Token;
          const refreshToken = req.cookies.refreshToken;
          try{
          let name = '';
          if(token){
            const accessToken = token.split(" ")[1];
            const checkToken = jwt.verify(accessToken, process.env.JWT_ACCESS_KEY);
            name = checkToken.name;
          }
          res.render('ADsanpham',{result, name});
        }catch(error){
          if(token){
            dboperationss.requestRefreshToken(refreshToken).then(result =>{
            //  console.log(result);
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
         res.redirect('/admin');   
      })
      .catch(function (error){
          res.redirect('/login');
          console.log(error)
      })
          }
        } 
        })
        .catch(function (error) {
          console.log(error);
        })    
    }

    apifepro(req, res, next){ 
        let idpro = req.params.idpro;
        let state = req.params.state;
        dboperations.fepro(idpro,state).then(result=>{
        res.status(200).send({result});
    })
    }
    fepro(req, res, next){ 
        let idpro = req.params.idpro;
        let state = req.params.state;

        axios.get(`${link}/admin/fepro/apifepro/${idpro}/${state}`,{headers:{token: req.cookies.Token, refress: req.cookies.refreshToken}})
        .then(function (response) {
            let result = response.data.result;
          const token = req.cookies.Token;
          const refreshToken = req.cookies.refreshToken;
          try{
          let name = '';
          if(token){
            const accessToken = token.split(" ")[1];
            const checkToken = jwt.verify(accessToken, process.env.JWT_ACCESS_KEY);
            name = checkToken.name;
          }
          res.redirect("/admin/product");
        }catch(error){
          if(token){
            dboperationss.requestRefreshToken(refreshToken).then(result =>{
            //  console.log(result);
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
         res.redirect('/admin');   
      })
      .catch(function (error){
          res.redirect('/login');
          console.log(error)
      })
          }
        } 
        })
        .catch(function (error) {
          console.log(error);
        })    
    }

    apiupdatepro(req, res, next){ 
        let idpro = req.body.idpro;
        let namepro = req.body.namepro;
        let descri = req.body.descri;
        let price = req.body.price;
        let quantity = req.body.quantity;
        let quantity_bought = req.body.quantity_bought;
        dboperations.updatepro(idpro, namepro,descri,price,quantity,quantity_bought).then(result=>{
        res.status(200).send({result});
    })
    }

    updatepro(req, res, next){ 
      let idpro = req.params.id;
      let namepro = req.body.name;
      let descri = req.body.descri;
      let price = req.body.price;
      let quantity = req.body.quantity;
      let quantity_bought = req.body.quantity_bought;
     price = price.split('.');
     var pri = ''
     for(let i = 1; i<price.length;i++){
      price[0] = `${price[0]}${price[i]}`;
      pri = price[0];
     }
     price = pri*1;
     if(idpro == -1)
     {
      res.redirect("/admin/product");
     }
     else{
     axios.post(`${link}/admin/update/apiupdate/${idpro}`,{idpro, namepro,descri,price,quantity,quantity_bought},{headers:{token: req.cookies.Token, refress: req.cookies.refreshToken}})
     .then(function (response) {
         let result = response.data.result;
       const token = req.cookies.Token;
       const refreshToken = req.cookies.refreshToken;
       try{
       let name = '';
       if(token){
         const accessToken = token.split(" ")[1];
         const checkToken = jwt.verify(accessToken, process.env.JWT_ACCESS_KEY);
         name = checkToken.name;
       }
       res.redirect("/admin/product");
     }catch(error){
       if(token){
         dboperationss.requestRefreshToken(refreshToken).then(result =>{
         //  console.log(result);
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
      res.redirect('/admin');   
   })
   .catch(function (error){
       res.redirect('/login');
       console.log(error)
   })
       }
     } 
     })
     .catch(function (error) {
       console.log(error);
     }) 
    }   
  }

    apideletepro(req, res, next){ 
        let idpro = req.body.idpro; 
        dboperations.deletepro(idpro).then(result=>{
        res.status(200).send({result});
    })
    }
    deletepro(req, res, next){ 
      let idpro = req.params.id;
     if(idpro == -1){
      res.redirect("/admin/product");
     }
     else{
      axios.post(`${link}/admin/delete/apidelete/${idpro}`,{idpro},{headers:{token: req.cookies.Token, refress: req.cookies.refreshToken}})
      .then(function (response) {
          let result = response.data.result;
        const token = req.cookies.Token;
        const refreshToken = req.cookies.refreshToken;
        try{
        let name = '';
        if(token){
          const accessToken = token.split(" ")[1];
          const checkToken = jwt.verify(accessToken, process.env.JWT_ACCESS_KEY);
          name = checkToken.name;
        }
        res.redirect("/admin/product");
      }catch(error){
        if(token){
          dboperationss.requestRefreshToken(refreshToken).then(result =>{
          //  console.log(result);
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
       res.redirect('/admin');   
    })
    .catch(function (error){
        res.redirect('/login');
        console.log(error)
    })
        }
      } 
      })
      .catch(function (error) {
        console.log(error);
      })    
    }
  }

    apiprostate(req, res, next){ 
        let idpro = req.params.idpro;
        let state = req.params.state;
        dboperations.prostate(idpro,state).then(result=>{
        res.status(200).send({result})
    })
}
prostate(req, res, next){ 
    let idpro = req.params.idpro;
    let state = req.params.state;
    axios.get(`${link}/admin/prostate/apiprostate/${idpro}/${state}`,{headers:{token: req.cookies.Token, refress: req.cookies.refreshToken}})
    .then(function (response) {
        let result = response.data.result;
      const token = req.cookies.Token;
      const refreshToken = req.cookies.refreshToken;
      try{
      let name = '';
      if(token){
        const accessToken = token.split(" ")[1];
        const checkToken = jwt.verify(accessToken, process.env.JWT_ACCESS_KEY);
        name = checkToken.name;
      }
      res.redirect("/admin/product");
    }catch(error){
      if(token){
        dboperationss.requestRefreshToken(refreshToken).then(result =>{
        //  console.log(result);
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
     res.redirect('/admin');   
  })
  .catch(function (error){
      res.redirect('/login');
      console.log(error)
  })
      }
    } 
    })
    .catch(function (error) {
      console.log(error);
    })    
}

apigetaddproduct(req, res, next){ 
    dboperations.getcate().then(result=>{
        result = result[0];
    res.status(200).send({result});
})
}
getaddproduct(req, res, next){ 

    axios.get(`${link}/admin/product/add/apiadd`,{headers:{token: req.cookies.Token, refress: req.cookies.refreshToken}})
    .then(function (response) {
        let result = response.data.result;
      const token = req.cookies.Token;
      const refreshToken = req.cookies.refreshToken;
      try{
      let name = '';
      if(token){
        const accessToken = token.split(" ")[1];
        const checkToken = jwt.verify(accessToken, process.env.JWT_ACCESS_KEY);
        name = checkToken.name;
      }
      res.render("ADthemsanpham", {result, name});
    }catch(error){
      if(token){
        dboperationss.requestRefreshToken(refreshToken).then(result =>{
        //  console.log(result);
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
     res.redirect('/admin');   
  })
  .catch(function (error){
      res.redirect('/login');
      console.log(error)
  })
      }
    } 
    })
    .catch(function (error) {
      console.log(error);
    })    


//     dboperations.getcate().then(result=>{
//         result = result[0];
//         const token = req.cookies.Token;
//         let name = '';
//         if(token){
//           const accessToken = token.split(" ")[1];
//           const checkToken = jwt.verify(accessToken, process.env.JWT_ACCESS_KEY);
//           name = checkToken.name;
//         }
//     res.render("ADthemsanpham", {result, name});
// })
}

apiaddproduct(req, res, next){ 
    let mota = req.body.mota;
    let tensp = req.body.name;
    let danhmuc = req.body.danhmuc;
    let noibat = req.body.noibat;
    let price = req.body.price;
    let soluong = req.body.soluong;
//    price = price.split('.');
//    var pri = ''
//    for(let i = 1; i<price.length;i++){
//     price[0] = `${price[0]}${price[i]}`;
//     pri = price[0];
//    }
//    price = pri*1;
    dboperations.addsanpham(mota, tensp,price,danhmuc,noibat,soluong).then(result=>{
    res.status(200).send({result});
})
}

addproduct(req, res, next){ 
    let mota = req.body.mota;
    let tensp = req.body.name;
    let  price = req.body.gia;
    let danhmuc = req.body.danhmuc;
    let soluong = req.body.soluong;
    let noibat = req.body.noibat;
   price = price.split('.');
   var pri = ''
   for(let i = 1; i<price.length;i++){
    price[0] = `${price[0]}${price[i]}`;
    pri = price[0];
   }
   price = pri*1;
   axios.post(`${link}/admin/product/add/apiadd`,{mota, tensp,price,danhmuc,soluong,noibat},{headers:{token: req.cookies.Token, refress: req.cookies.refreshToken}})
   .then(function (response) {
       let result = response.data.result;
     const token = req.cookies.Token;
     const refreshToken = req.cookies.refreshToken;
     try{
     let name = '';
     if(token){
       const accessToken = token.split(" ")[1];
       const checkToken = jwt.verify(accessToken, process.env.JWT_ACCESS_KEY);
       name = checkToken.name;
     }
     res.render('MultiFile',{result, name});
   }catch(error){
     if(token){
       dboperationss.requestRefreshToken(refreshToken).then(result =>{
       //  console.log(result);
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
    res.redirect('/admin');   
 })
 .catch(function (error){
     res.redirect('/login');
     console.log(error)
 })
     }
   } 
   })
   .catch(function (error) {
     console.log(error);
   })    

//     dboperations.addsanpham(mota, tensp,price,danhmuc,noibat).then(result=>{
//         const token = req.cookies.Token;
//         let name = '';
//         if(token){
//           const accessToken = token.split(" ")[1];
//           const checkToken = jwt.verify(accessToken, process.env.JWT_ACCESS_KEY);
//           name = checkToken.name;
//         }
   
// })
}

apigetcategory(req, res, next){ 
    dboperations.getcate().then(result=>{
        let prooncart = result[1];
        result = result[0];
    res.status(200).send({result,prooncart});
})
}

getcategory(req, res, next){ 

  axios.get(`${link}/admin/category/apicate`,{headers:{token: req.cookies.Token, refress: req.cookies.refreshToken}})
    .then(function (response) {
        let result = response.data.result;
        let prooncart = response.data.prooncart;
      const token = req.cookies.Token;
      const refreshToken = req.cookies.refreshToken;
      try{
      let name = '';
      if(token){
        const accessToken = token.split(" ")[1];
        const checkToken = jwt.verify(accessToken, process.env.JWT_ACCESS_KEY);
        name = checkToken.name;
      }
      res.render('ADdanhmuc',{result,prooncart, name});
    }catch(error){
      if(token){
        dboperationss.requestRefreshToken(refreshToken).then(result =>{
        //  console.log(result);
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
     res.redirect('/admin');   
  })
  .catch(function (error){
      res.redirect('/login');
      console.log(error)
  })
      }
    } 
    })
    .catch(function (error) {
      console.log(error);
    })    
//   dboperations.getcate().then(result=>{    
//       let prooncart = result[1];
//       result = result[0];
//       const token = req.cookies.Token;
//       let name = '';
//       if(token){
//         const accessToken = token.split(" ")[1];
//         const checkToken = jwt.verify(accessToken, process.env.JWT_ACCESS_KEY);
//         name = checkToken.name;
//       }
//   res.render('ADdanhmuc',{result,prooncart, name});
// })
}

apigetprooncate(req, res, next){ 
    let idcate = req.params.id;
    dboperations.getsanphamcate(idcate).then(result=>{
    res.status(200).send({result});
})
}

getprooncate(req, res, next){ 
  let idcate = req.params.id;

  axios.get(`${link}/admin/category/apiprocart/${idcate}`,{headers:{token: req.cookies.Token, refress: req.cookies.refreshToken}})
    .then(function (response) {
        let result = response.data.result;
      const token = req.cookies.Token;
      const refreshToken = req.cookies.refreshToken;
      try{
      let name = '';
      if(token){
        const accessToken = token.split(" ")[1];
        const checkToken = jwt.verify(accessToken, process.env.JWT_ACCESS_KEY);
        name = checkToken.name;
      }
      res.render('ADsanpham',{result, name});
    }catch(error){
      if(token){
        dboperationss.requestRefreshToken(refreshToken).then(result =>{
        //  console.log(result);
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
     res.redirect('/admin');   
  })
  .catch(function (error){
      res.redirect('/login');
      console.log(error)
  })
      }
    } 
    })
    .catch(function (error) {
      console.log(error);
    })    
 
}

apiupdatecate(req, res, next){ 
    let idcate = req.params.id;
    let name = req.body.name;
    dboperations.updatecate(idcate, name).then(result=>{
    res.status(200).send({result});
})
}
updatecate(req, res, next){ 
  let idcate = req.params.id;
  let name = req.body.name;
  if(idcate == -1){
    res.redirect("/admin/category");
  }else{
  axios.post(`${link}/admin/category/update/apiup/${idcate}`,{idcate,name},{headers:{token: req.cookies.Token, refress: req.cookies.refreshToken}})
  .then(function (response) {
    const token = req.cookies.Token;
    const refreshToken = req.cookies.refreshToken;
    try{
    let name = '';
    if(token){
      const accessToken = token.split(" ")[1];
      const checkToken = jwt.verify(accessToken, process.env.JWT_ACCESS_KEY);
      name = checkToken.name;
    }
    res.redirect("/admin/category");
  }catch(error){
    if(token){
      dboperationss.requestRefreshToken(refreshToken).then(result =>{
      //  console.log(result);
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
   res.redirect('/admin');   
})
.catch(function (error){
    res.redirect('/login');
    console.log(error)
})
    }
  } 
  })
  .catch(function (error) {
    console.log(error);
  })  
}  
}

apideletecate(req, res, next){ 
    let idcate = req.params.id;
    dboperations.deletecate(idcate).then(result=>{
    res.status(200).send({result});
})
}
deletecate(req, res, next){ 
  let idcate = req.params.id;
  if(idcate == -1){
    res.redirect("/admin/category");
  }else{
  axios.post(`${link}/admin/category/delete/apidele/${idcate}`,{idcate},{headers:{token: req.cookies.Token, refress: req.cookies.refreshToken}})
  .then(function (response) {
    const token = req.cookies.Token;
    const refreshToken = req.cookies.refreshToken;
    try{
    let name = '';
    if(token){
      const accessToken = token.split(" ")[1];
      const checkToken = jwt.verify(accessToken, process.env.JWT_ACCESS_KEY);
      name = checkToken.name;
    }
    res.redirect("/admin/category");
  }catch(error){
    if(token){
      dboperationss.requestRefreshToken(refreshToken).then(result =>{
      //  console.log(result);
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
   res.redirect('/admin');   
})
.catch(function (error){
    res.redirect('/login');
    console.log(error)
})
    }
  } 
  })
  .catch(function (error) {
    console.log(error);
  })  
}  
}
apiaddcate(req, res){ 
    let name = req.body.name;
    dboperations.addcate(name).then(result=>{
    res.status(200).send({result})
})
}
addcate(req, res){ 
  let name = req.body.namenhap;
  axios.post(`${link}/admin/category/apiaddcate/add`,{name},{headers:{token: req.cookies.Token, refress: req.cookies.refreshToken}})
  .then(function (response) {
    const token = req.cookies.Token;
    const refreshToken = req.cookies.refreshToken;
    try{
    let name = '';
    if(token){
      const accessToken = token.split(" ")[1];
      const checkToken = jwt.verify(accessToken, process.env.JWT_ACCESS_KEY);
      name = checkToken.name;
    }
    res.redirect("/admin/category");
  }catch(error){
    if(token){
      dboperationss.requestRefreshToken(refreshToken).then(result =>{
      //  console.log(result);
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
   res.redirect('/admin');   
})
.catch(function (error){
    res.redirect('/login');
    console.log(error)
})
    }
  } 
  })
  .catch(function (error) {
    console.log(error);
  })    
//   dboperations.addcate(name).then(result=>{
//   res.redirect("/admin/category");
// })
}

apigetAllBill(req, res, next){ 
    let state = req.params.id;
    dboperations.getallBill(state).then(result=>{
    res.status(200).send({result});
})
}
getAllBill(req, res, next){ 
    let state = req.params.id;
    axios.get(`${link}/admin/bill/apibill/${state}`,{headers:{token: req.cookies.Token, refress: req.cookies.refreshToken}})
    .then(function (response) {
        let result = response.data.result;
      const token = req.cookies.Token;
      const refreshToken = req.cookies.refreshToken;
      try{
      let name = '';
      if(token){
        const accessToken = token.split(" ")[1];
        const checkToken = jwt.verify(accessToken, process.env.JWT_ACCESS_KEY);
        name = checkToken.name;
      }
      res.render('ADdonhangcuakhach',{result, name});
    }catch(error){
      if(token){
        dboperationss.requestRefreshToken(refreshToken).then(result =>{
        //  console.log(result);
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
     res.redirect('/admin');   
  })
  .catch(function (error){
      res.redirect('/login');
      console.log(error)
  })
      }
    } 
    })
    .catch(function (error) {
      console.log(error);
    })    

//     dboperations.getallBill(state).then(result=>{
//         const token = req.cookies.Token;
//         let name = '';
//         if(token){
//           const accessToken = token.split(" ")[1];
//           const checkToken = jwt.verify(accessToken, process.env.JWT_ACCESS_KEY);
//           name = checkToken.name;
//         }
//     res.render('ADdonhangcuakhach',{result, name});
// })
}

apigetprosearch(req, res, next){ 
    let name = req.headers.namepro;
    dboperations.getsearchproduct(name).then(result=>{
        res.status(200).send({result});
})
}

getprosearch(req, res, next){ 
  let name = req.query.search;
  axios.get(`${link}/admin/product/search/apisearch`,{headers:{token: req.cookies.Token, refress: req.cookies.refreshToken, namepro: name}})
  .then(function (response) {
    const token = req.cookies.Token;
    const refreshToken = req.cookies.refreshToken;
    try{
    let name = '';
    let result = response.data.result;
    if(token){
      const accessToken = token.split(" ")[1];
      const checkToken = jwt.verify(accessToken, process.env.JWT_ACCESS_KEY);
      name = checkToken.name;
    }
    res.render('ADsanpham',{result, name});
  }catch(error){
    if(token){
      dboperationss.requestRefreshToken(refreshToken).then(result =>{
      //  console.log(result);
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
   res.redirect('/admin');   
})
.catch(function (error){
    res.redirect('/login');
    console.log(error)
})
    }
  } 
  })
  .catch(function (error) {
    console.log(error);
  })    

}

apigetUsearch(req, res, next){ 
    let name = req.headers.nameuser;
    dboperations.getusearch(name).then(result=>{
        res.status(200).send({result});
})
}

getUsearch(req, res, next){ 
  let name = req.query.search;
  axios.get(`${link}/admin/search/api`,{headers:{token: req.cookies.Token, refress: req.cookies.refreshToken, nameuser: name}})
  .then(function (response) {
    const token = req.cookies.Token;
    const refreshToken = req.cookies.refreshToken;
    try{
    let name = '';
    let result = response.data.result;
    if(token){
      const accessToken = token.split(" ")[1];
      const checkToken = jwt.verify(accessToken, process.env.JWT_ACCESS_KEY);
      name = checkToken.name;
    }
    res.render('ADkhachhang',{result, name});
  }catch(error){
    if(token){
      dboperationss.requestRefreshToken(refreshToken).then(result =>{
      //  console.log(result);
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
   res.redirect('/admin');   
})
.catch(function (error){
    res.redirect('/login');
    console.log(error)
})
    }
  } 
  })
  .catch(function (error) {
    console.log(error);
  })    
 
}

apirevenue(req, res, next){ 
    let nam = req.headers.namnhap;
    if(nam){
        dboperations.reneve(nam).then(result=>{
            res.status(200).send({result});
        })
    }
    else{
      let mess = "Nhập năm"
      res.status(200).send({mess});
    }
}

revenue(req, res, next){ 
  let nam = req.query.namenhap;
  axios.get(`${link}/admin/revenue/api`,{headers:{token: req.cookies.Token, refress: req.cookies.refreshToken, namnhap: nam}})
  .then(function (response) {
    const token = req.cookies.Token;
    const refreshToken = req.cookies.refreshToken;
    try{
    let name = '';
    let result = response.data.result;
    if(token){
      const accessToken = token.split(" ")[1];
      const checkToken = jwt.verify(accessToken, process.env.JWT_ACCESS_KEY);
      name = checkToken.name;
    }
    if(nam){
      res.render('ADthongkedoanhso',{result, name});
  }
else{
  res.render('ADthongkedoanhso', {name});
}
  }catch(error){
    if(token){
      dboperationss.requestRefreshToken(refreshToken).then(result =>{
      //  console.log(result);
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
   res.redirect('/admin');   
})
.catch(function (error){
    res.redirect('/login');
    console.log(error)
})
    }
  } 
  })
  .catch(function (error) {
    console.log(error);
  })    
 
}

apigetcomment(req, res){
    let iduser = req.params.id;
    dboperations.getComment(iduser).then(result=>{
        res.status(200).send({result});
    })
}
getcomment(req, res){
  let iduser = req.params.id;

  axios.get(`${link}/admin/comment/apifeedback/${iduser}`,{headers:{token: req.cookies.Token, refress: req.cookies.refreshToken}})
  .then(function (response) {
    const token = req.cookies.Token;
    const refreshToken = req.cookies.refreshToken;
    try{
    let name = '';
    let result = response.data.result;
    if(token){
      const accessToken = token.split(" ")[1];
      const checkToken = jwt.verify(accessToken, process.env.JWT_ACCESS_KEY);
      name = checkToken.name;
    }
    res.render('ADykien',{result, name});
  }catch(error){
    if(token){
      dboperationss.requestRefreshToken(refreshToken).then(result =>{
      //  console.log(result);
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
   res.redirect('/admin');   
})
.catch(function (error){
    res.redirect('/login');
    console.log(error)
})
    }
  } 
  })
  .catch(function (error) {
    console.log(error);
  })    
}
}

module.exports = new admin;