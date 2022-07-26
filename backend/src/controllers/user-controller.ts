const userService = require('../services/user-service')

const { validationResult } = require('express-validator')

const ErrorApi = require('../exceptions/api-error')

class UserController {
    async signUp(req, res, next) {
        try {
            await res.clearCookie()
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(ErrorApi.BadRequest('Длина логина должна быть от 8 до 255 символов. Длина пароля не должна превышать 72 симовлов.', errors.array()))
            }
            const { login, password } = req.body
            const userData = await userService.signUp(login, password)
            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 60 * 24 * 60 * 60 * 1000, httpOnly: true
            })
            return res.json(userData)
            
        } catch (error) {
            next(error)
        }
    }
    async signIn(req, res, next) {
        try {
            await res.clearCookie()
            const { login, password } = req.body
            const userData = await userService.signIn(login, password)
            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 60 * 24 * 60 * 60 * 1000, httpOnly: true
            })
            
            return res.json(userData)
            
        } catch (error) {
            next(error)
        }
    }
    async logout(req, res, next) {
        try {
            const { refreshToken } = req.cookies
            const token = await userService.logout(refreshToken)
            res.clearCookie('refreshToken')
            return res.json(token)
        } catch (error) {
            next(error)
        }
    }
    async refresh(req, res, next) {
        try {
            const {refreshToken} = req.cookies
            
            const userData = await userService.refresh(refreshToken)
            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 60 * 24 * 60 * 60 * 1000, httpOnly: true
            })
            return res.json(userData)
        } catch (error) {
            next(error)
        }
    }
    async getUsers(req, res, next) {
        try {
            const users= await userService.getAllUsers()
            return res.json(users)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new UserController()