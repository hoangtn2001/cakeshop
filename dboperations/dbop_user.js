const config = require('../dbconfig');
const bcrypt = require('bcrypt');
const sql = require('mssql');
const jwt = require('jsonwebtoken');
const env = require('dotenv');
function generateAccessToken(user){
    return jwt.sign(
      {
        id: user.Id_user,
        isAdmin: user.Email,
        name: user.Name_user,
      },
      process.env.JWT_ACCESS_KEY,
      { expiresIn: "24h" },  
    );
  }

  function generateRefreshToken(user){
    return jwt.sign(
      {
        id: user.Id_user,
        isAdmin: user.Email,
        name: user.Name_user,
      },
      process.env.JWT_REFRESH_KEY,
      { expiresIn: "365d" }
    );
  }
  async function requestRefreshToken(tkRefress){
    //Take refresh token from user
    let pool = await sql.connect(config);
    let dbrefreshTokens = await pool.request()
    .query("Select * from Token");
    let refreshTokens = dbrefreshTokens.recordset;
    let getuser = await pool.request()
        .input('Id_user', sql.Int, refreshTokens[0].Id_user)
        .query("Select * from Userr where Id_user = @Id_user");
        let gettoken = await pool.request()
        .input('Id_user', sql.Int, refreshTokens[0].Id_user)
    .query("Select Token from Token where Id_user =@Id_user");
   // Send error if token is not valid
   
    refreshTokens =  gettoken.recordset;
    let listdbToken=[];
    for( var key in refreshTokens)
    {
      for(var keys in refreshTokens[key])
      {
        listdbToken.push(refreshTokens[key][keys]);
      }
    }
    if (!tkRefress) return 2;
    if (!listdbToken.includes(tkRefress)) {
      return 3;
    }
    jwt.verify(tkRefress, process.env.JWT_REFRESH_KEY, async (err, user) => {
      if (err) {
        console.log(err);
      }
    });
      listdbToken = listdbToken.filter((token) => token !== tkRefress);
      let deletedbtoken = await pool.request().query("delete from Token");
    if(listdbToken.length != 0 )
    {
      for(var temp in listdbToken)
      {
        let addTokens = await pool.request()
      .input('Token', sql.NVarChar(400), temp)
      .input('id_user', sql.Int, getuser.recordset[0].Id_user)
      .query("insert into Token (Id_user, Token) VALUES (@Id_user,@Token)");
      }
    }
      //create new access token, refresh token and send to user
      const newAccessToken = `Bearer `+ generateAccessToken(getuser.recordset[0]);
      const newRefreshToken = `Bearer `+ generateRefreshToken(getuser.recordset[0]);
      let addToken = await pool.request()
      .input('Token', sql.NVarChar(400), newRefreshToken)
      .input('id_user', sql.Int, getuser.recordset[0].Id_user)
      .query("insert into Token (Id_user, Token) VALUES (@Id_user,@Token)"); 
      const listToken = [newAccessToken,newRefreshToken];
      return listToken;    
  }

async function checkLogin(user,password){
    try{
        let pool = await sql.connect(config);
        let checkuser = await pool.request()
        .input('username', sql.NVarChar(50), user)
        .input('password', sql.NVarChar(50), password)
        .query("Select * from Userr where Email = @username");
        if(checkuser.recordset.length > 0)
        {
            const validPassword = await bcrypt.compare(password, checkuser.recordset[0].Password);
            if(validPassword){
              const accesstoken = `Bearer `+ generateAccessToken(checkuser.recordset[0]);
              const refreshToken =`Bearer `+ generateRefreshToken(checkuser.recordset[0]);
              // add token on database
              let addToken = await pool.request()
              .input('Token', sql.NVarChar(400), refreshToken)
              .input('Email', sql.NVarChar(50), user)
              .input('id_user', sql.Int, checkuser.recordset[0].Id_user)
              .query("insert into Token (Id_user, Token) VALUES (@Id_user,@Token)");
              let listToken = [accesstoken,refreshToken]; 
              if(checkuser.recordset[0].Id_role == 1 && checkuser.recordset[0].State_user == 0){
                listToken.push("1");
                return listToken;
              }
              else if(checkuser.recordset[0].Id_role == 2 && checkuser.recordset[0].State_user == 0){
                listToken.push("2");
                return listToken;
              }
              else{
                return 3;
              }    
                
            }
            else{
                return 3;
            }
        }
        else{
            return 3;
        }    
    }
    catch(error){
        console.log(error);
    }
}
async function addUser(email, name, phone, sex, password, address){
    try{
        let pool = await sql.connect(config);
        let checkuser = await pool.request()
        .input('email', sql.NVarChar(50), email)
        .query("Select * from Userr where Email = @email ");
        if(checkuser.recordset.length > 0  ){
            return false;
        }
        else{
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(password,salt);
        let insertuser = await pool.request()
        .input('email', sql.NVarChar(100), email)
        .input('name', sql.NVarChar(100), name)
        .input('phone', sql.NVarChar(50), phone)
        .input('sex', sql.Int, sex)
        .input('address', sql.NVarChar(200), address)
        .input('password', sql.NVarChar(200), hashed )
        .query("insert into Userr ( Id_role, Address, Email, Password, Name_user, Sex, Phone_number, State_user) VALUES (2,@address,@email,@password,@name,@sex,@phone,0)");
        return true;
        }
    }
    catch(error){
        console.log(error);
    }
}

async function forgotpass(email){
  try{
      let pool = await sql.connect(config);
      let checkuser = await pool.request()
      .input('email', sql.NVarChar(50), email)
      .query("Select * from Userr where Email = @email ");
      if(checkuser.recordset.length > 0  ){
        let newPass =  Math.random().toString(36).substring(1,7); 
        let Emailuser = checkuser.recordset[0].Email;
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(newPass,salt);
    let updatePass = await pool.request()
    .input('password', sql.NVarChar(200), hashed )
    .input('email', sql.NVarChar(50),Emailuser)
    .query("UPDATE Userr set Password = @password where Email = @email");
    return newPass;
      }
      else{
          return false;
      }
  }
  catch(error){
      console.log(error);
  }
}
async function updatePass(iduser,password,oldpass){
  try{
      let pool = await sql.connect(config);
      let checkuser = await pool.request()
        .input('iduser', sql.Int, iduser)
        .query("Select * from Userr where Id_user = @iduser");
      const validPassword = await bcrypt.compare(oldpass, checkuser.recordset[0].Password);
      if( validPassword){
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(password,salt);
    let updatePass = await pool.request()
    .input('password', sql.NVarChar(200), hashed )
    .input('iduser', sql.Int,iduser)
    .query("UPDATE Userr set Password = @password where Id_user = @iduser");
    return true;
      }
      else{
          return false;
      }
  }
  catch(error){
      console.log(error);
  }
}
async function checkTokenUser(Id){
  try{
      let pool = await sql.connect(config);
      let checkuser = await pool.request()
      .input('id', sql.Int, Id)
      .query("Select * from Userr where Id_user = @id ");
     if(checkuser.recordset[0].Id_role == 2 && checkuser.recordset[0].State_user == 0){
      return 1;
     }
     else if(checkuser.recordset[0].Id_role == 1)
     {
      return 2;
     }
     else{
      return 3;
     }
     
  }
  catch(error){
      console.log(error);
  }
}
async function getinfor(Id){
  try{
      let pool = await sql.connect(config);
      let checkuser = await pool.request()
      .input('id', sql.Int, Id)
      .query("Select * from Userr where Id_user = @id ");
      return checkuser.recordset;
  }
  catch(error){
      console.log(error);
  }
}
async function postinfor(Id,name,address,phone,sex){
  try{
      let pool = await sql.connect(config);
      let checkuser = await pool.request()
      .input('id', sql.Int, Id)
      .input('name', sql.NVarChar(100), name)
      .input('address', sql.NVarChar(200), address)
      .input('phone', sql.NVarChar(50), phone)
      .input('sex', sql.Int, sex)
      .query("UPDATE Userr set Name_user =@name, Address = @address, Phone_number = @phone, Sex = @sex where Id_user = @id ");
      return true;
  }
  catch(error){
      console.log(error);
  }
}

async function logOut() {
  let pool = await sql.connect(config);
  let deletedbtoken = await pool.request().query("delete from Token");
 return 1;
}

module.exports = {
    checkLogin: checkLogin,
    addUser: addUser,
    getinfor:getinfor,
    postinfor:postinfor,
    requestRefreshToken: requestRefreshToken,
    logOut:logOut,
    updatePass:updatePass,
    forgotpass:forgotpass,
    checkTokenUser: checkTokenUser
}