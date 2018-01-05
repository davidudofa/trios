var db=require('../dbconnection');

var Login={

doLogin:function(user, callback){
  return db.query("Select c.id, c.staff_id, c.department, c.role from login c where c.active<>0 and c.staff_id=? AND c.staff_hash=MD5(?)",[user.username, user.userhash],callback);

  //user loggedin to dashboard
},

getActivity: function(callback){
  return db.query("SELECT c.*, d.staff_name FROM `activity` c, employees d WHERE c.user = d.staff_id AND d.active<>0 order by c.datetime desc", callback);
}


};
module.exports=Login;
