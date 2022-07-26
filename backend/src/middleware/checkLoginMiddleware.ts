const API_ERROR = require('../exceptions/api-error')
const TOKENSERVICE = require('../services/tokenService')
module.exports = function (role) {
    return function (req, res, next) {
        try {
            const authorizationHeader = req.headers.authorization
            if (!authorizationHeader) {
                return next(API_ERROR.UnathorizedError())
            }
            const accessToken = authorizationHeader.split(' ')[1]
            if (!accessToken) {
                return next(API_ERROR.UnathorizedError())
            }
            
            const userData = TOKENSERVICE.validateAccessToken(accessToken)
            
            if (userData.login!=='ADMIN_LOGIN'){
                return res.status(401).json({message:"No access."})
            }
            if (!userData) {
                return next(apiError.UnathorizedError())
            }
            req.user = userData
            next()

        } catch (error) {
            return next(API_ERROR.UnathorizedError())
        }
    }



}
