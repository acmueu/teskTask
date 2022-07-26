import axios from "axios";
import { makeObservable, makeAutoObservable } from "mobx"

import ExpenseService from "../services/expense.service";


interface Expense{
    id:number,
    title:string,
    amount:number,
    wallet_id:number

}

export default class ExpenseStore {
    expenses:Array<Expense>=[]
    isLoading:boolean;
    constructor() {
        makeAutoObservable(this)
    }
    setLoading(state:boolean){
        this.isLoading=state
      }
    setExpenses(newExpenses:Array<Expense>){

        newExpenses.sort(function (a, b) {
            return a.id - b.id;
          });
        newExpenses.reverse();
        this.expenses=newExpenses

    }
    async getExpenses(wallet_id:number){
        this.setLoading(true)
        try {
            const response = await ExpenseService.getExpenses(wallet_id)
            this.setExpenses(response.data)

        } catch (error) {
            
        }finally{
            this.setLoading(false)
        }
    }
    async createExpense(title:string, amount:number, wallet_id:number){
        try {
            const response = await ExpenseService.createExpense(title, amount, wallet_id)
            this.getExpenses(wallet_id)
        } catch (error) {
            
        }
    }
    async editExpense(title: string, id: number, amount: number, wallet_id:number){
        try {
            const response = await ExpenseService.editExpense(title, id, amount)
            this.getExpenses(wallet_id)
        } catch (error) {
            
        }
    }
    async deleteExpense(id: number, wallet_id:number){
        try {
            const response = await ExpenseService.deleteExpense(id)
            this.getExpenses(wallet_id)
        } catch (error) {
            
        }
    }

   
    

}


