import React, { useEffect, useState } from "react";
import { RECRUIT_SERVER } from "../../../../Config";

import { Descriptions, Button } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

function MyRecruit() {
  const [Title, setTitle] = useState(undefined);
  const [Writer, setWriter] = useState("");
  const [ProjectDetail, setProjectDetail] = useState("");
  const [RecruitPositions, setRecruitPositions] = useState("");
  const [RequiredExperience, setRequiredExperience] = useState("");
  const [MeetingLocation, setMeetingLocation] = useState("");

  const fetchMyRecruit = () => {
    fetch(`${RECRUIT_SERVER}/myRecruit`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          console.log(data.user);
          if (data.recruitDetail) {
            setTitle(data.recruitDetail.title);
            setWriter(data.user.nickname);
            setProjectDetail(data.recruitDetail.projectDetail);
            setRecruitPositions(data.recruitDetail.recruitPositions);
            setRequiredExperience(data.recruitDetail.requiredExperience);
            setMeetingLocation(data.recruitDetail.meetingLocation);
          }
        } else {
          alert("모집글을 불러오는데 실패했습니다.");
        }
      });
  };

  useEffect(() => {
    fetchMyRecruit();
  }, []);

  return (
    <div style={{ height: "100%" }}>
      {Title === undefined ? <LoadingOutlined style={{fontSize: "3rem"}} /> : Title !== "" ? (
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
      ) : (
        <div>
          <h3 style={{ marginTop: "2rem" }}>
            모집글이 없습니다. 프로젝트 팀원을 모집해 보세요.{" "}
          </h3>
        </div>
      )}
    </div>
  );
}

export default MyRecruit;
