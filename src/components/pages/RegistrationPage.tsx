import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../index";
import AuthService from "../../services/auth.service";
import styles from "../../styles/Auth.module.css";
import { observer } from "mobx-react-lite";
import Form from "react-bootstrap/Form";
import Input from "../form/Input";
import Button from "../form/Button";
import AuthButton from "../form/AuthButton";

const RegistrationPage = () => {
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confPassword, setConfPassword] = useState<string>("");
  const navigate = useNavigate();
  const { userstore } = useContext(Context);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (userstore._isAuth) {
      navigate("../wallets", { replace: true });
      console.log("navigating");
    }
    console.log("RegistrationPage");
  }, [userstore._isAuth]);

  const changeLogin = (text: string) => {
    setLogin(text);
  };
  const changePassword = (text: string) => {
    setPassword(text);
  };
  const changeConfPassword = (text: string) => {
    setConfPassword(text);
  };
  const signUp = async () => {
    if (password.length>0){
      if (password == confPassword) {
        const response = await userstore.signUp(login, password);
        errorMessage(response?.response);
      } else {
        setError("Пароли не совпадают.");
      }
    }else{
      setError("Длина пароля должна быть больше 0")
    }
  };
  const errorMessage = (data: any) => {
    if (data.data.message) {
      setError(data.data.message);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.errorBlock}>{error}</div>
      <div className={styles.inputsWrapper}>
        <div className={styles.inputWrapper}>
          <Input
            label="Логин"
            onChange={(value) => {
              changeLogin(value);
            }}
          />
        </div>
        <div className={styles.inputWrapper} style={{ marginTop: "15px" }}>
          <Input
            label="Пароль"
            type="password"
            onChange={(value) => {
              changePassword(value);
            }}
          />
        </div>
        <div className={styles.inputWrapper} style={{ marginTop: "15px" }}>
          <Input
            label="Повторите пароль"
            type="password"
            onChange={(value) => {
              changeConfPassword(value);
            }}
          />
        </div>
      </div>
      <div className={styles.buttonWrapper}>
        <AuthButton
          onClick={() => {
            signUp();
          }}
          title="Создать аккаунт"
        />
      </div>
      <div className={styles.linkBlock}>
        <Link to="/auth">Авторизация</Link>
      </div>
    </div>
    // <div className={styles.container}>
    //   <LoginForm
    //     type="register"
    //     buttonClick={signUp}
    //     changeLogin={changeLogin}
    //     changePassword={changePassword}
    //     changeConfPassword={changeConfPassword}
    //   />
    //   <div>
    //     <Link to="/auth">
    //       <Form.Label>Авторизация</Form.Label>
    //     </Link>
    //   </div>
    // </div>
  );
};

export default observer(RegistrationPage);
