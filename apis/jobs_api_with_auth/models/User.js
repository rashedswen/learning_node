const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
var mongooseI18n = require('mongoose-i18n-localize');
const { autoIncrement } = require('mongoose-plugin-autoinc-fix')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please Provide name'],
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required: [true, 'Please Provide email'],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'please provide a valid email',
        ],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please Provide password'],
        minlength: 6
    },
});

UserSchema.plugin(mongooseI18n, { locales: ['en', 'ar'] });

UserSchema.pre('save', async function () {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.createJWT = function () {
    return jwt.sign({ userId: this._id, name: this.name }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_LIFETIME
    })
}

UserSchema.methods.comparePassword = async function (canditatePassword) {
    const isMatch = await bcrypt.compare(canditatePassword, this.password);
    return isMatch;
}

UserSchema.plugin(autoIncrement, 'User');
module.exports = mongoose.model('User', UserSchema);