const mongoose = require('mongoose');
const mongooseI18n = require('mongoose-i18n-localize');

const JobSchema = new mongoose.Schema({
    company: {
        type: String,
        required: [true, 'Please Provide company name'],
        maxlength: 50,
    },
    position: {
        type: String,
        required: [true, 'Please Provide position'],
        maxlength: 100,
    },
    status: {
        type: String,
        // required: [true, 'Please Provide status name'],
        enum: ['interview', 'declined', 'pending'],
        default: 'pending'
    },
    createdBy: {
        type: Number,
        ref: 'User',
        required: [true, 'Please Provide user']
    }
}, { timestamps: true })

JobSchema.plugin(mongooseI18n, {
    locales: ['en', 'ar']
});



module.exports = mongoose.model('Job', JobSchema)