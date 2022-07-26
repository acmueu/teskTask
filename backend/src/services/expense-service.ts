import { Expense } from "../entity/Expense"
import { Token } from "../entity/Token"
import { User } from "../entity/User"
import { Wallet } from "../entity/Wallet"
const bcrypt = require('bcryptjs')
const tokenService = require('../services/tokenService')
const ApiError = require('../exceptions/api-error')

class ExpenseService {
    async getExpenses(wallet_id) {
        const expenses = await Expense.findBy({wallet_id:wallet_id})

        return expenses
    }
    async createExpense(title, amount, wallet_id) {
        const expense = Expense.create({
            title: title,
            amount: amount,
            wallet_id: wallet_id,

        })

        return expense.save()

    }
    async editExpense(title, amount, id) {
        const expense = await Expense.createQueryBuilder()
            .update()
            .set({
                amount: amount,
                title: title
            })
            .where("id=:id", { id: id })
            .execute()
        if (expense.affected) {
            return expense
        }
    }
    async getExpense(id) {
        const expense = await Expense.findOneBy({ id: id })
        return expense
    }
    async deleteExpense(id) {

        const expenseResult = await Expense.createQueryBuilder() //Wallet
            .delete()
            .where("id=:id", { id: id })
            .execute()
        if (expenseResult.affected) {
            return expenseResult
        }
        return null

    }
    async deleteExpenseWallet(wallet_id){
        const expenseResult = await Expense.createQueryBuilder()
            .delete()
            .where("wallet_id=:wallet_id ", { wallet_id })
            .execute()
        if (expenseResult.affected) {
            return expenseResult
        }
        return null
    }
}

module.exports = new ExpenseService()