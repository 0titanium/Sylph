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
          // alert("확인 작업에 실패했습니다.");
          setVisible(true);
          setMessage("확인 작업에 실패했습니다.");
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
            // alert("사용 가능한 닉네임입니다.");
            setNickVisible(true);
            setisOverlappedNick(false);
            setCheckedNick(true);
          } else {
            // alert("중복된 닉네임입니다.");
            setNickVisible(true);
            setisOverlappedNick(true);
            setCheckedNick(false);
          }
        } else {
          // alert("확인 작업에 실패했습니다.");
          setVisible(true);
          setMessage("확인 작업에 실패했습니다.");
        }
      });
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    let flag = 1;

    if (!CheckedId) {
      setVisible(true);
      setMessage("아이디를 확인하십시오.");
      flag = 0;
    }

    if (!CheckedNick) {
      setVisible(true);
      setMessage("닉네임을 확인하십시오.");
      flag = 0;
    }

    if (Password !== ConfirmPassword) {
      // return alert("비밀번호가 다릅니다.");
      setVisible(true);
      setMessage("비밀번호가 다릅니다.");
      flag = 0;
    }

    // console.log(GitHubAddress.substring(0, 19), GitHubAddress.substring(0, 19) === "https://github.com/");

    if (GitHubAddress.substring(0, 19) !== "https://github.com/") {
      setVisible(true);
      setMessage("올바른 주소가 아닙니다.");
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
      // alert("입력하지 않은 필수 내용이 있습니다.");
      setVisible(true);
      setMessage("입력하지 않은 필수 내용이 있습니다.");
      flag = 0;
    } else if (data.password.length < 6) {
      setVisible(true);
      setMessage("비밀번호는 6자리 이상이어야합니다.");
      flag = 0;
    } else if (data.password !== ConfirmPassword) {
      setVisible(true);
      setMessage("비밀번호가 일치하지 않습니다.");
      flag = 0;
    } else if (isOverlappedId) {
      setVisible(true);
      setMessage("중복된 아이디입니다.");
      flag = 0;
    } else if (isOverlappedNick) {
      setVisible(true);
      setMessage("중복된 닉네임입니다.");
      flag = 0;
    }

    if (flag === 1) {
      dispatch(signupUser(data)).then((response) => {
        if (response.payload.success) {
          props.history.push("/signin"); // withRouter 필요
        } else {
          // alert("계정을 만드는데 실패했습니다.");
          setVisible(true);
          setMessage("계정을 만드는데 실패했습니다.");
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

        <p className={styles.essential}>* 필수입력</p>
        <p className={styles.choice}>* 선택입력</p>
        
        {/* 아이디 */}
        <label className={styles.labelSt}>
          <p className={styles.pst}>*</p> ID
        </label>
        <Input
          type="text"
          value={Id}
          onChange={onIdHandler}
          className={styles.inputSt}
        />

        {/* 아이디 확인 버튼 */}
        <Button onClick={checkOverlapId} className={styles.checkOverlapBtn}>
          중복 확인
        </Button>

        {overLapIdModal(Id, isOverlappedId)}

        {/* 닉네임 */}
        <label className={styles.labelSt}>
          <p className={styles.pst}>*</p> Nickname
        </label>
        <Input
          type="text"
          value={Nickname}
          onChange={onNicknameHandler}
          className={styles.inputSt}
        />

        {/* 닉네임 확인 버튼 */}
        <Button
          onClick={checkOverlapNickname}
          className={styles.checkOverlapBtn}
        >
          중복 확인
        </Button>

        {overLapNickModal(Nickname, isOverlappedNick)}

        {/* 비밀번호  */}
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

        {/* 비밀번호 확인 */}
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

        {/* 포지션 체크박스 */}
        <label className={styles.labelSt}>
          <p className={styles.pst}>*</p> Position
        </label>
        <Checkbox.Group
          options={positionOptions}
          onChange={onPositionHandler}
        />

        {/* 언어 체크박스 */}
        <label className={styles.labelSt}>
          <p className={styles.pst}>*</p> Skills
        </label>
        <Checkbox.Group options={options} onChange={onSkillsHandler} />

        {/* 경력 셀렉트 */}
        <label className={styles.labelSt}>
          <p className={styles.choicepst}>*</p> Careers
        </label>
        <Select
          onChange={onCareersHandler}
          defaultValue=""
          className={styles.selectSt}
        >
          <Option value="">선택 안함</Option>
          <Option value="1년 미만">1년 미만</Option>
          <Option value="1년 이상~2년 미만">1년 이상~2년 미만</Option>
          <Option value="2년 이상~3년 미만">2년 이상~3년 미만</Option>
          <Option value="3년 이상~4년 미만">3년 이상~4년 미만</Option>
          <Option value="4년 이상~5년 미만">4년 이상~5년 미만</Option>
          <Option value="5년 이상">5년 이상</Option>
        </Select>

        {/* 깃헙주소 */}
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

        {/* 등록 버튼 */}
        <Button className={styles.btn} htmlType="submit">
          Sign Up
        </Button>
      </form>

      {/* 이상 알람 모달 */}
      <Alarm message={Message} visible={visible} setVisible={setVisible} />
    </div>
  );
}

export default withRouter(SignUpPage);
