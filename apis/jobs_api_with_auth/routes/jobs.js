const express = require('express');
const router = express.Router()

const { getAllJobs, getJob, createJob, updateJob, deleteJob } = require('../controllers/jobs');
const { check, query } = require('express-validator');
const checkValidation = require('../middleware/validation');

const postJobValidation = [
    check('company', 'please enter valid company name').notEmpty(),
    check('position', 'please enter valid position').notEmpty().isLength({ min: 2 })
];

const idJobValidation = query('id', 'please pass valid id').notEmpty().escape();

router.route('/').post(postJobValidation, checkValidation, createJob).get(getAllJobs)
router.route('/:id').get(idJobValidation, checkValidation, getJob).delete(idJobValidation, checkValidation, deleteJob).patch(idJobValidation, checkValidation, updateJob)

module.exports = router