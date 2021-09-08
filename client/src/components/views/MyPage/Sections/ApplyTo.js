import React, { useEffect, useState } from "react";
import { USER_SERVER } from "../../../../Config";

function ApplyTo() {
  const [UserApplyTo, setUserApplyTo] = useState([]);

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
          console.log("user", data.user);
          setUserApplyTo((prevState) => [
            ...prevState,
            ...data.user[0].applyto,
          ]);
        } else {
          alert("유저 정보를 불러오는데 실패했습니다.");
        }
      });
  };
  console.log("uat", UserApplyTo);
  useEffect(() => {
    fetchUserInfo();
  }, []);

  return (
    <div>
      <p style={{ marginBottom: "2rem" }}>Apply for</p>

      {UserApplyTo.length !== 0 &&
        UserApplyTo.map((user, index) => {
          return (
            <>
              <div
                style={{
                  border: "1px solid black",
                  width: "50%",
                }}
                
              >
                <p style={{ marginLeft: "1rem" }}>
                  {/* Recruit Title: {RecruitTitle} */}
                </p>
                <p style={{ marginLeft: "1rem" }} key={index}>
                  nickname: {user}
                </p>
              </div>
            </>
          );
        })}
    </div>
  );
}

export default ApplyTo;
