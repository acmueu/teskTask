import React, { useContext, useState, Dispatch, useEffect } from "react";
import { Context } from "..";
import styles from "../styles/AppBlockSelf.module.css";
import { MdDelete } from "react-icons/md";
import { MdModeEditOutline } from "react-icons/md";
import DeleteModal from "./DeleteModal";
import EditModal from "./EditModal";
import AddWalletModal from "./AddModal";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";


interface props {
  id: number;
  title: string;
  amount: number;
  user_id?: number;
  remove?:(id:number)=>void;
  removeIncome?:(id:number, wallet_id:number)=>void;
  edit?:(id:number,title:string, amount:number)=>void;
  editIncome?:(id:number,title:string, amount:number, wallet_id:number)=>void;
  editExpense?:(id:number,title:string, amount:number, wallet_id:number)=>void;
  removeExpense?:(id:number, wallet_id:number)=>void;
  onClick:()=>void;
  wallet_id?:number;
  type:string;
  text?:string
}
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

function AppBlockSelf(props: props) {
  const { title, amount, id, user_id, wallet_id, text} = props;
  const { walletstore, incomestore, expensestore} = useContext(Context);
  const [delModal, setDelModal] = useState<boolean>(false);
  const [editModal, setEditModal] = useState<boolean>(false);
  const [balance, setBalance] = useState<number>()

  const showEditModal=(ev:React.MouseEvent<HTMLDivElement>)=>{
    ev.stopPropagation()
    setEditModal(true)
  }
  const showDelModal=(ev:React.MouseEvent<HTMLDivElement>)=>{
    ev.stopPropagation()
    setDelModal(true)
    }
    console.log(title)
  const onPressDeleteButton=()=>{
    if (props.type=='income'&&wallet_id){
      incomestore.deleteIncome(id, wallet_id)
    }else if(props.type=='wallet'&&user_id){
      walletstore.deleteWallet(id)
    }else if(props.type=='expense'&&wallet_id){
      expensestore.deleteExpense(id, wallet_id)
    }
  }
  const onPressEditButton=(title:string, amount:number)=>{

    if (props.type=='income'&&wallet_id){
      incomestore.editIncome(title, id, amount, wallet_id)
    }else  if(props.type=='wallet'&&user_id){
      walletstore.editWallet(id, title, amount)
    }else if(props.type=='expense'&&wallet_id){
      expensestore.editExpense(title, id, amount, wallet_id)
    }
  }
  const onPressContainer=(ev:React.MouseEvent<HTMLDivElement>)=>{
      ev.stopPropagation()
     props.onClick()

  }
  
  return (
    <div className={styles.container}>
      <div className={styles.infoWrapper} onClick={(ev)=>{onPressContainer(ev)}}>
        <DeleteModal  text={text} onDelete={()=>{onPressDeleteButton()}} delModal={delModal} setDelModal={(state:boolean)=>{setDelModal(state)}} />
        <EditModal title={title} amount={amount} editModal={editModal} setEditModal={(state:boolean)=>{setEditModal(state)}}
        onEdit={(title:string, amount:number)=>{onPressEditButton(title, amount)}}
        />
        <div className={styles.walletText}>{title}</div>
        <div className={styles.balanceText}>Баланс: {amount}₽</div>
      </div>
      <div className={styles.icon}>
        <div onClick={(ev)=>{showEditModal(ev)}}>
          <MdModeEditOutline
            size={24}
            className={styles.iconColorEdit}
          />
        </div>
        <div onClick={(ev)=>{showDelModal(ev)}}>
          <MdDelete
            size={24}
            className={styles.iconColorDelete}
          />
        </div>
      </div>
    </div>
  );
}

export default observer(AppBlockSelf)