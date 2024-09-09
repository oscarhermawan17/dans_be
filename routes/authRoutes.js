// Modules
const express = require('express');

const { login, signIn } = require('../controllers/authController');

const authRoutes = express.Router();

/* 
  Method: POST 
  Function: Login user and getting token
  Route: /api/1/auth/login
  Body: { username, password }
*/
authRoutes.post('/login', login);


/* 
  Method: POST 
  Function: Register user
  Route: /api/1/auth/signin
  Body: { username, password }
*/
authRoutes.post('/signin', signIn);

module.exports = authRoutes;