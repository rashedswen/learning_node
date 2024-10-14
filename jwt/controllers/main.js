const { BadRequestError } = require("../errors");
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    const { username, password } = req.body
    console.log(username, password);
    if (!username || !password) {
        throw new BadRequestError('please provide username and password')
    }

    const id = new Date().getDate()

    const token = jwt.sign({ id, username }, process.env.JWT_SECRET, { expiresIn: '30d' })
    console.log(token)
    res.status(200).json({ msg: 'user created', token })
}

const dashboard = async (req, res) => {
    console.log(req.user);

    try {

        const luckyNumber = Math.floor(Math.random() * 1000)
        res.status(200).json({ msg: `hello ${req.user.username}`, secret: `here is your auth lucky number ${luckyNumber}` })
    } catch (error) {
        throw new BadRequestError('there no authorization token', 401)

    }
}

module.exports = {
    login, dashboard
}