const util = require("util");
const express = require('express');
const app = express();
const path = require("path");
const multer = require("multer");
const { text } = require("body-parser");
const body = require('body-parser');
const config = require('../dbconfig');
const sql = require('mssql');
app.use(body.urlencoded({extended: true}));
app.use(body.json());
let tenf='null';

// Khởi tạo biến cấu hình cho việc lưu trữ file upload
let storage = multer.diskStorage({
  // Định nghĩa nơi file upload sẽ được lưu lại
  destination: (req, file, callback) => {
    callback(null, path.join(`${__dirname}/../../CakeShop/public/uploads`));
  },
  
  filename: (req, file, callback) => {
    // ở đây các bạn có thể làm bất kỳ điều gì với cái file nhé.
    // Mình ví dụ chỉ cho phép tải lên các loại ảnh jpg
    let math = ["image/jpeg"];
    if (math.indexOf(file.mimetype) === -1) {
      let errorMess = `The file <strong>${file.originalname}</strong> is invalid. Only allowed to upload image jpeg or png.`;
      return callback(errorMess, null);
    }
    let idpro = req.params.id;

    // Tên của file thì mình nối thêm một cái nhãn thời gian để tránh bị trùng tên file.
    let filename = `${Date.now()}-hoagtrinhdev-${file.originalname}`;
    tenf=`/public/uploads/${filename}`;
    callback(null, filename);
    async function updatef(){
      try{
          let pool = await sql.connect(config);
          let updateimage = await pool.request()
          .input('Id', sql.Int, idpro)
          .input('tenf', sql.NVarChar(500), tenf)
          .query("update Product set Link_image = @tenf where Id_product = @Id");
      }
      catch(error){
          console.log(error);
      }
  }
  updatef();

  }
});
let uploadManyFiles = multer({storage: storage}).array("many-files", 17);
// Mục đích của util.promisify() là để bên controller có thể dùng async-await để gọi tới middleware này
let multipleUploadMiddleware = util.promisify(uploadManyFiles);

module.exports = multipleUploadMiddleware;

