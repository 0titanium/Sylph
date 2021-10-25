import React, { useState } from "react";
import { USER_SERVER, RECRUIT_SERVER } from "../../../Config";
import { getCookie } from "../../../utils/getCookie";

import { Input, Button, Checkbox } from "antd";
// import { ControlOutlined } from "@ant-design/icons";
import styles from "./RecruitPage.module.css";

function RecruitPage(props) {
  const userId = getCookie("user_id", document.cookie);

  const { TextArea } = Input;

  const [Title, setTitle] = useState("");
  const [ProjectDetail, setProjectDetail] = useState("");
  const [RecruitPositions, setRecruitPositions] = useState([]);
  const [Languages, setLanguages] = useState([]);
  const [Qualifications, setQualifications] = useState("");
  const [MeetingLocation, setMeetingLocation] = useState("");

  const options = [
    { label: "Frontend", value: "Frontend" },
    { label: "Backend", value: "Backend" },
    { label: "Full stack", value: "Full stack" },
    { label: "iOS", value: "iOS" },
    { label: "Android", value: "Android" },
    { label: "Game Client", value: "Game Client" },
    { label: "Game Server", value: "Game Server" },
  ];

  const languagesOptions = [
    { label: "JavaScript", value: "JavaScript" },
    { label: "TypeScript", value: "TypeScript" },
    { label: "Java", value: "Java" },
    { label: "Python", value: "Python" },
    { label: "Swift", value: "Swift" },
    { label: "Kotlin", value: "Kotlin" },
    { label: "php", value: "php" },
    { label: "C", value: "C" },
    { label: "C++", value: "C++" },
    { label: "C#", value: "C#" },
  ];

  const fetchRecruit = (submitRecruitDetail) => {
    fetch(`${RECRUIT_SERVER}/recruit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
      credentials: "include",
      body: JSON.stringify({ submitRecruitDetail }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          fetch(`${USER_SERVER}/recruit`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            mode: "cors",
            credentials: "include",
            body: JSON.stringify({
              userId: userId,
              recruitId: data.recruitPost._id,
            }),
          })
            .then((response) => response.json())
            .then((data) => {
              if (!data.success) {
                alert("모집글 작성에 실패했습니다.");
              }
            });
          props.history.push("/");
          window.location.reload();
        } else {
          alert("모집글 작성에 실패했습니다.");
        }
      });
  };

  const onTitleHandler = (e) => {
    setTitle(e.currentTarget.value);
  };

  const onProjectDetailHandler = (e) => {
    setProjectDetail(e.currentTarget.value);
  };

  const onRecruitPositionsHandler = (e) => {
    setRecruitPositions(e);
  };

  const onLanguagesHandler = (e) => {
    setLanguages(e);
  };

  const onQualificationsHandler = (e) => {
    setQualifications(e.currentTarget.value);
  };

  const onMeetingLocationHandler = (e) => {
    setMeetingLocation(e.currentTarget.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    let submitRecruitDetail = {
      writer: userId,
      title: Title,
      projectDetail: ProjectDetail,
      recruitPositions: RecruitPositions,
      languages: Languages,
      Qualifications: Qualifications,
      meetingLocation: MeetingLocation,
      member: userId,
    };

    if (
      submitRecruitDetail.title === "" ||
      submitRecruitDetail.projectDetail === "" ||
      submitRecruitDetail.recruitPositions === [] ||
      submitRecruitDetail.languages === [] ||
      submitRecruitDetail.meetingLocation === ""
    ) {
      alert("입력하지 않은 내용이 있습니다.");
    } else {
      fetchRecruit(submitRecruitDetail);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.submitForm} onSubmit={onSubmitHandler}>
        <div className={styles.formSt}>
          <h2>Recruit</h2>
        </div>

        <label className={styles.labelSt}>제목</label>
        <Input
          className={styles.inputSt}
          type="text"
          value={Title}
          onChange={onTitleHandler}
        />

        <label className={styles.labelSt}>프로젝트 상세</label>
        <TextArea
          className={styles.textareaSt}
          rows={4}
          value={ProjectDetail}
          onChange={onProjectDetailHandler}
        />

        <label className={styles.labelSt}>모집 포지션</label>
        <Checkbox.Group
          options={options}
          onChange={onRecruitPositionsHandler}
        />

        <label className={styles.labelSt}>언어</label>
        <Checkbox.Group
          options={languagesOptions}
          onChange={onLanguagesHandler}
        />

        <label className={styles.labelSt}>자격 요건</label>
        <TextArea
          className={styles.textareaSt}
          rows={4}
          value={Qualifications}
          onChange={onQualificationsHandler}
        />

        <label className={styles.labelSt}>모임 장소</label>
        <Input
          className={styles.inputSt}
          type="text"
          value={MeetingLocation}
          onChange={onMeetingLocationHandler}
        />

        <Button className={styles.btn} htmlType="submit">
          Recruit
        </Button>
      </form>
    </div>
  );
}

export default RecruitPage;
