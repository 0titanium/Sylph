import React, { useEffect, useState } from "react";
import { RECRUIT_SERVER } from "../../../Config";

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
          setRecruitPositions(data.recruitDetail.recruitPoisions);
          setMeetingLocation(data.recruitDetail.meetingLocation);
        } else {
          alert("모집글을 불러오는데 실패했습니다.");
        }
      });
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
        height: "90vh",
      }}
    >
      <p className="title">{Title}</p>
      <br />
      <p className="writer">{Writer}</p>
      <br />
      <p className="projectDetail">{ProjectDetail}</p>
      <br />
      <p className="recruitPositions">{RecruitPositions}</p>
      <br />
      <p className="meetingLocation">{MeetingLocation}</p>
    </div>
  );
}

export default RecruitDetailPage;
