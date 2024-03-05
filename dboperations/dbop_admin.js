const config = require('../dbconfig');
const bcrypt = require('bcrypt');
const sql = require('mssql');
const jwt = require('jsonwebtoken');
const env = require('dotenv');
async function getUser(){
    try{
        let pool = await sql.connect(config);
        let getUSer = await pool.request()
        .query("Select * from Userr where Id_role != 1");
        return getUSer.recordset;
        }
    catch(error){
        console.log(error);
    }
}
async function getBill(id){
    try{
        let pool = await sql.connect(config);
        let getBill = await pool.request()
        .input('iduser', sql.Int, id)
        .query("select b.Id_bill, u.Id_user, c.Id_cart ,c.State_cart, b.Pay, b.Date, Id_role,b.Address_dely, u.Email, u.Name_user, u.Sex, b.Phone_number_dely, u.State_user from (Bill as b join Cart as c on b.Id_cart = c.Id_cart) join Userr as u on c.Id_user = u.Id_user where  c.Id_user = @iduser and c.State_cart != 5 order by b.Date");
        return getBill.recordset;
        }
    catch(error){
        console.log(error);
    }
}

async function getpro(iduser, idcart){
    try{
        let pool = await sql.connect(config);
        let getpro = await pool.request()
        .input('iduser', sql.Int, iduser)
        .input('idcart', sql.Int,idcart)
        .query("select p.Id_product, Name_product, Cd_date, Quantity, Quantity * Price as Total_price from (Cart_detail as c join Cart as ca on c.Id_cart = ca.Id_cart) Join Product as p on c.Id_product= p.Id_product where ca.Id_user = @iduser and c.Id_cart  = @idcart order by c.Cd_date");
        return getpro.recordset;
        }
    catch(error){
        console.log(error);
    }
}

async function upState(idbill){
    try{
        let pool = await sql.connect(config);
        let getbill = await pool.request()
        .input('idbill', sql.Int, idbill)
        .query("select * from Bill where Id_bill = @idbill");
        let getcart = await pool.request()
        .input('idcart', sql.Int, getbill.recordset[0].Id_cart)
        .query("select * from Cart where Id_cart = @idcart");
        let upCart = await pool.request()
        .input('idcart', sql.Int, getcart.recordset[0].Id_cart)
        .input('state', sql.Int, getcart.recordset[0].State_cart + 1)
        .query("UPDATE Cart set State_cart =@state where Id_cart = @idcart");
        return getcart.recordset[0].Id_user;
        }
    catch(error){
        console.log(error);
    }
}

async function destroyBill(idbill){
    try{
        let pool = await sql.connect(config);
       
        let getinf =await pool.request()
        .input('idbill',sql.Int,idbill)
        .query("select * from (Bill as b join Cart as c on b.Id_cart = c.Id_cart) join Userr as u on u.Id_user = c.Id_user where b.Id_bill = @idbill");
        let iduser = getinf.recordset[0].Id_user;
        let cartcode = getinf.recordset[0].Id_cart;
        let updatecart = await pool.request()
        .input('iduser',sql.Int,iduser[0])
        .input('cartcode', sql.Int, cartcode[0])
        .query("update Cart set State_cart = 5 where Id_user = @iduser and Id_cart = @cartcode");

        let getprocart = await pool.request()
        .input('idcart',sql.Int,cartcode[0])
        .query("select * from Cart_detail where Id_cart = @idcart");

        let i = 0;
        for(i; i<getprocart.recordset.length; i++){
            let getpro = await pool.request()
        .input('idpro',sql.Int,getprocart.recordset[i].Id_product)
        .query("select * from Product where Id_product = @idpro");
        let uppro = await pool.request()
        .input('idpro', sql.Int,getprocart.recordset[i].Id_product)
        .input('idbought',sql.Int,getpro.recordset[0].Quantity_pro_bought - getprocart.recordset[i].Quantity)
        .query("UPDATE Product set Quantity_pro_bought = @idbought where Id_product = @idpro");
        }
        return getinf.recordset;
        }
    catch(error){
        console.log(error);
    }
}

async function lockuser(iduser,state){
    try{
        if(state == 0)
        {
            state = 1;
        }else{
            state = 0 ;
        }
        let pool = await sql.connect(config);
        let uplock = await pool.request()
        .input('iduser', sql.Int, iduser)
        .input('state', sql.Int, state)
        .query("UPDATE Userr set State_user = @state where Id_user = @iduser");
        
        return true;
        }
    catch(error){
        console.log(error);
    }
}

async function getproduct(){
    try{
        let pool = await sql.connect(config);
        let getproduct = await pool.request()
        .query("select * from Product as p Join Category as c on c.Id_category= p.Id_category order by p.Quantity_pro_bought DESC");
        return getproduct.recordset;
        }
    catch(error){
        console.log(error);
    }
}

async function fepro(idpro,state){
    try{
        if(state == 0)
        {
            state = 1;
        }else{
            state = 0 ;
        }
        let pool = await sql.connect(config);
        let upPro = await pool.request()
        .input('idpro', sql.Int, idpro)
        .input('state', sql.Int, state)
        .query("UPDATE Product set Fe_pro = @state where Id_product = @idpro");
        return true;
        }
    catch(error){
        console.log(error);
    }
}
async function updatepro(idpro, namepro,descri,price, quantity, quantity_bought){
    try{
       
        let pool = await sql.connect(config);
        let upPro = await pool.request()
        .input('idpro', sql.Int, idpro)
        .input('name', sql.NVarChar(100), namepro)
        .input('des', sql.NVarChar(400), descri)
        .input('pri', sql.Int , price)
        .input('quantity', sql.Int , quantity)
        .input('quantityb', sql.Int , quantity_bought)
        .query("UPDATE Product set Name_product = @name,Describe = @des, Price = @pri, Quantity_pro = @quantity, Quantity_pro_bought = @quantityb where Id_product = @idpro");
        return true;
        }
    catch(error){
        console.log(error);
    }
}

async function deletepro(idpro){
    try{
       
        let pool = await sql.connect(config);
        let getPro = await pool.request()
        .input('idpro', sql.Int, idpro)
        .query("select * from Cart_detail where Id_product = @idpro");
        if(getPro.recordset.length != 0){
            let uppro= await pool.request()
        .input('idpro', sql.Int, idpro)
        .query("update Product set Pro_state = 1 where Id_product = @idpro");
        }else{
            let dele= await pool.request()
        .input('idpro', sql.Int, idpro)
        .query("delete Product where Id_product = @idpro");
        }
        return true;
        }
    catch(error){
        console.log(error);
    }
}


async function prostate(idpro,state){
    try{
        if(state == 0)
        {
            state = 1;
        }else{
            state = 0 ;
        }
        let pool = await sql.connect(config);
        let upPro = await pool.request()
        .input('idpro', sql.Int, idpro)
        .input('state', sql.Int, state)
        .query("UPDATE Product set Pro_state = @state where Id_product = @idpro");
        return true;
        }
    catch(error){
        console.log(error);
    }
}


async function getcate(){
    try{
       
        let pool = await sql.connect(config);
        let getcate = await pool.request() 
        .query("select * from Category"); 
        let checkpro = await pool.request()  
        .query("SELECT DISTINCT Id_category from (Cart as c join Cart_detail as ad on c.Id_cart = ad.Id_cart) join Product as p on ad.Id_product= p.Id_product where c.State_cart != 0");
        return [getcate.recordset, checkpro.recordset];
        }
    catch(error){
        console.log(error);
    }
}
async function addsanpham(mota,tensp,price,danhmuc,noibat,soluong){
    try{
       
        let pool = await sql.connect(config);
        let addpro = await pool.request() 
        .input('tensp', sql.NVarChar(100), tensp)
        .input('mota', sql.NVarChar(400), mota)
        .input('price', sql.Int, price)
        .input('danhmuc', sql.Int, danhmuc)
        .input('noibat', sql.Int, noibat)
        .input('soluong', sql.Int, soluong)
        .query("insert into Product (Id_category,Quantity_pro,Name_product,Describe,Price,Fe_pro,Pro_state,Quantity_pro_bought) VALUES (@danhmuc,@soluong,@tensp,@mota,@price,@noibat,0,0)");
        let getid = await pool.request() 
        .query("select Id_product from Product");
        return getid.recordset[getid.recordset.length-1].Id_product;
        }
    catch(error){
        console.log(error);
    }

}

async function getsanphamcate(idcate){
    try{
       
        let pool = await sql.connect(config);
        let prooncate = await pool.request()  
        .input('idcate', sql.Int, idcate)
        .query("select * from Product as p Join Category as c on c.Id_category= p.Id_category where p.Id_category = @idcate");

        return prooncate.recordset;
        }
    catch(error){
        console.log(error);
    }
}

async function updatecate(idcate, name){
    try{
       
        let pool = await sql.connect(config);
        let prooncate = await pool.request()  
        .input('idcate', sql.Int, idcate)
        .input('name', sql.NVarChar(50), name)
        .query("update Category set Name_category = @name where Id_category = @idcate");
        
        return prooncate.recordset;
        }
    catch(error){
        console.log(error);
    }
}

async function deletecate(idcate){
    try{
        var thuchien;
        let pool = await sql.connect(config);
        thuchien = await pool.request()  
        .input('idcate', sql.Int, idcate)
        .query("select * from Product where Id_category = @idcate");
       if(thuchien.recordset.length != 0){
        let checkpro = await pool.request()  
        .input('idcate', sql.Int, idcate)
        .query("select * from (Product as p Join Cart_detail as cd on cd.Id_product= p.Id_product) join Cart as c on c.Id_cart = cd.Id_cart where p.Id_category = @idcate and c.State_cart = 0");
        if(checkpro.recordset.length != 0){
            console.log("3");     
            for(let i = 0; i<checkpro.recordset.length;i++){
                thuchien = await pool.request()  
            .input('idcate', sql.Int, checkpro.recordset[i].Id_cart)
            .query("delete from Cart_detail where Id_cart = @idcate");
        }
        thuchien = await pool.request()  
        .input('idcate', sql.Int, idcate)
        .query("delete from Product where Id_category = @idcate");
        thuchien = await pool.request()  
        .input('idcate', sql.Int, idcate)
        .query("delete from Category where Id_category = @idcate");
        }
        else{
            thuchien = await pool.request()  
        .input('idcate', sql.Int, idcate)
        .query("delete from Product where Id_category = @idcate");
        thuchien = await pool.request()  
        .input('idcate', sql.Int, idcate)
        .query("delete from Category where Id_category = @idcate");
        }
    }
    else{
        thuchien = await pool.request()  
        .input('idcate', sql.Int, idcate)
        .query("delete from Category where Id_category = @idcate");
    }
        return true;
        }
    catch(error){
        console.log(error);
    }
}

async function addcate(name){
    try{
       
        let pool = await sql.connect(config);
        let prooncate = await pool.request()  
        .input('name', sql.NVarChar(50), name)
        .query("insert into Category (Name_category) VALUES (@name)");
        return true;
        }
    catch(error){
        console.log(error);
    }
}
async function getallBill(state){
    try{
        var getbill
        let pool = await sql.connect(config);
        // if(state == 1)
        // {
        //  getbill = await pool.request()  
        // .input('state', sql.Int,state)
        // .query("Select c.Id_cart_bill, c.Id_user, c.Cart_code, c.Cart_state, c.Pay, c.Date, c.State_bill, u.Id_role, c.Address_dely, u.Email, u.Name_user, u.Sex, c.Phone_number_dely, u.State_user from Cart_bill as c Join Userr as u on c.Id_user= u.Id_user where c.Cart_state = @state order by c.Date");
        // return getbill.recordset;
        // }
        // if(state == 2)
        // {
        //  getbill = await pool.request()  
        // .input('state', sql.Int,state)
        // .query("Select c.Id_cart_bill, c.Id_user, c.Cart_code, c.Cart_state, c.Pay, c.Date, c.State_bill, u.Id_role, c.Address_dely, u.Email, u.Name_user, u.Sex, c.Phone_number_dely, u.State_user from Cart_bill as c Join Userr as u on c.Id_user= u.Id_user where c.Cart_state = @state order by c.Date");
        // return getbill.recordset;
        // }
        // if(state == 3)
        // {
        //  getbill = await pool.request()  
        // .input('state', sql.Int,state)
        // .query("Select c.Id_cart_bill, c.Id_user, c.Cart_code, c.Cart_state, c.Pay, c.Date, c.State_bill, u.Id_role, c.Address_dely, u.Email, u.Name_user, u.Sex, c.Phone_number_dely, u.State_user from Cart_bill as c Join Userr as u on c.Id_user= u.Id_user where c.Cart_state = @state order by c.Date");
        // return getbill.recordset;
        // }
        // if(state == 5)
        // {
        //  getbill = await pool.request()  
        // .query("Select c.Id_cart_bill, c.Id_user, c.Cart_code, c.Cart_state, c.Pay, c.Date, c.State_bill, u.Id_role, c.Address_dely, u.Email, u.Name_user, u.Sex, c.Phone_number_dely, u.State_user from Cart_bill as c Join Userr as u on c.Id_user= u.Id_user order by c.Date");
        // return getbill.recordset;
        // }
        // if(state == 4)
        // {
        //     getbill = await pool.request()  
        //     .input('state', sql.Int,state)
        //     .query("Select c.Id_cart_bill, c.Id_user, c.Cart_code, c.Cart_state, c.Pay, c.Date, c.State_bill, u.Id_role, c.Address_dely, u.Email, u.Name_user, u.Sex, c.Phone_number_dely, u.State_user from Cart_bill as c Join Userr as u on c.Id_user= u.Id_user where c.Cart_state = @state order by c.Date");
        //     return getbill.recordset;
        // }

        if(state == 5)
        {
         getbill = await pool.request()  
        .query("Select c.Id_bill, u.Id_user, c.Id_cart, b.State_cart, c.Pay, c.Date, u.Id_role, c.Address_dely, u.Email, u.Name_user, u.Sex, c.Phone_number_dely, u.State_user from (Bill as c join Cart as b on b.Id_cart = c.Id_cart) Join Userr as u on b.Id_user= u.Id_user where u.Id_user = b.Id_user order by c.Date");
        return getbill.recordset;
        }else{
            getbill = await pool.request()  
            .input('state', sql.Int,state)
            .query("Select c.Id_bill, u.Id_user, c.Id_cart, b.State_cart, c.Pay, c.Date, u.Id_role, c.Address_dely, u.Email, u.Name_user, u.Sex, c.Phone_number_dely, u.State_user from (Bill as c join Cart as b on b.Id_cart = c.Id_cart) Join Userr as u on b.Id_user= u.Id_user where b.State_cart = @state order by c.Date");
            return getbill.recordset;
        }
        
        }
    catch(error){
        console.log(error);
    }
}

async function getsearchproduct(name){
    try{
        let pool = await sql.connect(config);
        let getproduct = await pool.request()
        .input('name', sql.NVarChar(100),name)
        .query("select * from Product as p Join Category as c on c.Id_category= p.Id_category where Name_product like '%' + @name + '%'");
        return getproduct.recordset;
        }
    catch(error){
        console.log(error);
    }
}

async function getusearch(name){
    try{
        let pool = await sql.connect(config);
        let getuser = await pool.request()
        .input('name', sql.NVarChar(100),name)
        .query("Select * from Userr where Name_user like '%' + @name + '%' and Id_role != 1");
        return getuser.recordset;
        }
    catch(error){
        console.log(error);
    }
}

async function reneve(nam){
    try{
        let pool = await sql.connect(config);
        let hoadon = await pool.request()
        .input('nam', sql.Int,nam)
        .query("SELECT DISTINCT (MONTH(Date)) as mont, sum(Pay) as tong,count(b.Id_cart) as don FROM Bill as b join Cart as c on b.Id_cart = c.Id_cart  where year(Date) = @nam and c.State_cart = 4 GROUP BY (MONTH(Date))order by mont ");
        return hoadon.recordset;
        }
    catch(error){
        console.log(error);
    }
}

async function getComment(idUser){
    try{
        let pool = await sql.connect(config);
        let getComment = await pool.request()
        .input('iduser',sql.Int,idUser)
        .query("select * from Feedback where @iduser= Id_user order by Date DESC");
        return getComment.recordset;
        }
    catch(error){
        console.log(error);
    }
}

module.exports = {
    getUser:getUser,
    getBill:getBill,
    getpro:getpro,
    upState:upState,
    destroyBill:destroyBill,
    lockuser:lockuser,

    getproduct:getproduct,
    fepro:fepro,
    updatepro:updatepro,
    deletepro:deletepro,
    prostate:prostate,
    getcate: getcate,

    addsanpham:addsanpham,

    getsanphamcate:getsanphamcate,
    updatecate:updatecate,
    deletecate:deletecate,
    addcate:addcate,

    getallBill: getallBill,

    getsearchproduct:getsearchproduct,
    getusearch:getusearch,

    reneve:reneve,

    getComment: getComment
}