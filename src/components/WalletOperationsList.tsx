import React, { useContext, useEffect, useState } from "react";
import { Context } from "./..";
import { observer } from "mobx-react-lite";
import OperationSelf from "./OperationSelf";
import Button from "./form/Button";
import IncomeModal from "./AddModal";
import ExpenseModal from "./AddModal";
import styles from "../styles/OperationList.module.css";
import { title } from "process";
import { useNavigate } from "react-router-dom";

function WalletOperationsList() {
  const { incomestore, expensestore, walletstore } = useContext(Context);
  const [addIncomeModal, setAddIncomeModal] = useState<boolean>(false);
  const [addExpenseModa, setAddExpenseModal]= useState<boolean>(false)
  const navigate=useNavigate()
  const addIncome = (title: string, amount: number) => {
    if (amount > 0) {
      incomestore.createIncome(title, amount, data.id);
    }
  };
  const addExpense=(title:string, amount:number)=>{
    if (amount > 0) {
      expensestore.createExpense(title, amount, data.id)
    }
  }
  const showIncomes=()=>{
    navigate('../incomes')
  }
  const showExpenses=()=>{
    navigate('../expenses')
  }
  const data = walletstore.wallet;

  return (
    <div className={styles.container}>
      <div className={styles.operationBlock}>
        <Button
          title="Добавить доход"
          onClick={() => {
            setAddIncomeModal(true);
          }}
        />
        <div className={styles.text}>Доходы</div>
        <IncomeModal
          addModal={addIncomeModal}
          setAddModal={(state: boolean) => {
            setAddIncomeModal(state);
          }}
          onAdd={(title: string, amount: number) => {
            addIncome(title, amount);
          }}
        />
        <ExpenseModal
          addModal={addExpenseModa}
          setAddModal={(state: boolean) => {
            setAddExpenseModal(state);
          }}
          onAdd={(title: string, amount: number) => {
            addExpense(title, amount);
          }}
        />
        {incomestore.incomes.slice(0, incomestore.incomes.length>5?5:incomestore.incomes.length).map((item) => {
          return <OperationSelf id={item.id}  wallet_id={item.wallet_id} title={item.title} amount={item.amount} />;
        })}
        <div className={styles.showAllBlock} onClick={()=>{showIncomes()}} >Показать все</div>
      </div>
      <div className={styles.operationBlock}>
        <Button
          title="Добавить расход"
          onClick={() => {
            setAddExpenseModal(true);
          }}
        />
        <div className={styles.text}>Расходы</div>
        {expensestore.expenses.slice(0, expensestore.expenses.length>5?5:expensestore.expenses.length).map((item) => {
          return <OperationSelf id={item.id}  wallet_id={item.wallet_id} title={item.title} amount={item.amount} />;
        })}
        <div className={styles.showAllBlock} onClick={()=>{showExpenses()}}>Показать все</div>
      </div>
    </div>
  );
}
export default observer(WalletOperationsList);
