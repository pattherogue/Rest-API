'use strict';

const express = require('express');
const { User } = require('../models');
const { authenticateUser } = require('../middleware/auth-user');
const router = express.Router();
const { asyncHandler } = require('../middleware/asyncHandler');

/* GET route */
/* return all  propertires and values */
// Route that returns the current authenticated user 
router.get('/users', authenticateUser, asyncHandler(async (req, res) => {
    // retrieve  current auth user information
    const user = req.currentUser;
    /* 200 HTTP status code */
    res.status(200).json({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        emailAddress: user.emailAddress
    });
}));

/* POST route */
// Route that creates a new user 
router.post('/users', asyncHandler(async (req, res) => {
    try {
        /* create new user */
        await User.create(req.body);
        /* location header to "/" */
        /* return 201 http status code */
         /* no content */
        res.status(201).location('/').end();
    } catch (error) {
        // add validation 
        if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
            const errors = error.errors.map(err => err.message);
            res.status(400).json({ errors });    
        } else {
            throw error;
        }
    }
}));

module.exports = router;