import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RECRUIT_SERVER } from "../../../Config";
import Alarm from "../Alarm/Alarm";

import { Button, Input, Checkbox } from "antd";
import styles from "./UpdateRecruitPage.module.css";

function UpdateRecruitPage(props) {
  const { TextArea } = Input;

  const [RecruitId, setRecruitId] = useState("");
  const [Title, setTitle] = useState("");
  const [ProjectDetail, setProjectDetail] = useState("");
  const [RecruitPositions, setRecruitPositions] = useState([]);
  const [Languages, setLanguages] = useState([]);
  const [Qualifications, setQualifications] = useState("");
  const [MeetingLocation, setMeetingLocation] = useState("");
  const [visible, setVisible] = useState(false);
  const [Message, setMessage] = useState(undefined);

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
        } else {
          // alert("???????????? ??????????????? ??????????????????.");
          setVisible(true);
          setMessage("???????????? ???????????? ?????? ??????????????????.");
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
          // alert("????????? ????????? ??????????????????.");
          setVisible(true);
          setMessage("????????? ????????? ??????????????????.");
        }
      });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    let submitRecruitDetail = {
      recruitId: rid,
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
      // alert("???????????? ?????? ????????? ????????????.");
      setVisible(true);
      setMessage("???????????? ?????? ????????? ????????????.");
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
    <div className={styles.container}>
      <form className={styles.formSt} onSubmit={onSubmitHandler}>
        <div className={styles.formDiv}>
          <h2>Recruit</h2>
        </div>

        <label className={styles.labelSt}>??????</label>
        <Input
          className={styles.inputSt}
          type="text"
          value={Title}
          onChange={onTitleHandler}
        />

        <label className={styles.labelSt}>???????????? ??????</label>
        <TextArea
          className={styles.textSt}
          rows={4}
          value={ProjectDetail}
          onChange={onProjectDetailHandler}
        />

        <label className={styles.labelSt}>?????? ?????????</label>
        <Checkbox.Group
          options={options}
          value={RecruitPositions}
          onChange={onRecruitPositionsHandler}
        />

        <label className={styles.labelSt}>??????</label>
        <Checkbox.Group
          options={languagesOptions}
          value={Languages}
          onChange={onLanguagesHandler}
        />

        <label className={styles.labelSt}>?????? ??????</label>
        <TextArea
          className={styles.textSt}
          rows={4}
          value={Qualifications}
          onChange={onQualificationsHandler}
        />

        <label className={styles.labelSt}>?????? ??????</label>
        <Input
          className={styles.inputSt}
          type="text"
          value={MeetingLocation}
          onChange={onMeetingLocationHandler}
        />

        <Button className={styles.btn} htmlType="submit">
          Edit Recruit
        </Button>
      </form>
      <Alarm message={Message} visible={visible} setVisible={setVisible} />
    </div>
  );
}

export default UpdateRecruitPage;
