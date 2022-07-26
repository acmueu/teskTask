import React, { useContext, useEffect, useState } from "react";
import { Context } from "../..";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import Wallet from "../AppBlockSelf";
import styles from "../../styles/Wallets.module.css";
import DeleteWalletModal from "../DeleteModal";
import AddWalletModal from "../AddModal";
import Button from "../form/Button";
import Header from "../Header";
import Loader from "../Loader";

interface WalletInterface {
  id: number;
  title: string;
  amount: number;
  user_id: number;
}

const WalletsPage = () => {
  const { userstore, walletstore, expensestore, incomestore} = useContext(Context);
  const [title, setTitle] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [addModal, setAddModal] = useState<boolean>(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (!userstore._isAuth) {
      navigate("../auth", { replace: true });
    }
  }, [userstore._isAuth]);
  useEffect(() => {
    walletstore.getWallets();
  }, []);
  const addWallet = (title: string, amount: number) => {
    walletstore.createWallet(title, amount);
  };
  const removeWallet = (id:number) => {
    walletstore.deleteWallet(id);
  };
  const editWallet=(id:number,title:string, amount:number)=>{
    walletstore.editWallet(id, title, amount)
  }
  const logOut = () => {
    userstore.logout();
  };
  const onClickWallet = (item: WalletInterface) => {
    walletstore.setWallet(item)
    navigate("../wallet")
  };

  return (
    
    <div>
      <Header/>
    {
      walletstore.isLoading?
      <div style={{justifyContent:'center', display:"flex", marginTop:10}}>
         <Loader/>
      </div>

      :
      <div className={styles.container}>
      <Button title="Добавить кошелек" onClick={()=>{setAddModal(true)}}/>
      <AddWalletModal

        title={title}
        amount={amount}
        onAdd={(title: string, amount: number) => {
          addWallet(title, amount);
        }}
        addModal={addModal}
        setAddModal={(state: boolean) => {
          setAddModal(state);
        }}
      />
      {walletstore.wallets.map((item) => {
        return (
         
            <Wallet
              text="кошелек"
              type="wallet"
              remove={(id:number)=>{removeWallet(id)}}
              edit={(id:number,title:string, amount:number)=>{editWallet(id, title, amount)}}
              title={item.title}
              id={item.id}
              amount={item.amount}
              user_id={item.user_id}
              onClick={() => {
                onClickWallet(item);
              }}
            />
          
        );
      })}
    </div>
    }
    </div>
  );
};

export default observer(WalletsPage);
