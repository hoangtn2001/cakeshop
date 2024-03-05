const jwt = require("jsonwebtoken")
const cookieParser = require('cookie-parser');
const dboperations = require('../../../dboperations/dbop_user'); 
const env = require('dotenv');
let link = process.env.Link_local;
const axios = require('axios');

class middlewareController{
     verifyToken(req, res, next){
        //ACCESS TOKEN FROM HEADER, REFRESH TOKEN FROM COOKIE
        const token = req.cookies.Token;
        const refreshToken = req.cookies.refreshToken;
        if (token) {
          const accessToken = token.split(" ")[1];
          jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
            if (err) {
              res.status(403).json("Token is not valid!");
            }
            req.user = user;
            next();
          });
        } else {
          res.status(401).json("You're not authenticated");
        }
      }
      verifyTokenUser(req, res, next){
        let token = req.headers.token;
        try{       
        if (token){
        const accessToken = token.split(" ")[1];
        const checkToken = jwt.verify(accessToken, process.env.JWT_ACCESS_KEY);
        dboperations.checkTokenUser(checkToken.id).then(result => {
          if(result == 1){
            next();
          }
          else{   
            res.status(401).json("Token is not valid");
          }
        })
        }
        else{
          res.status(401).json("Token is not valid!");
        }     
      }
      catch{
        if(token){
          res.status(403).json("You're not authenticated");
        }
        else{
          res.status(401).json("You're not authenticated");
        }  
        }
      }
    //   verifyTokenAdmin(req, res, next){
    //     //ACCESS TOKEN FROM HEADER, REFRESH TOKEN FROM COOKIE
    //     const token = req.cookies.Token;
    //     const refreshToken = req.cookies.refreshToken;
    //     try{
    //     if (token) {
    //       const accessToken = token.split(" ")[1];
    //     const checkToken = jwt.verify(accessToken, process.env.JWT_ACCESS_KEY);
    //     dboperations.checkTokenUser(checkToken.id).then(result => {
    //       if(result == 2){
    //         next();
    //       }
    //       else{
    //         res.redirect("/login");
    //       }
    //     })
    //     }
    //     else{
    //       res.redirect("/login");
    //     }
    //   }catch{
    //     if(token){
    //       dboperations.requestRefreshToken(refreshToken).then(result =>{
    //         console.log(result);
    //         if(result == 2){
    //             res.status(401).json("You're not authenticated");
    //         }
    //         if(result == 3){
    //             res.status(403).json("Refresh token is not valid");
    //         }
    //     res.cookie("Token",result[0], {
    //         httpOnly: true,
    //         secure:false,
    //         path: "/",
    //         sameSite: "strict",
    //       }); 
    //       res.cookie("refreshToken",result[1], {
    //           httpOnly: true,
    //           secure:false,
    //           path: "/",
    //           sameSite: "strict",
    //         }); 
    //    res.redirect('/admin');   
    // })
    // .catch(function (error){
    //     res.redirect('/login');
    //     console.log(error)
    // })
    //      }
        
    //   }
    //   }
      

    verifyTokenAdmin(req, res, next){
      let token = req.headers.token;
      try{       
      if (token){
      const accessToken = token.split(" ")[1];
      const checkToken = jwt.verify(accessToken, process.env.JWT_ACCESS_KEY);
      dboperations.checkTokenUser(checkToken.id).then(result => {
        if(result == 2){
          next();
        }
        else{   
          res.status(401).json("Token is not valid");
        }
      })
      }
      else{
        res.status(401).json("Token is not valid!");
      }     
    }
    catch{
      if(token){
        res.status(403).json("You're not authenticated");
      }
      else{
        res.status(401).json("You're not authenticated");
      }  
      }
    }
}
module.exports = new middlewareController;