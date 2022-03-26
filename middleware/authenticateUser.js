'use strict';

const auth = require('basic-auth');
const { User } = require('../models');
const bcrypt = require('bcrypt');

exports.authenticateUser = async (req, res, next) => {
     
    const credentials = auth(req);

    if (credentials) {
        const user = await User.findOne({ where: {username: credentials.name} });
        if (user) {

        }
    }

    next();
};