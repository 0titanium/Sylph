import React, { useEffect, useState } from "react";
import { RECRUIT_SERVER } from "../../../../Config";

function ApplyFor() {
  const [RecruitTitle, setRecruitTitle] = useState("");
  const [ApplyUsers, setApplyUsers] = useState([]);

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
          console.log("data", data.recruit);
          setRecruitTitle(data.recruit.title);
          let nicknames = data.arrayApplyUsers.map((user) => user.nickname);
          setApplyUsers((prevState) => [...prevState, nicknames]);
        } else {
          alert("유저 정보를 불러오는데 실패했습니다.");
        }
      });
  };

  const renderApplyFor = ApplyUsers.reverse().map((apply, index) => {
    return (
      <div
        style={{
          border: "1px solid black",
          width: "50%",
        }}
        key={index}
      >
        <p style={{ marginLeft: "1rem" }}>Recruit Title: {RecruitTitle}</p>
        <p style={{ marginLeft: "1rem" }}>nickname: {apply}</p>
      </div>
    );
  });

  useEffect(() => {
    alarmToWriter();
  }, []);

  return (
    <div>
      <p style={{ marginBottom: "2rem" }}>Apply for</p>

      {ApplyUsers.length !== 0 && renderApplyFor}
    </div>
  );
}

export default ApplyFor;
