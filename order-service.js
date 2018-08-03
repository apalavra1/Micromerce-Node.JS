var seneca = require('seneca')();

seneca  
  .use('basic')
  .use('entity')
  .use('order')
  .use('mongo-store', {
    uri: 'mongodb://@localhost:27017/examples'
})

seneca.listen
({ 
  'type': 'http',
  'port': '8081',
  'pin': 'role:order' 
});