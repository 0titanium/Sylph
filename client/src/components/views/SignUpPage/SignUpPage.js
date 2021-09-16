import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signupUser } from "../../../_actions/user_action";
import { Input, Button, Checkbox} from "antd";

function SignUpPage(props) {
  const dispatch = useDispatch();

  const [Id, setId] = useState("");
  const [Password, setPassword] = useState("");
  const [Nickname, setNickname] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [Position, setPosition] = useState([]);
  const [Skills, setSkills] = useState([]);
  const [Careers, setCareers] = useState("");
  const [GitHubAddress, setGitHubAddress] = useState("https://github.com/");

  const positionOptions = [
    { label: "Frontend", value: "Frontend" },
    { label: "Backend", value: "Backend" },
    { label: "Full stack", value: "Full stack" },
    { label: "iOS", value: "iOS" },
    { label: "Android", value: "Android" },
    { label: "Game Client", value: "Game Client" },
    { label: "Game Server", value: "Game Server" },
  ];

  const options = [
    { label: "JavaScript", value: "JavaScript" },
    { label: "TypeScript", value: "TypeScript" },
    { label: "Java", value: "Java" },
    { label: "Python", value: "Python" },
    { label: "Swift", value: "Swift" },
    { label: "Kotlin", value: "Kotlin" },
    { label: "php", value: "php" },
    { label: "C", value: "C" },
    { label: "C++", value: "C++" },
    { label: "C#", value: "C#" },
  ];

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
    setPosition(event);
  };

  const onSkillsHandler = (event) => {
    setSkills(event);
  };

  const onCareersHandler = (event) => {
    setCareers(event.currentTarget.value);
  };

  const onGitHubAddressHandler = (event) => {
    setGitHubAddress(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (Password !== ConfirmPassword) {
      return alert("비밀번호가 다릅니다.");
    }

    let data = {
      id: Id,
      nickname: Nickname,
      password: Password,
      position: Position,
      skills: Skills,
      careers: Careers,
      githubaddress: GitHubAddress,
    };

    if (
      data.id === "" ||
      data.nickname === "" ||
      data.position === [] ||
      data.skills === []
    ) {
      alert("입력하지 않은 필수 내용이 있습니다.");
    } else {
      dispatch(signupUser(data)).then((response) => {
        if (response.payload.success) {
          props.history.push("/signin"); // withRouter 필요
        } else {
          alert("계정을 만드는데 실패했습니다.");
        }
      });
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "145vh",
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

        <p style={{ color: "red", marginTop: "2rem" }}>* 필수입력</p>
        <p style={{ marginBottom: "2rem" }}>* 선택입력</p>

        <label style={{ marginBottom: "5px" }}>
          <p style={{ color: "red", display: "inline" }}>*</p> ID
        </label>
        <Input
          type="text"
          value={Id}
          onChange={onIdHandler}
          style={{ height: "2.5rem" }}
        />

        <label style={{ marginBottom: "5px", marginTop: "2rem" }}>
          <p style={{ color: "red", display: "inline" }}>*</p> Nickname
        </label>
        <Input
          type="text"
          value={Nickname}
          onChange={onNicknameHandler}
          style={{ height: "2.5rem" }}
        />

        <label style={{ marginBottom: "5px", marginTop: "2rem" }}>
          <p style={{ color: "red", display: "inline" }}>*</p> Password
        </label>
        <Input.Password
          value={Password}
          onChange={onPasswordHandler}
          style={{ height: "2.5rem" }}
        />

        <label style={{ marginBottom: "5px", marginTop: "2rem" }}>
          <p style={{ color: "red", display: "inline" }}>*</p> Confirm Password
        </label>
        <Input.Password
          value={ConfirmPassword}
          onChange={onConfirmPasswordHandler}
          style={{ height: "2.5rem" }}
        />

        <label style={{ marginBottom: "5px", marginTop: "2rem" }}>
          <p style={{ color: "red", display: "inline" }}>*</p> Position
        </label>
        <Checkbox.Group
          options={positionOptions}
          onChange={onPositionHandler}
        />

        <label style={{ marginBottom: "5px", marginTop: "2rem" }}>
          <p style={{ color: "red", display: "inline" }}>*</p> Skills
        </label>
        <Checkbox.Group
          options={options}
          onChange={onSkillsHandler}
        />

        <label style={{ marginBottom: "5px", marginTop: "2rem" }}>
          <p style={{ display: "inline" }}>*</p> Careers
        </label>
        <Input
          type="text"
          value={Careers}
          onChange={onCareersHandler}
          style={{ height: "2.5rem" }}
          placeholder="ex) 1 year, ...etc"
        />

        <label style={{ marginBottom: "5px", marginTop: "2rem" }}>
          <p style={{ display: "inline" }}>*</p> GitHub Address
        </label>
        <Input
          type="text"
          value={GitHubAddress}
          onChange={onGitHubAddressHandler}
          style={{ height: "2.5rem" }}
          placeholder="https://github.com/"
        />

        <Button
          style={{
            color: "white",
            backgroundColor: "#4b7bec",
            height: "2.5rem",
            marginTop: "2rem",
          }}
          htmlType="submit"
        >
          Sign Up
        </Button>
      </form>
    </div>
  );
}

export default withRouter(SignUpPage);
