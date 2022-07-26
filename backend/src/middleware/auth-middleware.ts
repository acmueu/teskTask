const apiError= require('../exceptions/api-error')
const tokenService = require('../services/tokenService')
module.exports = function (req, res, next) {
    try {
        const authorizationHeader = req.headers.authorization
        if (!authorizationHeader) {
            return next(apiError.UnathorizedError())
        }
        const accessToken = authorizationHeader.split(' ')[1]
        if (!accessToken) {
            return next(apiError.UnathorizedError())
        }
        console.log(req)
        const userData = tokenService.validateAccessToken(accessToken)
        console.log('ROLE', userData)
        if (!userData) {
            return next(apiError.UnathorizedError())
        }
        req.user=userData
        next()

    } catch (error) {
        return next(apiError.UnathorizedError())
    }
}