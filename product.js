module.exports = function product(options) {

    this.add({role: "product", cmd: "fetch"}, function(args, done) 
    {
      var products = this.make$("Product");
      products.list$({}, function(err, result) {
        done(err, result);
        });
    })


    this.add({role: "product", cmd: "fetch", criteria: "byCategory"}, function(args, done) {
      var products = this.make$("Product");
      products.list$({category: args.category}, function(err, result) {
        done(err, result);
        });
    });


    this.add({role: "product", cmd: "fetch", criteria: "byId"}, function(args, done) {
      var product = this.make$("Product");
      product.load$(args.id, function(err, result) {
        done(err, result);
        });
    });


    this.add({role: "product", cmd: "add"}, function(args ,done) {
      var products = this.make$("Product");
      products.name = args.name;
      products.category = args.category;
      products.description = args.description;
      products.price = args.price;
      products.save$(function(err, product) 
      {
        done(err, products.data$(false));
      });
    });


    this.add({role: "product", cmd: "delete"}, function(args, done) 
    {
      var products = this.make$("Product");
      products.remove$(args.id, function(err) 
      {
          done(err, null);
      });
    });

    
    this.add({role: "product", cmd: "edit"}, function(args, done) 
    {
      this.act({role: "product", cmd: "fetch", criteria: "byId", id: args.id}, function(err, result) 
      {
        result.data$(
          {
            name: args.name,
            category: args.category,
            description: args.description,
            price: args.price
          }
        );

        result.save$(function(err, product)
        {
          done(err, product.data$(false));
        });
      });
    });
   
}
