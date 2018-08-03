module.exports = function api(options) {

    var store = require('store')
    var LocalStorage = require('node-localstorage').LocalStorage,
    localStorage = new LocalStorage('./scratch');
  
    var Promise = require('bluebird');
    var act_promise = Promise.promisify(this.act, {context: this});

        this.add('role:api,path:fetchProducts', function (msg, respond) {
            var token = "";
            if(msg.request$.headers.cookie != null){   
                var start = msg.request$.headers.cookie.indexOf("Auth=");
                token = msg.request$.headers.cookie.substr(start + 5, 36);
            }
            act_promise('role:user', {
                cmd: 'auth',
                token: token
            })
            .then(function(result){
                if(result.ok){   
                    act_promise({ role: "product", cmd: "fetch" })
                    .then(function(products)
                    {
                        respond(null, products)
                    })
                }
                else{
                    respond(null, {error: "Access denied"})
                }
                
            })
        })

    this.add('role:api,path:fetchProductsByCategory', function (msg, respond) {
        var category = msg.args.params.category
        var token = "";
        if(msg.request$.headers.cookie != null)
        {   
            var start = msg.request$.headers.cookie.indexOf("Auth=");
            token = msg.request$.headers.cookie.substr(start + 5, 36);
        }
        act_promise('role:user', 
        {
            cmd: 'auth',
            token: token
        })
        .then(function(result)
        {
            if(result.ok)
            {
                act_promise('role:product', {
                    cmd: 'fetch',
                    criteria: 'byCategory',
                    category: category,
                })
                .then(function(products)
                {
                    respond(null, products)
                })
            }
            else
            {
                respond(null, {error: "Access denied"})
            }
        })
    })

    this.add('role:api,path:fetchProductById', function (msg, respond) {
        var id = msg.args.params.id
        var token = "";
        if(msg.request$.headers.cookie != null)
        {   
            var start = msg.request$.headers.cookie.indexOf("Auth=");
            token = msg.request$.headers.cookie.substr(start + 5, 36);
        }
        act_promise('role:user', 
        {
            cmd: 'auth',
            token: token
        })
        .then(function(result)
        {
            if(result.ok)
            {
                act_promise('role:product', {
                    cmd: 'fetch',
                    criteria: 'byId',
                    id: id,
                })
                .then(function(product)
                {
                    respond(null, product)
                })
            }
            else
            {
                respond(null, {error: "Access denied"})
            }
        })
    })

    this.add('role:api,path:addProduct', function (msg, respond) {
        var name = msg.args.body.name
        var category = msg.args.body.category
        var description = msg.args.body.description
        var price = msg.args.body.price
        var token = "";
        if(msg.request$.headers.cookie != null)
        {   
            var start = msg.request$.headers.cookie.indexOf("Auth=");
            token = msg.request$.headers.cookie.substr(start + 5, 36);
        }
        act_promise('role:user', 
        {
            cmd: 'auth',
            token: token
        })
        .then(function(result)
        {
            if(result.ok && result.user.admin)
            {
                act_promise('role:product', {
                    cmd: 'add',
                    name: name,
                    category: category,
                    description: description,
                    price: price,
                })
                .then(function(product)
                {
                    respond(null, product)
                })
            }
            else
            {
                respond(null, {error: "Access denied"})
            }
        })
    })


    this.add('role:api,path:deleteProduct', function (msg, respond) {
        var id = msg.args.params.id
        var token = "";
        if(msg.request$.headers.cookie != null)
        {   
            var start = msg.request$.headers.cookie.indexOf("Auth=");
            token = msg.request$.headers.cookie.substr(start + 5, 36);
        }
        act_promise('role:user', 
        {
            cmd: 'auth',
            token: token
        })
        .then(function(result)
        {
            if(result.ok && result.user.admin)
            {   
                act_promise({ role: "product", cmd: "delete", id: id })
                .then(function()
                {
                    respond()
                })
            }
            else
            {
                respond(null, {error: "Access denied"})
            }
            
        })
    })

    this.add('role:api,path:editProduct', function (msg, respond) {
        var id = msg.args.params.id
        var name = msg.args.body.name
        var category = msg.args.body.category
        var description = msg.args.body.description
        var price = msg.args.body.price
        var token = "";
        if(msg.request$.headers.cookie != null)
        {   
            var start = msg.request$.headers.cookie.indexOf("Auth=");
            token = msg.request$.headers.cookie.substr(start + 5, 36);
        }
        act_promise('role:user', 
        {
            cmd: 'auth',
            token: token
        })
        .then(function(result)
        {
            if(result.ok && result.user.admin)
            {
                act_promise('role:product', {
                    cmd: 'edit',
                    id: id,
                    name: name,
                    category: category,
                    description: description,
                    price: price,
                })
                .then(function(product)
                {
                    respond(null, product)
                })
            }
            else
            {
                respond(null, {error: "Access denied"})
            }
        })
    })


    this.add('role:api,path:fetchOrders', function (msg, respond) {
        var token = "";
        if(msg.request$.headers.cookie != null)
        {   
            var start = msg.request$.headers.cookie.indexOf("Auth=");
            token = msg.request$.headers.cookie.substr(start + 5, 36);
        }
        act_promise('role:user', 
        {
            cmd: 'auth',
            token: token
        })
        .then(function(result)
        {
            if(result.ok && result.user.admin)
            {   
                act_promise({ role: "order", cmd: "fetch" })
                .then(function(orders)
                {
                    respond(null, orders)
                })
            }
            else
            {
                respond(null, {error: "Access denied"})
            }
            
        })
    })

    this.add('role:api,path:fetchOrdersByCustomer', function (msg, respond) {
        var customer = msg.args.params.customer;
        var token = "";
        if(msg.request$.headers.cookie != null)
        {   
            var start = msg.request$.headers.cookie.indexOf("Auth=");
            token = msg.request$.headers.cookie.substr(start + 5, 36);
        }        act_promise('role:user', 
        {
            cmd: 'auth',
            token: token
        })
        .then(function(result)
        {
            if(result.ok)
            {   
                act_promise({ role: "order", 
                    cmd: "fetch",
                    criteria: 'byCustomer',
                    customer: customer, 
                })
                .then(function(orders)
                {
                    respond(null, orders)
                })
            }
            else
            {
                respond(null, {error: "Access denied"})
            }
            
        })
    })

    this.add('role:api,path:fetchOrderById', function (msg, respond) {
        var id = msg.args.params.id;
        var token = "";
        if(msg.request$.headers.cookie != null)
        {   
            var start = msg.request$.headers.cookie.indexOf("Auth=");
            token = msg.request$.headers.cookie.substr(start + 5, 36);
        }        act_promise('role:user', 
        {
            cmd: 'auth',
            token: token
        })
        .then(function(result)
        {
            if(result.ok)
            {
                act_promise('role:order', {
                    cmd: 'fetch',
                    criteria: 'byId',
                    id: id,
                })
                .then(function(order)
                {
                    respond(null, order)
                })
            }
            else
            {
                respond(null, {error: "Access denied"})
            }
        })
    })

    this.add('role:api,path:deleteOrder', function (msg, respond) {
        var id = msg.args.params.id;
        var token = "";
        if(msg.request$.headers.cookie != null)
        {   
            var start = msg.request$.headers.cookie.indexOf("Auth=");
            token = msg.request$.headers.cookie.substr(start + 5, 36);
        }        act_promise('role:user', 
        {
            cmd: 'auth',
            token: token
        })
        .then(function(result)
        {
            if(result.ok && result.user.admin)
            {   
                act_promise({ role: "order", cmd: "delete", id: id })
                .then(function()
                {
                    respond()
                })
            }
            else
            {
                respond(null, {error: "Access denied"})
            }
            
        })
    })

    this.add('role:api,path:addOrder', function (msg, respond) { 
        var ids = msg.args.body.id;
        var ammounts = msg.args.body.ammount;
        var email = msg.args.body.email;
        var address = msg.args.body.address;
        var zipcode = msg.args.body.zipcode;
        var cmds = [];
        ids.forEach(function (id){
            var command = act_promise({role:'product', cmd: 'fetch', criteria: 'byId', id: id});
            cmds.push(command);
        })
        var product = [];
        var token = "";
        if(msg.request$.headers.cookie != null){   
            var start = msg.request$.headers.cookie.indexOf("Auth=");
            token = msg.request$.headers.cookie.substr(start + 5, 36);
        }        
        act_promise('role:user', {
            cmd: 'auth',
            token: token
        })
        .then(function(result){
            if(result.ok){ 
                Promise.all(cmds)
                .then(function (results){
                    results.forEach(function (result){
                        product.push(result);
                    })
                    
                })
                .then(function (){
                    act_promise({role:'order', cmd: 'add', products: product, ammounts: ammounts, email: email, address: address, zipcode: zipcode})
                    .then(function(order){
                        respond(null, order)
                    })
                })
                .catch(function (err){
                    console.error(err);
                })
            }
            else{
                respond(null, {error: "Access denied"})
            }
        })
    })

    this.add('role:api,path:register', function (msg, respond) {
        var name = msg.args.body.name;
        var email = msg.args.body.email;
        var password = msg.args.body.password;
        var repeat = msg.args.body.repeat;
        var admin = msg.args.body.admin;
        this.act('role:user', {
            cmd: 'register',
            name: name,
            email: email,
            password: password,
            repeat: repeat,
            admin: admin,
        }, respond)
    })

    this.add('role:api,path:login', function (msg, respond) {
        var email = msg.args.body.email;
        var password = msg.args.body.password;
        act_promise('role:user', {
            cmd: 'login',
            email: email,
            password: password,
        })
        .then(function (result)
        {
            respond(result);
        })
    })

    this.add('role:api,path:logout', function (msg, respond) {
        var token = "";
        if(msg.request$.headers.cookie != null)
        {   
            var start = msg.request$.headers.cookie.indexOf("Auth=");
            token = msg.request$.headers.cookie.substr(start + 5, 36);
        }        
        act_promise('role:user', {
            cmd: 'logout',
            token: token,
        })
        .then(function (result)
        {
            respond();
        })
    })

    this.add('role:api,path:auth', function (msg, respond) {
        var token = "";
        if(msg.request$.headers.cookie != null)
        {   
            var start = msg.request$.headers.cookie.indexOf("Auth=");
            token = msg.request$.headers.cookie.substr(start + 5, 36);
        }        
        this.act('role:user', {
            cmd: 'auth',
            token: token
        }, respond)
    })



    this.add('init:api', function (msg, respond) {
    this.act('role:web',{routes:{
        prefix: '/api',
        pin:    'role:api,path:*',
        map: {
            fetchProducts: { GET:true },
            fetchProductsByCategory: { GET:true, suffix:'/:category' },
            fetchProductById: { GET:true, suffix:'/:id' },
            addProduct: { GET: false, POST:true },
            deleteProduct: { GET: false, DELETE: true, suffix:'/:id'},
            editProduct: { GET: false, PUT: true, suffix:'/:id'},
            fetchOrders: { GET:true },
            fetchOrderById: { GET:true, suffix:'/:id' },
            fetchOrdersByCustomer : { GET: true, suffix:'/:customer' },
            deleteOrder: { GET: false, DELETE: true, suffix:'/:id'},
            addOrder: { GET: false, POST: true },
            register: { GET: false, POST: true},
            login: { GET: false, POST: true},
            logout: { GET: true },
            auth: { GET: true },
        }
    }}, respond)
    })


    
}
