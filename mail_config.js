const mailer = require('nodemailer');

var transporter = mailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'sustainabilitywebpi@gmail.com',
        pass: 'ACMP2020'
    }
});
module.exports = transporter;