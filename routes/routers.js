const homeRouter = require('./home');
const goodsRouter = require('./goods');

module.exports=function(app){
  app.use('/', homeRouter);
  app.use('/goods', goodsRouter);
}

