const jwt = require('jsonwebtoken')

const authanticate = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decode = jwt.verify(token, 'secretValue')

        res.user = decode
        next()
    }
    catch (error) {
        res.json({
            message: 'Authentication Failed 😢'
        })
    }
}

module.exports = authanticate