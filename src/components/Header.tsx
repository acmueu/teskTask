import React, { useContext } from "react";
import { Link, Navigate} from "react-router-dom";
import { Context } from "..";

export default function Header() {
  const { userstore } = useContext(Context);

  return (
    <div>
      <header
        style={{
          flexDirection: "row",
          display: "flex",
          justifyContent: "space-between",
          borderWidth: 0,
          borderStyle: "solid",
        }}
      >
        <Link
          to="/wallets"
          style={{ textDecoration: "none" }}
          onClick={() => {}}
        >
          <h1>Мои кошельки</h1>{" "}
        </Link>
        <Link
          to="/auth"
          style={{ textDecoration: "none" }}
          onClick={() => {
            userstore.logout();
          }}
        >
          <h1>Выход</h1>{" "}
        </Link>
      </header>
    </div>
  );
}
