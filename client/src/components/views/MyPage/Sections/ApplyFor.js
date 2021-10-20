import React, { useEffect, useState } from "react";
import { RECRUIT_SERVER } from "../../../../Config";
import ViewProfile from "./ViewProfile";

import { List, Typography, Button } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

function ApplyFor() {
  const [RecruitTitle, setRecruitTitle] = useState("");
  const [RecruitId, setRecruitId] = useState("");
  const [ApplyUsers, setApplyUsers] = useState(undefined);
  const [UserData, setUserData] = useState(undefined);
  const [Member, setMember] = useState(undefined);
  const [Recruit, setRecruit] = useState(undefined);

  const alarmToWriter = () => {
    fetch(`${RECRUIT_SERVER}/applyment`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          console.log("data", data);
          if (data.recruit) {
            setRecruitTitle(data.recruit.title);
            setRecruitId(data.recruit._id);
            setMember([...data.recruit.member]);
            setRecruit(data.recruit);
          }
          setApplyUsers([...data.usersNicknames.reverse()]);
          setUserData([...data.user.reverse()]);
        } else {
          alert("유저 정보를 불러오는데 실패했습니다.");
        }
      });
  };

  const onAcceptHandler = (RecruitId, applyUserId) => {
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
    console.log(RecruitId, applyUserId);
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
    console.log(RecruitId, applyUserId);
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
              <Typography.Text mark style={{ marginRight: "1rem" }}>
                [
                {RecruitTitle.length > 20
                  ? RecruitTitle.slice(0, 20) + "..."
                  : RecruitTitle}
                ]
              </Typography.Text>
              [지원자]
              <p style={{ display: "inline", marginLeft: "1rem" }}>
                {item.length > 20 ? item.slice(0, 20) + "..." : item}
              </p>
              {UserData === undefined ? (
                <LoadingOutlined style={{ fontSize: "3rem" }} />
              ) : (
                <ViewProfile userData={UserData[index]} />
              )}
              {UserData === undefined ? (
                <LoadingOutlined style={{ fontSize: "3rem" }} />
              ) : Member === undefined ? (
                <LoadingOutlined style={{ fontSize: "3rem" }} />
              ) : Member.includes(UserData[index]._id) ? (
                <p style={{ display: "inline", marginLeft: "1rem" }}>
                  수락했습니다.
                </p>
              ) : Recruit === undefined ? (
                <LoadingOutlined style={{ fontSize: "3rem" }} />
              ) : Recruit.applyfor.includes(UserData[index]._id) ? (
                <>
                  <Button
                    onClick={() =>
                      onAcceptHandler(RecruitId, UserData[index]._id)
                    }
                    style={{ marginLeft: "1rem" }}
                  >
                    수락
                  </Button>
                  <Button
                    onClick={() =>
                      onRefuseHandler(RecruitId, UserData[index]._id)
                    }
                    style={{ marginLeft: "1rem" }}
                  >
                    거절
                  </Button>
                </>
              ) : (
                <p style={{ display: "inline", marginLeft: "1rem" }}>
                  거절했습니다.
                </p>
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
        <LoadingOutlined style={{ fontSize: "3rem" }} />
      ) : ApplyUsers.length !== 0 ? (
        renderApplyFor()
      ) : (
        <p>지원자가 없습니다.</p>
      )}
    </div>
  );
}

export default ApplyFor;
