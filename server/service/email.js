// TODO send email to the client using Nodemailer!
var nodemailer = require('nodemailer');
const { message } = require("../views/pages");

function sendmail(name, email, key) {
  var transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "378e7fd542a14c",
      pass: "48bc6c3b3c6101"
    }
  });
  
  var mailOptions = {
    from: '<support@clients-api.com>',
    to: email,
    subject: 'Your Clients API Key',
    text: 'Hey there, it’s our first message sent with Nodemailer ;) ',
    html: message(name, key)
  };
  
  transport.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
  });
}




function sendKey(name, email, key) {
  sendmail(name, email, key);
}

module.exports = { sendKey };