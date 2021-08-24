import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { registerUser } from "../../../_actions/user_action";
import { Input } from "antd";
import { Button } from "antd";

function SignUpPage() {
  //   const dispatch = useDispatch();

  const [Id, setId] = useState("");
  const [Password, setPassword] = useState("");
  const [Nickname, setNickname] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [Position, setPosition] = useState("");
  const [Skills, setSkills] = useState([]);
  const [GitHubAddress, setGitHubAddress] = useState("");

  const onIdHandler = (event) => {
    setId(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onNicknameHandler = (event) => {
    setNickname(event.currentTarget.value);
  };

  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value);
  };

  const onPositionHandler = (event) => {
    setPosition(event.currentTarget.value);
  };

  const onSkillsHandler = (event) => {
    setSkills(event.currentTarget.value);
  };

  const onGitHubAddressHandler = (event) => {
    setGitHubAddress(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (Password !== ConfirmPassword) {
      return alert("비밀번호와 비밀번호 확인은 같아야 합니다.");
    }

    // let body = {
    //   id: Id,
    //   nickname: Nickname,
    //   password: Password,
    // };

    // dispatch(registerUser(body)).then((response) => {
    //   if (response.payload.success) {
    //     props.history.push("/login"); // withRouter 필요
    //   } else {
    //     alert("Failed to Sign Up");
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
        height: "110vh",
      }}
    >
      <form
        style={{ display: "flex", flexDirection: "column", width: "30%" }}
        onSubmit={onSubmitHandler}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h2>Sign Up</h2>
        </div>
        <br />

        <label style={{ marginBottom: "5px" }}>
          <p style={{ color: "red", display: "inline" }}>*</p> ID
        </label>
        <Input
          type="text"
          value={Id}
          onChange={onIdHandler}
          style={{ height: "2.5rem" }}
        />
        <br />

        <label style={{ marginBottom: "5px" }}>
          <p style={{ color: "red", display: "inline" }}>*</p> Nickname
        </label>
        <Input
          type="text"
          value={Nickname}
          onChange={onNicknameHandler}
          style={{ height: "2.5rem" }}
        />
        <br />

        <label style={{ marginBottom: "5px" }}>
          <p style={{ color: "red", display: "inline" }}>*</p> Password
        </label>
        <Input.Password
          value={Password}
          onChange={onPasswordHandler}
          style={{ height: "2.5rem" }}
        />
        <br />

        <label style={{ marginBottom: "5px" }}>
          <p style={{ color: "red", display: "inline" }}>*</p> Confirm Password
        </label>
        <Input.Password
          value={ConfirmPassword}
          onChange={onConfirmPasswordHandler}
          style={{ height: "2.5rem" }}
        />
        <br />

        <label style={{ marginBottom: "5px" }}>
          <p style={{ color: "red", display: "inline" }}>*</p> Position
        </label>
        <Input
          type="text"
          value={Position}
          onChange={onPositionHandler}
          style={{ height: "2.5rem" }}
          placeholder="ex) Frontend, Backend, Full Stack, ...etc"
        />
        <br />

        <label style={{ marginBottom: "5px" }}>
          <p style={{ color: "red", display: "inline" }}>*</p> Skills
        </label>
        <Input
          type="text"
          value={Skills}
          onChange={onSkillsHandler}
          style={{ height: "2.5rem" }}
          placeholder="ex) Java, Javascript, Kotlin, ...etc"
        />
        <br />

        <label style={{ marginBottom: "5px" }}>
          <p style={{ display: "inline" }}>*</p> GitHub Address
        </label>
        <Input
          type="text"
          value={GitHubAddress}
          onChange={onGitHubAddressHandler}
          style={{ height: "2.5rem" }}
          placeholder="https://github.com/"
        />
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
          Sign Up
        </Button>
      </form>
    </div>
  );
}

export default SignUpPage;
