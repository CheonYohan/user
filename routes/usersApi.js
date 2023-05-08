const express = require('express');
const router = express.Router();
const connection = require('../database/databaseConnection');


const getUserById = async (userId) => {
    try {
        const [rows] = await connection.query(`SELECT * FROM Member WHERE user_id = ?`, [userId]);
        return rows[0];
    } catch (err) {
        console.error(err);
        throw err;
    }
}

router.get('/:userId', async function(req, res, next) {
    try {
        const user = await getUserById(req.params.userId);
        res.json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: 'Internal Server error' });
    }
});

router.post('/:userId/modify', (req, res, next)=> {
    res.send('respond with a resource');
});

router.post('/:userId/remove', (req, res, next)=> {
    res.send('respond with a resource');
});

router.post('/save',(req,res,next)=>{
    const {email , password, nickname, phone_num, name, birthday} = req.body;
    console.log(email);
});

router.post('/identity-vertification',(req,res,next)=>{

});

router.post('/login',(req,res,next)=>{

});

router.post('/logout',(req,res,next)=>{
    req.session.destroy((err)=>{
        if(err)
            console.log(err);
        else
            res.redirect('/');
    })
});

router.post('/findId',(req,res,next)=>{

});

router.post('/password-reset',(req,res,next)=>{

});


module.exports = router;
