var express = require('express');
var router = express.Router();
const mysql=require('mysql')
const mysqlConf=require('../config/db')
const utils=require('../utils/utils')
const goodsSql=require('../sql/goods.sql')



var pool = mysql.createPool( mysqlConf );

router.get('/list', function(req, res, next) {
  pool.getConnection(function(err, connection) {
    connection.query(goodsSql.list,function(error, data, fields){
      if(error) {
        res.send({code:1,message:error})
        return
      };
      res.send({code:0,data:data||[]});
      connection.release();
    });
  })
});
router.post('/add', function(req, res, next) {
  const {name,price}=req.body
  let addSqlParams = [utils.guid(),name,price];
  pool.getConnection(function(err, connection) {
    connection.query(goodsSql.add, addSqlParams,function(error, data, fields){
      if(error) {
        res.send({code:1,message:error})
        return
      };
      res.send({code:0});
      connection.release();
    });
  })
});

router.post('/del', function(req, res, next) {
  pool.getConnection(function(err, connection) {
    connection.query(goodsSql.del,[req.body.id],function(error, data, fields){
      if(error) {
        res.send({code:1,message:error})
        return
      };
      res.send({code:0});
      connection.release();
    });
  })
});

router.post('/update', function(req, res, next) {
  const {id,name,price}=req.body
  pool.getConnection(function(err, connection) {
    connection.query(goodsSql.update,[name,price,id],function(error, data, fields){
      if(error) {
        res.send({code:1,message:error})
        return
      };
      res.send({code:0});
      connection.release();
    });
  })
});
module.exports = router;
