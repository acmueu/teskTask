import axios from "axios";
import { makeObservable, makeAutoObservable } from "mobx";
import { AuthResponse } from "../models/AuthResponse";
import { UserResponse } from "../models/UserResponse";
import AuthService from "../services/auth.service";
import { API_URL } from "../http";
import WalletService from "../services/wallet.service";

interface Wallet {
  id: number;
  title: string;
  amount: number;
  user_id: number;
}


export default class WalletStore {
  wallets: Array<Wallet> = [];
  wallet: Wallet;
  isLoading:boolean;
  constructor() {
    makeAutoObservable(this);
  }
  setLoading(state:boolean){
    this.isLoading=state
  }
  setWallets(newWallets: Array<Wallet>) {
    newWallets.sort(function(a,b){
      return a.id-b.id
    })
    newWallets.reverse()
    this.wallets = newWallets;
  }
  setWallet(newWallet: Wallet) {
    this.wallet=newWallet
  }
  

  async getWallets() {
    this.setLoading(true)
    try {
      const response = await WalletService.getWallets();
      this.setWallets(response.data);
    } catch (error) {
    } finally {
      this.setLoading(false)
    }
  }
  async createWallet(title: string, amount:number) {
    try {
      const response = await WalletService.createWallet(title, amount);
      this.getWallets();
    } catch (error) {

    } finally{
    }
  }
  async editWallet(id:number,title:string, amount:number){
    try {
      const response = await WalletService.editWallet(id,title,amount);
      this.getWallets();
    } catch (error) {

    }finally{
    }
  }
  async deleteWallet(id: number) {
    try {
      const response = await WalletService.deleteWallet(id);
      this.getWallets();
    } catch (error) {}
  }

}
