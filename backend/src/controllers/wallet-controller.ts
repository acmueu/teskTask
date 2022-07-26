import { User } from "../entity/User"
import { Wallet } from "../entity/Wallet"

const incomeSerivce = require('../services/income-service')
const expenseService = require('../services/expense-service')
const walletService = require('../services/wallet-service')
const APIERROR = require('../exceptions/api-error')
class WalletController {
    async getWallets(req, res, next) {
        try {
            const { login } = req.user
            const userByLogin = await User.findOneBy({ login: login })
            const { id } = userByLogin

            if (!id) {
                return res.status(400).send('Invalid data.')
            }
            const wallets = await walletService.getWallets(id)
            return res.json(wallets)
        } catch (error) {
            next(error)
        }
    }
    async createWallet(req, res, next) {
        try {
            const { login } = req.user
            const userByLogin = await User.findOneBy({ login: login })
            const { id } = userByLogin
            if (!id) {
                return res.status(400).send('Invalid data.')
            }
            const { title, amount} = req.body
            const wallet = await walletService.createWallet(title, id, amount)
            if (wallet){
                return res.json({
                    message:"Success"
                })
            }
        } catch (error) {
            next(error)
        }
    }
    async editWallet(req, res, next) {
        try {
            const { login} = req.user
            const userByLogin = await User.findOneBy({ login: login })
            const user_id = userByLogin.id
            const { id, title, amount} = req.body
            console.log(amount , typeof amount)
            if (!user_id || !login) {
                return res.status(400).send('Invalid data.')

            }
            const checkingWallet = await Wallet.find({
                where: {
                    user_id: user_id,
                    id: id
                }
            })
            if ((checkingWallet.length <= 0 || !checkingWallet)) {
                return res.status(404).send('No such wallet.')

            }
            const wallet = await walletService.editWallet(id, title, amount)
            if (wallet) {
                return res.json({
                    message:"Success"
                })
            }
            return res.json({
                message: 'Something went wrong'
            })
        } catch (error) {
            next(error)
        }
    }
    async deleteWallet(req, res, next) {
        try {
            const { login } = req.user
            const userByLogin = await User.findOneBy({ login: login })
            const user_id = userByLogin.id
            const { id } = req.body
            if (!user_id || !login) {
                return res.status(400).send('Invalid data.')

            }
            const checkWallet = await Wallet.find({
                where: {
                    id: id,
                    user_id: user_id
                }
            })
            console.log("CHECKWALLET", checkWallet)
            if ((checkWallet.length <= 0 || !checkWallet)) {
                return res.status(404).send('No such wallet.')

            }
            const incomeDeleteResult = await incomeSerivce.deleteIncomeWallet(id)
            const expenseDeleteResult = await expenseService.deleteExpenseWallet(id)
            const wallet = await walletService.deleteWallet(id)

            if (wallet) {
                return res.json({
                    message:"Success"
                })
            }
            console.log(wallet)
            return res.json({
                message: 'Something went wrong'
            })
        } catch (error) {
            next(error)
        }
    }
}
module.exports = new WalletController()