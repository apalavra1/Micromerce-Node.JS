var seneca = require('seneca')();

seneca  
  .use('basic')
  .use('entity')
  .use('product')
  .use('mongo-store', {
    uri: 'mongodb://@localhost:27017/examples'
})

seneca.listen
({ 
  'type': 'http',
  'port': 8080,
  'pin': 'role:product' 
});