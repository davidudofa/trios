const express = require('express');
const router = express.Router();
const Login = require('../models/auth');
const Inventory = require('../models/inventory');
// declare axios for making http requests
const axios = require('axios');
//const API = 'https://jsonplaceholder.typicode.com';

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});
router.get('/raw/:id?',function(req,res,next){

if(req.params.id){
    Inventory.getRawyId(req.params.id,function(err,rows){
        if(err){
            res.json(err);
        }else{
            res.json(rows);
        }
    });
}
else{

 Inventory.getAllRaw(function(err,rows){
        if(err){
            res.json(err);
        }else{
            res.json(rows);
        }

    });
}
});
router.get('/product/:id?',function(req,res,next){

if(req.params.id){
    Inventory.getProductById(req.params.id,function(err,rows){
        if(err){
            res.json(err);
        }else{
            res.json(rows);
        }
    });
}
else{

 Inventory.getAllProduct(function(err,rows){
        if(err){
            res.json(err);
        }else{
            res.json(rows);
        }

    });
}
});

router.get('/lastproduct/', function(req,res,next){
  Inventory.getLastProduct(function(err,rows){
      if(err){
          res.json(err);
      }else{
          res.json(rows);
      }
  });
});

router.get('/usage/:id?',function(req,res,next){
    Inventory.getUsageId(req.params.id,function(err,rows){
        if(err){
            res.json(err);
        }else{
            res.json(rows);
        }
    });
});

router.put('/raw/:id',function(req,res,next){

    Inventory.updateRaw(req.params.id,req.body,function(err,rows){

        if(err){
            res.json(err);
        }else{
            res.json(rows);
        }
    });
});

router.put('/product/:id',function(req,res,next){

    Inventory.updateProduct(req.params.id,req.body,function(err,rows){

        if(err){
            res.json(err);
        }else{
            res.json(rows);
        }
    });
});

router.post('/product/',function(req,res,next){

        Inventory.addProduct(req.body,function(err,count){
          //console.log(req.body);
            if(err){
                res.json(err);
            }else{
                    res.json(req.body);//or return count for 1 & 0
            }
        });
});

router.post('/requestraw/', function(req,res,next){
    Inventory.addOut(req.body,function(err,rows){

        if(err){
            res.json(err);
        }else{
            res.json(rows);
        }
    });
});

router.post('/submitproduct/', function(req,res,next){
  Inventory.addIn(req.body,function(err,rows){

      if(err){
          res.json(err);
      }else{
          res.json(rows);
      }
  });
})

router.delete('/raw/:id',function(req,res,next){

        Inventory.deleteRaw(req.params.id,function(err,count){
          if(err){
                res.json(err);
            }else{
                res.json(count);
            }

        });
});

router.delete('/product/:id',function(req,res,next){

        Inventory.deleteProduct(req.params.id,function(err,count){
          if(err){
                res.json(err);
            }else{
                res.json(count);
            }

        });
});

router.post('/login/',function(req,res,next){
    Login.doLogin(req.body,function(err,rows){

        if(err){
            res.json(err);
        }else{
            res.json(rows);
        }
    });
});

router.get('/activity/', function(req,res,next){
  Login.getActivity(function(err,rows){
         if(err){
             res.json(err);
         }else{
             res.json(rows);
         }

     });
})
module.exports=router;
