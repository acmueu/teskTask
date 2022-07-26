import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import { Context } from ".";
import AuthPage from "./components/pages/AuthPage";
import RegistrationPage from "./components/pages/RegistrationPage";
import "bootstrap/dist/css/bootstrap.min.css";
import WalletsPage from "./components/pages/WalletsPage";
import WalletPage from "./components/pages/WalletPage";
import styles from "./styles/App.module.css";
import IncomesPage from "./components/pages/IncomesPage";
import ExpensesPage from "./components/pages/ExpensesPage";
import Loader from "./components/Loader";
import DefaultPage from "./components/pages/DefaultPage";

const App = () => {
  const { userstore, walletstore } = useContext(Context);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      userstore.checkAuth();
    }
  }, []);
  return (
    <div className={styles.body}>
      {userstore.isLoading ? (
        <div style={{justifyContent:'center', display:"flex", marginTop:20}}>
          <Loader />
        </div>

      ) : (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<DefaultPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/registration" element={<RegistrationPage />} />
            <Route path="/wallets" element={<WalletsPage />} />
            <Route path="/wallet" element={<WalletPage />} />
            <Route path="/incomes" element={<IncomesPage />} />
            <Route path="/expenses" element={<ExpensesPage />} />
          </Routes>
        </BrowserRouter>
      )}
    </div>
  );
};

export default observer(App);
