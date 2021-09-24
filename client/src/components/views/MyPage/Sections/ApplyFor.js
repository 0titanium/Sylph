import React, { useEffect, useState } from "react";
import { RECRUIT_SERVER } from "../../../../Config";
import ViewProfile from "./ViewProfile";

import { List, Typography } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

function ApplyFor() {
  const [RecruitTitle, setRecruitTitle] = useState("");
  const [ApplyUsers, setApplyUsers] = useState(undefined);
  const [UserData, setUserData] = useState([]);

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
          setRecruitTitle(data.title);
          setApplyUsers([...data.usersNicknames.reverse()]);
          setUserData([...data.user.reverse()]);
        } else {
          alert("유저 정보를 불러오는데 실패했습니다.");
        }
      });
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
              <ViewProfile userData={UserData[index]} />
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
