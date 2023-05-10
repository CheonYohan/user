const express = require('express');
const router = express.Router();
const repository = require('./userRepository');
const mailer = require('../../modules/mail/mailer');
const encrypt = require('../../modules/secure/encryption');

router.get('/:userId', async function(req, res, next) {
    try {
        const user = await repository.findById(req.params.userId);
        res.json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: 'Internal Server error' });
    }
});

router.post('/:userId/modify', async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await repository.findByEmailAndPassword(email, password);
        if (user.length === 0) {
            res.status(400).json({ success: false, message: '이메일과 비밀번호가 유효하지 않습니다.' });
        } else {
            const updatedUser = await repository.update(req.params.userId, req.body);
            res.status(200).json({ success: true, user: updatedUser, message: '수정이 완료되었습니다.' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: '내부 서버 오류입니다.' });
    }
});

router.post('/:userId/remove', (req, res, next)=> {
    const {user_id , password} = req.body;
    try{
        const userId = repository.remove(user_id);
        res.status(200).json({seccess:true,message:'삭제가 완료되었습니다.'});
    }catch (err){
        console.error(err);
        throw err;
    }
});

router.post('/save',(req,res,next)=>{
    try{
        const userId = repository.save(req.body);
        res.status(200).json({userId:userId});
    }catch (err){
        console.error(err);
        throw err;
    }
});

router.post('/identity-vertification',(req,res,next)=>{
    const {user_id,password} = req.body;
});

router.post('/login',async (req,res,next)=>{
    const {email,password} = req.body;

    try {
        const user = await repository.findByIdAndPassword(user_id, password);
        if (user.length > 0) {
            res.status(200).json({ success: true, message: '회원정보가 유효합니다.' });
        } else {
            res.status(400).json({ success: false, message: '회원정보가 유효하지않습니다.' });
        }
    } catch (err) {
        console.error(err);
    };
});

router.post('/logout',(req,res,next)=>{
    req.session.destroy((err)=>{
        if(err)
            console.log(err);
        else
            res.redirect('/');
    })
});

router.post('/findId',async (req,res,next)=>{
    try{
        const {email} = req.body;
        const user = await repository.findByEmail(email);

        if(user.length === 0)
            res.status(400).send('해당 이메일을 가진 회원이 없습니다.');
        else{
            const tempPassword = encrypt.generateTemporaryPassword(10);
            await repository.update(user.user_id,{password : tempPassword});
            await mailer.sendMail(email,'임시 비밀번호 발행',tempPassword);
            res.status(200).send('임시비밀번호를 해당 이메일로 발송하였습니다.');
        }
    }catch(err){
        console.error(err);
        throw err;
    }
});

router.post('/password-reset',(req,res,next)=>{

});


module.exports = router;
