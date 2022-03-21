'use strict';

const { Model } = require('sequelize');
const { INSERT } = require('sequelize/types/query-types');

module.exports = (sequelize) =>  {
    class Users extends Model {}
    
    Users.init({
        
    })
}