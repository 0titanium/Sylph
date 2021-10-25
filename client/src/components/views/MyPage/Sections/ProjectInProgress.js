import React, { useEffect, useState } from "react";
import { USER_SERVER } from "../../../../Config";

import { Descriptions, Button } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import styles from "./ProjectInProgress.module.css";

function ProjectInProgress() {
  const [Recruit, setRecruit] = useState(undefined);
  const [Title, setTitle] = useState(undefined);
  const [ProjectDetail, setProjectDetail] = useState(undefined);
  const [RecruitPositions, setRecruitPositions] = useState(undefined);
  const [Languages, setLanguages] = useState(undefined);
  const [Qualifications, setQualifications] = useState(undefined);
  const [MeetingLocation, setMeetingLocation] = useState(undefined);
  const [RecruitId, setRecruitId] = useState("");

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
          if (data.recruitDetail !== "") {
            setRecruit(data.recruitDetail);
            setTitle(data.recruitDetail.title);
            setProjectDetail(data.recruitDetail.projectDetail);
            setRecruitPositions(data.recruitDetail.recruitPositions);
            setLanguages(data.recruitDetail.languages);
            setQualifications(data.recruitDetail.Qualifications);
            setMeetingLocation(data.recruitDetail.meetingLocation);
            setRecruitId(data.recruitDetail._id);
          } else {
            setRecruit(null);
          }
        } else {
          alert("프로젝트를 불러오는데 실패했습니다.");
        }
      });
  };

  const title =
    Title === undefined ? (
      <LoadingOutlined className={styles.loading} />
    ) : Title.length > 100 ? (
      Title.slice(0, 100) + "..."
    ) : (
      Title
    );

  const projectDetail =
    ProjectDetail === undefined ? (
      <LoadingOutlined className={styles.loading} />
    ) : ProjectDetail.length > 100 ? (
      ProjectDetail.slice(0, 100) + "..."
    ) : (
      ProjectDetail
    );

  const recruitPositions =
    RecruitPositions === undefined ? (
      <LoadingOutlined className={styles.loading} />
    ) : RecruitPositions.length > 7 ? (
      RecruitPositions.slice(0, 7)
        .map((position) => position)
        .toString() + "..."
    ) : (
      RecruitPositions.map((position, index) => position + " ")
    );

  const languages =
    Languages === undefined ? (
      <LoadingOutlined className={styles.loading} />
    ) : Languages.length > 7 ? (
      Languages.slice(0, 7)
        .map((language) => language)
        .toString() + "..."
    ) : (
      Languages.map((language) => language + " ")
    );

  useEffect(() => {
    fetchMyProject();
  }, []);

  return (
    <div className={styles.container}>
      {Recruit === undefined ? (
        <LoadingOutlined className={styles.loading} />
      ) : Recruit !== null ? (
        <Descriptions
          bordered
          title="My Project"
          size="small"
          column={1}
          extra={
            <Button type="primary">
              <a href={`/recruit/update/${RecruitId}`}>Edit</a>
            </Button>
          }
        >
          <Descriptions.Item label="바로가기" labelStyle={{ width: "100px" }}>
            <Button className={styles.btn}>
              <a href={`/recruit/${RecruitId}`}>바로가기</a>
            </Button>
          </Descriptions.Item>
          <Descriptions.Item label="Title" labelStyle={{ width: "100px" }}>
            {title}
          </Descriptions.Item>
          <Descriptions.Item label="ProjectDetail">
            {projectDetail}
          </Descriptions.Item>
          <Descriptions.Item label="RecruitPositions">
            {recruitPositions}
          </Descriptions.Item>
          <Descriptions.Item label="Languages">{languages}</Descriptions.Item>
          <Descriptions.Item label="Qualifications">
            {Qualifications === undefined ? (
              <LoadingOutlined className={styles.loading} />
            ) : Qualifications.length > 100 ? (
              Qualifications.slice(0, 100) + "..."
            ) : (
              Qualifications
            )}
          </Descriptions.Item>
          <Descriptions.Item label="MeetingLocation">
            {MeetingLocation === undefined ? (
              <LoadingOutlined className={styles.loading} />
            ) : MeetingLocation.length > 100 ? (
              MeetingLocation.slice(0, 100) + "..."
            ) : (
              MeetingLocation
            )}
          </Descriptions.Item>
        </Descriptions>
      ) : (
        <div>
          <h3 className={styles.alarm}>진행중인 프로젝트가 없습니다.</h3>
        </div>
      )}
    </div>
  );
}

export default ProjectInProgress;
