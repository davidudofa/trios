var db=require('../dbconnection');
var fs = require('fs');

var Students={

getAllStudents:function(callback){

return db.query("Select c.id, c.s_name, c.s_mail, c.s_phone, c.s_num, c.s_class, d.class, c.s_img, c.date_registered from students c, class d where d.id = c.s_class AND active<>0",callback);

},
getStudentById:function(id,callback){
    return db.query("select c.id, c.s_name, c.s_mail, c.s_phone, c.s_num, c.s_class, d.class, c.s_img, c.date_registered from students c, class d where d.id = c.s_class AND c.active<>0 and c.id=?",[id],callback);
},

addStudent:function(Student,callback){
  if (Student.s_img != null){
    var base64d=Student.s_img.replace(/^data:image\/[a-z]+;base64,/, "");
    var mime = Student.s_img.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/);
    var fileName = mime[1]; // "image/png"
    var fileName2 = Student.s_num+'.'+fileName.replace(/^image\//, "");
    var path="./src/assets/student/"+fileName2;
    var path1=fileName2;
    fs.writeFile(path,base64d,'base64',function(err){
      if(err) {
        return console.log(err);
      }
      console.log("The file was saved!");
    });
  return db.query("Insert into students (`s_name`, `s_mail`, `s_phone`, `s_num`, `s_class`, `s_img`) values(?,?,?,?,?,?)",[Student.s_name,Student.s_mail,Student.s_phone,Student.s_num,Student.s_class,path1],callback);
}else{
  var fileName2 = Student.s_num+'.png';
  var path1=fileName2;

return db.query("Insert into students (`s_name`, `s_mail`, `s_phone`, `s_num`, `s_class`, `s_img`) values(?,?,?,?,?,?)",[Student.s_name,Student.s_mail,Student.s_phone,Student.s_num,Student.s_class,path1],callback);
}

},

deleteStudent:function(id, image, callback){
    if(image!=null){
      var path='./src/assets/student/'+image;
      fs.unlink(path,function(err){
      if(err){
        console.log(err);
      }
      console.log('Deleted successfuly')});
    }
    //return db.query("delete from students where id=?",[id],callback);
    return  db.query("update students set active=? where id=?",[0,id],callback);
},

updateStudent:function(id,Student,callback){
    return  db.query("update students set s_name=?,s_mail=?,s_phone=?,s_num=?,s_class=? where id=?",[Student.s_name,Student.s_mail,Student.s_phone,Student.s_num,Student.s_class,id],callback);
},

deleteAll:function(item,callback){

var delarr=[];
   for(i=0;i<item.length;i++){

       delarr[i]=item[i].Id;
   }
   return db.query("delete from students where id in (?)",[delarr],callback);
}
};
module.exports=Students;
