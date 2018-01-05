var mysql=require('mysql');
 /*var connection=mysql.createPool({

host:'localhost',
 user:'root',
 password:'',
 database:'trios_ms'

});*/
var connection=mysql.createPool({

host:'db102b.pair.com',
user:'aisltd_21',
password:'ApcMXUDH',
database:'aisltd_triosms'

});
 module.exports=connection;
