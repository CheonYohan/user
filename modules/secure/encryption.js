const crypto = require('crypto');

const hashPassword = (salt, password) => {
  // salt와 함께 입력받은 패스워드를 해시화합니다.
  salt = 'secret';
  const hashedPassword = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');

  return {
    password: hashedPassword
  };

};

const generateTemporaryPassword = (length)=> {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charsLength = chars.length;
  let password = '';

  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(crypto.randomBytes(1)[0] / 256 * charsLength));
  }

  return password;
}

module.exports = {
  hashPassword,
  generateTemporaryPassword
};