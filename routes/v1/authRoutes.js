// Modules
const express = require('express');

const { login, signUp } = require('../../controllers/authController');

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
  Route: /api/1/auth/signup
  Body: { username, password }
*/
authRoutes.post('/signup', signUp);

module.exports = authRoutes;