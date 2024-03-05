
const Trangchu = require('./trangchuRoute');
const user = require('../routes/userRoute');
const admin = require('../routes/adminRoute');

function route(app){
    app.use('/admin',admin);
    app.use('/cakeshop',Trangchu);
    app.use('/login',user);
    app.use('/',function getRegister(req, res, next){
        res.render('index');
    })
  
}

module.exports= route;