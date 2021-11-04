import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { USER_SERVER, RECRUIT_SERVER } from "../../../Config";
import { auth } from "../../../_actions/user_action";
import { getCookie } from "../../../utils/getCookie";
import Alarm from "../Alarm/Alarm";

import { Input, Button, Checkbox, Select } from "antd";
import styles from "./RecruitPage.module.css";

function RecruitPage(props) {
  const userId = getCookie("user_id", document.cookie);

  const dispatch = useDispatch();

  dispatch(auth()).then((response) => {
    if (response.payload.recruitWriting !== "") {
      props.history.push("/");
    }
  });

  const { TextArea } = Input;
  const { Option } = Select;

  const [Title, setTitle] = useState("");
  const [ProjectDetail, setProjectDetail] = useState("");
  const [RecruitPositions, setRecruitPositions] = useState([]);
  const [Languages, setLanguages] = useState([]);
  const [Qualifications, setQualifications] = useState("");
  const [MeetingLocation, setMeetingLocation] = useState("");
  const [NumberOfMember, setNumberOfMember] = useState(1);
  const [visible, setVisible] = useState(false);
  const [Message, setMessage] = useState(undefined);

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
              console.log(data);
              if (!data.success) {
                // alert("모집글 작성에 실패했습니다.");
                setVisible(true);
                setMessage("모집글 작성에 실패했습니다.");
              } else {
                props.history.push("/");
                window.location.reload();
              }
            });
        } else {
          // alert("모집글 작성에 실패했습니다.");
          setVisible(true);
          setMessage("모집글 작성에 실패했습니다.");
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

  const onNumberOfMemberHandler = (value) => {
    setNumberOfMember(Number(value));
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
      personnel: NumberOfMember + 1,
      member: userId,
    };

    // if (user && user.recruitWriting !== "") {
    //   setVisible(true);
    //   setMessage("모집글은 하나만 작성할 수 있습니다.");
    // } else
    if (
      submitRecruitDetail.title === "" ||
      submitRecruitDetail.projectDetail === "" ||
      submitRecruitDetail.recruitPositions.length === 0 ||
      submitRecruitDetail.languages.length === 0 ||
      submitRecruitDetail.meetingLocation === ""
    ) {
      // alert("입력하지 않은 내용이 있습니다.");
      setVisible(true);
      setMessage("입력하지 않은 내용이 있습니다.");
    } else if (submitRecruitDetail.title.length > 100) {
      setVisible(true);
      setMessage("제목은 100자 이하로만 작성할 수 있습니다.");
    } else if (submitRecruitDetail.meetingLocation.length > 100) {
      setVisible(true);
      setMessage("모임장소는 100자 이하로만 작성할 수 있습니다.");
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

        <label className={styles.labelSt}>모집 인원</label>
        <Select
          onChange={onNumberOfMemberHandler}
          defaultValue="1"
          className={styles.selectSt}
        >
          <Option value="1">1</Option>
          <Option value="2">2</Option>
          <Option value="3">3</Option>
          <Option value="4">4</Option>
          <Option value="5">5</Option>
          <Option value="6">6</Option>
          <Option value="7">7</Option>
          <Option value="8">8</Option>
          <Option value="9">9</Option>
        </Select>

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
      <Alarm message={Message} visible={visible} setVisible={setVisible} />
    </div>
  );
}

export default RecruitPage;
