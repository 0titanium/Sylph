import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RECRUIT_SERVER } from "../../../Config";

import { Button, Input, Checkbox } from "antd";

function UpdateRecruitPage(props) {
  const { TextArea } = Input;

  const [RecruitId, setRecruitId] = useState("");
  const [Title, setTitle] = useState("");
  const [ProjectDetail, setProjectDetail] = useState("");
  const [RecruitPositions, setRecruitPositions] = useState([]);
  const [Languages, setLanguages] = useState([]);
  const [Qualifications, setQualifications] = useState("");
  const [MeetingLocation, setMeetingLocation] = useState("");

  const rid = useParams().recruitId;

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

  console.log("rid", rid);

  // fetch data before update
  const fetchRecruitDetail = () => {
    fetch(`${RECRUIT_SERVER}/recruitDetail/${rid}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setRecruitId(data.recruitDetail._id._id);
          setTitle(data.recruitDetail.title);
          setProjectDetail(data.recruitDetail.projectDetail);
          setRecruitPositions(data.recruitDetail.recruitPositions);
          setLanguages(data.recruitDetail.languages);
          setQualifications(data.recruitDetail.Qualifications);
          setMeetingLocation(data.recruitDetail.meetingLocation);
          console.log("p", RecruitPositions, "l", Languages);
        } else {
          alert("모집글을 불러오는데 실패했습니다.");
        }
      });
  };

  // update request
  const fetchRecruit = (submitRecruitDetail) => {
    fetch(`${RECRUIT_SERVER}/recruit`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
      credentials: "include",
      body: JSON.stringify({ submitRecruitDetail }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          props.history.push("/");
        } else {
          alert("모집글 작성에 실패했습니다.");
        }
      });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    let submitRecruitDetail = {
      recruitId: RecruitId,
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
        height: "120vh",
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
          value={RecruitPositions}
          onChange={onRecruitPositionsHandler}
        />

        <label style={{ marginBottom: "5px", marginTop: "2rem" }}>언어</label>
        <Checkbox.Group
          options={languagesOptions}
          value={Languages}
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
          Edit Recruit
        </Button>
      </form>
    </div>
  );
}

export default UpdateRecruitPage;
