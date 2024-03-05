class Category{
    constructor(Id_category, Name_category){
        this.Id_category=Id_category;
        this.Name_category=Name_category;
    }
}
 class Product{
    constructor(Id_product, Id_category, Id_user, Name_product, Describe, Price, Link_image, Fe_pro){
        this.Id_product = Id_product;
        this.Id_category = Id_category;
        this.Id_user = Id_user;
        this.Name_category = Name_product;
        this.Describe = Describe;
        this.Price = Price;
        this.Link_image = Link_image;
        this.Fe_pro = Fe_pro;
    }
 }
 class Cart_Bill{
    constructor(Id_cart_bill, Id_user, Cart_code, Pay, Date, State_bill){
        this.Id_cart_bill = Id_cart_bill;
        this.Id_user = Id_user;
        this.Cart_code = Cart_code;
        this.Pay = Pay;
        this.Date = Date;     
        this.State_bill = State_bill;
        
    }
 }
 class Cart{
    constructor(Id_cart, Id_product, Id_user, Cart_code, State_cart, Date, Quantity, Total_price){
        this.Id_cart = Id_cart;
        this.Id_product = Id_product;
        this.Id_user = Id_user;
        this.Cart_code = Cart_code;
        this.State_cart = State_cart;
        this.Date = Date;
        this.Quantity = Quantity;
        this.Total_price = Total_price;
    }
 }
class Userr{
    constructor(Id_user, Id_role, Address, Email, Password, Name_user, Sex, Phone_number, State_user){
        this.Id_user=Id_user;
        this.Id_role=Id_role;
        this.Address=Address;
        this.Email=Email;
        this.Password=Password;
        this.Name_user=Name_user;
        this.Sex=Sex;
        this.Phone_number=Phone_number;
        this.State_user = State_user;
    }
}
class Role{
    constructor(Id_role, Service){
        this.Id_role=Id_role;
        this.Service=Service;
    }
}
class Token{
    constructor(Id_token, Id_user, Token){
        this.Id_token=Id_token;
        this.Id_user=Id_user;
        this.Token = Token;
    }
}
class Comment{
    constructor(Id_comment, Id_user, Comment){
        this.Id_comment=Id_comment;
        this.Id_user=Id_user;
        this.Comment = Comment;
    }
}



module.exports = Category;