const express = require('express');
const router = express.Router();
const userRepository = require('./userRepository');
const encryption = require('../../modules/secure/encryption');

var root_path = 'users';

/* GET users listing. */
router.get('/', async function(req, res, next) {
  const users = await userRepository.findAll();
  res.render(`${root_path}/list`,{users : users});
});

router.get('/join', function(req, res, next) {
  res.render(`${root_path}/join`,{title:'회원가입'});
});
router.get('/login', function(req, res, next) {
  if(req.session.user != undefined){
    res.redirect('/');
  }else{
    res.render(`login`,{});
  }
});

router.post('/loginAction', async function(req, res, next) {
  const {user_id, password} = req.body;

  try {
    const user = await userRepository.findByIdAndPassword(user_id, password);
    if (user.length > 0) {
      delete user[0].password;
      req.session.user = user[0];
      res.redirect('/');
    } else {
      res.send(`<script>alert('로그인정보가 유효하지 않습니다.'); window.location.replace('/users/login')</script>`);
    }
  } catch (err) {
    console.error(err);
  };
});

router.post('/save', function(req, res, next) {
  userRepository.save(req.body);
  res.redirect('/');
});

router.get('/:userId', async function(req, res, next) {
  try {
    const result = await userRepository.findById(req.params.userId);
    res.render(root_path+'/detail', {user : result});
  } catch (error) {
    next(error);
  }
});

router.get('/:userId/modify', async function(req, res, next) {
  try {
    const result = await userRepository.update(req.params.userId,req.body);
    res.redirect(`/users/${req.params.userId}`);
  } catch (error) {
    next(error);
  }
});

router.get('/:userId/remove', async function(req, res, next) {
  const {user_id , password} = req.body;
  try {
    const result = await userRepository.update(req.params.userId,req.body);
    res.redirect(`/users/${req.params.userId}`);
  } catch (error) {
    next(error);
  }
});

module.exports = router;