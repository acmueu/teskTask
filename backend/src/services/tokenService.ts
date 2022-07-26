import { Token } from "../entity/Token"
const jwt = require('jsonwebtoken')



class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, "ACCESS_SECRET", { expiresIn: '1h' })
        const refreshToken = jwt.sign(payload, "REFRESH_SECRET", { expiresIn: '60d' })
        return {
            accessToken,
            refreshToken
        }
    }
    validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, "ACCESS_SECRET")
            return userData
        } catch (error) {
            return null
        }
    }
    validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, "REFRESH_SECRET")
            return userData
        } catch (error) {
            return null
        }
    }
    async saveToken(userId, refreshToken: string) {
        const tokenData = await Token.createQueryBuilder()
            .update({
                refreshToken: refreshToken
            })
            .where({
                user_id: userId
            })
            .execute()

        if (!tokenData.affected) {
            const token = Token.create({
                user_id: userId,
                refreshToken: refreshToken
            })
            return await token.save()
        }
        return tokenData

    }
    async removeToken(refreshToken) {
        const tokenData = await Token.createQueryBuilder()
            .delete()
            .from(Token)
            .where("refreshToken=:refreshToken", { refreshToken: refreshToken })
            .execute()
        return tokenData
    }
    async findToken(refreshToken) {
        const tokenData = await Token.findOne({
            where:{
                refreshToken:refreshToken
            }
        })

        return tokenData
    }
}

module.exports = new TokenService()