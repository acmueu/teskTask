import * as express from 'express'
const UserController = require('../controllers/user-controller')
const WalletController = require('../controllers/wallet-controller')
const IncomeController = require('../controllers/income-controller')
const ExpenseController = require('../controllers/expense-controller')
const router = express.Router()
const { body } = require('express-validator')
const authMiddleware = require('../middleware/auth-middleware')
//const checkLoginMiddleware = require('../middleware/checkLoginMiddleware')

router.post('/signup',
    body('login').isLength({ min: 8, max: 255 }),
    body('password').isLength({ max: 72 })
    , UserController.signUp)
router.post('/signin',  UserController.signIn)
router.post('/logout', UserController.logout)

router.post('/createwallet', authMiddleware, WalletController.createWallet)
router.post('/editwallet', authMiddleware, WalletController.editWallet)
router.post('/deletewallet', authMiddleware, WalletController.deleteWallet)
router.get('/getwallets', authMiddleware, WalletController.getWallets)

router.post('/getincomes', authMiddleware, IncomeController.getIncomes)
router.post('/createincome', authMiddleware, IncomeController.createIncome)
router.post('/editincome', authMiddleware, IncomeController.editIncome)
router.post('/deleteincome', authMiddleware, IncomeController.deleteIncome)

router.post('/getexpenses', authMiddleware, ExpenseController.getExpenses)
router.post('/createexpense', authMiddleware, ExpenseController.createExpense)
router.post('/editexpense', authMiddleware, ExpenseController.editExpense)
router.post('/deleteexpense', authMiddleware, ExpenseController.deleteExpense)

router.get('/refresh', UserController.refresh)
router.get('/users', authMiddleware, UserController.getUsers)
module.exports = router