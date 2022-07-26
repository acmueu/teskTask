import React from "react";
import styles from '../../styles/Form.module.css'
interface props {
  onClick: () => void;
  title?: string;
}

export default function AuthButton(props: props) {
  const {title, onClick}=props
  return (
    <div
    className={styles.authButton}
      onClick={() => {
        onClick();
      }}
    >
      {title}
    </div>
  );
}
