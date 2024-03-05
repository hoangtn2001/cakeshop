const config = require('../dbconfig');
const sql = require('mssql');


async function getcategorys(){
    try{
        let pool = await sql.connect(config);
        let namecategory = await pool.request().query("Select * from Category");
        return namecategory.recordset;
    }
    catch(error){
        console.log(error);
    }
}
async function getproduct(){
    try{
        let pool = await sql.connect(config);
        let product = await pool.request().query("Select * from Product where Pro_state = 0");
        return product.recordset;
    }
    catch(error){
        console.log(error);
    }
}
async function getcatepro(idcate){
    try{
        let pool = await sql.connect(config);
        let cateproduct = await pool.request()
        .input('idcate',sql.NVarChar ,idcate)
        .query("Select * from Product where Id_category = @idcate and Pro_state = 0");
        let cateproductup = await pool.request()
        .input('idcate',sql.NVarChar ,idcate)
        .query("Select * from Product where Id_category = @idcate and  Pro_state = 0 order by Price ");
        let cateproductdown = await pool.request()
        .input('idcate',sql.NVarChar ,idcate)
        .query("Select * from Product where Id_category = @idcate  and Pro_state = 0 order by Price DESC");
        return [cateproduct.recordset,cateproductup.recordset,cateproductdown.recordset];
    }
    catch(error){
        console.log(error);
    }
}
async function getarrangeproduct(){
    try{
        let pool = await sql.connect(config);
        let product = await pool.request().query("Select * from Product where Pro_state = 0 order by Price");
        let productde = await pool.request().query("Select * from Product where Pro_state = 0 order by Price DESC");
        return [product.recordset, productde.recordset];
    }
    catch(error){
        console.log(error);
    }
}
async function getFeproduct(){
    try{
        let pool = await sql.connect(config);
        let feproduct = await pool.request().query("Select * from Product where Fe_pro = 1 and Pro_state = 0");
        return feproduct.recordset;
    }
    catch(error){
        console.log(error);
    }
}
async function getHome(idcate,searchpro){
    try{
        return [await getcategorys(),
            await getFeproduct(),
           await getproduct(),
        await getarrangeproduct(),
    await getcatepro(idcate),
    await searchProduct(searchpro),];
    }
    catch(error){
        console.log(error);
    }
}
async function searchProduct(searchpro){
    try{
        let pool = await sql.connect(config);
        let searchproduct = await pool.request()
        .input('product',sql.NVarChar ,searchpro)
        .query("Select * from Product WHERE Name_product like '%' + @product + '%' and Pro_state = 0");
        let searchproductup = await pool.request()
        .input('product',sql.NVarChar ,searchpro)
        .query("Select * from Product WHERE Name_product like '%' + @product + '%' and Pro_state = 0  order by Price");
        let searchproductdown = await pool.request()
        .input('product',sql.NVarChar ,searchpro)
        .query("Select * from Product WHERE Name_product like '%' + @product + '%' and Pro_state = 0 order by Price DESC");
        return [searchproduct.recordset, searchproductup.recordset,searchproductdown.recordset];
        }
    catch(error){
        console.log(error);
    }
}




async function getcategory(cateId){
    try{
        let pool = await sql.connect(config);
        let namecategory = await pool.request()
        .input('input_parameter', sql.Int, cateId)
        .query("Select * from Category where Id_category = @input_parameter");
        return namecategory.recordsets;
    }
    catch(error){
        console.log(error);
    }
}

async function addcategory(Category){
    try{
        let pool = await sql.connect(config);
        let insertCategory = await pool.request()
        .input('Id', sql.Int, Category.Id_category)
        .input('Name', sql.NVarChar(50), Category.Name_category)
        .query("insert into Category (Id_category, Name_category) VALUES (@Id, @Name)");
        return insertCategory.recordsets;
    }
    catch(error){
        console.log(error);
    }
}
async function deletecategory(CateId){
    try{
        let pool = await sql.connect(config);
        let isnertCategory = await pool.request()
        .input('input_parameter', sql.Int, CateId)
        .query("delete  from Product where Id_category = @input_parameter delete  from Category where Id_category = @input_parameter");
        let namecategory = await pool.request().query("Select * from Category");
        return namecategory.recordsets;
    }
    catch(error){
        console.log(error);
    }
}

async function updatecategory(Category){
    try{
        let pool = await sql.connect(config);
        let updateCategory = await pool.request()
        .input('Id', sql.Int, Category.Id_category)
        .input('Name', sql.NVarChar(50), Category.Name_category)
        .query("UPDATE Category set Id_category = @Id , Name_category = @Name where Id_category = @Id");
        let getcateupdate = await pool.request()
        .input('Id', sql.Int, Category.Id_category)
        .query("select * from category where Id_category = @Id");
        return getcateupdate.recordsets;
    }
    catch(error){
        console.log(error);
    }
}

async function searchcategory(searchcate){
    try{
        let pool = await sql.connect(config);
        let searchcategory = await pool.request()
        .input('banh',sql.NVarChar ,searchcate)
        .query("Select * from Category WHERE Name_category like '%' + @banh + '%' ");
        return searchcategory.recordsets;
        }
    catch(error){
        console.log(error);
    }
}
async function addComment(idUser,comment){
    try{
        let pool = await sql.connect(config);
        let insertComment = await pool.request()
        .input('iduser',sql.Int,idUser)
        .input('comment',sql.NVarChar(500) ,comment)
        .query("insert into Feedback (Id_user, Comment,Date) VALUES (@iduser, @comment, GETDATE())");
        return true;
        }
    catch(error){
        console.log(error);
    }
}

async function getProductById(idProduct){
    try{
        let pool = await sql.connect(config);
        let getproduct = await pool.request()
        .input('idproduct',sql.Int,idProduct)
        .query("select * from Product where Id_product = @idproduct");
        return getproduct.recordset;
        }
    catch(error){
        console.log(error);
    }
}
async function getProductOnCart(iduser){
    try{
        let pool = await sql.connect(config);
        let getcurrentCart = await pool.request()
        .input('iduser',sql.Int,iduser)
        .query("select * from (Cart_detail as cd join Cart as c on  cd.Id_cart= c.Id_cart) Join Product as p on p.Id_product = cd.Id_product where c.Id_user = @iduser and State_cart = 0 order by Cd_date");
        let i = 0;
        for(i; i<getcurrentCart.recordset.length;i++){
            if(getcurrentCart.recordset[i].Quantity_pro-getcurrentCart.recordset[i].Quantity_pro_bought == 0){
                let upcartde =  await pool.request()
                .input('idcartdetail',sql.Int,getcurrentCart.recordset[i].Id_cart_detail)
                .query("UPDATE Cart_detail set Quantity = 0 where Id_cart_detail = @idcartdetail")
            }
            else if(getcurrentCart.recordset[i].Quantity_pro-getcurrentCart.recordset[i].Quantity_pro_bought < getcurrentCart.recordset[i].Quantity)
            {
                let upcartde =  await pool.request()
                .input('idcartdetail',sql.Int,getcurrentCart.recordset[i].Id_cart_detail)
                .input('soluong',sql.Int,getcurrentCart.recordset[i].Quantity_pro-getcurrentCart.recordset[i].Quantity_pro_bought)
                .query("UPDATE Cart_detail set Quantity = @soluong where Id_cart_detail = @idcartdetail")
            }
            else{
                continue;
            }
        }
        let getcurrent1Cart = await pool.request()
        .input('iduser',sql.Int,iduser)
        .query("select Link_image, Name_product, c.Id_cart, Price, Quantity, Id_cart_detail, Quantity * price as Total_price from (Cart_detail as cd join Cart as c on  cd.Id_cart= c.Id_cart) Join Product as p on p.Id_product = cd.Id_product where c.Id_user = @iduser and State_cart = 0 order by Cd_date");
        let getuser = await pool.request()
        .input('iduser',sql.Int,iduser)
        .query("select * from Userr where Id_user = @iduser");
        return [getcurrent1Cart.recordset,getuser.recordset];
        }
    catch(error){
        console.log(error);
    }
}
async function insertProductOnCart(idProduct,soluong,iduser){
    try{
        let pool = await sql.connect(config);
        let getcart = await pool.request()
        .input('iduser', sql.Int, iduser)
        .query("select * from Cart where Id_user = @iduser and State_cart = 0");
        let getuser = await pool.request()
        .input('iduser',sql.Int,iduser)
        .query("select * from Userr where Id_user = @iduser");
        if(getcart.recordset.length != 0)
        {
            let getTheSameProduct = await pool.request()
            .input('idproduct',sql.Int,idProduct)
            .input('idcart',sql.Int,getcart.recordset[0].Id_cart)
            .query("select * from Cart_detail where Id_product = @idproduct and Id_cart = @idcart");
           
            if(getTheSameProduct.recordset.length != 0){
                soluong = soluong*1;
                soluong += getTheSameProduct.recordset[0].Quantity;
                let product = await pool.request()
                .input('idproduct',sql.Int,idProduct)
                .query("select * from Product where Id_product = @idproduct");
                let total = product.recordset[0].Price*soluong;
                let updateCart = await pool.request()
            .input('idproduct',sql.Int,idProduct)
            .input('idcart',sql.Int,getcart.recordset[0].Id_cart)
            .input('soluong', sql.Int, soluong)
            .query("UPDATE Cart_detail set Quantity = @soluong where Id_product = @idproduct and Id_cart = @idcart");
    
            let getcurrentCart = await pool.request()
            .input('iduser',sql.Int,iduser)
            .query("select * from (Cart_detail as cd join Cart as c on  cd.Id_cart= c.Id_cart) Join Product as p on p.Id_product = cd.Id_product where c.Id_user = @iduser and State_cart = 0 order by Cd_date");
            let i = 0;
            for(i; i<getcurrentCart.recordset.length;i++){
                if(getcurrentCart.recordset[i].Quantity_pro-getcurrentCart.recordset[i].Quantity_pro_bought == 0){
                    let upcartde =  await pool.request()
                    .input('idcartdetail',sql.Int,getcurrentCart.recordset[i].Id_cart_detail)
                    .query("UPDATE Cart_detail set Quantity = 0 where Id_cart_detail = @idcartdetail")
                }
                else if(getcurrentCart.recordset[i].Quantity_pro-getcurrentCart.recordset[i].Quantity_pro_bought < getcurrentCart.recordset[i].Quantity)
                {
                    let upcartde =  await pool.request()
                    .input('idcartdetail',sql.Int,getcurrentCart.recordset[i].Id_cart_detail)
                    .input('soluong',sql.Int,getcurrentCart.recordset[i].Quantity_pro-getcurrentCart.recordset[i].Quantity_pro_bought)
                    .query("UPDATE Cart_detail set Quantity = @soluong where Id_cart_detail = @idcartdetail")
                }
                else{
                    continue;
                }
            }
            let getcurrent1Cart = await pool.request()
            .input('iduser',sql.Int,iduser)
            .query("select Link_image, Name_product, c.Id_cart, Price, Quantity, Id_cart_detail, Quantity * price as Total_price from (Cart_detail as cd join Cart as c on  cd.Id_cart= c.Id_cart) Join Product as p on p.Id_product = cd.Id_product where c.Id_user = @iduser and State_cart = 0 order by Cd_date");
            return [getcurrent1Cart.recordset, getuser.recordset];
            }
            else{
            let product = await pool.request()
            .input('idproduct',sql.Int,idProduct)
            .query("select * from Product where Id_product = @idproduct");
            let total = product.recordset[0].Price*soluong;
            // let cartcode;
            // let getCart = await pool.request()
            // .input('iduser',sql.Int,iduser)
            // .query("select * from Cart where Id_user = @iduser order by Date");
            // if(getCart.recordset.length == 0){
            //     cartcode = 1;
            // }
            // else if(getCart.recordset.length != 0 && getCart.recordset[getCart.recordset.length-1].State_cart == 0){
            //     cartcode = getCart.recordset[getCart.recordset.length-1].Cart_code;
            // }
            // else{
            //     cartcode = getCart.recordset[getCart.recordset.length-1].Cart_code + 1;
            // }
            let insert = await pool.request()
            .input('idproduct',sql.Int,idProduct)
            .input('idcart',sql.Int,getcart.recordset[0].Id_cart)
            .input('soluong',sql.Int,soluong)
            .query("insert into Cart_detail (Id_cart, Id_product, Quantity, Cd_date) VALUES (@idcart, @idproduct,@soluong,GETDATE())");
            let getcurrentCart = await pool.request()
        .input('iduser',sql.Int,iduser)
        .query("select * from (Cart_detail as cd join Cart as c on  cd.Id_cart= c.Id_cart) Join Product as p on p.Id_product = cd.Id_product where c.Id_user = @iduser and State_cart = 0 order by Cd_date");
        let i = 0;
        for(i; i<getcurrentCart.recordset.length;i++){
            if(getcurrentCart.recordset[i].Quantity_pro-getcurrentCart.recordset[i].Quantity_pro_bought == 0){
                let upcartde =  await pool.request()
                .input('idcartdetail',sql.Int,getcurrentCart.recordset[i].Id_cart_detail)
                .query("UPDATE Cart_detail set Quantity = 0  where Id_cart_detail = @idcartdetail")
            }
            else if(getcurrentCart.recordset[i].Quantity_pro-getcurrentCart.recordset[i].Quantity_pro_bought < getcurrentCart.recordset[i].Quantity)
            {
                let upcartde =  await pool.request()
                .input('idcartdetail',sql.Int,getcurrentCart.recordset[i].Id_cart_detail)
                .input('soluong',sql.Int,getcurrentCart.recordset[i].Quantity_pro-getcurrentCart.recordset[i].Quantity_pro_bought)
                .query("UPDATE Cart_detail set Quantity = @soluong where Id_cart_detail = @idcartdetail")
            }
            else{
                continue;
            }
        }
        let getcurrent1Cart = await pool.request()
        .input('iduser',sql.Int,iduser)
        .query("select Link_image, Name_product, c.Id_cart, Price, Quantity, Id_cart_detail, Quantity * price as Total_price from (Cart_detail as cd join Cart as c on  cd.Id_cart= c.Id_cart) Join Product as p on p.Id_product = cd.Id_product where c.Id_user = @iduser and State_cart = 0 order by Cd_date");
            return [getcurrent1Cart.recordset,getuser.recordset];
        }
        }else{
            let insertcart = await pool.request()
            .input('iduser',sql.Int,iduser)
            .query("insert into Cart (Id_user, State_cart) VALUES (@iduser, 0)");

            let getcurcart = await pool.request()
            .input('iduser', sql.Int, iduser)
            .query("select * from Cart where Id_user = @iduser and State_cart = 0");

            let product = await pool.request()
            .input('idproduct',sql.Int,idProduct)
            .query("select * from Product where Id_product = @idproduct");
            let total = product.recordset[0].Price*soluong;

            let insert = await pool.request()
            .input('idproduct',sql.Int,idProduct)
            .input('idcart',sql.Int,getcurcart.recordset[0].Id_cart)
            .input('soluong',sql.Int,soluong)
            .query("insert into Cart_detail (Id_cart, Id_product, Quantity, Cd_date) VALUES (@idcart, @idproduct,@soluong,GETDATE())");
            let getcurrentCart = await pool.request()
            .input('iduser',sql.Int,iduser)
            .query("select * from (Cart_detail as cd join Cart as c on  cd.Id_cart= c.Id_cart) Join Product as p on p.Id_product = cd.Id_product where c.Id_user = @iduser and State_cart = 0 order by Cd_date");
            let i = 0;
            for(i; i<getcurrentCart.recordset.length;i++){
                if(getcurrentCart.recordset[i].Quantity_pro-getcurrentCart.recordset[i].Quantity_pro_bought == 0){
                    let upcartde =  await pool.request()
                    .input('idcartdetail',sql.Int,getcurrentCart.recordset[i].Id_cart_detail)
                    .query("UPDATE Cart_detail set Quantity = 0 where Id_cart_detail = @idcartdetail")
                }
                else if(getcurrentCart.recordset[i].Quantity_pro-getcurrentCart.recordset[i].Quantity_pro_bought < getcurrentCart.recordset[i].Quantity)
                {
                    let upcartde =  await pool.request()
                    .input('idcartdetail',sql.Int,getcurrentCart.recordset[i].Id_cart_detail)
                    .input('soluong',sql.Int,getcurrentCart.recordset[i].Quantity_pro-getcurrentCart.recordset[i].Quantity_pro_bought)
                    .query("UPDATE Cart_detail set Quantity = @soluong where Id_cart_detail = @idcartdetail")
                }
                else{
                    continue;
                }
            }
            let getcurrent1Cart = await pool.request()
            .input('iduser',sql.Int,iduser)
            .query("select Link_image, Name_product, c.Id_cart, Price, Quantity, Id_cart_detail, Quantity * price as Total_price from (Cart_detail as cd join Cart as c on  cd.Id_cart= c.Id_cart) Join Product as p on p.Id_product = cd.Id_product where c.Id_user = @iduser and State_cart = 0 order by Cd_date");
            return [getcurrent1Cart.recordset,getuser.recordset];
        }  
         }
     catch(error){
         console.log(error);
     }
}
async function deleteProductCar(idcart){
    try{
        let pool = await sql.connect(config);
        let deleteproductcart = await pool.request()
        .input('idcart',sql.Int,idcart)
        .query("delete from Cart_detail where Id_cart_detail = @idcart");
        return true;
        }
    catch(error){
        console.log(error);
    }
}
async function insertBill(iduser, tongtien,diachi,phone){
    try{
       
        let pool = await sql.connect(config);
        let getidcart = await pool.request()
        .input('iduser',sql.Int,iduser)
        .query("select * from Cart where Id_user = @iduser and State_cart = 0");

        let updatecartstate = await pool.request()
        .input('iduser',sql.Int,iduser)
        .query("UPDATE Cart set State_cart = 1 where Id_user = @iduser and State_cart = 0");
        let insertbill = await pool.request()
        .input('iduser',sql.Int,iduser)
        .input('tongtien',sql.Int,tongtien)
        .input('cartcode',sql.Int,getidcart.recordset[0].Id_cart) 
        .input('diachi',sql.NVarChar(200),diachi) 
        .input('phone',sql.NVarChar(50),phone) 
        .query("insert into bill (Id_cart, Pay, Date,Phone_number_dely,Address_dely) VALUES (@cartcode,@tongtien,GETDATE(),@phone,@diachi)");

        let getprocart = await pool.request()
        .input('idcart',sql.Int,getidcart.recordset[0].Id_cart)
        .query("select * from Cart_detail where Id_cart = @idcart");

        let i = 0;
        for(i; i<getprocart.recordset.length; i++){
            let getpro = await pool.request()
        .input('idpro',sql.Int,getprocart.recordset[i].Id_product)
        .query("select * from Product where Id_product = @idpro");
        let uppro = await pool.request()
        .input('idpro', sql.Int,getprocart.recordset[i].Id_product)
        .input('idbought',sql.Int,getprocart.recordset[i].Quantity + getpro.recordset[0].Quantity_pro_bought)
        .query("UPDATE Product set Quantity_pro_bought = @idbought where Id_product = @idpro");
        }

        let getcurrentBill = await pool.request()
        .input('iduser',sql.Int,iduser)
        .query("select * from Bill as b join Cart as c on b.Id_cart = c.Id_cart where c.State_cart = 1 and c.Id_user = @iduser order by Date");
        return getcurrentBill.recordset;
        }
    catch(error){
        console.log(error);
    }
}
async function getBill(iduser){
    try{
        let pool = await sql.connect(config);
        let getConfirmBill = await pool.request()
        .input('iduser',sql.Int,iduser)
        .query("select * from Bill as b join Cart as c on b.Id_cart = c.Id_cart where c.State_cart = 1 and c.Id_user = @iduser order by Date");
        let getReadyBill = await pool.request()
        .input('iduser',sql.Int,iduser)
        .query("select * from Bill as b join Cart as c on b.Id_cart = c.Id_cart where c.State_cart = 2 and c.Id_user = @iduser order by Date");
        let getDeliverBill = await pool.request()
        .input('iduser',sql.Int,iduser)
        .query("select * from Bill as b join Cart as c on b.Id_cart = c.Id_cart where c.State_cart = 3 and c.Id_user = @iduser order by Date");
        return [getConfirmBill.recordset, getReadyBill.recordset,getDeliverBill.recordset];
        }
    catch(error){
        console.log(error);
    }
}
async function getDetailBill(iduser, cartcode){
    try{
        let pool = await sql.connect(config);
        let getproductConfirm = await pool.request()
        .input('iduser',sql.Int,iduser)
        .input('cartcode', sql.Int, cartcode.split(",")[0]*1)
        .query("select Link_image, Name_product, ca.Id_cart, Price, Quantity, Id_cart_detail, Quantity * price as Total_price from (Cart_detail as c Join Product as p on c.Id_product= p.Id_product) join Cart as ca on ca.Id_cart = c.Id_cart where ca.Id_user = @iduser and State_cart = 1 and ca.Id_cart = @cartcode order by c.Cd_date");
        let getproductReady = await pool.request()
        .input('iduser',sql.Int,iduser)
        .input('cartcode', sql.Int, cartcode.split(",")[0]*1)
        .query("select Link_image, Name_product, ca.Id_cart, Price, Quantity, Id_cart_detail, Quantity * price as Total_price  from (Cart_detail as c Join Product as p on c.Id_product= p.Id_product) join Cart as ca on ca.Id_cart = c.Id_cart where ca.Id_user = @iduser and State_cart = 2 and ca.Id_cart = @cartcode order by c.Cd_date");
        let getProductDeliver = await pool.request()
        .input('iduser',sql.Int,iduser)
        .input('cartcode', sql.Int, cartcode.split(",")[0]*1)
        .query("select Link_image, Name_product, ca.Id_cart, Price, Quantity, Id_cart_detail, Quantity * price as Total_price  from (Cart_detail as c Join Product as p on c.Id_product= p.Id_product) join Cart as ca on ca.Id_cart = c.Id_cart where ca.Id_user = @iduser and State_cart = 3 and ca.Id_cart = @cartcode order by c.Cd_date");
        let getProductdagiao = await pool.request()
        .input('iduser',sql.Int,iduser)
        .input('cartcode', sql.Int, cartcode.split(",")[0]*1)
        .query("select Link_image, Name_product, ca.Id_cart, Price, Quantity, Id_cart_detail, Quantity * price as Total_price  from (Cart_detail as c Join Product as p on c.Id_product= p.Id_product) join Cart as ca on ca.Id_cart = c.Id_cart where ca.Id_user = @iduser and State_cart = 4 and ca.Id_cart = @cartcode order by c.Cd_date");
        let getProductdahuy = await pool.request()
        .input('iduser',sql.Int,iduser)
        .input('cartcode', sql.Int, cartcode.split(",")[0]*1)
        .query("select Link_image, Name_product, ca.Id_cart, Price, Quantity, Id_cart_detail, Quantity * price as Total_price  from (Cart_detail as c Join Product as p on c.Id_product= p.Id_product) join Cart as ca on ca.Id_cart = c.Id_cart where ca.Id_user = @iduser and State_cart = 5 and ca.Id_cart = @cartcode order by c.Cd_date");
        return [getproductConfirm.recordset, getproductReady.recordset,getProductDeliver.recordset,getProductdagiao.recordset,getProductdahuy.recordset];
        }
    catch(error){
        console.log(error);
    }
}
async function deleteBill(cartcode, iduser){
    try{
        let pool = await sql.connect(config);
        let updatecart = await pool.request()
        .input('iduser',sql.Int,iduser)
        .input('cartcode', sql.Int, cartcode.split(",")[0]*1)
        .query("update Cart set State_cart = 5 where Id_user = @iduser and Id_cart = @cartcode");

        let getprocart = await pool.request()
        .input('idcart',sql.Int,cartcode.split(",")[0]*1)
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

        return true;
        }
    catch(error){
        console.log(error);
    }
}

async function history(iduser){
    try{
        let pool = await sql.connect(config);
        let getConfirmBill = await pool.request()
        .input('iduser',sql.Int,iduser)
        .query("select * from Bill as b join Cart as c on b.Id_cart = c.Id_cart where c.State_cart = 4 or c.State_cart = 5 and Id_user = @iduser order by Date");
        return getConfirmBill.recordset;
        }
    catch(error){
        console.log(error);
    }
}
module.exports = {
    getcategorys : getcategorys,
    getproduct: getproduct,
    getHome:getHome,
    searchProduct: searchProduct,
    getFeproduct: getFeproduct,
    addComment: addComment,
    getProductById:getProductById,
    insertProductOnCart:insertProductOnCart,
    getProductOnCart:getProductOnCart,
    insertBill:insertBill,
    getBill:getBill,
    deleteProductCar:deleteProductCar,
    getDetailBill:getDetailBill,
    deleteBill:deleteBill,
    getcategory : getcategory,
    addcategory : addcategory,
    deletecategory : deletecategory,
    searchcategory : searchcategory,
    updatecategory : updatecategory,

    history:history
}