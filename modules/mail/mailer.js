const nodemailer = require('nodemailer');

const mailerConfig = {
  user: 'sosu2842@gmail.com'
  ,pass : 'qodcnlzkvygboxzh'
};
// 메일 발송에 사용될 Gmail 계정 정보
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth : mailerConfig
    /*auth: {
        user: 'your_email@gmail.com',
        pass: 'your_password'
    }*/
});

// 메일 옵션 설정
const mailOptions = {
   /* from: 'your_email@gmail.com',*/
    from : mailerConfig.user,
    to: 'sosu2842@gmail.com',
    subject: 'Test Email from Node.js',
    text: 'This is a test email sent from Node.js'
};

// 메일 발송

class Mailer{
    sendMail(to,subject,text){
        mailOptions.to = to;
        mailOptions.subject = subject;
        mailOptions.text = text;

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }
}

module.exports = new Mailer();