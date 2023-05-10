const encrypt = require('../modules/secure/encryption');

describe('비밀번호 암호화',()=>{
   test('이메일과 비밀번호로 암호화',()=>{
       expect(encrypt.hashPassword('1111','test@test.com').password)
           .toBe(encrypt.hashPassword('1111','test@test.com').password);
   }) ;
});