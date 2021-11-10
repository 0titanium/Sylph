import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { USER_SERVER } from "../../../../Config";
import { getCookie } from "../../../../utils/getCookie";
import Alarm from "../../Alarm/Alarm";

import { Descriptions, Button, Modal } from "antd";
import styles from "./MyInfo.module.css";

function MyInfo(props) {
  // const userId = getCookie("user_id", document.cookie);
  const userId = window.localStorage.getItem("user_id");

  const [UserImage, setUserImage] = useState("");
  const [UserId, setUserId] = useState("");
  const [UserNickame, setUserNickame] = useState("");
  const [UserPosition, setUserPosition] = useState("");
  const [UserSkills, setUserSkills] = useState([]);
  const [UserCareers, setUserCareers] = useState("");
  const [UserGitHubAddress, setUserGitHubAddress] = useState("");
  const [alarm, setAlarm] = useState(false);
  const [Message, setMessage] = useState(undefined);

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
          setUserImage(data.userImage);
          setUserId(data.user[0].id);
          setUserNickame(data.user[0].nickname);
          setUserPosition(data.user[0].position);
          setUserSkills(data.user[0].skills);
          setUserCareers(data.user[0].careers);
          setUserGitHubAddress(data.user[0].githubaddress);
        } else {
          // alert("유저 정보를 불러오는데 실패했습니다.");
          setAlarm(true);
          setMessage("유저 정보를 불러오는데 실패했습니다.");
        }
      });
  };

  useEffect(() => {
    fetchUserInfo();
    return () => setConfirmLoading(false);
  }, []);

  // delete request
  const deleteRequest = (user) => {
    fetch(`${USER_SERVER}/withdrawal`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
      credentials: "include",
      body: JSON.stringify({ user }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          props.history.push("/");
        } else {
          // alert("회원 탈퇴에 실패했습니다.");
          setAlarm(true);
          setMessage("회원 탈퇴에 실패했습니다.");
        }
      });
  };

  // modal

  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("탈퇴하시겠습니까?");

  const deleteComponent = () => {
    const showModal = () => {
      setVisible(true);
    };

    const handleCancel = () => {
      setVisible(false);
    };

    const handleOk = () => {
      let user = { userId: userId };

      setModalText("탈퇴하시겠습니까?");
      setConfirmLoading(true);
      deleteRequest(user);
      setTimeout(() => {
        setVisible(false);
        setConfirmLoading(false);
      }, 2000);
    };
    return (
      <React.Fragment>
        <Button onClick={showModal} className={styles.btn}>
          Withdrawal
        </Button>
        <Modal
          title="Withdrawal"
          visible={visible}
          onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
        >
          <p>{modalText}</p>
        </Modal>
      </React.Fragment>
    );
  };

  return (
    <div className={styles.container}>
      <Descriptions
        bordered
        title="User Info"
        size="default"
        column={1}
        extra={
          <Button type="primary">
            <a href="/mypage/update">Edit</a>
          </Button>
        }
      >
        <Descriptions.Item label="image" labelStyle={{ width: "100px" }}>
          {UserImage}
        </Descriptions.Item>
        <Descriptions.Item label="id">{UserId}</Descriptions.Item>
        <Descriptions.Item label="nickname">{UserNickame}</Descriptions.Item>
        <Descriptions.Item label="position">{UserPosition}</Descriptions.Item>
        <Descriptions.Item label="skills">
          {UserSkills.map((skill, index) => skill + " ")}
        </Descriptions.Item>
        <Descriptions.Item label="careers">{UserCareers}</Descriptions.Item>
        <Descriptions.Item label="GitHub Address">
          {UserGitHubAddress}
        </Descriptions.Item>
        <Descriptions.Item label="Withdrawal" style={{ color: "red" }}>
          {deleteComponent()}
        </Descriptions.Item>
      </Descriptions>
      <Alarm message={Message} visible={alarm} setVisible={setAlarm} />
    </div>
  );
}

export default withRouter(MyInfo);
