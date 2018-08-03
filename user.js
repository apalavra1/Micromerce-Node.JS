module.exports = function user(options)
{
    this.add({role:' user', cmd: 'register'},function (args, done) {
        args.admin = args.admin;
        this.prior(args,done)
    })
}