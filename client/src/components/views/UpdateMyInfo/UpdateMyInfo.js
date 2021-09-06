import React, { useState, useEffect } from "react";
import { USER_SERVER } from "../../../Config";

import { Input, Button } from "antd";

function UpdateMyInfo(props) {
  // const [Password, setPassword] = useState("");
  // const [ConfirmPassword, setConfirmPassword] = useState("");
  const [UserObjId, setUserObjId] = useState("");
  const [UserId, setUserId] = useState("");
  const [UserNickame, setUserNickame] = useState("");
  const [UserPosition, setUserPosition] = useState("");
  const [UserSkills, setUserSkills] = useState("");
  const [UserCareers, setUserCareers] = useState("");
  const [UserGitHubAddress, setUserGitHubAddress] = useState("");

  // const onPasswordHandler = (event) => {
  //   setPassword(event.currentTarget.value);
  // };

  // const onConfirmPasswordHandler = (event) => {
  //   setConfirmPassword(event.currentTarget.value);
  // };

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
          console.log(data.user);
          // setUserImage(data.userImage);
          setUserObjId(data.user[0]._id);
          setUserId(data.user[0].id);
          setUserNickame(data.user[0].nickname);
          setUserPosition(data.user[0].position);
          setUserSkills(data.user[0].skills);
          setUserCareers(data.user[0].careers);
          setUserGitHubAddress(data.user[0].githubaddress);
        } else {
          alert("유저 정보를 불러오는데 실패했습니다.");
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
          alert("정보 수정에 실패했습니다.");
        }
      });
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    // if (Password !== ConfirmPassword) {
    //   return alert("비밀번호가 다릅니다.");
    // }

    let data = {
      // password: Password,
      objId: UserObjId,
      position: UserPosition,
      skills: UserSkills,
      careers: UserCareers,
      githubaddress: UserGitHubAddress,
    };

    if (data.position === "" || data.skills === "") {
      alert("입력하지 않은 필수 내용이 있습니다.");
    } else {
      UpdateUserInfo(data);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "135vh",
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
          value={UserId}
          disabled={true}
          style={{ height: "2.5rem" }}
        />

        <label style={{ marginBottom: "5px", marginTop: "2rem" }}>
          <p style={{ color: "red", display: "inline" }}>*</p> Nickname
        </label>
        <Input
          type="text"
          value={UserNickame}
          disabled={true}
          style={{ height: "2.5rem" }}
        />

        <label style={{ marginBottom: "5px", marginTop: "2rem" }}>
          <p style={{ color: "red", display: "inline" }}>*</p> Password
        </label>
        <Input.Password
          // value={Password}
          // onChange={onPasswordHandler}
          disabled={true}
          style={{ height: "2.5rem" }}
        />

        <label style={{ marginBottom: "5px", marginTop: "2rem" }}>
          <p style={{ color: "red", display: "inline" }}>*</p> Confirm Password
        </label>
        <Input.Password
          // value={ConfirmPassword}
          // onChange={onConfirmPasswordHandler}
          disabled={true}
          style={{ height: "2.5rem" }}
        />

        <label style={{ marginBottom: "5px", marginTop: "2rem" }}>
          <p style={{ color: "red", display: "inline" }}>*</p> Position
        </label>
        <Input
          type="text"
          value={UserPosition}
          onChange={onPositionHandler}
          style={{ height: "2.5rem" }}
          placeholder="ex) Frontend, Backend, Full Stack, ...etc"
        />

        <label style={{ marginBottom: "5px", marginTop: "2rem" }}>
          <p style={{ color: "red", display: "inline" }}>*</p> Skills
        </label>
        <Input
          type="text"
          value={UserSkills}
          onChange={onSkillsHandler}
          style={{ height: "2.5rem" }}
          placeholder="ex) Java, Javascript, Kotlin, ...etc"
        />

        <label style={{ marginBottom: "5px", marginTop: "2rem" }}>
          <p style={{ display: "inline" }}>*</p> Careers
        </label>
        <Input
          type="text"
          value={UserCareers}
          onChange={onCareersHandler}
          style={{ height: "2.5rem" }}
          placeholder="ex) 1 year, ...etc"
        />

        <label style={{ marginBottom: "5px", marginTop: "2rem" }}>
          <p style={{ display: "inline" }}>*</p> GitHub Address
        </label>
        <Input
          type="text"
          value={UserGitHubAddress}
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
          Edit
        </Button>
      </form>
    </div>
  );
}

export default UpdateMyInfo;
