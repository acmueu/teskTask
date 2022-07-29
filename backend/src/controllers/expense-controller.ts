import { Income } from "../entity/Income"
import { Expense } from "../entity/Expense"
import { User } from "../entity/User"
import { Wallet } from "../entity/Wallet"

const apierror = require('../exceptions/api-error')
const expenseService = require('../services/expense-service')
const walletService = require('../services/wallet-service')
class ExpenseController {
    async getExpenses(req, res, next) {
        try {
            const { login } = req.user
            const {wallet_id} =req.body
            const userByLogin=await User.findOneBy({login:login})
            const walletByUser=await Wallet.findOne({
                where:{
                    user_id:userByLogin.id,
                    id:wallet_id
                }
            })
            if (!userByLogin || !userByLogin || userByLogin.id!=walletByUser.user_id){
                return res.json({
                    message:'Invalid data'
                })
            }
            const expenses = await expenseService.getExpenses(walletByUser.id)
            return res.json(expenses)
        } catch (error) {
            next(error)
        }
    }
    async createExpense(req, res, next) {
        try {
            const { title, amount, wallet_id } = req.body
            if(amount>0){
                const { login } = req.user

                const userByLogin = await User.findOneBy({ login: login })
                const currentWallet=await Wallet.findOneBy({id:wallet_id})
                if (!login || ! currentWallet || userByLogin.id!=currentWallet.user_id ){
                    return res.json({
                        message:'Invalid data'
                    })
                }
                
                
    
                const expenseCreated = await expenseService.createExpense(title, amount, wallet_id)
                if (!expenseCreated) {
                    return res.json({
                        message:'Expense cannot be created'
                    })
                }
                const walletChangedResult = await walletService.decreaseWallet(wallet_id, amount)
                if (!walletChangedResult) {
                    return res.json({
                        message:'The amount of wallet was not changed'
                    })
                }
                return res.json({ 
                    id:expenseCreated.id,
                    title:expenseCreated.title,
                    amount:expenseCreated.amount,
                    wallet_id:expenseCreated.wallet_id
                 })
            }else{
                return res.json({
                    message:"The amount must have been higher than 0"
                })
                
            }

            
        } catch (error) {
            next(error)
        }
    }
    async editExpense(req, res, next) {
        try {
            const { title, amount, id } = req.body
            if (!title || !amount || !id){
                return res.json({
                    message:"Invalid data was received"
                })
            }

            const { login } = req.user

            const userByLogin = await User.findOneBy({ login: login })
            const findExpense= await Expense.findOneBy({id:id})
            const findWallet=await Wallet.findOneBy({id:findExpense.wallet_id})
            if (!userByLogin || !findExpense || !findWallet || userByLogin.id!=findWallet.user_id || findExpense.wallet_id!=findWallet.id){
                return res.json({
                    message:"Invalid data"
                })
            }

            const oldExpense = await expenseService.getExpense(id)
            if (!oldExpense) {
                return res.json({
                    message:"Update of an expense was failed"
                })
            }
            
            const deleteExpenseWallet = await walletService.increaseWallet(oldExpense.wallet_id, oldExpense.amount)
            const addExpenseWallet = await walletService.decreaseWallet(oldExpense.wallet_id, amount)

            const editExpenseResult = await expenseService.editExpense(title, amount, id)
            if (!editExpenseResult || !deleteExpenseWallet || !addExpenseWallet) {

                return res.json({
                    message:"Update of an expense was failed"
                })
            }
            return res.json({
                message:'Success'
            })

        } catch (error) {
            next(error)
        }
    }
    async deleteExpense(req, res, next) {
        try {

            const { id } = req.body
            const {login} =req.user
            const userByLogin = await User.findOneBy({ login: login })
            const findExpense= await Expense.findOneBy({id:id})
            const findWallet=await Wallet.findOneBy({id:findExpense.wallet_id})
            if (!userByLogin || !findExpense || !findWallet || userByLogin.id!=findWallet.user_id || findExpense.wallet_id!=findWallet.id){
                return res.json({
                    message:"Invalid data"
                })
            }
            
            if(!id){
                apierror.BadRequest('Cannot delete expense. Invalid id')
            }
            const expense = await Expense.findOneBy({ id: id })
            const deleteExpenseWallet = await walletService.increaseWallet(expense.wallet_id, expense.amount)
            const result = await expenseService.deleteExpense(id)
            if (result){
                return res.json({
                    message:'Success'
                })
            }
            return res.json({
                message:'Expense was not deleted'
            })

        } catch (error) {
            next(error)
        }
    }
}
module.exports = new ExpenseController()
