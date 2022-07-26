import { Wallet } from "../entity/Wallet"

const apierror = require('../exceptions/api-error')

class WalletService {
    async getWallets(user_id){
        const wallets = await Wallet.findBy({user_id:user_id})
        return wallets

    }
    async createWallet(title, userId, amount){
        const wallet = Wallet.create({
            title:title,
            amount:amount,
            user_id:userId
        })
        return wallet.save()
    }
    async editWallet(id, title, amount){
        const wallet = await Wallet.createQueryBuilder()
        .update()
        .set({
            title:title,
            amount:amount
        })
        .where('id=:id', {id:id})
        .execute()
        if (wallet.affected){
            return wallet
        }
        return null
    }
    async deleteWallet(id){
        const  wallet = await Wallet.createQueryBuilder()
        .delete()
        .where("id=:id",{id:id})
        .execute()
        if (wallet.affected){
            return wallet
        }
        return null
    }
    async increaseWallet(id, increasingAmount){
        const wallet = await Wallet.findOneBy({
            id:id
        })
        const exAmount=wallet.amount
        const newAmount=exAmount+increasingAmount
        const updatedWalletResult=await Wallet.createQueryBuilder()
        .update()
        .set({
            amount:newAmount
        })
        .where("id=:id",{id:id})
        .execute()
        if (updatedWalletResult.affected){
            return updatedWalletResult
        }
        return null
    }
    async decreaseWallet(id, decreasingAmount){
        const wallet = await Wallet.findOneBy({
            id:id
        })
        const exAmount=wallet.amount
        const newAmount=exAmount-decreasingAmount
        const updatedWalletResult=await Wallet.createQueryBuilder()
        .update()
        .set({
            amount:wallet.amount-decreasingAmount
        })
        .where("id=:id",{id:id})
        .execute()
        if (updatedWalletResult.affected){
            return updatedWalletResult
        }
        return null
    }
}
module.exports = new WalletService()