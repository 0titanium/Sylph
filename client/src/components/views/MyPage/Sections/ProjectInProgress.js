import React, { useEffect, useState } from "react";
import { USER_SERVER } from "../../../../Config";

import { Descriptions, Button } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

function ProjectInProgress() {
  const [Recruit, setRecruit] = useState(undefined);
  const [Title, setTitle] = useState(undefined);
  const [Writer, setWriter] = useState(undefined);
  const [ProjectDetail, setProjectDetail] = useState(undefined);
  const [RecruitPositions, setRecruitPositions] = useState(undefined);
  const [Languages, setLanguages] = useState(undefined);
  const [Qualifications, setQualifications] = useState(undefined);
  const [MeetingLocation, setMeetingLocation] = useState(undefined);
  const [RecruitId, setRecruitId] = useState("");

  const title =
    Title === undefined ? (
      <LoadingOutlined style={{ fontSize: "3rem" }} />
    ) : Title.length > 100 ? (
      Title.slice(0, 100) + "..."
    ) : (
      Title
    );

  const writer =
    Writer === undefined ? (
      <LoadingOutlined style={{ fontSize: "3rem" }} />
    ) : Writer.length > 100 ? (
      Writer.slice(0, 100) + "..."
    ) : (
      Writer
    );

  const projectDetail =
    ProjectDetail === undefined ? (
      <LoadingOutlined style={{ fontSize: "3rem" }} />
    ) : ProjectDetail.length > 100 ? (
      ProjectDetail.slice(0, 100) + "..."
    ) : (
      ProjectDetail
    );

  const recruitPositions =
    RecruitPositions === undefined ? (
      <LoadingOutlined style={{ fontSize: "3rem" }} />
    ) : RecruitPositions.length > 7 ? (
      RecruitPositions.slice(0, 7)
        .map((position) => position)
        .toString() + "..."
    ) : (
      RecruitPositions.map((position, index) => position + " ")
    );

  const languages =
    Languages === undefined ? (
      <LoadingOutlined style={{ fontSize: "3rem" }} />
    ) : Languages.length > 7 ? (
      Languages.slice(0, 7)
        .map((language) => language)
        .toString() + "..."
    ) : (
      Languages.map((language) => language + " ")
    );

  const fetchMyProject = () => {
    fetch(`${USER_SERVER}/myProject`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          console.log(data.user);
          setRecruit(data.recruitDetail);
          console.log("r", Recruit);
          console.log("rd", data.recruitDetail);
          if (data.recruitDetail) {
            setTitle(data.recruitDetail.title);
            setWriter(data.user.nickname);
            setProjectDetail(data.recruitDetail.projectDetail);
            setRecruitPositions(data.recruitDetail.recruitPositions);
            setLanguages(data.recruitDetail.languages);
            setQualifications(data.recruitDetail.Qualifications);
            setMeetingLocation(data.recruitDetail.meetingLocation);
            setRecruitId(data.recruitDetail._id);
          }
        } else {
          alert("모집글을 불러오는데 실패했습니다.");
        }
      });
  };

  useEffect(() => {
    fetchMyProject();
  }, []);

  return (
    <div style={{ height: "100%" }}>
      {Recruit === undefined ? (
        <LoadingOutlined style={{ fontSize: "3rem" }} />
      ) : Recruit !== null ? (
        <Descriptions
          bordered
          title="My Project"
          size="default"
          column={1}
          extra={
            <Button type="primary">
              <a href={`/recruit/update/${RecruitId}`}>Edit</a>
            </Button>
          }
        >
          <Descriptions.Item label="바로가기" labelStyle={{ width: "100px" }}>
            <Button style={{ color: "white", backgroundColor: "#4b7bec" }}>
              <a href={`/recruit/${RecruitId}`}>바로가기</a>
            </Button>
          </Descriptions.Item>
          <Descriptions.Item label="Title" labelStyle={{ width: "100px" }}>
            {title}
          </Descriptions.Item>
          <Descriptions.Item label="Writer">{writer}</Descriptions.Item>
          <Descriptions.Item label="ProjectDetail">
            {projectDetail}
          </Descriptions.Item>
          <Descriptions.Item label="RecruitPositions">
            {recruitPositions}
          </Descriptions.Item>
          <Descriptions.Item label="Languages">{languages}</Descriptions.Item>
          <Descriptions.Item label="Qualifications">
            {Qualifications === undefined ? (
              <LoadingOutlined style={{ fontSize: "3rem" }} />
            ) : Qualifications.length > 100 ? (
              Qualifications.slice(0, 100) + "..."
            ) : (
              Qualifications
            )}
          </Descriptions.Item>
          <Descriptions.Item label="MeetingLocation">
            {MeetingLocation === undefined ? (
              <LoadingOutlined style={{ fontSize: "3rem" }} />
            ) : MeetingLocation.length > 100 ? (
              MeetingLocation.slice(0, 100) + "..."
            ) : (
              MeetingLocation
            )}
          </Descriptions.Item>
        </Descriptions>
      ) : (
        <div>
          <h3 style={{ marginTop: "2rem" }}>
            진행중인 프로젝트가 없습니다.
          </h3>
        </div>
      )}
    </div>
  );
}

export default ProjectInProgress;
