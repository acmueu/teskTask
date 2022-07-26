import { observer } from "mobx-react-lite";
import React, { Dispatch, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";
import styles from "../styles/AppBlockSelf.module.css";
import Input from "./form/Input";

interface props {
  title:string;
  amount:number;
  editModal: boolean;
  setEditModal: (state: boolean) => void;
  onEdit: (title:string, amount:number) => void;
  
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
function EditModal(props: props) {
  let subtitle: any;
  const { editModal, setEditModal, title, amount} = props;
  const [newTitle, setTitle]=useState<string>(props.title)
  const [newAmount, setAmount]=useState<number>(props.amount)
  const wrapperRef = useRef();
  
  const handleClick = (e:React.MouseEvent<HTMLDivElement>) => {
    if(e.target === wrapperRef.current) {
      editWallet();
    }
  };
  useEffect(()=>{

  })
  const editWallet = () => {
    props.onEdit(newTitle,newAmount);
  };
  function afterOpenModal() {
    
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  function closeModal(ev:React.MouseEvent<HTMLDivElement>) {
    ev.stopPropagation()
    setEditModal(false);
  }

  return (
    <div onClick={(e:React.MouseEvent<HTMLDivElement>)=>{e.stopPropagation()}}>
    <Modal
      isOpen={editModal}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <div className={styles.modalContent} onClick={(e:React.MouseEvent<HTMLDivElement>)=>{e.stopPropagation()}}>
        <Input defaultValue={title} onChange={(value:string)=>{setTitle(value)}} label="Название"/>
        <div style={{marginTop:10}}>
        <Input defaultValue={String(amount)} onChange={(value:number)=>{setAmount(Number(value))}} label="Балланс" type="number" />
        </div>
      </div>
      <div className={styles.deleteModalButtons}>
        <div
          onClick={(ev:React.MouseEvent<HTMLDivElement>) => {
            closeModal(ev);
            editWallet();
          }}
          className={styles.editModalEditButton}
        >
          Изменить
        </div>
        <div
          onClick={(ev:React.MouseEvent<HTMLDivElement>) => {
            closeModal(ev);
          }}
          className={styles.deleteModalCancelButton}
        >
          Отмена
        </div>
      </div>
    </Modal>
    </div>
  );
}
export default observer(EditModal)