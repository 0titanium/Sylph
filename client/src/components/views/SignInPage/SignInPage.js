import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { loginUser } from "../../../_actions/user_action";
// import { withRouter } from "react-router-dom";
import { Input, Button } from "antd";

function SignInPage(props) {
  //   const dispatch = useDispatch();

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

    let body = {
      id: Id,
      password: Password,
    };

    // dispatch(loginUser(body)).then((response) => {
    //   if (response.payload.loginSuccess) {
    //     props.history.push("/"); // withRouter 필요
    //   } else {
    //     alert("Error");
    //   }
    // });
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
        <br />

        <label style={{ marginBottom: "5px" }}>ID</label>
        <Input type="email" value={Id} onChange={onIdHandler} />
        <br />

        <label style={{ marginBottom: "5px" }}>Password</label>
        <Input.Password value={Password} onChange={onPasswordHandler} />

        <br />
        <br />

        <Button
          style={{
            color: "white",
            backgroundColor: "#4b7bec",
            height: "2.5rem",
          }}
          htmlType="submit"
        >
          Sign In
        </Button>
      </form>
    </div>
  );
}

export default SignInPage;
