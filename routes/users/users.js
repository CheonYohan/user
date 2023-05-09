const express = require('express');
const router = express.Router();
const userRepository = require('./userRepository');

var root_path = 'users';

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/join', function(req, res, next) {
  res.render(`${root_path}/join`,{title:'회원가입'});
});

router.post('/save', function(req, res, next) {
  userRepository.save(req.body);
  res.redirect('/');
});

router.get('/:userId', async function(req, res, next) {
  try {
    const result = await userRepository.findById(req.params.userId);
    console.log(result);
    res.render(root_path+'/detail', result.data);
  } catch (error) {
    next(error);
  }
});

module.exports = router;