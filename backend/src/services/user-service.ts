import { Token } from "../entity/Token"
import { User } from "../entity/User"
const bcrypt = require('bcryptjs')
const tokenService = require('../services/tokenService')
const ApiError = require('../exceptions/api-error')

class UserService {
    async signUp(login, password) {
        const candidate = await User.findOne({
            where: {
                login: login
            }
        })
        if (candidate) {
            throw ApiError.BadRequest('Пользователь с таким логином уже существует.')
        }
        const hashedPassword = await bcrypt.hash(password, 12)
        const user = User.create({
            login: login,
            password: hashedPassword
        })
        await user.save()
        const tokens = tokenService.generateTokens({ login: login })
        await tokenService.saveToken(user.id, tokens.refreshToken)
        return {
            ...tokens,
            user: { login: login }
        }

    }
    async signIn(login, password) {
        const user = await User.findOne({
            where: {
                login: login
            }
        })
        if (!user) {
            throw ApiError.BadRequest('Пользователь не был найден.')
        }
        const isPassEquals = await bcrypt.compare(password, user.password)
        if (!isPassEquals) {
            throw ApiError.BadRequest("Неверный пароль.")
        }
        const tokens = tokenService.generateTokens({ login: login })
        await tokenService.saveToken(user.id, tokens.refreshToken)
        return {
            ...tokens,
            user: { login: login }
        }

    }
    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken)
        return token
    }
    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnathorizedError()
        }
        const userData=tokenService.validateRefreshToken(refreshToken)
        const tokenFromDb = await tokenService.findToken(refreshToken)
        console.log('userData', userData)
        console.log('tokenFromDb', tokenFromDb)
        if (!userData || !tokenFromDb){
            throw ApiError.UnathorizedError()
        }
        const user = await User.findOne({
            where:{
                id:tokenFromDb.user_id
            }
        })
        const tokens = tokenService.generateTokens({login:user.login})
        await tokenService.saveToken(user.id, tokens.refreshToken)
        return {
            ...tokens,
            user: { login: user.login }
        }
    }
    async getAllUsers(){
        const users = await User.find()
        return users
    }
}

module.exports = new UserService()