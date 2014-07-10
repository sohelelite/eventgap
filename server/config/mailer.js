'use strict';

function mailer () {

    var nodemailer      = require('nodemailer'),
        mailTemplate    = require('./mailTemplate'),
        api = {};

    var smtpTransport = nodemailer.createTransport('SMTP',{
        service: 'Gmail',
        auth: {
            user: 'sohel.shaikh.s@gmail.com ',
            pass: 'test'
        }
    });

    // Send confirmation email to user
    api.sendRegistrationEmail = function(destinationMail, confirmationString) {

        try {
            smtpTransport.sendMail({
                    from    : mailTemplate.fromAddress,
                    to      : destinationMail,
                    subject : mailTemplate.registrationMail.Subject,
                    text    : mailTemplate.registrationMail.Body
                },
                function(error, response){
                    if(error){
                        console.log(error);
                    }
                    else {
                        console.log('Message sent: ' + response.message);
                    }
                });
        }
        catch(e) {
            console.log(e);
        }
    };

    //Send Reset mail
    api.sendResetPassword = function (destinationMail) {

        try {
            smtpTransport.sendMail({
                    from    : mailTemplate.fromAddress,
                    to      : destinationMail,
                    subject : mailTemplate.resetPasswordMail.Subject,
                    text    : mailTemplate.resetPasswordMail.Body
                },
                function(error, response){
                    if(error){
                        console.log(error);
                    }
                    else {
                        console.log('Message sent: ' + response.message);
                    }
                });
        }
        catch(e) {
            console.log(e);
        }

    };

    return api;
}

module.exports = mailer;