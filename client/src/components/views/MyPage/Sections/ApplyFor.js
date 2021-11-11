import React, { useEffect, useState } from "react";
import { RECRUIT_SERVER } from "../../../../Config";
import ViewProfile from "./ViewProfile";
import Alarm from "../../Alarm/Alarm";

import { List, Typography, Button } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import styles from "./ApplyFor.module.css";

function ApplyFor() {
  const [RecruitTitle, setRecruitTitle] = useState("");
  const [RecruitId, setRecruitId] = useState("");
  const [ApplyUsers, setApplyUsers] = useState(undefined);
  const [UserData, setUserData] = useState(undefined);
  const [Member, setMember] = useState(undefined);
  const [Recruit, setRecruit] = useState(undefined);
  const [visible, setVisible] = useState(false);
  const [Message, setMessage] = useState(undefined);
  const userId = window.localStorage.getItem("user_id");

  const alarmToWriter = () => {
    fetch(`${RECRUIT_SERVER}/applyment/${userId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          if (data.recruit) {
            setRecruitTitle(data.recruit.title);
            setRecruitId(data.recruit._id);
            setMember([...data.recruit.member]);
            setRecruit(data.recruit);
          }
          setApplyUsers([...data.usersNicknames.reverse()]);
          setUserData([...data.user.reverse()]);
        } else {
          // alert("유저 정보를 불러오는데 실패했습니다.");
          setVisible(true);
          setMessage("지원자 정보를 불러오는 것에 실패했습니다.");
        }
      });
  };

  const onAcceptHandler = (RecruitId, applyUser) => {
    let applyUserId = applyUser._id;

    if (
      applyUser.projectInProgress &&
      applyUser.projectInProgress !== RecruitId
    ) {
      // alert("다른 프로젝트를 진행중인 유저입니다.");
      setVisible(true);
      setMessage("다른 프로젝트를 진행중인 유저입니다.");
    } else {
      fetch(`${RECRUIT_SERVER}/acceptance`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        mode: "cors",
        credentials: "include",
        body: JSON.stringify({
          recruitId: RecruitId.toString(),
          addUserId: applyUserId,
        }),
      }).then((response) => response.json());
    }
  };

  const onRefuseHandler = (RecruitId, applyUserId) => {
    fetch(`${RECRUIT_SERVER}/refusal`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
      credentials: "include",
      body: JSON.stringify({
        recruitId: RecruitId.toString(),
        removeUserId: applyUserId,
      }),
    }).then((response) => response.json());
  };

  const renderApplyFor = () => {
    return (
      <>
        <List
          header={<div>Apply For</div>}
          bordered
          dataSource={ApplyUsers}
          renderItem={(item, index) => (
            <List.Item>
              <Typography.Text mark className={styles.typoText}>
                [
                {RecruitTitle.length > 20
                  ? RecruitTitle.slice(0, 20) + "..."
                  : RecruitTitle}
                ]
              </Typography.Text>
              [지원자]
              <p className={styles.pst}>
                {item.length > 20 ? item.slice(0, 20) + "..." : item}
              </p>
              {UserData === undefined ? (
                <LoadingOutlined className={styles.loading} />
              ) : (
                <ViewProfile userData={UserData[index]} />
              )}
              {UserData === undefined ? (
                <LoadingOutlined className={styles.loading} />
              ) : Member === undefined ? (
                <LoadingOutlined className={styles.loading} />
              ) : Member.includes(UserData[index]._id) ? (
                <p className={styles.pst}>수락했습니다.</p>
              ) : Recruit === undefined ? (
                <LoadingOutlined className={styles.loading} />
              ) : Recruit.applyfor.includes(UserData[index]._id) ? (
                <>
                  <Button
                    onClick={() => onAcceptHandler(RecruitId, UserData[index])}
                    className={styles.btn}
                  >
                    수락
                  </Button>
                  <Button
                    onClick={() =>
                      onRefuseHandler(RecruitId, UserData[index]._id)
                    }
                    className={styles.btn}
                  >
                    거절
                  </Button>
                </>
              ) : (
                <p className={styles.pst}>거절했습니다.</p>
              )}
            </List.Item>
          )}
        />
      </>
    );
  };

  useEffect(() => {
    alarmToWriter();
  }, []);

  return (
    <div>
      {ApplyUsers === undefined ? (
        <LoadingOutlined className={styles.loading} />
      ) : ApplyUsers.length !== 0 ? (
        renderApplyFor()
      ) : (
        <p>지원자가 없습니다.</p>
      )}
      <Alarm message={Message} visible={visible} setVisible={setVisible} />
    </div>
  );
}

export default ApplyFor;
