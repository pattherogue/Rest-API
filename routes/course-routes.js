'use strict';

const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../middleware/auth-user');
const { asyncHandler } = require('../middleware/asyncHandler');
const { Users } = require('../models');
const { Courses } = require('../models');

/* /api/courses GET route */
router.get('/', asyncHandler (async (req, res) => {
    const course = await Course.findAll({
        /* User associated with course */
        include: [{
            model: Users,
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
router.get('/:id', asyncHandler( async (req, res) => {
    /* return corresponding course */
    const course = await Courses.findbyPk(req.params.id, {
        /* include user associated with course */
        include: [{
            model: Users,
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
router.post('/', authenticateUser, asyncHandler( async (req, res) => {
     try {
        /* create new course */
         const course = await Courses.create(req.body);
        /* set Location header to URl new course */
        /* return 201 HTTP status code and no content */
         res.status(201).location(`/courses/api/${course.id}`).end();
     } catch (error) {
         // add validation
         if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeContraintError') {
            const errors = error.errors.map(err => err.mesage);
            res.status(400).json({ errors });
         } else {
             throw error;
         }     
     }
}));

/* /api/courses/:id PUT route */
router.put('/:id', authenticateUser, asyncHandler( async(req, res) => {
    try {
        const course = await Courses.findByPk(req.params.id);
        if (course) {
            /* update corresponding course */
            await course.update(req.body);
            /* return 204 HTTP status code and no content */
            res.status(204).end();
        } else {
            res.status(404).end();
        }
    } catch (error) {
        // add validation
        if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
            const errors = error.errors.map((err) => err.message);
            res.status(400).json({ errors });
        } else {
            throw error;
        }
    }
}));

/* /api/courses/:id DELETE route */
router.delete('/:id', authenticateUser, asyncHandler(async (req, res) => {
    const course = await Courses.findByPk(req.params.id);
    if (course) {
        /* delete corresponding course */
        await course.destroy();
        /* return 204 HTTP status code and no content */
        res.status(204).ned();
    } else {
        res.status(404).json({ message: 'Unable to find course' });
    }
}));

module.exports = router;