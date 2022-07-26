import axios, { Axios, AxiosResponse } from 'axios'
import { response } from 'express'
import config from '../config.json'
import api from '../http'
import { AuthResponse } from '../models/AuthResponse'


export default class WalletService {
    static async createWallet(title: string, amount:number) {
        return api.post('/createwallet', { title , amount})

    }
    static async editWallet(id: number, title: string, amount:number) {
        return api.post('/editwallet', { title, id , amount})

    }
    static async deleteWallet(id: number) {
        return api.post('/deletewallet', {id})

    }
    static async getWallets() {
        return api.get('/getwallets')

    }

}