import React, { useEffect, useState } from "react";
import { RECRUIT_SERVER } from "../../../../Config";

import { List, Typography } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

function ApplyTo() {
  const [UserApplyTo, setUserApplyTo] = useState(undefined);
  const [RecruitId, setRecruitId] = useState([]);

  const fetchApplyTo = () => {
    fetch(`${RECRUIT_SERVER}/myApply`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          console.log("data", data);
          setUserApplyTo([...data.recruitTitle]);
          setRecruitId((prevState) => [...prevState, ...data.recruitId]);
        } else {
          alert("유저 정보를 불러오는데 실패했습니다.");
        }
      });
  };

  const renderApplyTo = () => {
    return (
      <>
        <List
          header={<div>Apply To</div>}
          bordered
          dataSource={UserApplyTo}
          renderItem={(item) => (
            <List.Item>
              <Typography.Text mark>[지원중]</Typography.Text> {item}
            </List.Item>
          )}
        />
      </>
    );
  };

  useEffect(() => {
    fetchApplyTo();
  }, []);

  return (
    <div>
      {UserApplyTo === undefined ? (
        <LoadingOutlined style={{ fontSize: "3rem" }} />
      ) : UserApplyTo.length !== 0 ? (
        renderApplyTo()
      ) : (
        <p>지원한 프로젝트가 없습니다.</p>
      )}
    </div>
  );
}

export default ApplyTo;
