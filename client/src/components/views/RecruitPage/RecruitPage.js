import React, { useState } from "react";
import { USER_SERVER, RECRUIT_SERVER } from "../../../Config";
import { getCookie } from "../../../utils/getCookie";
import { Input, Button } from "antd";

function RecruitPage(props) {
  const userId = getCookie("user_id", document.cookie);

  const { TextArea } = Input;

  const [Title, setTitle] = useState("");
  const [ProjectDetail, setProjectDetail] = useState("");
  const [RecruitPositions, setRecruitPositions] = useState("");
  const [RequiredExperience, setRequiredExperience] = useState("");
  const [MeetingLocation, setMeetingLocation] = useState("");

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
    setRecruitPositions(e.currentTarget.value);
  };

  const onRequiredExperienceHandler = (e) => {
    setRequiredExperience(e.currentTarget.value);
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
        <TextArea
          style={{ resize: "none" }}
          rows={4}
          value={RecruitPositions}
          onChange={onRecruitPositionsHandler}
        />

        <label style={{ marginBottom: "5px", marginTop: "2rem" }}>
          요구 경력
        </label>
        <Input
          style={{ height: "2.5rem" }}
          type="text"
          value={RequiredExperience}
          onChange={onRequiredExperienceHandler}
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
