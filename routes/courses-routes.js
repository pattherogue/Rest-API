'use strict';

const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../middleware/auth-user');
const { asyncHandler } = require('../middleware/asyncHandler');
const { User } = require('../models');
const { Course } = require('../models');

/* /api/courses GET route */
router.get('/courses', asyncHandler (async (req, res) => {
    const course = await Course.findAll({
        /* User associated with course */
        include: [{
            model: User,
        }],
    });
    /* retunrn all courses */
    if (course) {
        /*  return 200 HTTP status code */
        res.status(200).json(course);
    } else {
        res.status(404).json({ message: "Unable to find course."})
    }
}));

/* /api/courses/:id GET route */
router.get('/courses/:id', asyncHandler( async (req, res) => {
    /* return corresponding course */
    const course = await Course.findbyPk(req.params.id, {
        /* include user associated with course */
        include: [{
            model: User,
        }],
    });
    /* return 200 HTTP status code and no content */
    if (course) {
        res.status(200).json(course)
    } else {
        res.status(404).json({ message: "Unable to find course." })
    }

}));

/* /api/courses POST route */
/* create new course */
/* set Location header to URl new course */
/* return 204 HTTP status code and no content */

router.post('/courses', authenticateUser, asyncHandler(async (req, res) => {
     try {
         const course = await Course.create(req.body);
         res.status(201).location(`/courses/api/${course.id}`).end();
     }
}));

/* /api/courses/:id PUT route */
/* update corresponding course */
/* return 204 HTTP status code and no content */

/* /api/courses/:id DELETE route */
/* delete corresponding course */
/* return 204 HTTP status code and no content */
