import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { USER_SERVER, RECRUIT_SERVER } from "../../../Config";
import { getCookie } from "../../../utils/getCookie";
import Alarm from "../Alarm/Alarm";

import { Button, Divider, Modal } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import styles from "./RecruitDetailPage.module.css";

function RecruitDetailPage(props) {
  const userId = getCookie("user_id", document.cookie);
  const [Title, setTitle] = useState(undefined);
  const [Writer, setWriter] = useState("");
  const [WriterId, setWriterId] = useState("");
  const [ProjectDetail, setProjectDetail] = useState("");
  const [RecruitPositions, setRecruitPositions] = useState([]);
  const [Languages, setLanguages] = useState([]);
  const [Qualifications, setQualifications] = useState("");
  const [MeetingLocation, setMeetingLocation] = useState("");
  const [CheckApply, setCheckApply] = useState(false);
  const [IsCompleted, setIsCompleted] = useState(undefined);
  const [alarm, setAlarm] = useState(false);
  const [Message, setMessage] = useState(undefined);
  const [NumberofMembers, setNumberofMembers] = useState(undefined);
  const [Personnel, setPersonnel] = useState(undefined);
  const rid = useParams().recruitId;

  // fetch user info
  const fetchUserInfo = () => {
    fetch(`${USER_SERVER}/userInfo`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          if (data.user[0].applyto.includes(rid)) {
            setCheckApply(true);
          }
        } else {
          // alert("유저 정보를 불러오는데 실패했습니다.");
          setAlarm(true);
          setMessage("유저 정보를 불러오는 것에 실패했습니다.");
        }
      });
  };

  // fetch recruit data
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
          setTitle(data.recruitDetail.title);
          setWriter(data.writer.nickname);
          setWriterId(data.writer._id);
          setProjectDetail(data.recruitDetail.projectDetail);
          setRecruitPositions(data.recruitDetail.recruitPositions);
          setLanguages(data.recruitDetail.languages);
          setQualifications(data.recruitDetail.Qualifications);
          setMeetingLocation(data.recruitDetail.meetingLocation);
          setNumberofMembers(data.recruitDetail.member.length);
          setPersonnel(data.recruitDetail.personnel);
          setIsCompleted(data.recruitDetail.recruitCompleted);
        } else {
          // alert("모집글을 불러오는데 실패했습니다.");
          setAlarm(true);
          setMessage("모집글을 불러오는 것에 실패했습니다.");
        }
      });
  };

  // delete request
  const deleteRequest = (submitRecruitDetail) => {
    fetch(`${RECRUIT_SERVER}/recruit`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
      credentials: "include",
      body: JSON.stringify({ submitRecruitDetail }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          props.history.push("/");
          window.location.reload();
        } else {
          // alert("모집글 삭제에 실패했습니다.");
          setAlarm(true);
          setMessage("모집글 삭제에 실패했습니다.");
        }
      });
  };

  // path request - change user recruitWriting
  const patchRequest = (userId) => {
    fetch(`${USER_SERVER}/recruit`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
      credentials: "include",
      body: JSON.stringify({
        userId: userId,
        recruitId: undefined,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.success) {
          // alert("모집글 삭제에 실패했습니다.");
          setAlarm(true);
          setMessage("모집글 삭제에 실패했습니다.");
        }
      });
  };

  // apply
  const applyRequest = (userId, rid) => {
    fetch(`${RECRUIT_SERVER}/applyment`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
      credentials: "include",
      body: JSON.stringify({ userId: userId, recruitId: rid }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.success) {
          setAlarm(true);
          setMessage("지원에 실패했습니다.");
        } else {
          setCheckApply(true);
        }
      });

    fetch(`${USER_SERVER}/applyment`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
      credentials: "include",
      body: JSON.stringify({ userId: userId, recruitId: rid }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.success) {
          setAlarm(true);
          setMessage("지원에 실패했습니다.");
        } else {
          setCheckApply(true);
        }
      });
  };

  const cancelRequest = (userId, rid) => {
    fetch(`${RECRUIT_SERVER}/cancelApplyment`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
      credentials: "include",
      body: JSON.stringify({ userId: userId, recruitId: rid }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.success) {
          setAlarm(true);
          setMessage("지원 취소에 실패했습니다.");
        } else {
          setCheckApply(false);
        }
      });

    fetch(`${USER_SERVER}/cancelApplyment`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
      credentials: "include",
      body: JSON.stringify({ userId: userId, recruitId: rid }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.success) {
          setAlarm(true);
          setMessage("지원 취소에 실패했습니다.");
        } else {
          setCheckApply(false);
        }
      });
  };

  // recruit completion
  const completeRequest = (recruitId) => {
    fetch(`${RECRUIT_SERVER}/completion`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
      credentials: "include",
      body: JSON.stringify({
        recruitId: recruitId.toString(),
        title: Title.toString(),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.success) {
          setAlarm(true);
          setMessage("모집 완료에 실패했습니다.");
        }
      });

    fetch(`${USER_SERVER}/completion`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
      credentials: "include",
      body: JSON.stringify({
        userId: userId,
        recruitId: recruitId.toString(),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.success) {
          setAlarm(true);
          setMessage("모집 완료에 실패했습니다.");
        }
      });
  };

  // if user click apply button
  const onApplyHandler = (e) => {
    if (userId) {
      if (!CheckApply) {
        applyRequest(userId, rid);
      } else {
        cancelRequest(userId, rid);
      }
    } else {
      // alert("로그인이 필요한 기능입니다.");
      e.preventDefault();
      setAlarm(true);
      setMessage("로그인이 필요한 기능입니다.");
    }
  };

  // if writer click complete button
  const onCompleteHandler = (e) => {
    e.preventDefault();

    if (userId) {
      setIsCompleted(true);
      completeRequest(rid);
      window.location.reload();
    } else {
      // alert("로그인이 필요한 기능입니다.");
      setAlarm(true);
      setMessage("로그인이 필요한 기능입니다.");
    }
  };

  // modal
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("삭제하시겠습니까?");

  const deleteComponent = () => {
    const showModal = () => {
      setVisible(true);
    };

    const handleCancel = () => {
      setVisible(false);
    };

    const handleOk = () => {
      let submitRecruitDetail = { recruitId: rid };

      setModalText("삭제하시겠습니까?");
      setConfirmLoading(true);
      deleteRequest(submitRecruitDetail);
      patchRequest(userId);
      setTimeout(() => {
        setVisible(false);
        setConfirmLoading(false);
      }, 2000);
    };

    return (
      <React.Fragment>
        <Button onClick={showModal} className={styles.btn}>
          Delete
        </Button>
        <Modal
          title="Delete"
          visible={visible}
          onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
        >
          <p>{modalText}</p>
        </Modal>
      </React.Fragment>
    );
  };

  useEffect(() => {
    fetchRecruitDetail();
    if (userId) {
      fetchUserInfo();
    }
    return () => setConfirmLoading(false);
  }, []);

  return (
    <div className={styles.container}>
      {Title === undefined ? (
        <LoadingOutlined className={styles.loading} />
      ) : (
        <div className={styles.page}>
          <h3>Title: {Title}</h3>
          <h3>Writer: {Writer}</h3>
          <Divider />
          <h2>Project Detail</h2>
          <p>{ProjectDetail}</p>
          <Divider />
          <h2>Recruit Positions</h2>
          <p>{RecruitPositions.map((position, index) => position + " ")}</p>
          <Divider />
          <h2>Languages</h2>
          <p>{Languages.map((language, index) => language + " ")}</p>
          <Divider />
          <h2>Qualifications</h2>
          <p>{Qualifications}</p>
          <Divider />
          <h2>Meeting Location</h2>
          <p>{MeetingLocation}</p>
          <Divider />
          <p>
            현재 인원: {NumberofMembers}/{Personnel}명
          </p>
          <Divider />
          <form onSubmit={onApplyHandler} className={styles.apply}>
            {userId !== WriterId ? (
              CheckApply === false ? (
                <Button className={styles.apply_btn} htmlType="submit">
                  Apply
                </Button>
              ) : (
                <Button className={styles.cancel_btn} htmlType="submit">
                  Cancel
                </Button>
              )
            ) : IsCompleted === undefined ? (
              <LoadingOutlined className={styles.loading} />
            ) : IsCompleted === false ? (
              <>
                <Button className={styles.apply_btn}>
                  <a href={`/recruit/update/${rid}`}>Edit</a>
                </Button>
                <Button
                  className={styles.apply_btn}
                  onClick={onCompleteHandler}
                >
                  Complete
                </Button>
                {deleteComponent()}
              </>
            ) : (
              <>
                <Button disabled className={styles.gray_btn}>
                  <a href={`/recruit/update/${rid}`}>Edit</a>
                </Button>
                <Button
                  disabled
                  className={styles.gray_btn}
                  onClick={onCompleteHandler}
                >
                  Complete
                </Button>
                {deleteComponent()}
              </>
            )}
          </form>
        </div>
      )}
      <Alarm message={Message} visible={alarm} setVisible={setAlarm} />
    </div>
  );
}

export default RecruitDetailPage;
