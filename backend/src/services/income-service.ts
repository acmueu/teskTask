import { Income } from "../entity/Income"
import { Token } from "../entity/Token"
import { User } from "../entity/User"
import { Wallet } from "../entity/Wallet"
const bcrypt = require('bcryptjs')
const tokenService = require('../services/tokenService')
const ApiError = require('../exceptions/api-error')

class IncomeService {
    async getIncomes(wallet_id) {
        const incomes = await Income.findBy({wallet_id:wallet_id})

        return incomes
    }
    async createIncome(title, amount, wallet_id) {
        const income = Income.create({
            title: title,
            amount: amount,
            wallet_id: wallet_id,

        })

        return income.save()

    }
    async editIncome(title, amount, id) {
        const newIncome = await Income.createQueryBuilder()
            .update()
            .set({
                amount: amount,
                title: title
            })
            .where("id=:id", { id: id })
            .execute()
        if (newIncome.affected) {
            return newIncome
        }
    }
    async getIncome(id) {
        const income = await Income.findOneBy({ id: id })
        return income
    }
    async deleteIncome(id) {

        const incomeResult = await Income.createQueryBuilder() //was wallet
            .delete()
            .where("id=:id ", { id: id })
            .execute()
        if (incomeResult.affected) {
            return incomeResult
        }
        return null

    }
    async deleteIncomeWallet(wallet_id){
        const incomeResult = await Income.createQueryBuilder()
            .delete()
            .where("wallet_id=:wallet_id ", { wallet_id })
            .execute()
        if (incomeResult.affected) {
            return incomeResult
        }
        return null
    }
}

module.exports = new IncomeService()