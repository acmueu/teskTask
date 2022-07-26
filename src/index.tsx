import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import ExpenseStore from "./mobx/ExpenseStore";
import IncomeStore from "./mobx/IncomeStore";
import UserStore from "./mobx/UserStore";
import WalletStore from "./mobx/WalletStore";

interface State {
  userstore: UserStore;
  walletstore: WalletStore;
  incomestore:IncomeStore;
  expensestore:ExpenseStore
}

const userstore = new UserStore();
const walletstore = new WalletStore();
const incomestore = new IncomeStore()
const expensestore= new ExpenseStore()

export const Context = createContext<State>({
  userstore,
  walletstore,
  incomestore,
  expensestore
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Context.Provider
    value={{
      userstore,
      walletstore,
      incomestore,
      expensestore
    }}
  >
    <App />
  </Context.Provider>
);
