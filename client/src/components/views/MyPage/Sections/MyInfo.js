import React, { useEffect, useState } from "react";
import { USER_SERVER } from "../../../../Config";
import { Descriptions, Button } from "antd";

function MyInfo() {
  const [UserImage, setUserImage] = useState("");
  const [UserId, setUserId] = useState("");
  const [UserNickame, setUserNickame] = useState("");
  const [UserPosition, setUserPosition] = useState("");
  const [UserSkills, setUserSkills] = useState("");
  const [UserCareers, setUserCareers] = useState("");
  const [UserGitHubAddress, setUserGitHubAddress] = useState("");

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
          setUserImage(data.userImage);
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

  return (
    <div style={{ height: "100%" }}>
      <Descriptions
        bordered
        title="User Info"
        size="default"
        column={1}
        extra={<Button type="primary">Edit</Button>}
      >
        <Descriptions.Item label="image" labelStyle={{ width: "100px" }}>
          {UserImage}
        </Descriptions.Item>
        <Descriptions.Item label="id">{UserId}</Descriptions.Item>
        <Descriptions.Item label="nickname">{UserNickame}</Descriptions.Item>
        <Descriptions.Item label="position">{UserPosition}</Descriptions.Item>
        <Descriptions.Item label="skills">{UserSkills}</Descriptions.Item>
        <Descriptions.Item label="careers">{UserCareers}</Descriptions.Item>
        <Descriptions.Item label="GitHub Address">
          {UserGitHubAddress}
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
}

export default MyInfo;
