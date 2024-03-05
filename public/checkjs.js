function gethomeproduct(req,res){
   var fied = req.query.fied;
   var sort = req.query.fied;
   return [fied, sort];
}