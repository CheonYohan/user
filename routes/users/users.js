const express = require('express');
const router = express.Router();
const userRepository = require('./userRepository');
const encryption = require('../../modules/secure/encryption');

var root_path = 'users';

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/join', function(req, res, next) {
  res.render(`${root_path}/join`,{title:'회원가입'});
});
router.get('/login', function(req, res, next) {
  res.render(`login`,{});
});

router.post('/loginAction', function(req, res, next) {
  const {email,password} = req.body;
  const user = userRepository.findByEmailPassword();
  if(uesr.password === encryption.hashPassword(email,password).password){
    
  }else{

  }

  res.render(`login`,{});
});

router.post('/save', function(req, res, next) {
  userRepository.save(req.body);
  res.redirect('/');
});

router.get('/:userId', async function(req, res, next) {
  try {
    const result = await userRepository.findById(req.params.userId);
    res.render(root_path+'/detail', result.data);
  } catch (error) {
    next(error);
  }
});

module.exports = router;