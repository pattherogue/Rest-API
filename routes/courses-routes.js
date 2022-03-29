'use strict';

const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../middleware/auth-user')
const { asyncHandler } = require('../middleware/asyncHandler')

/* /api/courses GET route */
/* retunrn all courses */
/* User associated with course */
/*  return 200 HTTP status code */

/* /api/courses/:id GET route */
/* return corresponding course */
/* include user associated with course */
/* return 200 HTTP status code and no content */

/* /api/courses POST route */
/* create new course */
/* set Location header to URl new course */
/* return 204 HTTP status code and no content */

/* /api/courses/:id PUT route */
/* update corresponding course */
/* return 204 HTTP status code and no content */

/* /api/courses/:id DELETE route */
/* delete corresponding course */
/* return 204 HTTP status code and no content */
