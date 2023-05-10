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

router.get('/findByEmail', function(req, res, next) {
  res.render(`${root_path}/findByEmail`,{title:'회원가입'});
});

router.post('/loginAction', async function(req, res, next) {
  const {user_id, password} = req.body;
  console.log(password);
  console.log(encryption.hashPassword('test',password).password);
  try {
    const user = await userRepository.findByIdAndPassword(user_id, password);
    if (user) {
      delete user.password;
      req.session.user = user;
      res.redirect('/');
    } else {
      res.send(`<script>alert('로그인정보가 유효하지 않습니다.'); window.location.replace('/users/login')</script>`);
    }
  } catch (err) {
    console.error(err);
  };
});

router.post('/logoutAction', async function(req, res, next) {
  try {
      req.session.destroy((err)=>{
        if(err){
          console.error(err);
        } else{
          res.redirect('/');
        }
      });
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
    console.log(error);
    next(error);
  }
});

router.post('/:userId/modify', async function(req, res, next) {
  const {user_id , current_password} = req.body;
  try {
    const originUser = await userRepository.findById(req.params.userId);
    if(!passwordCheck(originUser.password,current_password)){
      res.status(400).send(`<script>alert('비밀번호가 일치하지 않습니다'); window.history.back(); </script>`);
    }else{
      const result = await userRepository.update(req.params.userId,req.body);
      res.redirect(`/users`);
    }
  } catch (error) {
    next(error);
  }
});

router.post('/:userId/remove', async function(req, res, next) {
  const {user_id , current_password} = req.body;
  try {
    const originUser = await userRepository.findById(user_id);

    if(!passwordCheck(originUser.password,current_password)){
      res.status(400).send('비밀번호가 일치하지 않습니다');
    }else{
      const result = await userRepository.remove(user_id);
      res.redirect(`/users`);
    }
  } catch (error) {
    next(error);
  }
});

const passwordCheck = (originPassword,password)=>{
  return (encryption.hashPassword('secret',password).password == originPassword);
};

module.exports = router;