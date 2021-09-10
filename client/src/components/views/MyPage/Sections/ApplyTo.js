import React, { useEffect, useState } from "react";
import { RECRUIT_SERVER } from "../../../../Config";

function ApplyTo() {
  const [UserApplyTo, setUserApplyTo] = useState([]);
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
          setUserApplyTo((prevState) => [...prevState, ...data.recruitTitle]);
          setRecruitId((prevState) => [...prevState, ...data.recruitId]);
        } else {
          alert("유저 정보를 불러오는데 실패했습니다.");
        }
      });
  };

  const renderApplyTo = UserApplyTo.reverse().map((apply, index) => {
    return (
      <div
        style={{
          border: "1px solid black",
          width: "50%",
          height: "3rem",
          
        }}
        key={index}
      >
        <div style={{ marginLeft: "1rem" }}>
          Recruit Title: {apply}
          <button style={{ display: "inline-block", float: "right", marginRight: "1rem" }}>
            <a href={`/recruit/${RecruitId[index]}`}>확인</a>
          </button>
        </div>
      </div>
    );
  });

  useEffect(() => {
    // fetchUserInfo();
    fetchApplyTo();
  }, []);

  return (
    <div>
      <p style={{ marginBottom: "2rem" }}>Apply to</p>

      {UserApplyTo.length !== 0 && renderApplyTo}
    </div>
  );
}

export default ApplyTo;
