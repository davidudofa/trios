var db=require('../dbconnection');

var Staffs={

getAllStaff:function(callback){

return db.query("Select c.id, c.staff_name, c.staff_mail, c.staff_no, c.department, d.class, c.assigned_class, c.level, c.createdate, c.staff_img from staff c, class d where d.id = c.assigned_class AND c.active<>0",callback);

},
getStaffById:function(id,callback){
    return db.query("select c.id, c.staff_name, c.staff_mail, c.staff_no, c.department, d.class, c.assigned_class, c.level, c.createdate, c.staff_img from staff c, class d where d.id = c.assigned_class AND c.active<>0 and c.id=?",[id],callback);
},

addStaff:function(Staff,callback){
return db.query("Insert into staff (`staff_name`, `staff_mail`, `staff_no`, `department`, `assigned_class`, `level`, `active`) values(?,?,?,?,?,?,?)",[Staff.staff_name,Staff.staff_mail,Staff.staff_no,Staff.department,Staff.assigned_class,Staff.level,1],callback);

},

deleteStaff:function(id,callback){
    //return db.query("delete from students where id=?",[id],callback);
    return  db.query("update staff set active=? where id=?",[0,id],callback);
},

updateStaff:function(id,Staff,callback){
    return  db.query("update staff set staff_name=?,staff_mail=?,staff_no=?,department=?,assigned_class=?,level=? where id=?",[Staff.staff_name,Staff.staff_mail,Staff.staff_no,Staff.department,Staff.assigned_class,Staff.level,id],callback);
},

deleteAll:function(item,callback){

var delarr=[];
   for(i=0;i<item.length;i++){

       delarr[i]=item[i].Id;
   }
   return db.query("delete from staff where id in (?)",[delarr],callback);
}
};
module.exports=Staffs;
