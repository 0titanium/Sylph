import React, { useEffect, useState } from "react";
import { RECRUIT_SERVER } from "../../../Config";

import { Button, Input } from "antd";

function UpdateRecruitPage(props) {
  const { TextArea } = Input;

  const [RecruitId, setRecruitId] = useState("");
  const [Title, setTitle] = useState("");
  const [ProjectDetail, setProjectDetail] = useState("");
  const [RecruitPositions, setRecruitPositions] = useState("");
  const [RequiredExperience, setRequiredExperience] = useState("");
  const [MeetingLocation, setMeetingLocation] = useState("");

  // fetch data before update
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
          setRecruitId(data.recruitDetail._id._id);
          setTitle(data.recruitDetail.title);
          setProjectDetail(data.recruitDetail.projectDetail);
          setRecruitPositions(data.recruitDetail.recruitPositions);
          setRequiredExperience(data.recruitDetail.requiredExperience);
          setMeetingLocation(data.recruitDetail.meetingLocation);
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
      requiredExperience: RequiredExperience,
      meetingLocation: MeetingLocation,
    };

    if (
      submitRecruitDetail.title === "" ||
      submitRecruitDetail.projectDetail === "" ||
      submitRecruitDetail.recruitPositions === "" ||
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
    setRecruitPositions(e.currentTarget.value);
  };

  const onRequiredExperienceHandler = (e) => {
    setRequiredExperience(e.currentTarget.value);
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
        height: "90vh",
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
        <br />

        <label style={{ marginBottom: "5px" }}>제목</label>
        <Input
          style={{ height: "2.5rem" }}
          type="text"
          value={Title}
          onChange={onTitleHandler}
        />
        <br />

        <label style={{ marginBottom: "5px" }}>프로젝트 상세</label>
        <TextArea
          style={{ resize: "none" }}
          rows={4}
          value={ProjectDetail}
          onChange={onProjectDetailHandler}
        />
        <br />

        <label style={{ marginBottom: "5px" }}>모집 포지션</label>
        <TextArea
          style={{ resize: "none" }}
          rows={4}
          value={RecruitPositions}
          onChange={onRecruitPositionsHandler}
        />
        <br />

        <label style={{ marginBottom: "5px" }}>요구 경력</label>
        <Input
          style={{ height: "2.5rem" }}
          type="text"
          value={RequiredExperience}
          onChange={onRequiredExperienceHandler}
        />
        <br />

        <label style={{ marginBottom: "5px" }}>모임 장소</label>
        <Input
          style={{ height: "2.5rem" }}
          type="text"
          value={MeetingLocation}
          onChange={onMeetingLocationHandler}
        />
        <br />

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
          Edit Recruit
        </Button>
      </form>
    </div>
  );
}

export default UpdateRecruitPage;
