const nodemailer = require('nodemailer')
const mailer = async (to, link) => {

  var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: '',
      pass: ''
    }
  });

  console.log('created');
  transporter.sendMail({
  from: 'xxx@gmail.com',
    to: 'xxx@gmail.com',
    subject: 'hello world!',
    text: 'hello world!'
  });

}


module.exports.mailer = mailer