import React, { useContext, useEffect, useState } from "react";
import { Context } from "../..";
import Button from "../form/Button";
import Header from "../Header";
import AppBlockSelf from "../AppBlockSelf";
import { observer, Observer } from "mobx-react-lite";
import AddWalletModal from "../AddModal";
import styles from '../../styles/OperationPage.module.css'
import Loader from "../Loader";
import { useNavigate } from "react-router-dom";


function IncomesPage() {
  const { userstore,walletstore, incomestore } = useContext(Context);
  const [addModal, setAddModal] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (!userstore._isAuth) {
      navigate("../auth", { replace: true });
    }
  }, [userstore._isAuth]);
  const removeIncome=(id:number, wallet_id:number)=>{
    incomestore.deleteIncome(id, wallet_id)
  }
  const editIncome=(id:number, title:string, amount:number, wallet_id:number)=>{
    incomestore.editIncome(title,id,amount,wallet_id)
  }
  const addIncome=(title:string, amount:number)=>{
    incomestore.createIncome(title,amount,walletstore.wallet.id)
  }
  return (
    <div>
      <Header />
      <div className={styles.container}>
        <Button
          title="Добавить доход"
          onClick={() => {
            setAddModal(true);
          }}
        />
        <AddWalletModal addModal={addModal} setAddModal={(state)=>{setAddModal(state)}} onAdd={(title,amount)=>{addIncome(title, amount)}}/>
        {incomestore.incomes.map((item) => {
          return (
            <AppBlockSelf
              text="доход"
              type="income"
              title={item.title}
              id={item.id}
              removeIncome={(id:number, wallet_id:number)=>{removeIncome(id, wallet_id)}}
              editIncome={(id:number, title:string, amount:number, wallet_id:number)=>{editIncome(id, title, amount, wallet_id)}}
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