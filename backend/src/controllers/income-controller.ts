import { Income } from "../entity/Income"
import { User } from "../entity/User"
import { Wallet } from "../entity/Wallet"

const apierror = require('../exceptions/api-error')
const incomeService = require('../services/income-service')
const walletService = require('../services/wallet-service')
class IncomeController {
    async getIncomes(req, res, next) {
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
            const incomes = await incomeService.getIncomes(walletByUser.id)
            return res.json(incomes)
        } catch (error) {
            next(error)
        }
    }
    async createIncome(req, res, next) {
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
                
                
    
                const incomeCreated = await incomeService.createIncome(title, amount, wallet_id)
                if (!incomeCreated) {
                    return res.json({
                        message:'Income cannot be created'
                    })
                }
                const walletChangedResult = await walletService.increaseWallet(wallet_id, amount)
                if (!walletChangedResult) {
                    return res.json({
                        message:'The amount of wallet was not changed'
                    })
                }
                return res.json({ 
                    id:incomeCreated.id,
                    title:incomeCreated.title,
                    amount:incomeCreated.amount,
                    wallet_id:incomeCreated.wallet_id
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
    async editIncome(req, res, next) {
        try {
            const { title, amount, id } = req.body
            if (!title || !amount || !id){
                return res.json({
                    message:"Invalid data was received"
                })
            }

            const { login } = req.user

            const userByLogin = await User.findOneBy({ login: login })
            const findIncome= await Income.findOneBy({id:id})
            const findWallet=await Wallet.findOneBy({id:findIncome.wallet_id})
            if (!userByLogin || !findIncome || !findWallet || userByLogin.id!=findWallet.user_id || findIncome.wallet_id!=findWallet.id){
                return res.json({
                    message:"Invalid data"
                })
            }

            const oldIncome = await incomeService.getIncome(id)
            if (!oldIncome) {
                return res.json({
                    message:"Update of an income was failed"
                })
            }
            const deleteIncomeWallet = await walletService.decreaseWallet(oldIncome.wallet_id, oldIncome.amount)
            const addIncomeWallet = await walletService.increaseWallet(oldIncome.wallet_id, amount)

            const editIncomeResult = await incomeService.editIncome(title, amount, id)
            if (!editIncomeResult || !deleteIncomeWallet || !addIncomeWallet) {

                return res.json({
                    message:"Update of an income was failed"
                })
            }
            return res.json({
                message:'Success'
            })

        } catch (error) {
            next(error)
        }
    }
    async deleteIncome(req, res, next) {
        try {

            const { id } = req.body
            const {login} =req.user
            const userByLogin = await User.findOneBy({ login: login })
            const findIncome= await Income.findOneBy({id:id})
            const findWallet=await Wallet.findOneBy({id:findIncome.wallet_id})
            if (!userByLogin || !findIncome || !findWallet || userByLogin.id!=findWallet.user_id || findIncome.wallet_id!=findWallet.id){
                return res.json({
                    message:"Invalid data"
                })
            }
            
            if(!id){
                apierror.BadRequest('Cannot delete income. Invalid id')
            }
            const income = await Income.findOneBy({ id: id })
            const deleteIncomeWallet = await walletService.decreaseWallet(income.wallet_id, income.amount)
            const result = await incomeService.deleteIncome(id)
            if (result){
                return res.json({
                    message:'Success'
                })
            }
            return res.json({
                message:'Income was not deleted'
            })

        } catch (error) {
            next(error)
        }
    }
}
module.exports = new IncomeController()