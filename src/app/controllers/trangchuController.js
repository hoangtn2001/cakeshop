const express = require('express');
const app = express();
const dboperations = require('../../../dboperations/dbop_trangchu'); 
const dboperationss = require('../../../dboperations/dbop_user'); 
const body = require('body-parser');
const { deletecategory } = require('../../../dboperations/dbop_trangchu');
const { json } = require('body-parser');
const axios = require('axios');
app.use(body.urlencoded({extended: true}));
app.use(body.json());
const jwt = require("jsonwebtoken")
const env = require('dotenv');
let link = process.env.Link_local;
class TrangchuController {
    apigethome(req,res){
        dboperations.getHome().then(result=>{
            let cate = result[0];
            let fepro = result[1];
            let product = result[2]; 
            res.status(200).send({cate,fepro,product})     
            })

    }
    gethome(req,res){
        axios.get(`${link}/cakeshop/api`)
        .then(function (response) {
          let cate = response.data.cate;
          let fepro = response.data.fepro;
          let product = response.data.product;
          const token = req.cookies.Token;
          const refreshToken = req.cookies.refreshToken;
          try{
          let name = '';
          if(token){
            const accessToken = token.split(" ")[1];
            const checkToken = jwt.verify(accessToken, process.env.JWT_ACCESS_KEY);
            name = checkToken.name;
          }
          res.render('index',{cate,fepro,product,name}) 
        }catch(error){
          if(token){
            dboperationss.requestRefreshToken(refreshToken).then(result =>{
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
         res.redirect('/cakeshop');   
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

    apigethomeproduct(req,res){
        let idcate = req.params.idcate;
        let search = req.query.search;
        dboperations.getHome(idcate, search).then(result=>{
         let fied = req.query.fied;
         let sort = req.query.sort;
         let cate = result[0];
         let fepro = result[1];
         let product 
         if(fied == 'price' && sort == 'desc'){
             product = result[3][1];
         } 
         else if(fied == 'price' && sort == 'asc'){
             product = result[3][0];
         }
         else{
            product = result[2];
         }
         if(search){
            if(fied == 'price' && sort == 'desc'){
                product = result[5][2];    
             }
             else if(fied == 'price' && sort == 'asc')
             {
                product = result[5][1];
             }
             else{
                product = result[5][0];
             }
         }
         if(idcate){
         if(fied == 'price' && sort == 'desc'){
            product = result[4][2];
         }
         else if(fied == 'price' && sort == 'asc')
         {
            product = result[4][1];
         }
         else{
            product = result[4][0];
         }
        }
             res.status(200).send({cate,fepro,product});   
         })
     }
    gethomeproduct(req,res){
        let idcate = req.params.idcate;
        if(idcate){
            axios.get(`${link}/cakeshop/product/api/${idcate}`,{
                params: {
                     idcate,
                     fied : req.query.fied,
                     sort : req.query.sort,
                     search : req.query.search,
                },})
            .then(function (response) {
              let cate = response.data.cate;
              let fepro = response.data.fepro;
              let product = response.data.product;
              const token = req.cookies.Token;
              const refreshToken = req.cookies.refreshToken;
              let name = '';
              try{
              if(token){
                const accessToken = token.split(" ")[1];
                const checkToken = jwt.verify(accessToken, process.env.JWT_ACCESS_KEY);
                name = checkToken.name;
              }
              res.render('sanpham',{cate,fepro,product,name}); 
            }catch(error){
              if(token){
                dboperationss.requestRefreshToken(refreshToken).then(result =>{
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
             res.redirect('/cakeshop/product');   
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
        else{
            axios.get(`${link}/cakeshop/product/api`,{
                params: {
                     fied : req.query.fied,
                     sort : req.query.sort,
                     search : req.query.search,
                },})
            .then(function (response) {
              let cate = response.data.cate;
              let fepro = response.data.fepro;
              let product = response.data.product;
              const token = req.cookies.Token;
              const refreshToken = req.cookies.refreshToken;
              let name = '';
              try{
              if(token){
                const accessToken = token.split(" ")[1];
                const checkToken = jwt.verify(accessToken, process.env.JWT_ACCESS_KEY);
                name = checkToken.name;
              }
              res.render('sanpham',{cate,fepro,product, name}); 
            }catch(error){
              if(token){
                dboperationss.requestRefreshToken(refreshToken).then(result =>{
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
             res.redirect('/cakeshop/product');   
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

        getintroduce(req, res){  
          const token = req.cookies.Token;
          const refreshToken = req.cookies.refreshToken;
          try{
      let name = '';
      if(token){
        const accessToken = token.split(" ")[1];
        const checkToken = jwt.verify(accessToken, process.env.JWT_ACCESS_KEY);
        name = checkToken.name;
      }                                                                     
            res.render('gioithieu',{name}); 
          }catch(error){
           if(token){
            dboperationss.requestRefreshToken(refreshToken).then(result =>{
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
         res.redirect('/cakeshop/introduce');   
      })
      .catch(function (error){
          res.redirect('/login');
          console.log(error)
      })
           }
          }   
    }
    getcontact(req, res){
      const token = req.cookies.Token;
      const refreshToken = req.cookies.refreshToken;
      let name = '';
      try{
      if(token){
        const accessToken = token.split(" ")[1];
        const checkToken = jwt.verify(accessToken, process.env.JWT_ACCESS_KEY);
        name = checkToken.name;
      }                                                                       
        res.render('lienhe',{name});  
      }catch(error){
        if(token){
          dboperationss.requestRefreshToken(refreshToken).then(result =>{
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
       res.redirect('/cakeshop/contact');   
    })
    .catch(function (error){
        res.redirect('/login');
        console.log(error)
    })
         }
      }  
    }
    apipostContact(req, res){ 
        let comment = req.body.comment;
        const token = req.body.token;
        const accessToken = token.split(" ")[1];
        const checkToken = jwt.verify(accessToken, process.env.JWT_ACCESS_KEY);
        dboperations.addComment(checkToken.id, comment).then(result=>{  
            let message;
            if(result == true)
            {
                message = 'Yêu cầu thành công';
                res.status(200).send({message});
            }    
            else{
                message = 'Yêu cầu thất bại';
                res.status(200).send({message});
            }
    }) 
}

postContact(req, res){ 
    let comment = req.body.sumbit;
    const token = req.cookies.Token;
    const refreshToken = req.cookies.refreshToken;
    axios.post(`${link}/cakeshop/contact/api`,{comment, token},{headers:{token: req.cookies.Token}})
    .then(function (response) {
      let message = response.data.message;
      const token = req.cookies.Token;
      let name = '';
      if(token){
        const accessToken = token.split(" ")[1];
        const checkToken = jwt.verify(accessToken, process.env.JWT_ACCESS_KEY);
        name = checkToken.name;
      }
      res.render('lienhe',{message,name}); 
    })
    .catch(function (error) { 
      res.redirect('/login');
      console.log(error);
    })    
}


apigetProductById(req, res){ 
    let Id_product = req.params.Id_product;
    dboperations.getProductById(Id_product).then(result=>{  
        if(result)
        {
            res.status(200).send({result});
        }
        else{
            res.status(500);
        }
}) 
}

getProductById(req, res){ 
    let Id_product = req.params.Id_product;
    axios.get(`${link}/cakeshop/product/id/api/${Id_product}`,{
        params: {
             Id_product
        },})
    .then(function (response) {
      let result = response.data.result;
      const token = req.cookies.Token;
      let name = '';
      try{
      if(token){
        const accessToken = token.split(" ")[1];
        const checkToken = jwt.verify(accessToken, process.env.JWT_ACCESS_KEY);
        const refreshToken = req.cookies.refreshToken;
        name = checkToken.name;
      }
      res.render('chitietsanpham',{result,name}); 
    }catch(error){
      if(token){
        dboperationss.requestRefreshToken(refreshToken).then(result =>{
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
     res.redirect('/cakeshop/introduce');   
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

apigetcart(req, res){ 
   let token = req.headers.token;
    const accessToken = token.split(" ")[1];
    const checkToken = jwt.verify(accessToken, process.env.JWT_ACCESS_KEY);
    let id_user= checkToken.id;
    let tongtien = 0;
    dboperations.getProductOnCart(id_user).then(result=>{
        if(result[0].length != 0 ){
        let cartcode = result[0][0].Cart_code; 
        let user = result[1];
         let product = result[0]; 
         for(let i=0; i<result[0].length;i++)
         {
            tongtien+=result[0][i].Total_price;
         }  
        res.status(200).send({product,tongtien,cartcode,user});
    }
    else{
      let user = result[1];
        let message = "Bạn chưa có sản phẩm nào trong giỏ, thêm vào ngay nào !!!"
        res.status(200).send({message,user});
    }
}) 
}

getcart(req, res){ 
  const refreshToken = req.cookies.refreshToken;
    axios.get(`${link}/cakeshop/cart/api`,{headers:{token: req.cookies.Token}},{ withCredentials: true, secure: false })
    .then(function (response) {
    let tongtien = response.data.tongtien;
      let product = response.data.product;
      let cartcode = response.data.cartcode;
      let message = response.data.message;
      let user = response.data.user;
      if(product){
        const token = req.cookies.Token;
        let name = '';
        if(token){
          const accessToken = token.split(" ")[1];
          const checkToken = jwt.verify(accessToken, process.env.JWT_ACCESS_KEY);
          name = checkToken.name;
        }
        res.render('giohang',{product,tongtien,cartcode,user, name});
      
      } else{
        const token = req.cookies.Token;
        let name = '';
       
        if(token){
          const accessToken = token.split(" ")[1];
          const checkToken = jwt.verify(accessToken, process.env.JWT_ACCESS_KEY);
          name = checkToken.name;
        }
        res.render('giohang', {message,name});
      
      }
    })
    .catch(function (error) {
      if(error.response.status == 403){
        dboperationss.requestRefreshToken(refreshToken).then(result =>{
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
     res.redirect('/cakeshop/cart');   
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


apipostcart(req, res){ 
    let idProduct = req.body.idProduct;
    let soluong = req.body.soluong;
    const token = req.body.token;
    const accessToken = token.split(" ")[1];
    const checkToken = jwt.verify(accessToken, process.env.JWT_ACCESS_KEY);
    let id_user= checkToken.id;
    let tongtien=0;
    dboperations.insertProductOnCart(idProduct,soluong,id_user).then(result=>{
         let product = result[0];
         let cartcode = result[0][0].Cart_code; 
         let user = result[1]
         for(let i=0; i<result[0].length;i++)
         {
            tongtien+=result[0][i].Total_price;
         }   
        res.status(200).send({product,tongtien,user});
}) 
}

postcart(req, res){ 
    let idProduct = req.body.idproduct*1;
    let soluong = req.body.soluong;
    const token = req.cookies.Token;
    const refreshToken = req.cookies.refreshToken;
    axios.post(`${link}/cakeshop/cart/api`,{idProduct,soluong,token},{headers:{token: req.cookies.Token}})
    .then(function (response) {
      let product = response.data.product;
      let tongtien = response.data.tongtien;
      let user = response.data.user;
      const token = req.cookies.Token;
      const refreshToken = req.cookies.refreshToken;
      let name = '';
      if(token){
        const accessToken = token.split(" ")[1];
        const checkToken = jwt.verify(accessToken, process.env.JWT_ACCESS_KEY);
        name = checkToken.name;
      }
      res.render('giohang',{product,tongtien,user,name});
    }).catch(function (error){
      if(error.response.status == 403){
        dboperationss.requestRefreshToken(refreshToken).then(result =>{
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
     res.redirect('/cakeshop/cart');   
  })
  .catch(function (error){
      res.redirect('/login');
      console.log(error)
  })
      }else{
      res.redirect('/login');
    }
    })
}


apideleteproductcart(req, res){ 
    let idcart = req.params.id;
    dboperations.deleteProductCar(idcart).then(result=>{
        res.status(200).send("Xóa thành công");
}) 
}

deleteproductcart(req, res){ 
    const refreshToken = req.cookies.refreshToken;
    let idcart = req.params.id;
    axios.get(`${link}/cakeshop/cart/apidele/${idcart}`,{headers:{token: req.cookies.Token}})
    .then(function (response) {
        res.redirect("/cakeshop/cart");
    })
    .catch(function (error) {
      if(error.response.status == 403){
        dboperationss.requestRefreshToken(refreshToken).then(result =>{
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
     res.redirect('/cakeshop/cart');   
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


apipostcartinf(req, res){ 
    let tongtien = req.body.tongtien;
    let diachi = req.body.diachi;
    let phone = req.body.phone;
    const token = req.body.token;
    const accessToken = token.split(" ")[1];
    const checkToken = jwt.verify(accessToken, process.env.JWT_ACCESS_KEY);
    let id_user= checkToken.id;
    dboperations.insertBill(id_user, tongtien,diachi,phone).then(result=>{
        let cart = isNaN(req.query.cart) ? 1 : parseInt(req.query.cart);
        let message1 ="Preparing";
        let message2= "delivering";
        let message3 = "confirm";
         let product = result; 
         let message = "Đang chờ xác nhận...";
        res.status(200).send({product,message,message1,message2,message3});
}) 
}
postcartinf(req, res){ 
    let cartcode = req.body.cartcode;
    let tongtien = req.body.tongtien;
    let diachi = req.body.diachi;
    let phone = req.body.phone;
    const token = req.cookies.Token;
    const refreshToken = req.cookies.refreshToken;
    axios.post(`${link}/cakeshop/cart/inf/api`,{cartcode,tongtien,diachi,phone,token},{headers:{token: req.cookies.Token}})
    .then(function (response) {
      let product = response.data.product;
      let message = response.data.message;
      let message1 = response.data.message1;
      let message2 = response.data.message2;
      let message3 = response.data.message3;
      const token = req.cookies.Token;
      let name = '';
      if(token){
        const accessToken = token.split(" ")[1];
        const checkToken = jwt.verify(accessToken, process.env.JWT_ACCESS_KEY);
        name = checkToken.name;
      }
      res.render('trangthaihang',{product,message,message1,message2,message3,name});
    }).catch(function (error) {
      if(error.response.status == 403){
        dboperationss.requestRefreshToken(refreshToken).then(result =>{
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
     res.redirect('/cakeshop/cart');   
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


apigetcartinf(req, res){ 
    const token = req.headers.token;
    const accessToken = token.split(" ")[1];
    const checkToken = jwt.verify(accessToken, process.env.JWT_ACCESS_KEY);
    let id_user= checkToken.id;
    let detail = req.params.detail;
    let message;
    let message1;
    let message2;
    let message3;
    dboperations.getBill(id_user).then(result=>{
         let product;
         if(detail == "Preparing")
         {
            product= result[1];
            message = "Đang chuẩn bị hàng ..."
            message1 ="confirm";
            message2= "delivering";
            message3 ="Preparing";
         }
         else if(detail == "delivering"){
            product = result[2];
            message = "Bánh đang được giao"
            message1 ="confirm";
            message2= "Preparing";
            message3="delivering";
         }
         else{
            product = result[0];
            message = "Đang chờ xác nhận...";
            message1 ="Preparing";
            message2= "delivering";
            message3 ="confirm";
        }
        
        res.status(200).send({product,message,message1,message2, message3});
        
}) 
}
getcartinf(req, res){ 
  const refreshToken = req.cookies.refreshToken;
    let detail = req.params.detail;
    axios.get(`${link}/cakeshop/cart/inf/api/${detail}`,{headers:{token: req.cookies.Token}},{ withCredentials: true})
    .then(function (response) {
      let product = response.data.product;
      let message = response.data.message;
      let message1 = response.data.message1;
      let message2 = response.data.message2;
      let message3 = response.data.message3;
      const token = req.cookies.Token;
      let name = '';
      if(token){
        const accessToken = token.split(" ")[1];
        const checkToken = jwt.verify(accessToken, process.env.JWT_ACCESS_KEY);
        name = checkToken.name;
      }
      res.render('trangthaihang',{product,message,message1,message2, message3,name});
    })
    .catch(function (error) {
      if(error.response.status == 403){
        dboperationss.requestRefreshToken(refreshToken).then(result =>{
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
     res.redirect('/cakeshop/cart');   
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

apigetDetailBill(req, res){ 
    const token = req.headers.token;
    const accessToken = token.split(" ")[1];
    const checkToken = jwt.verify(accessToken, process.env.JWT_ACCESS_KEY);
    let id_user= checkToken.id;
    let cartcode = req.params.id;
    let detail = req.params.detail;
    let product 
    dboperations.getDetailBill(id_user,cartcode).then(result=>{
        let cart = isNaN(req.query.cart) ? 1 : parseInt(req.query.cart);
        if(detail == "confirm")
        {
            product = result[0];
        }
        else if(detail == "Preparing")
        {
            product = result[1];
        }
        else{
            product = result[2];
        }
        
        if(detail == "4"){
            product = result[3];
        }
        else if(detail == "5")
        {
            product = result[4]
        }
        res.status(200).send({product});
        
}) 
}
getDetailBill(req, res){ 
    let cartcode = req.params.id;
    let detail = req.params.detail;
    const refreshToken = req.cookies.refreshToken;
    axios.get(`${link}/cakeshop/cart/infapi/${detail}/${cartcode}`,{headers:{token: req.cookies.Token}},{ withCredentials: true})
    .then(function (response) {
      let product = response.data.product;
      const token = req.cookies.Token;
      let name = '';
      if(token){
        const accessToken = token.split(" ")[1];
        const checkToken = jwt.verify(accessToken, process.env.JWT_ACCESS_KEY);
        name = checkToken.name;
      }
      res.render('chitietdonhang',{product,name});
    })
    .catch(function (error) {
      if(error.response.status == 403){
        dboperationss.requestRefreshToken(refreshToken).then(result =>{
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
     res.redirect('/cakeshop/cart');   
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

apideleteBill(req, res){ 
    const token = req.headers.token;
    const accessToken = token.split(" ")[1];
    const checkToken = jwt.verify(accessToken, process.env.JWT_ACCESS_KEY);
    let id_user= checkToken.id;
    let cartcode = req.params.id;
    dboperations.deleteBill(cartcode, id_user).then(result=>{
        res.status(200).send("Xóa thành công")     
}) 
}
deleteBill(req, res){ 
    let cartcode = req.params.id;
    const refreshToken = req.cookies.refreshToken;
    axios.get(`${link}/cakeshop/cart/inf/confirm/delete/api/${cartcode}`,{headers:{token: req.cookies.Token}})
    .then(function (response) {
        res.redirect("/cakeshop/cart/inf/confirm");
    })
    .catch(function (error) {
      if(error.response.status == 403){
        dboperationss.requestRefreshToken(refreshToken).then(result =>{
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
     res.redirect('/cakeshop/cart');   
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
    
    apihistory(req, res){ 
        const token = req.headers.token;
        const accessToken = token.split(" ")[1];
        const checkToken = jwt.verify(accessToken, process.env.JWT_ACCESS_KEY);
        let id_user= checkToken.id;
        dboperations.history(id_user).then(result=>{
             let product = result;
            res.status(200).send({product});
            
    }) 
    }
    history(req, res){ 
      const refreshToken = req.cookies.refreshToken;
    axios.get(`${link}/cakeshop/history/api`,{headers:{token: req.cookies.Token}})
    .then(function (response) {
        let product = response.data.product;
        const token = req.cookies.Token;
      let name = '';
      if(token){
        const accessToken = token.split(" ")[1];
        const checkToken = jwt.verify(accessToken, process.env.JWT_ACCESS_KEY);
        name = checkToken.name;
      }
        res.render('lichsumuahang',{product,name});
    })
    .catch(function (error) {
      if(error.response.status == 403){
        dboperationss.requestRefreshToken(refreshToken).then(result =>{
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
     res.redirect('/cakeshop/history');   
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
    
}

module.exports = new TrangchuController;