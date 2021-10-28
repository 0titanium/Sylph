import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signinUser } from "../../../_actions/user_action";
import { withRouter } from "react-router-dom";

import { Input, Button, Modal } from "antd";
import styles from "./SignInPage.module.css";

function SignInPage(props) {
  const dispatch = useDispatch();

  const [Id, setId] = useState("");
  const [Password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);

  const onIdHandler = (event) => {
    setId(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const failModal = (Id, Password) => {
    let message = "";

    if (Id === "") {
      message = "아이디를 입력하십시오.";
    } else if (Password === "") {
      message = "비밀번호를 입력하십시오.";
    } else {
      message = "아이디 혹은 비밀번호가 다릅니다.";
    }

    return (
      <Modal
        title={"로그인 실패"}
        centered
        visible={visible}
        onOk={() => setVisible(false)}
        okButtonProps={{
          style: {
            display: "flex",
            margin: "auto",
          },
        }}
        cancelButtonProps={{ style: { display: "none" } }}
      >
        <p>{message}</p>
      </Modal>
    );
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
        setVisible(true);
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
        {failModal(Id, Password)}
      </form>
    </div>
  );
}

export default withRouter(SignInPage);
