import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../..";
import styles from "../../styles/WalletPage.module.css";
import AddModal from "../AddModal";
import Button from "../form/Button";
import Header from "../Header";
import Loader from "../Loader";

import WalletOperationsList from "../WalletOperationsList";

export default function WalletPage() {
  const { userstore, walletstore, expensestore, incomestore } = useContext(Context);
  const navigate = useNavigate();
  useEffect(() => {
    if (!userstore._isAuth) {
      navigate("../auth", { replace: true });
    }
  }, [userstore._isAuth]);
  
  const data = walletstore.wallet;
  useEffect(() => {
    if (!walletstore.wallet){
      navigate("../wallets", { replace: false });
    }else{
      expensestore.getExpenses(data.id);
      incomestore.getIncomes(data.id);
    }
  }, []);
  return (
    <div>
      <Header />
      {
        expensestore.isLoading?
        <Loader/>
        :
        <div className={styles.container}>
        <WalletOperationsList />
       
      </div>
      }
    </div>
  );
}
