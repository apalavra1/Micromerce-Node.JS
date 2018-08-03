module.exports = function email(options) {
    var nodemailer = require('nodemailer');
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: 
        {
            user: 'info.micromerce@gmail.com',
            pass: 'micromerce123!'
        }
    });
    this.add({role: "email", cmd: "send"}, function(args, done) {
        var mailOptions = {
            from: 'Micromerce Info <info@micromerce.com>',
            to: args.to,
            subject: args.subject,
            text: args.body
        };
        transporter.sendMail(mailOptions, function(error, info){
            if(error)
            {
                console.log(error);
                done({code: error}, null);
            }
            done(null, {status: "sent"});
        });
    });
}