var SenecaWeb = require('seneca-web')
var Express = require('express')
var Router = Express.Router
var context = new Router()
var cors = require('cors')

var corsOptions =
{
      origin: 'http://localhost:4200',
      credentials: true
}

var senecaWebConfig = {
      context: context,
      adapter: require('seneca-web-adapter-express'),
      options: { parseBody: false } // so we can use body-parser
}

var app = Express();

app.use( require('body-parser').json() )
   .use(cors(corsOptions))
   .use( context )
   .listen(3000)

app.options('*', cors(corsOptions))

var seneca = require('seneca')()
      .use(SenecaWeb, senecaWebConfig )
      .use('entity')
      .use('api')
      .client( { type:'http', port: 8080, pin:'role:product' } )
      .client( { type:'http', port: 8081, pin:'role:order' } )
      .client( { type:'http', port: 8083, pin:'role:user' } )


