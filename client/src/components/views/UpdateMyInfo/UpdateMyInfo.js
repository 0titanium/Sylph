import React, { useState, useEffect } from "react";
import { USER_SERVER } from "../../../Config";
import Alarm from "../Alarm/Alarm";

import { Input, Button, Checkbox, Select } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import styles from "./UpdateMyInfo.module.css";

function UpdateMyInfo(props) {
  const { Option } = Select;

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

  const [UserObjId, setUserObjId] = useState("");
  const [UserId, setUserId] = useState("");
  const [UserNickame, setUserNickame] = useState("");
  const [UserPosition, setUserPosition] = useState(undefined);
  const [UserSkills, setUserSkills] = useState(undefined);
  const [UserCareers, setUserCareers] = useState(undefined);
  const [UserGitHubAddress, setUserGitHubAddress] = useState(undefined);
  const [visible, setVisible] = useState(false);
  const [Message, setMessage] = useState(undefined);
  const userId = window.localStorage.getItem("user_id");

  const onPositionHandler = (event) => {
    setUserPosition(event);
  };

  const onSkillsHandler = (event) => {
    setUserSkills(event);
  };

  const onCareersHandler = (value) => {
    setUserCareers(value);
  };

  const onGitHubAddressHandler = (event) => {
    setUserGitHubAddress(event.currentTarget.value);
  };

  const fetchUserInfo = () => {
    fetch(`${USER_SERVER}/userInfo/${userId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // setUserImage(data.userImage);
          console.log(data.user[0]);
          setUserObjId(data.user[0]._id);
          setUserId(data.user[0].id);
          setUserNickame(data.user[0].nickname);
          setUserPosition([...data.user[0].position]);
          setUserSkills([...data.user[0].skills]);
          setUserCareers(data.user[0].careers);
          if (data.user[0].githubaddress === "") {
            setUserGitHubAddress("https://github.com/");
          } else {
            setUserGitHubAddress(data.user[0].githubaddress);
          }
        } else {
          // alert("?????? ????????? ??????????????? ??????????????????.");
          setVisible(true);
          setMessage("?????? ????????? ??????????????? ??????????????????.");
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
          // alert("?????? ????????? ??????????????????.");
          setVisible(true);
          setMessage("?????? ????????? ??????????????????.");
        }
      });
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    let flag = 1;

    let data = {
      objId: UserObjId,
      position: UserPosition,
      skills: UserSkills,
      careers: UserCareers,
      githubaddress: UserGitHubAddress,
    };

    if (UserGitHubAddress === "https://github.com/") {
      data.githubaddress = "";
    }

    if (UserGitHubAddress.substring(0, 19) !== "https://github.com/") {
      setVisible(true);
      setMessage("????????? ????????? ????????????.");
      flag = 0;
    }

    if (data.position.length === 0 || data.skills.length === 0) {
      // alert("???????????? ?????? ?????? ????????? ????????????.");
      setVisible(true);
      setMessage("???????????? ?????? ?????? ????????? ????????????.");
      flag = 0;
    }
    if (flag === 1) {
      UpdateUserInfo(data);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.formSt} onSubmit={onSubmitHandler}>
        <div className={styles.formDiv}>
          <h2>Update Info</h2>
        </div>

        <p className={styles.essential}>* ????????????</p>
        <p className={styles.choice}>* ????????????</p>

        {/* ????????? ???????????? */}
        <label className={styles.labelId}>
          <p className={styles.pst}>*</p> ID
        </label>
        <Input
          type="text"
          value={UserId}
          disabled={true}
          className={styles.inputSt}
        />

        {/* ????????? ???????????? */}
        <label className={styles.labelSt}>
          <p className={styles.pst}>*</p> Nickname
        </label>
        <Input
          type="text"
          value={UserNickame}
          disabled={true}
          className={styles.inputSt}
        />

        {/* ???????????? ???????????? */}
        <label className={styles.labelSt}>
          <p className={styles.pst}>*</p> Password
        </label>
        <Input.Password disabled={true} className={styles.inputSt} />

        {/* ???????????? ?????? ???????????? */}
        <label className={styles.labelSt}>
          <p className={styles.pst}>*</p> Confirm Password
        </label>
        <Input.Password disabled={true} className={styles.inpuSt} />

        {/* ????????? */}
        <label className={styles.labelSt}>
          <p className={styles.pst}>*</p> Position
        </label>
        {UserPosition === undefined ? (
          <LoadingOutlined className={styles.loading} />
        ) : (
          <Checkbox.Group
            defaultValue={UserPosition}
            options={positionOptions}
            onChange={onPositionHandler}
          />
        )}

        <label className={styles.labelSt}>
          <p className={styles.pst}>*</p> Skills
        </label>
        {UserSkills === undefined ? (
          <LoadingOutlined className={styles.loading} />
        ) : (
          <Checkbox.Group
            defaultValue={UserSkills}
            options={options}
            onChange={onSkillsHandler}
          />
        )}

        <label className={styles.labelSt}>
          <p className={styles.choicepst}>*</p> Careers
        </label>
        {UserCareers === undefined ? (
          <LoadingOutlined className={styles.loading} />
        ) : (
          <Select
            onChange={onCareersHandler}
            defaultValue={UserCareers}
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
        )}

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
