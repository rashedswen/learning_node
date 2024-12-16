const e = require("express");
const { NotFoundError, BadRequestError } = require("../errors");
const Job = require("../models/Job");
const i18n = require('../i18n/language').default

exports.getJobById = async (jobId, userId) => {
    const job = await Job.findOne({ _id: jobId, createdBy: userId })
    if (!job) {
        // const lang = req.header.lang;
        throw new NotFoundError('NO_JOB_WITH_THIS_ID', jobId);
    }
    return job;
}

exports.getAllJobs = async (userId) => {
    const jobs = await Job.find({ createdBy: userId }).sort('createdAt');
    return jobs;
}

exports.createJob = async (job) => {
    return await Job.create(job);
}

exports.updateJob = async (jobId, userId, update) => {
    const { company, position } = update;
    if (company === '' || position === '') {
        throw new BadRequestError('COMPANY_OR_POSITION_CANNOT_BE_EMPTY')
    }
    const job = await Job.findOneAndUpdate({ _id: jobId, createdBy: userId }, update, { new: true, runValidators: true },)
    if (!job) {
        throw new NotFoundError('NO_JOB_WITH_THIS_ID', jobId);
    }
    return job;
}

exports.deleteJob = async (jobId, userId) => {
    const job = await Job.findOneAndRemove({ _id: jobId, createdBy: userId })

    if (!job) {
        throw new NotFoundError('NO_JOB_WITH_THIS_ID', jobId);
    }

    return job;
}