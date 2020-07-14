const mailer = require('nodemailer');

/**
 * Dando uso ao modulo nodemailer do node.js esta função cria o transporte necessário
 * para o envio automático de emails
 */
var transporter = mailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'sustainabilitywebpi@gmail.com',
        pass: 'ACMP2020'
    }
});
module.exports = transporter;