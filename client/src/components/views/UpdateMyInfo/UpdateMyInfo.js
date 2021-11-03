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
          setUserPosition([...data.user[0].position]);
          setUserSkills([...data.user[0].skills]);
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

        {/* 아이디 변경불가 */}
        <label className={styles.labelId}>
          <p className={styles.pst}>*</p> ID
        </label>
        <Input
          type="text"
          value={UserId}
          disabled={true}
          className={styles.inputSt}
        />

        {/* 닉네임 변경불가 */}
        <label className={styles.labelSt}>
          <p className={styles.pst}>*</p> Nickname
        </label>
        <Input
          type="text"
          value={UserNickame}
          disabled={true}
          className={styles.inputSt}
        />

        {/* 비밀번호 변경불가 */}
        <label className={styles.labelSt}>
          <p className={styles.pst}>*</p> Password
        </label>
        <Input.Password disabled={true} className={styles.inputSt} />

        {/* 비밀번호 확인 변경불가 */}
        <label className={styles.labelSt}>
          <p className={styles.pst}>*</p> Confirm Password
        </label>
        <Input.Password disabled={true} className={styles.inpuSt} />

        {/* 포지션 */}
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
