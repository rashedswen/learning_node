const Job = require('../models/Job');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors')
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const express = require('express');
const i18n = require('../i18n/language')


const getAllJobs = async (req, res) => {
    const jobs = await Job.find({ createdBy: req.user.userId }).sort('createdAt')
    res.status(StatusCodes.OK).json({ jobs, count: jobs.length })
}

const getJob = async (req, res) => {
    const { user: { userId }, params: { id: jobId } } = req
    const job = await Job.findOne({ _id: jobId, createdBy: userId })
    if (!job) {
        // const lang = req.header.lang;
        throw new NotFoundError(i18n[req.lang].NO_JOB_WITH_THIS_ID.replace('{id}', jobId));
    }
    res.status(StatusCodes.OK).json({ job })
}

const createJob = async (req, res) => {
    req.body.createdBy = req.user.userId
    const job = await Job.create(req.body)
    res.status(StatusCodes.CREATED).json({ job })
}

const updateJob = async (req, res) => {
    const
        {
            body: { company, position },
            user: { userId },
            params: { id: jobId },
        } = req

    if (company === '' || position === '') {
        throw new BadRequestError(i18n[req.lang].COMPANY_OR_POSITION_CANNOT_BE_EMPTY)
    }
    const job = await Job.findOneAndUpdate({ _id: jobId, createdBy: userId }, req.body, { new: true, runValidators: true },)
    if (!job) {
        throw new NotFoundError(i18n[req.lang].NO_JOB_WITH_THIS_ID.replace('{id}', jobId));
    }
    res.status(StatusCodes.OK).json({ job })
}

const deleteJob = async (req, res) => {
    const {
        user: { userId },
        params: { id: jobId }
    } = req

    const job = await Job.findOneAndRemove({ _id: jobId, createdBy: userId })

    if (!job) {
        throw new NotFoundError(i18n[req.lang].NO_JOB_WITH_THIS_ID.replace('{id}', jobId));
    }

    res.status(StatusCodes.OK).send()
}


module.exports = {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob,
}