import React from "react";
import styles from "../styles/OperationSelf.module.css";

interface props {
  title: string;
  amount: number;
  id:number;
  wallet_id:number;


}


export default function OperationSelf(props: props) {
  return (
    <div  className={styles.container}>
      <div className={styles.infoWrapper}>
        <div>{props.title}</div>
        <div>{props.amount}₽</div>
      </div>
    </div>
  );
}
