const express = require('express');
const { User } = require('./models');
const { authenticateUser } = require('./middleware/auth-user');
const { Router } = require('express');
const { asyncHandler } = require('../middleware/asyncHandler');

/* GET route */
/* return all  propertires and values */
/* currently authenticated user */
/* 200 HTTP status code */

// Route that returns the current authenticated user 
Router.get('/users', asyncHandler(async (req, res) => {

}));

/* POST route */
/* create new user */
/* location header to "/" */
/* return 201 http status code */
/* no content */

