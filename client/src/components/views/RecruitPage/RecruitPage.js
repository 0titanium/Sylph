import React, { useState } from "react";
import { USER_SERVER, RECRUIT_SERVER } from "../../../Config";
import { getCookie } from "../../../utils/getCookie";
import { Input, Button, Checkbox } from "antd";
// import { ControlOutlined } from "@ant-design/icons";

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
          console.log(data.recruitPost);
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
    console.log(e);
    setRecruitPositions(e);
  };

  const onLanguagesHandler = (e) => {
    setLanguages(e);
  }

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
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "110vh",
      }}
    >
      <form
        style={{ display: "flex", flexDirection: "column", width: "40%" }}
        onSubmit={onSubmitHandler}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h2>Recruit</h2>
        </div>

        <label style={{ marginBottom: "5px", marginTop: "2rem" }}>제목</label>
        <Input
          style={{ height: "2.5rem" }}
          type="text"
          value={Title}
          onChange={onTitleHandler}
        />

        <label style={{ marginBottom: "5px", marginTop: "2rem" }}>
          프로젝트 상세
        </label>
        <TextArea
          style={{ resize: "none" }}
          rows={4}
          value={ProjectDetail}
          onChange={onProjectDetailHandler}
        />

        <label style={{ marginBottom: "5px", marginTop: "2rem" }}>
          모집 포지션
        </label>
        <Checkbox.Group
          options={options}
          onChange={onRecruitPositionsHandler}
        />
        {/* <TextArea
          style={{ resize: "none" }}
          rows={4}
          value={RecruitPositions}
          onChange={onRecruitPositionsHandler}
        /> */}

        <label style={{ marginBottom: "5px", marginTop: "2rem" }}>
          언어
        </label>
        <Checkbox.Group
          options={languagesOptions}
          onChange={onLanguagesHandler}
        />

        <label style={{ marginBottom: "5px", marginTop: "2rem" }}>
          자격 요건
        </label>
        <TextArea
          style={{ resize: "none" }}
          rows={4}
          value={Qualifications}
          onChange={onQualificationsHandler}
        />

        <label style={{ marginBottom: "5px", marginTop: "2rem" }}>
          모임 장소
        </label>
        <Input
          style={{ height: "2.5rem" }}
          type="text"
          value={MeetingLocation}
          onChange={onMeetingLocationHandler}
        />

        <Button
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            backgroundColor: "#4b7bec",
            height: "2.5rem",
            marginTop: "2rem",
          }}
          htmlType="submit"
        >
          Recruit
        </Button>
      </form>
    </div>
  );
}

export default RecruitPage;
