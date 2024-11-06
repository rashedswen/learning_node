const language = (req, res, next) => {
    const supportedLanguages = ['en', 'ar']
    if (req.headers.lang && supportedLanguages.includes(req.headers.lang)) {
        req.lang = req.headers.lang
    } else {
        req.lang = 'ar'
    }
    next()
}

module.exports = language;