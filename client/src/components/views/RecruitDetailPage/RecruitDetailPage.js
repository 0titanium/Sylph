import React, { useEffect, useState } from "react";
import { RECRUIT_SERVER } from "../../../Config";
import { Button, Divider } from "antd";

function RecruitDetailPage(props) {
  const [Title, setTitle] = useState("");
  const [Writer, setWriter] = useState("");
  const [ProjectDetail, setProjectDetail] = useState("");
  const [RecruitPositions, setRecruitPositions] = useState("");
  const [MeetingLocation, setMeetingLocation] = useState("");

  const fetchRecruitDetail = () => {
    fetch(`${RECRUIT_SERVER}/recruitDetail`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          console.log(data);
          setTitle(data.recruitDetail.title);
          setWriter(data.recruitDetail.writer);
          setProjectDetail(data.recruitDetail.projectDetail);
          setRecruitPositions(data.recruitDetail.recruitPositions);
          setMeetingLocation(data.recruitDetail.meetingLocation);
        } else {
          alert("모집글을 불러오는데 실패했습니다.");
        }
      });
  };

  const onApplyHandler = (e) => {
    e.preventDefault();

    // after writing mypage
    // fetch(`${RECRUIT_SERVER}/apply`, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   mode: "cors",
    //   credentials: "include",
    // }).then((response) => response.json());
  };

  useEffect(() => {
    fetchRecruitDetail();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <div
        style={{
          width: "50%",
          border: "1rem solid black",
          padding: "2rem",
          borderRadius: "2rem",
        }}
      >
        <h3>Title: {Title}</h3>
        <h3>Writer: {Writer}</h3>
        <Divider />
        <h2>Project Detail</h2>
        <p>{ProjectDetail}</p>
        <Divider />
        <h2>Recruit Positions</h2>
        <p>{RecruitPositions}</p>
        <Divider />
        <h2>Meeting Location</h2>
        <p>{MeetingLocation}</p>
        <Divider />
        <form
          onSubmit={onApplyHandler}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "white",
              backgroundColor: "#4b7bec",
              height: "2.5rem",
            }}
            htmlType="submit"
          >
            Apply
          </Button>
        </form>
      </div>
    </div>
  );
}

export default RecruitDetailPage;
