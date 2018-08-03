module.exports = function order(options) {

    var senecaEmailer = require('seneca')()
    .use('email')
    .client( { type:'http', port: 8082} )

    this.add({role: "order", cmd: "fetch"}, function(args, done) 
    {
        var orders = this.make$("Order");
        orders.list$({}, function(err, result) {
            done(err, result);
        });
    })

    this.add({role: "order", cmd: "fetch", criteria: "byId"}, function(args, done) {
        var order = this.make$("Order");
        order.load$(args.id, function(err, result) {
          done(err, result);
          });
      });

      this.add({role: "order", cmd: "fetch", criteria: "byCustomer"}, function(args, done) {
        var orders = this.make$("Order");
        orders.list$({customer: args.customer}, function(err, result) {
          done(err, result);
          });
      });
  

    this.add({role: "order", cmd: "delete"}, function(args, done) 
    {
        var orders = this.make$("Order");
        orders.remove$(args.id, function(err) 
        {
            done(err, null);
        });
    });


    this.add({role: "order", cmd: "add"}, function(args, done) 
    {
        var products = args.products;
        var ammounts = args.ammounts;
        var email = args.email;
        var address = args.address;
        var zipcode = args.zipcode;
        var text = "";
        var productNames = [];
        var total = 0.0;
        for(var i = 0; i < products.length; i++)
        {
            productNames.push(products[i].name);
            total = total + (products[i].price * ammounts[i]);
            text += ammounts[i].toString() + " * " + products[i].name + " Price: " + products[i].price.toString() + "\n";
        }
        text += "Total: " + total.toString();
        var orders = this.make$("Order");
        orders.products = productNames;
        orders.ammounts = ammounts;
        orders.customer = email;
        orders.address = address;
        orders.zipcode = zipcode;
        orders.total = total;
        orders.save$(function(err, order) 
        {
            var pattern = 
            {
                role: "email",
                cmd: "send",
                to: email,
                subject: "Order from micromerce",
                body: text
            }
            senecaEmailer.act(pattern, done);
            done(err, orders.data$(false));
        });
    });
}