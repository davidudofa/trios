var db=require('../dbconnection');

var Inventory={

getAllRaw:function(callback){

return db.query("select u.*, IFNULL(max(b.given_date), u.received_date) as last_given_date, IFNULL(SUM(b.qty), 0) as total_given, ((IFNULL(SUM(b.qty), 0)*100)/u.received_qty)as perc_usage from inventory u left join out_inventory b on b.item_id = u.id where u.inventory_type='raw' AND u.active<>0 group by u.id, u.item_name",callback);

},
getAllProduct:function(callback){

return db.query("select u.*, IFNULL(max(b.given_date), u.received_date) as last_given_date, IFNULL(SUM(b.qty), 0) as total_given, ((IFNULL(SUM(b.qty), 0)*100)/u.received_qty)as perc_usage from inventory u left join out_inventory b on b.item_id = u.id where u.inventory_type='product' AND u.active<>0 group by u.id, u.item_name",callback);

},
getRawById:function(id,callback){
    return db.query("select u.*, IFNULL(max(b.given_date), u.received_date) as last_given_date, IFNULL(SUM(b.qty), 0) as total_given, ((IFNULL(SUM(b.qty), 0)*100)/u.received_qty)as perc_usage from inventory u left join out_inventory b on b.item_id = u.id where u.inventory_type='raw' AND u.active<>0  AND u.id=? group by u.id, u.item_name",[id],callback);
},
getProductById:function(id,callback){
    return db.query("select u.*, IFNULL(max(b.given_date), u.received_date) as last_given_date, IFNULL(SUM(b.qty), 0) as total_given, ((IFNULL(SUM(b.qty), 0)*100)/u.received_qty)as perc_usage from inventory u left join out_inventory b on b.item_id = u.id where u.inventory_type='product' AND u.active<>0  AND u.id=? group by u.id, u.item_name",[id],callback);
},
getUsageId: function(id, callback){
  return db.query("select u.* from out_inventory u where u.item_id=? order by u.given_date",[id],callback);
},
updateRaw:function(id,Items,callback){
    var action = 'updated '+Items.item_name+' details';
    db.query("insert into activity (id, action, user) values(NULL, ?, ?)",[action, Items.staff_id], function (err, result) {
        if (err) throw err;
      });

    return  db.query("update inventory set item_name=?,item_type=?,item_desc=?,item_weight=?,received_qty=?,qty_label=? where id=?",[Items.item_name,Items.item_type,Items.item_desc,Items.item_weight,Items.received_qty,Items.qty_label,id],callback);

    //user updated item.type with id item.id
},
updateProduct:function(id,Items,callback){
  var action = 'updated '+Items.item_name+' details';
  db.query("insert into activity (id, action, user) values(NULL, ?, ?)",[action, Items.staff_id], function (err, result) {
      if (err) throw err;
    });
    return  db.query("update inventory set item_name=?,item_type=?,item_desc=?,item_weight=?,received_qty=?,qty_label=? where id=?",[Items.item_name,Items.item_type,Items.item_desc,Items.item_weight,Items.received_qty,Items.qty_label,id],callback);

    //user updated item.type with id item.id
},
deleteProduct:function(id,callback){
  var action = 'deleted item with id: '+id;
  db.query("insert into activity (id, action, user) values(NULL, ?, ?)",[action, id], function (err, result) {
      if (err) throw err;
    });
  return db.query("update inventory set active=0 where id=?",[id], callback);

  //user deleted item.type with id item.id
},
deleteRaw:function(id,callback){
  var action = 'deleted item with id: '+id;
  db.query("insert into activity (id, action, user) values(NULL, ?, ?)",[action, id], function (err, result) {
      if (err) throw err;
    });
  return db.query("update inventory set active=0 where id=?",[id], callback);

  //user deleted item.type with id item.id
},
addProduct: function(items, callback){
  var action = 'added new item: '+items.item_name;
  db.query("insert into activity (id, action, user) values(NULL, ?, ?)",[action, items.username], function (err, result) {
      if (err) throw err;
    });
  //console.log(items.invtype);
  return db.query("INSERT INTO `inventory` (`id`, `inventory_type`, `item_name`, `item_type`, `item_desc`, `item_weight`, `received_qty`, `received_date`, `inventory_staff`, `qty_label`, `received_from`, `active`, `item_img`) VALUES (NULL, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, ?, ?, ?, 1, ?)", [items.invtype, items.item_name, items.item_type, items.item_desc, items.item_weight, items.received_qty, items.username, items.qty_label, items.received_from, 'brocolli.jpg'], callback);

  //user added item.type with id item.id
},
addOut: function(items, callback){
  var action = 'requested '+items.qty+' '+items.qty_label+' of  '+items.item_name+' from inventory';
  db.query("insert into activity (id, action, user) values(NULL, ?, ?)",[action, items.given_to], function (err, result) {
      if (err) throw err;
    });
  return db.query("INSERT INTO `out_inventory` (`id`, `item_id`, `qty`, `given_to`, `reason`, `request_id`, `request_date`, `active`) VALUES (NULL, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, 1)", [items.id, items.qty, items.given_to, items.stafftype, items.request_id], callback);

  //user requested item.qty item.name from inventory
},
addIn: function(items, callback){
  var action = 'submitted '+items.qty+' '+items.qty_label+' of  '+items.item_name+' to inventory';
  db.query("insert into activity (id, action, user) values(NULL, ?, ?)",[action, items.received_from], function (err, result) {
      if (err) throw err;
    });

  return db.query("INSERT INTO `in_inventory` (`id`, `item_id`, `qty`, `received_from`, `remarks`, `request_id`, `active`) VALUES (NULL, ?, ?, ?, ?, ?, 1)", [items.id, items.qty, items.received_from, items.remarks, items.request_id], callback);

  //user submitted item.qty item.name to inventory
},
getLastProduct: function(callback){
  return db.query("SELECT c.* , d.item_name, d.item_type, d.item_img FROM in_inventory c, inventory d WHERE c.id IN (SELECT MAX(c.id) FROM in_inventory c GROUP BY c.item_id) AND d.id=c.item_id ORDER BY d.received_date desc", callback);
}
};
module.exports=Inventory;
