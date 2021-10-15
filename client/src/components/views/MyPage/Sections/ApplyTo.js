import React, { useEffect, useState } from "react";
import { RECRUIT_SERVER } from "../../../../Config";

import { List, Typography } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

function ApplyTo() {
  const [UserApplyTo, setUserApplyTo] = useState(undefined);
  const [RecruitId, setRecruitId] = useState([]);
  const [isRefused, setisRefused] = useState(undefined);

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
          setUserApplyTo([...data.recruitTitle.reverse()]);
          setRecruitId([...data.recruitId.reverse()]);
        } else {
          alert("유저 정보를 불러오는데 실패했습니다.");
        }
      });
  };

  const checkApplyFor = () => {
    fetch(`${RECRUIT_SERVER}/applicationInfo`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          console.log("data1", data);
          setisRefused([...data.check]);
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
          renderItem={(item, index) => (
            <List.Item>
              <Typography.Text mark style={{ marginRight: "1rem" }}>
                [지원중]
              </Typography.Text>
              {item.length > 20 ? item.slice(0, 20) + "..." : item}
              {isRefused === undefined ? (
                <LoadingOutlined style={{ fontSize: "3rem" }} />
              ) : isRefused[index] === 1 ? (
                <p style={{ display: "inline", marginLeft: "1rem" }}>
                  수락되었습니다.
                </p>
              ) : isRefused[index] === 2 ? (
                <p style={{ display: "inline", marginLeft: "1rem" }}>
                  대기중입니다.
                </p>
              ) : (
                <p style={{ display: "inline", marginLeft: "1rem" }}>
                  거절되었습니다.
                </p>
              )}
              <a
                href={`/recruit/${RecruitId[index]}`}
                style={{ marginLeft: "1rem" }}
              >
                바로가기
              </a>
            </List.Item>
          )}
        />
      </>
    );
  };

  useEffect(() => {
    fetchApplyTo();
    checkApplyFor();
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
