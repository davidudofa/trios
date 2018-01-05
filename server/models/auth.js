var db=require('../dbconnection');

var Login={

doLogin:function(user, callback){
  return db.query("Select c.id, c.staff_id, c.department, c.role from login c where c.active<>0 and c.staff_id=? AND c.staff_hash=MD5(?)",[user.username, user.userhash],callback);
}


};
module.exports=Login;
