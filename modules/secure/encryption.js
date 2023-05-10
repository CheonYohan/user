const crypto = require('crypto');

const hashPassword = (salt, password) => {
  // salt와 함께 입력받은 패스워드를 해시화합니다.
  salt = 'secret';
  const hashedPassword = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');

  return {
    password: hashedPassword
  };
};



module.exports = {
  hashPassword
};