import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signupUser } from "../../../_actions/user_action";
import { USER_SERVER } from "../../../Config";
import Alarm from "../Alarm/Alarm";

import { Input, Button, Checkbox, Modal, Select } from "antd";
import styles from "./SignUpPage.module.css";

function SignUpPage(props) {
  const dispatch = useDispatch();

  const { Option } = Select;

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
  const [visible, setVisible] = useState(false);
  const [Message, setMessage] = useState(undefined);
  const [CheckedId, setCheckedId] = useState(false);
  const [CheckedNick, setCheckedNick] = useState(false);

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

  const onCareersHandler = (value) => {
    setCareers(value);
    console.log(value, typeof value, Careers);
  };

  const onGitHubAddressHandler = (event) => {
    setGitHubAddress(event.currentTarget.value);
  };

  const overLapIdModal = (Id, isOverlappedId) => {
    let message = "";

    if (Id === "") {
      message = "???????????? ??????????????????.";
    } else if (isOverlappedId) {
      message = "?????? ???????????? ??????????????????.";
    } else {
      message = "?????? ????????? ??????????????????.";
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
      message = "???????????? ??????????????????.";
    } else if (isOverlappedNick) {
      message = "?????? ???????????? ??????????????????.";
    } else {
      message = "?????? ????????? ??????????????????.";
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
          if (data.isOverlappedId) {
            setIdVisible(true);
            setisOverlappedId(false);
            setCheckedId(true);
          } else {
            setIdVisible(true);
            setisOverlappedId(true);
            setCheckedId(false);
          }
        } else {
          // alert("?????? ????????? ??????????????????.");
          setVisible(true);
          setMessage("?????? ????????? ??????????????????.");
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
          if (data.isOverlappedNick) {
            // alert("?????? ????????? ??????????????????.");
            setNickVisible(true);
            setisOverlappedNick(false);
            setCheckedNick(true);
          } else {
            // alert("????????? ??????????????????.");
            setNickVisible(true);
            setisOverlappedNick(true);
            setCheckedNick(false);
          }
        } else {
          // alert("?????? ????????? ??????????????????.");
          setVisible(true);
          setMessage("?????? ????????? ??????????????????.");
        }
      });
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    let flag = 1;

    if (!CheckedId) {
      setVisible(true);
      setMessage("???????????? ??????????????????.");
      flag = 0;
    }

    if (!CheckedNick) {
      setVisible(true);
      setMessage("???????????? ??????????????????.");
      flag = 0;
    }

    if (Password !== ConfirmPassword) {
      // return alert("??????????????? ????????????.");
      setVisible(true);
      setMessage("??????????????? ????????????.");
      flag = 0;
    }

    // console.log(GitHubAddress.substring(0, 19), GitHubAddress.substring(0, 19) === "https://github.com/");

    if (GitHubAddress.substring(0, 19) !== "https://github.com/") {
      setVisible(true);
      setMessage("????????? ????????? ????????????.");
      flag = 0;
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

    if (GitHubAddress === "https://github.com/") {
      data.githubaddress = "";
    }

    if (
      data.id === "" ||
      data.nickname === "" ||
      data.password === "" ||
      data.position.length === 0 ||
      data.skills.length === 0
    ) {
      // alert("???????????? ?????? ?????? ????????? ????????????.");
      setVisible(true);
      setMessage("???????????? ?????? ?????? ????????? ????????????.");
      flag = 0;
    } else if (data.password.length < 6) {
      setVisible(true);
      setMessage("??????????????? 6?????? ????????????????????????.");
      flag = 0;
    } else if (data.password !== ConfirmPassword) {
      setVisible(true);
      setMessage("??????????????? ???????????? ????????????.");
      flag = 0;
    } else if (isOverlappedId) {
      setVisible(true);
      setMessage("????????? ??????????????????.");
      flag = 0;
    } else if (isOverlappedNick) {
      setVisible(true);
      setMessage("????????? ??????????????????.");
      flag = 0;
    }

    if (flag === 1) {
      dispatch(signupUser(data)).then((response) => {
        if (response.payload.success) {
          props.history.push("/signin"); // withRouter ??????
        } else {
          // alert("????????? ???????????? ??????????????????.");
          setVisible(true);
          setMessage("????????? ???????????? ??????????????????.");
        }
      });
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.formSt} onSubmit={onSubmitHandler}>
        <div className={styles.formContainer}>
          <h2>Sign Up</h2>
        </div>

        <p className={styles.essential}>* ????????????</p>
        <p className={styles.choice}>* ????????????</p>
        
        {/* ????????? */}
        <label className={styles.labelSt}>
          <p className={styles.pst}>*</p> ID
        </label>
        <Input
          type="text"
          value={Id}
          onChange={onIdHandler}
          className={styles.inputSt}
        />

        {/* ????????? ?????? ?????? */}
        <Button onClick={checkOverlapId} className={styles.checkOverlapBtn}>
          ?????? ??????
        </Button>

        {overLapIdModal(Id, isOverlappedId)}

        {/* ????????? */}
        <label className={styles.labelSt}>
          <p className={styles.pst}>*</p> Nickname
        </label>
        <Input
          type="text"
          value={Nickname}
          onChange={onNicknameHandler}
          className={styles.inputSt}
        />

        {/* ????????? ?????? ?????? */}
        <Button
          onClick={checkOverlapNickname}
          className={styles.checkOverlapBtn}
        >
          ?????? ??????
        </Button>

        {overLapNickModal(Nickname, isOverlappedNick)}

        {/* ????????????  */}
        <label className={styles.labelSt}>
          <p className={styles.pst}>*</p> Password {` - (6?????? ??????)`}
        </label>
        <Input.Password
          value={Password}
          onChange={onPasswordHandler}
          className={styles.inputSt}
          placeholder="6?????? ?????? ??????????????????."
        />
        {Password.length === 0 ? null : Password.length < 6 ? (
          <p className={styles.checkPwSt}>
            ??????????????? 6?????? ??????????????? ?????????.
          </p>
        ) : null}

        {/* ???????????? ?????? */}
        <label className={styles.labelSt}>
          <p className={styles.pst}>*</p> Confirm Password
        </label>
        <Input.Password
          value={ConfirmPassword}
          onChange={onConfirmPasswordHandler}
          className={styles.inputSt}
          placeholder="6?????? ?????? ??????????????????."
        />
        {ConfirmPassword.length === 0 ? null : ConfirmPassword !== Password ? (
          <p className={styles.checkPwSt}>??????????????? ???????????? ????????????.</p>
        ) : null}

        {/* ????????? ???????????? */}
        <label className={styles.labelSt}>
          <p className={styles.pst}>*</p> Position
        </label>
        <Checkbox.Group
          options={positionOptions}
          onChange={onPositionHandler}
        />

        {/* ?????? ???????????? */}
        <label className={styles.labelSt}>
          <p className={styles.pst}>*</p> Skills
        </label>
        <Checkbox.Group options={options} onChange={onSkillsHandler} />

        {/* ?????? ????????? */}
        <label className={styles.labelSt}>
          <p className={styles.choicepst}>*</p> Careers
        </label>
        <Select
          onChange={onCareersHandler}
          defaultValue=""
          className={styles.selectSt}
        >
          <Option value="">?????? ??????</Option>
          <Option value="1??? ??????">1??? ??????</Option>
          <Option value="1??? ??????~2??? ??????">1??? ??????~2??? ??????</Option>
          <Option value="2??? ??????~3??? ??????">2??? ??????~3??? ??????</Option>
          <Option value="3??? ??????~4??? ??????">3??? ??????~4??? ??????</Option>
          <Option value="4??? ??????~5??? ??????">4??? ??????~5??? ??????</Option>
          <Option value="5??? ??????">5??? ??????</Option>
        </Select>

        {/* ???????????? */}
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

        {/* ?????? ?????? */}
        <Button className={styles.btn} htmlType="submit">
          Sign Up
        </Button>
      </form>

      {/* ?????? ?????? ?????? */}
      <Alarm message={Message} visible={visible} setVisible={setVisible} />
    </div>
  );
}

export default withRouter(SignUpPage);
