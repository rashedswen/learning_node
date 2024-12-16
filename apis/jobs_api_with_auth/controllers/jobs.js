const Job = require('../models/Job');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors')
const jobsService = require('../services/jobs')


const getAllJobs = async (req, res) => {
    const jobs = await jobsService.getAllJobs(req.user.userId)
    res.status(StatusCodes.OK).json({ jobs, count: jobs.length })
}

const getJob = async (req, res) => {
    const {
        user: { userId },
        params: { id: jobId }
    } = req

    const job = await jobsService.getJobById(jobId, userId)
    res.status(StatusCodes.OK).json({ job })
}

const createJob = async (req, res) => {
    req.body.createdBy = req.user.userId
    const job = await jobsService.createJob(req.body)
    res.status(StatusCodes.CREATED).json({ job })
}

const updateJob = async (req, res) => {
    const
        {
            user: { userId },
            params: { id: jobId },
        } = req

    const job = await jobsService.updateJob(jobId, userId, req.body)
    res.status(StatusCodes.OK).json({ job })
}

const deleteJob = async (req, res) => {
    const {
        user: { userId },
        params: { id: jobId }
    } = req

    await jobsService.deleteJob(jobId, userId)

    res.status(StatusCodes.OK).send()
}


module.exports = {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob,
}