import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../index";
import AuthService from "../../services/auth.service";
import styles from "../../styles/Auth.module.css";
import { observer } from "mobx-react-lite";
import Form from "react-bootstrap/Form";
import Input from "../form/Input";
import AuthButton from "../form/AuthButton";

const AuthPage = () => {
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { userstore } = useContext(Context);
  const [error,setError]=useState<string>('')
  const navigate = useNavigate();

  const changeLogin = (text:string) => {
    setLogin(text);
  };
  const changePassword = (text: string) => {
    setPassword(text);
  };
  const signIn=async()=>{
    const response=await userstore.signIn(login, password);
    errorMessage(response?.response)
  }
  const errorMessage=(data:any)=>{
    if (data.data.message){
      setError(data.data.message)
    }
  }
  useEffect(() => {
    if (userstore._isAuth) {
      navigate("../wallets", { replace: true });
      console.log('navigating from auth')
    }
    console.log("AuthPage");
  }, [userstore._isAuth]);

  return (
    <div className={styles.container}>
      <div className={styles.errorBlock}>{error}</div>
      <div className={styles.inputsWrapper}>
        <div className={styles.inputWrapper}>
          <Input label='Логин' onChange={(value)=>{changeLogin(value)}}/>
        </div>
        <div className={styles.inputWrapper} style={{marginTop:'15px'}}>
          <Input label='Пароль' type='password' onChange={(value)=>{changePassword(value)}}/>
        </div>
      </div>
      <div className={styles.buttonWrapper}>
        <AuthButton title='Войти' onClick={()=>{signIn()}}/>
      </div>
      <div className={styles.linkBlock}>
        <Link to="/registration">Регистрация</Link>
      </div>
    </div>

    // <div className={styles.container}>
    //   <LoginForm changeLogin={changeLogin} buttonClick={()=>{store.signIn(login, password)}} changePassword={changePassword} />
    //   <div>
    //     <Link to="/registration">
    //       <Form.Label>Регистрация</Form.Label>
    //     </Link>
    //   </div>
    // </div>
  );
};

export default observer(AuthPage);
