import api from "../http";


export default class ExpenseService {
  static async getExpenses(wallet_id: number) {
    return api.post("/getexpenses", { wallet_id });
  }

  static async createExpense(title: string, amount: number, wallet_id: number) {
    return api.post("/createexpense", { title, amount, wallet_id });
  }
  static async editExpense(title: string, id: number, amount: number) {
    return api.post("/editexpense", { title, id, amount });
  }
  static async deleteExpense(id: number) {
    return api.post("/deleteexpense", { id });
  }
}
