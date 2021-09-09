import React, { useEffect, useState } from "react";
import { RECRUIT_SERVER } from "../../../../Config";

function ApplyTo() {
  const [UserApplyTo, setUserApplyTo] = useState([]);

  // const fetchUserInfo = () => {
  //   fetch(`${USER_SERVER}/userInfo`, {
  //     method: "GET",
  //     headers: { "Content-Type": "application/json" },
  //     mode: "cors",
  //     credentials: "include",
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       if (data.success) {
  //         console.log("user", data.user);
  //         setUserApplyTo((prevState) => [
  //           ...prevState,
  //           ...data.user[0].applyto,
  //         ]);
  //       } else {
  //         alert("유저 정보를 불러오는데 실패했습니다.");
  //       }
  //     });
  // };

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
          console.log("data", data.applyData);
          // setUserApplyTo((prevState) => [
          //   ...prevState,
          //   ...data.user[0].applyto,
          // ]);
        } else {
          alert("유저 정보를 불러오는데 실패했습니다.");
        }
      });
  }

  console.log("uat", UserApplyTo);

  const renderApplyTo = UserApplyTo.reverse().map((apply, index) => {
    return (
      <div
        style={{
          border: "1px solid black",
          width: "50%",
        }}
        key={index}
      >
        <p style={{ marginLeft: "1rem" }}>
          {/* Recruit Title: {RecruitTitle} */}
        </p>
        <p style={{ marginLeft: "1rem" }}>nickname: {apply}</p>
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
