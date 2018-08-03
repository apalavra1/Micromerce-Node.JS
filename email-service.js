var seneca = require('seneca')();

seneca  
  .use('email')
  
seneca.listen
({ 
  'type': 'http',
  'port': '8082', 
});