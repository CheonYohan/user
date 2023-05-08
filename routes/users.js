const express = require('express');
const router = express.Router();
const userApi = require('./usersApi');

var root_path = 'users';

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/join', function(req, res, next) {
  res.render(root_path+'/join',{title:'회원가입'});
});

router.get('/:userId', async function(req, res, next) {
  try {
    const result = await userApi.get(`/api/users/${req.params.userId}`);
    console.log(result.data);
    res.render(root_path+'/detail', result.data);
  } catch (error) {
    next(error);
  }
});

module.exports = router;