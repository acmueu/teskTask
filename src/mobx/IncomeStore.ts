import axios from "axios";
import { makeObservable, makeAutoObservable } from "mobx";

import IncomeService from "../services/income.service";

interface Income {
  id: number;
  title: string;
  amount: number;
  wallet_id: number;
}

export default class IncomeStore {
  incomes: Array<Income> = [];

  isLoading:boolean;
  constructor() {
    makeAutoObservable(this);
  }
  setLoading(state:boolean){
    this.isLoading=state
  }

  setIncomes(newIncomes: Array<Income>) {

    newIncomes.sort(function (a, b) {
      return a.id - b.id;
    });
    newIncomes.reverse();
    this.incomes = newIncomes;
  }
  async getIncomes(wallet_id: number) {
    this.setLoading(true)
    try {
      const response = await IncomeService.getIncomes(wallet_id);
      this.setIncomes(response.data);
    } catch (error) {

    } finally{
      this.setLoading(false)
    }
  }
  async createIncome(title: string, amount: number, wallet_id: number) {
    try {
      const response = await IncomeService.createIncome(
        title,
        amount,
        wallet_id
      );
      this.getIncomes(wallet_id);
    } catch (error) {}
  }
  async editIncome(
    title: string,
    id: number,
    amount: number,
    wallet_id: number
  ) {
    try {
      const response = await IncomeService.editIncome(title, id, amount);
      this.getIncomes(wallet_id);
    } catch (error) {}
  }
  async deleteIncome(id: number, wallet_id: number) {
    try {
      const response = await IncomeService.deleteIncome(id);
      this.getIncomes(wallet_id);
    } catch (error) {}
  }
}
