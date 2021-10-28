import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signupUser } from "../../../_actions/user_action";
import { USER_SERVER } from "../../../Config";

import { Input, Button, Checkbox, Modal } from "antd";
import styles from "./SignUpPage.module.css";

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
  const [Idvisible, setIdVisible] = useState(false);
  const [Nickvisible, setNickVisible] = useState(false);
  const [isOverlappedId, setisOverlappedId] = useState(undefined);
  const [isOverlappedNick, setisOverlappedNick] = useState(undefined);

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

  const overLapIdModal = (Id, isOverlappedId) => {
    let message = "";

    if (Id === "") {
      message = "아이디를 입력하십시오.";
    } else if (isOverlappedId) {
      message = "이미 사용중인 아이디입니다.";
    } else {
      message = "사용 가능한 아이디입니다.";
    }

    return (
      <Modal
        centered
        visible={Idvisible}
        onOk={() => setIdVisible(false)}
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

  const overLapNickModal = (NickName, isOverlappedNick) => {
    let message = "";

    if (NickName === "") {
      message = "닉네임을 입력하십시오.";
    } else if (isOverlappedNick) {
      message = "이미 사용중인 닉네임입니다.";
    } else {
      message = "사용 가능한 닉네임입니다.";
    }

    return (
      <Modal
        centered
        visible={Nickvisible}
        onOk={() => setNickVisible(false)}
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

  const checkOverlapId = () => {
    fetch(`${USER_SERVER}/isOverlappedId`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
      credentials: "include",
      body: JSON.stringify({
        id: Id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          console.log(data);
          if (data.isOverlappedId) {
            setIdVisible(true);
            setisOverlappedId(false);
          } else {
            setIdVisible(true);
            setisOverlappedId(true);
          }
        } else {
          alert("확인 작업에 실패했습니다.");
        }
      });
  };

  const checkOverlapNickname = () => {
    fetch(`${USER_SERVER}/isOverlappedNick`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
      credentials: "include",
      body: JSON.stringify({
        nickname: Nickname,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          console.log(data);
          // alert를 modal로 바꿀 것.
          if (data.isOverlappedNick) {
            // alert("사용 가능한 닉네임입니다.");
            setNickVisible(true);
            setisOverlappedNick(false);
          } else {
            // alert("중복된 닉네임입니다.");
            setNickVisible(true);
            setisOverlappedNick(true);
          }
        } else {
          alert("확인 작업에 실패했습니다.");
        }
      });
  };

  return (
    <div className={styles.container}>
      <form className={styles.formSt} onSubmit={onSubmitHandler}>
        <div className={styles.formContainer}>
          <h2>Sign Up</h2>
        </div>

        <p className={styles.essential}>* 필수입력</p>
        <p className={styles.choice}>* 선택입력</p>

        <label className={styles.labelSt}>
          <p className={styles.pst}>*</p> ID
        </label>
        <Input
          type="text"
          value={Id}
          onChange={onIdHandler}
          className={styles.inputSt}
        />
        <Button onClick={checkOverlapId} className={styles.checkOverlapBtn}>
          중복 확인
        </Button>

        {overLapIdModal(Id, isOverlappedId)}

        <label className={styles.labelSt}>
          <p className={styles.pst}>*</p> Nickname
        </label>
        <Input
          type="text"
          value={Nickname}
          onChange={onNicknameHandler}
          className={styles.inputSt}
        />
        <Button
          onClick={checkOverlapNickname}
          className={styles.checkOverlapBtn}
        >
          중복 확인
        </Button>

        {overLapNickModal(Nickname, isOverlappedNick)}

        <label className={styles.labelSt}>
          <p className={styles.pst}>*</p> Password {` - (6자리 이상)`}
        </label>
        <Input.Password
          value={Password}
          onChange={onPasswordHandler}
          className={styles.inputSt}
          placeholder="6자리 이상 입력하십시오."
        />
        {Password.length === 0 ? null : Password.length < 6 ? (
          <p className={styles.checkPwSt}>
            비밀번호는 6자리 이상이어야 합니다.
          </p>
        ) : null}

        <label className={styles.labelSt}>
          <p className={styles.pst}>*</p> Confirm Password
        </label>
        <Input.Password
          value={ConfirmPassword}
          onChange={onConfirmPasswordHandler}
          className={styles.inputSt}
          placeholder="6자리 이상 입력하십시오."
        />
        {ConfirmPassword.length === 0 ? null : ConfirmPassword !== Password ? (
          <p className={styles.checkPwSt}>비밀번호가 일치하지 않습니다.</p>
        ) : null}

        <label className={styles.labelSt}>
          <p className={styles.pst}>*</p> Position
        </label>
        <Checkbox.Group
          options={positionOptions}
          onChange={onPositionHandler}
        />

        <label className={styles.labelSt}>
          <p className={styles.pst}>*</p> Skills
        </label>
        <Checkbox.Group options={options} onChange={onSkillsHandler} />

        <label className={styles.labelSt}>
          <p className={styles.choicepst}>*</p> Careers
        </label>
        <Input
          type="text"
          value={Careers}
          onChange={onCareersHandler}
          className={styles.inputSt}
          placeholder="ex) 1 year, ...etc"
        />

        <label className={styles.labelSt}>
          <p className={styles.choicepst}>*</p> GitHub Address
        </label>
        <Input
          type="text"
          value={GitHubAddress}
          onChange={onGitHubAddressHandler}
          className={styles.inputSt}
          placeholder="https://github.com/"
        />
        <Button className={styles.btn} htmlType="submit">
          Sign Up
        </Button>
      </form>
    </div>
  );
}

export default withRouter(SignUpPage);
