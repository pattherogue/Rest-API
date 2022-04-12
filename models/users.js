'use strict';

const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) =>  {
    class Users extends Model {
        static associations(models) {
      
        }
    }
    Users.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

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

        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'A LAST NAME is required'
                },
                notEmpty: {
                    msg: 'Please provide a LAST NAME'
                }
            }
        },

        emailAddress: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                msg: 'The email you entered already exist'
            },
            validate: {
                notNull: {
                    msg: 'An email is required'
                },
                isEmail: {
                    msg: 'Please provide a valid email adress'
                }
            }
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'A password is required'
                },
                notEmpty: {
                    msg: 'Please provide a password'
                },
                len: {
                    args: [8, 20],
                    msg: 'The password should be between 8 and 20 characters in length'
                }
            },
            set(val) {
                if ( val === this.password ) {
                    const hashedPassword = bcrypt.hashSync(val, 10);
                    this.setDataValue('password', hashedPassword);
                }
            },
        },
    }, { sequelize });

    /* define model association */ 

    Users.associate = (models) => {
        Users.hasMany(models.Courses, {
            foreignKey: {
                fieldName: 'userId',
                allowNull: false,
            },
        });
    };

    return Users;
};