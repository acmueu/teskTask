import React, { Dispatch } from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";
import styles from "../styles/AppBlockSelf.module.css";

interface props {
  delModal: boolean;
  setDelModal: (state:boolean)=>void;
  onDelete: () => void;
  text?:string
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

export default function DeleteWalletModal(props: props) {
  let subtitle: any;
  const { delModal, setDelModal, text} = props;


  const deleteItem=()=>{
    props.onDelete()
  }
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  function closeModal(e:React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation()
    setDelModal(false);
  }

  return (
    <div onClick={(e:React.MouseEvent<HTMLDivElement>)=>{e.stopPropagation()}}>
    <Modal
      isOpen={delModal}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <div>Вы уверены, что хотите удалить {text}?</div>
      <div className={styles.deleteModalButtons}>
        <div onClick={(e:React.MouseEvent<HTMLDivElement>)=>{closeModal(e);deleteItem()}} className={styles.deleteModalDeleteButton}>Удалить</div>
        <div
          onClick={(e:React.MouseEvent<HTMLDivElement>) => {
            closeModal(e);
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
