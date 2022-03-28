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
Router.get('/users', authenticateUser, asyncHandler(async (req, res) => {
    // retrieve  current auth user information
    const user = req.currentUser;

    res.status(200).json({
        name: user.name,
        username: user.username
    });
}));

/* POST route */
/* create new user */
/* location header to "/" */
/* return 201 http status code */
/* no content */


// Route that creates a new user 
Router.post('/users', asyncHandler(async (req, res) => {
    try {
        await User.create(req.body);
        res.status(201).location('/').end();
    } catch (error) {
        if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
            const errors = error.errors.map(err => err.message);
            res.status(400).json({ errors });    
        } else {
            throw error;
        }
    }
}));

module.exports = router;