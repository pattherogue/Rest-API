'use strict';

const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) =>  {
    class Users extends Model {}
    
    Users.init({
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'A FIRST NAME is required'
                },
                notEmpty: {
                    msg: 'Please provide a FIRST NAME'
                }
            }
        },

    })
}