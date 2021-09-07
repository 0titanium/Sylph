import React, { useEffect, useState } from "react";
import { USER_SERVER, RECRUIT_SERVER } from "../../../../Config";
import { getCookie } from "../../../../utils/getCookie";

function ApplyFor() {
  const userId = getCookie("user_id", document.cookie);

  const [UserRecruit, setUserRecruit] = useState("");
  const [ApplyUsers, setApplyUsers] = useState([]);

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
          setUserRecruit(data.user[0].recruitWriting);
        } else {
          alert("유저 정보를 불러오는데 실패했습니다.");
        }
      });
  };

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
          setApplyUsers(data.recruit.applyfor);
        } else {
          alert("유저 정보를 불러오는데 실패했습니다.");
        }
      });
  };

  useEffect(() => {
    fetchUserInfo();
    alarmToWriter();
  }, []);

  return (
    <div>
      <p>Apply for me</p>

      {ApplyUsers.length !== 0 && ApplyUsers.map((user, index) => {
        return (<p key={index}>id: {user}</p>);
      })}
    </div>
  );
}

export default ApplyFor;
