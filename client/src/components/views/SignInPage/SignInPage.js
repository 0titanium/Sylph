import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signinUser } from "../../../_actions/user_action";
import { withRouter } from "react-router-dom";
import { Input, Button } from "antd";

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
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "70vh",
      }}
    >
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={onSubmitHandler}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h2>Sign In</h2>
        </div>

        <label style={{ marginBottom: "5px", marginTop: "2rem" }}>ID</label>
        <Input type="text" value={Id} onChange={onIdHandler} />

        <label style={{ marginBottom: "5px", marginTop: "1rem" }}>
          Password
        </label>
        <Input.Password value={Password} onChange={onPasswordHandler} />

        <Button
          style={{
            color: "white",
            backgroundColor: "#4b7bec",
            height: "2.5rem",
            marginTop: "2rem",
          }}
          htmlType="submit"
        >
          Sign In
        </Button>
      </form>
    </div>
  );
}

export default withRouter(SignInPage);
