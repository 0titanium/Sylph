import React, { useState, useEffect } from "react";
import { USER_SERVER } from "../../../Config";
import Alarm from "../Alarm/Alarm";

import { Input, Button } from "antd";
import styles from "./UpdateMyInfo.module.css";

function UpdateMyInfo(props) {
  const [UserObjId, setUserObjId] = useState("");
  const [UserId, setUserId] = useState("");
  const [UserNickame, setUserNickame] = useState("");
  const [UserPosition, setUserPosition] = useState("");
  const [UserSkills, setUserSkills] = useState("");
  const [UserCareers, setUserCareers] = useState("");
  const [UserGitHubAddress, setUserGitHubAddress] = useState("");
  const [visible, setVisible] = useState(false);
  const [Message, setMessage] = useState(undefined);

  const onPositionHandler = (event) => {
    setUserPosition(event.currentTarget.value);
  };

  const onSkillsHandler = (event) => {
    setUserSkills(event.currentTarget.value);
  };

  const onCareersHandler = (event) => {
    setUserCareers(event.currentTarget.value);
  };

  const onGitHubAddressHandler = (event) => {
    setUserGitHubAddress(event.currentTarget.value);
  };

  const fetchUserInfo = () => {
    fetch(`${USER_SERVER}/userInfo`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // setUserImage(data.userImage);
          setUserObjId(data.user[0]._id);
          setUserId(data.user[0].id);
          setUserNickame(data.user[0].nickname);
          setUserPosition(data.user[0].position);
          setUserSkills(data.user[0].skills);
          setUserCareers(data.user[0].careers);
          setUserGitHubAddress(data.user[0].githubaddress);
        } else {
          // alert("유저 정보를 불러오는데 실패했습니다.");
          setVisible(true);
          setMessage("유저 정보를 불러오는데 실패했습니다.");
        }
      });
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  // update request
  const UpdateUserInfo = (data) => {
    fetch(`${USER_SERVER}/userInfo`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
      credentials: "include",
      body: JSON.stringify({ data }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          props.history.push("/mypage");
        } else {
          // alert("정보 수정에 실패했습니다.");
          setVisible(true);
          setMessage("정보 수정에 실패했습니다.");
        }
      });
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    let data = {
      objId: UserObjId,
      position: UserPosition,
      skills: UserSkills,
      careers: UserCareers,
      githubaddress: UserGitHubAddress,
    };

    if (data.position === "" || data.skills === "") {
      // alert("입력하지 않은 필수 내용이 있습니다.");
      setVisible(true);
      setMessage("입력하지 않은 필수 내용이 있습니다.");
    } else {
      UpdateUserInfo(data);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.formSt} onSubmit={onSubmitHandler}>
        <div className={styles.formDiv}>
          <h2>Update Info</h2>
        </div>

        <p className={styles.essential}>* 필수입력</p>
        <p className={styles.choice}>* 선택입력</p>

        <label className={styles.labelId}>
          <p className={styles.pst}>*</p> ID
        </label>
        <Input
          type="text"
          value={UserId}
          disabled={true}
          className={styles.inputSt}
        />

        <label className={styles.labelSt}>
          <p className={styles.pst}>*</p> Nickname
        </label>
        <Input
          type="text"
          value={UserNickame}
          disabled={true}
          className={styles.inputSt}
        />

        <label className={styles.labelSt}>
          <p className={styles.pst}>*</p> Password
        </label>
        <Input.Password
          // value={Password}
          // onChange={onPasswordHandler}
          disabled={true}
          className={styles.inputSt}
        />

        <label className={styles.labelSt}>
          <p className={styles.pst}>*</p> Confirm Password
        </label>
        <Input.Password
          // value={ConfirmPassword}
          // onChange={onConfirmPasswordHandler}
          disabled={true}
          className={styles.inpuSt}
        />

        <label className={styles.labelSt}>
          <p className={styles.pst}>*</p> Position
        </label>
        <Input
          type="text"
          value={UserPosition}
          onChange={onPositionHandler}
          className={styles.inpuSt}
          placeholder="ex) Frontend, Backend, Full Stack, ...etc"
        />

        <label className={styles.labelSt}>
          <p className={styles.pst}>*</p> Skills
        </label>
        <Input
          type="text"
          value={UserSkills}
          onChange={onSkillsHandler}
          className={styles.inputSt}
          placeholder="ex) Java, Javascript, Kotlin, ...etc"
        />

        <label className={styles.labelSt}>
          <p className={styles.choicepst}>*</p> Careers
        </label>
        <Input
          type="text"
          value={UserCareers}
          onChange={onCareersHandler}
          className={styles.inputSt}
          placeholder="ex) 1 year, ...etc"
        />

        <label className={styles.labelSt}>
          <p className={styles.choicepst}>*</p> GitHub Address
        </label>
        <Input
          type="text"
          value={UserGitHubAddress}
          onChange={onGitHubAddressHandler}
          className={styles.inputSt}
          placeholder="https://github.com/"
        />

        <Button className={styles.btn} htmlType="submit">
          Edit
        </Button>
      </form>
      <Alarm message={Message} visible={visible} setVisible={setVisible} />
    </div>
  );
}

export default UpdateMyInfo;
