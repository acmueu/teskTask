import React, { Dispatch, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";
import styles from "../styles/AppBlockSelf.module.css";
import Input from "./form/Input";

interface props {
  title?:string;
  amount?:number;
  addModal: boolean;
  setAddModal: (state: boolean) => void;
  onAdd: (title:string, amount:number) => void;
  
}

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: 10,
    borderWidth: 1,
  },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement("#root");

export default function AddWalletModal(props: props) {
  let subtitle: any;
  const { addModal, setAddModal } = props;
  const [title, setTitle]=useState<string>(props.title?props.title:'')
  const [amount, setAmount]=useState<number>(props.amount?props.amount:0)

  
  const addWallet = () => {
    props.onAdd(title, amount)
  };
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setAddModal(false);
  }

  return (
    <Modal
      isOpen={addModal}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <div className={styles.modalContent}>
        <Input onChange={(value:string)=>{setTitle(value)}} label="Название"/>
        <div style={{marginTop:10}}>
        <Input onChange={(value:number)=>{setAmount(Number(value))}} label="Сумма" type="number" />
        </div>
      </div>
      <div className={styles.deleteModalButtons}>
        <div
          onClick={() => {
            closeModal();
            addWallet();
          }}
          className={styles.editModalEditButton}
        >
          Добавить
        </div>
        <div
          onClick={() => {
            closeModal();
          }}
          className={styles.deleteModalCancelButton}
        >
          Отмена
        </div>
      </div>
    </Modal>
  );
}
