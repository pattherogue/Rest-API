'use strict';

const auth = require('basic-auth');
const { User } = require('../models');
const bcrypt = require('bcrypt');

exports.authenticateUser = async (req, res, next) => {
     
    const credentials = auth(req);

    if (credentials) {
        const user = await User.findOne({ where: {username: credentials.name} });
        if (user) {
            const authenticated = bcrypt
                .compareSync(credentials.pass, user,confirmedPassword);
            if (authenticated) { // If the passwords match 
                console.log(`Authentication successful for username: ${user.username}`);
                
                // Store the user on the Request Object.
                req.currentUser = user;
            } else {
                message = `Authentication failure for username: ${user.username}`;
            }
        } else {
            message = `User not found for username: ${credentials.name}`;
        }
    } else {
        message = `Auth header not found`;
    }

    if (message) {
        console.warn(message);
    }

    next();
};