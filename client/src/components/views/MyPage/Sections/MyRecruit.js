import React, { useEffect, useState } from "react";
import { RECRUIT_SERVER } from "../../../../Config";
import { Descriptions, Button } from "antd";

function MyRecruit() {
  const [Title, setTitle] = useState("");
  const [Writer, setWriter] = useState("");
  const [ProjectDetail, setProjectDetail] = useState("");
  const [RecruitPositions, setRecruitPositions] = useState("");
  const [RequiredExperience, setRequiredExperience] = useState("");
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
          setRequiredExperience(data.recruitDetail.requiredExperience);
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
    <div style={{ height: "100%" }}>
      <Descriptions
        bordered
        title="My Recruit"
        size="default"
        column={1}
        extra={<Button type="primary">Edit</Button>}
      >
        <Descriptions.Item label="Title" labelStyle={{ width: "100px" }}>
          {Title}
        </Descriptions.Item>
        <Descriptions.Item label="Writer">{Writer}</Descriptions.Item>
        <Descriptions.Item label="ProjectDetail">
          {ProjectDetail}
        </Descriptions.Item>
        <Descriptions.Item label="RecruitPositions">
          {RecruitPositions}
        </Descriptions.Item>
        <Descriptions.Item label="RequiredExperience">
          {RequiredExperience}
        </Descriptions.Item>
        <Descriptions.Item label="MeetingLocation">
          {MeetingLocation}
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
}

export default MyRecruit;
