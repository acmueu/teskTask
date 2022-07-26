import React, { useContext, useEffect, useState } from "react";
import { Context } from "../..";
import Button from "../form/Button";
import Header from "../Header";
import AppBlockSelf from "../AppBlockSelf";
import { observer, Observer } from "mobx-react-lite";
import AddWalletModal from "../AddModal";
import styles from '../../styles/OperationPage.module.css'
import { useNavigate } from "react-router-dom";

function IncomesPage() {
  const { userstore, walletstore, expensestore } = useContext(Context);
  const [addModal, setAddModal] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!userstore._isAuth) {
      navigate("../auth", { replace: true });
    }
  }, [userstore._isAuth]);
  const removeExpense=(id:number, wallet_id:number)=>{
    expensestore.deleteExpense(id, wallet_id)
  }
  const editExpense=(id:number, title:string, amount:number, wallet_id:number)=>{
    expensestore.editExpense(title,id,amount,wallet_id)
  }
  const addExpense=(title:string, amount:number)=>{
    expensestore.createExpense(title,amount,walletstore.wallet.id)
  }
  return (
    <div>
      <Header />
      <div className={styles.container}>
        <Button
          title="Добавить расход"
          onClick={() => {
            setAddModal(true);
          }}
        />
        <AddWalletModal addModal={addModal} setAddModal={(state)=>{setAddModal(state)}} onAdd={(title,amount)=>{addExpense(title, amount)}}/>
        {expensestore.expenses.map((item) => {
          return (
            <AppBlockSelf
              text='расход'
              type="expense"
              title={item.title}
              id={item.id}
              removeExpense={(id:number, wallet_id:number)=>{removeExpense(id, wallet_id)}}
              editExpense={(id:number, title:string, amount:number, wallet_id:number)=>{editExpense(id, title, amount, wallet_id)}}
              amount={item.amount}
              wallet_id={item.wallet_id}
              onClick={() => {}}
            />
          );
        })}
      </div>
    </div>
  );
}
export default observer(IncomesPage)