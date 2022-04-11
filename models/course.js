'use strict';

const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Course extends Model {
        static associate(models) {

        }
    }
    Course.init({
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'A title is required'
                },
                notEmpty: {
                    msg: 'Please provide a title'
                }
            }
        },

        description: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'A description is required'
                },
                notEmpty: {
                    msg: 'Please provide a description'
                }
            }
        },

        estimatedTime: {
            type: DataTypes.STRING,
        },

        materialsNeeded: {
            type: DataTypes.STRING,
        },
    }, { sequelize });

/* define model association */
    Course.associate = (models) => {
        Course.belongsTo(models.Users, {
            foreignKey: {
                fieldName: 'userId',
            },
        });
    };

    return Courses;

     
}