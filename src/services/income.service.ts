import api from "../http";


export default class IncomeService {
  static async getIncomes(wallet_id: number) {
    return api.post("/getincomes", { wallet_id });
  }

  static async createIncome(title: string, amount: number, wallet_id: number) {
    return api.post("/createincome", { title, amount, wallet_id });
  }
  static async editIncome(title: string, id: number, amount: number) {
    return api.post("/editincome", { title, id, amount });
  }
  static async deleteIncome(id: number) {
    return api.post("/deleteincome", { id });
  }
}
