import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../..";

export default function DefaultPage() {
  const { userstore } = useContext(Context);
  const navigate = useNavigate();
  useEffect(() => {
    if (userstore._isAuth) {
      navigate("../wallets", { replace: true });
    } else {
      navigate("../auth", { replace: true });
    }
  }, [userstore.isAuth]);
  return <div></div>;
}
