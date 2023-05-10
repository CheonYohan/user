/*  SMS 발송 서비스
*   Twilio 회사 API 서비스
*   Twilio 계정을 생성해야 합니다. 계정을 생성한 후,
*   Twilio 대시보드에서 Get a Trial Number 버튼을 눌러 전화번호를 발급받으세요.
*   발급받은 전화번호는 문자를 발송할 때 사용됩니다.
* */


const accountSid = 'YOUR_ACCOUNT_SID'; // Twilio 계정 SID
const authToken = 'YOUR_AUTH_TOKEN'; // Twilio 인증 토큰
const TWILIO_PHONE_NUMBER = '';
const client = require('twilio')(accountSid, authToken);

client.messages
    .create({
        body: 'This is the message body',
        from: 'YOUR_TWILIO_PHONE_NUMBER',
        to: 'RECIPIENT_PHONE_NUMBER'
    })
    .then(message => console.log(message.sid))
    .catch(error => console.log(error));

class sms{
    async send(to , message){
        try{
            return await client.create({
                body: message,
                from: TWILIO_PHONE_NUMBER,
                to: to
            });
        }catch (err){
            console.error(err);
            throw err;
        }
    }
}

module.exports = new sms();