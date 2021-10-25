import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signinUser } from "../../../_actions/user_action";
import { withRouter } from "react-router-dom";

import { Input, Button } from "antd";
import styles from "./SignInPage.module.css";

function SignInPage(props) {
  const dispatch = useDispatch();

  const [Id, setId] = useState("");
  const [Password, setPassword] = useState("");

  const onIdHandler = (event) => {
    setId(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    let data = {
      id: Id,
      password: Password,
    };

    dispatch(signinUser(data)).then((response) => {
      if (response.payload.signinSuccess) {
        props.history.push("/"); // withRouter 필요
      } else {
        alert("로그인에 실패했습니다.");
      }
    });
  };

  return (
    <div className={styles.container}>
      <form className={styles.formSt} onSubmit={onSubmitHandler}>
        <div className={styles.formContainer}>
          <h2>Sign In</h2>
        </div>

        <label className={styles.labelSt}>ID</label>
        <Input type="text" value={Id} onChange={onIdHandler} />

        <label className={styles.labelSt}>Password</label>
        <Input.Password value={Password} onChange={onPasswordHandler} />

        <Button className={styles.btn} htmlType="submit">
          Sign In
        </Button>
      </form>
    </div>
  );
}

export default withRouter(SignInPage);
