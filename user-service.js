var seneca = require('seneca')();

seneca  
  .use('basic')
  .use('entity')
  .use(require('seneca-user'))
  .use('mongo-store', {
    uri: 'mongodb://@localhost:27017/examples'
  })

seneca.listen
({ 
  'type': 'http',
  'port': '8083',
  'pin': 'role:user' 
});