import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { USER_SERVER, RECRUIT_SERVER } from "../../../Config";
import { getCookie } from "../../../utils/getCookie";

import { Button, Divider, Modal } from "antd";

function RecruitDetailPage(props) {
  const userId = getCookie("user_id", document.cookie);
  const [recruitId, setRecruitId] = useState("");
  const [Title, setTitle] = useState("");
  const [Writer, setWriter] = useState("");
  const [WriterId, setWriterId] = useState("");
  const [ProjectDetail, setProjectDetail] = useState("");
  const [RecruitPositions, setRecruitPositions] = useState("");
  const [RequiredExperience, setRequiredExperience] = useState("");
  const [MeetingLocation, setMeetingLocation] = useState("");
  const [ReadingUserApply, setReadingUserApply] = useState([]);
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
          console.log("ui", data.user[0]);
          console.log("a", data.user[0].applyto);
          setReadingUserApply(data.user[0].applyto);
        } else {
          alert("유저 정보를 불러오는데 실패했습니다.");
        }
      });
  };
  console.log("rua", ReadingUserApply);

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
          console.log(data.writer);
          setRecruitId(data.recruitDetail._id._id);
          setTitle(data.recruitDetail.title);
          setWriter(data.writer.nickname);
          setWriterId(data.writer._id);
          setProjectDetail(data.recruitDetail.projectDetail);
          setRecruitPositions(data.recruitDetail.recruitPositions);
          setRequiredExperience(data.recruitDetail.requiredExperience);
          setMeetingLocation(data.recruitDetail.meetingLocation);
        } else {
          alert("모집글을 불러오는데 실패했습니다.");
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
        } else {
          alert("모집글 삭제에 실패했습니다.");
        }
      });
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
      setTimeout(() => {
        setVisible(false);
        setConfirmLoading(false);
      }, 2000);
    };

    return (
      <React.Fragment>
        <Button
          onClick={showModal}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            backgroundColor: "#4b7bec",
            width: "4rem",
            height: "2.5rem",
          }}
        >
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

  // apply
  const applyRequest = (userId, rid) => {
    fetch(`${RECRUIT_SERVER}/applyment`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
      credentials: "include",
      body: JSON.stringify({ userId: userId, recruitId: rid }),
    }).then((response) => response.json());

    fetch(`${USER_SERVER}/applyment`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
      credentials: "include",
      body: JSON.stringify({ userId: userId, recruitId: rid }),
    }).then((response) => response.json());
  };

  // recruit completion
  const completeRequest = (recruitId) => {
    // fetch(`${RECRUIT_SERVER}/complete`, {
    //   method: "PATCH",
    //   headers: { "Content-Type": "application/json" },
    //   mode: "cors",
    //   credentials: "include",
    //   body: { recruitId: recruitId },
    // }).then((response) => response.json());
  };

  // if user click apply button
  const onApplyHandler = (e) => {
    console.log("click");

    if (userId) {
      applyRequest(userId, rid);
    } else {
      alert("로그인이 필요한 기능입니다.");
    }
  };

  // if writer click complete button
  const onCompleteHandler = (e) => {
    e.preventDefault();

    if (userId) {
      completeRequest(rid);
    } else {
      alert("로그인이 필요한 기능입니다.");
    }
  };

  // verify if user already clicked apply

  const verifyApply = () => {
    if (ReadingUserApply === []) {
      return true;
    }

    for (let i = 0; i < ReadingUserApply.length; i++) {
      if (recruitId === ReadingUserApply[i]) {
        return false;
      }
    }

    return true;
  };

  console.log("V", verifyApply());

  useEffect(() => {
    fetchRecruitDetail();
    fetchUserInfo();
    return () => setConfirmLoading(false);
  }, []);

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
      <div
        style={{
          width: "50%",
          border: "1rem solid black",
          padding: "2rem",
          borderRadius: "2rem",
        }}
      >
        <h3>Title: {Title}</h3>
        <h3>Writer: {Writer}</h3>
        <Divider />
        <h2>Project Detail</h2>
        <p>{ProjectDetail}</p>
        <Divider />
        <h2>Recruit Positions</h2>
        <p>{RecruitPositions}</p>
        <Divider />
        <h2>Required Experience</h2>
        <p>{RequiredExperience}</p>
        <Divider />
        <h2>Meeting Location</h2>
        <p>{MeetingLocation}</p>
        <Divider />
        <form
          onSubmit={onApplyHandler}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {userId !== WriterId && (
            <Button
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "white",
                backgroundColor: "#4b7bec",
                width: "4rem",
                height: "2.5rem",
                marginRight: "2rem",
              }}
              htmlType="submit"
            >
              Apply
            </Button>
          )}

          {/* only writer can see this button */}
          {userId === WriterId && (
            <>
              <Button
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "white",
                  backgroundColor: "#4b7bec",
                  width: "4rem",
                  height: "2.5rem",
                  marginRight: "2rem",
                }}
              >
                <a href={`/recruit/update/${rid}`}>Edit</a>
              </Button>
              <Button
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "white",
                  backgroundColor: "#4b7bec",
                  width: "5rem",
                  height: "2.5rem",
                  marginRight: "2rem",
                }}
                onClick={onCompleteHandler}
              >
                Complete
              </Button>
              {deleteComponent()}
            </>
          )}
        </form>
      </div>
    </div>
  );
}

export default RecruitDetailPage;
