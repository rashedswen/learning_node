const express = require('express');
const router = express.Router()
const i18n = require('../i18n/language')

const { getAllJobs, getJob, createJob, updateJob, deleteJob } = require('../controllers/jobs');
const { check, query } = require('express-validator');
const checkValidation = require('../middleware/validation');

const postJobValidation = [
    check('company', i18n[req.lang].FIELD_IS_NOT_VALID.replace('{field}', 'Company')).notEmpty(),
    check('position', i18n[req.lang].FIELD_IS_NOT_VALID.replace('{field}', 'Position')).notEmpty(),
];


router.route('/').post(postJobValidation, checkValidation, createJob).get(getAllJobs)
router.route('/:id').get(checkValidation, getJob).delete(checkValidation, deleteJob).patch(checkValidation, updateJob)

module.exports = router