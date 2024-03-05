let multipleUploadMiddleware = require('../../../middleware/multipleUploadMiddleware');
let debug = console.log.bind(console);

// Import the functions you need from the SDKs you need
const firebase = require('firebase/app');
const {getStorage, ref, uploadBytes} = require("firebase/storage");
const bufferImage = require("buffer-image");
const fs = require('fs/promises');
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
 apiKey: "AIzaSyCmNkJzdPtpnj7UMULv46pWPYvJ5m-Aqpc",
 authDomain: "cakeshop-8b618.firebaseapp.com",
 projectId: "cakeshop-8b618",
 storageBucket: "cakeshop-8b618.appspot.com",
 messagingSenderId: "647790626517",
 appId: "1:647790626517:web:20dd420a0e44f2ed0e845c",
 measurementId: "G-YTH0G31SZ5"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const storage = getStorage();

let multipleUpload = async (req, res) => {
  try {
    // thực hiện upload
    await multipleUploadMiddleware(req, res);
    // Nếu upload thành công, không lỗi thì tất cả các file của bạn sẽ được lưu trong biến req.files
    debug(req.files);
    async function example() {
      try {
        const data = await fs.readFile(req.files[0].path);
        return data;
      } catch (err) {
        console.log(err);
      }
    }
    const metadata = {
      contentType: req.files[0].mimetype
    };
    const storageRef = ref(storage, req.files[0].filename);
    uploadBytes(storageRef,await example(),metadata);
    // Mình kiểm tra thêm một bước nữa, nếu như không có file nào được gửi lên thì trả về thông báo cho client
    if (req.files.length <= 0) {
      return res.send(`You must select at least 1 file or more.`);
    }
    // trả về cho người dùng cái thông báo đơn giản.
    return res.redirect("/admin/product")
  } catch (error) {
    // Nếu có lỗi thì debug lỗi xem là gì ở đây
    debug(error);
    // Bắt luôn lỗi vượt quá số lượng file cho phép tải lên trong 1 lần
  }
};
module.exports = {
  multipleUpload: multipleUpload
};