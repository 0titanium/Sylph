import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { USER_SERVER, RECRUIT_SERVER } from "../../../Config";
import { getCookie } from "../../../utils/getCookie";

import { Button, Divider, Modal } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

function RecruitDetailPage(props) {
  const userId = getCookie("user_id", document.cookie);
  const [Title, setTitle] = useState(undefined);
  const [Writer, setWriter] = useState("");
  const [WriterId, setWriterId] = useState("");
  const [ProjectDetail, setProjectDetail] = useState("");
  const [RecruitPositions, setRecruitPositions] = useState("");
  const [RequiredExperience, setRequiredExperience] = useState("");
  const [MeetingLocation, setMeetingLocation] = useState("");
  const [CheckApply, setCheckApply] = useState(false);
  const [IsCompleted, setIsCompleted] = useState(undefined);
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
          alert("유저 정보를 불러오는데 실패했습니다.");
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
          console.log("wr", data.writer);
          setTitle(data.recruitDetail.title);
          setWriter(data.writer.nickname);
          setWriterId(data.writer._id);
          setProjectDetail(data.recruitDetail.projectDetail);
          setRecruitPositions(data.recruitDetail.recruitPositions);
          setRequiredExperience(data.recruitDetail.requiredExperience);
          setMeetingLocation(data.recruitDetail.meetingLocation);
          setIsCompleted(data.recruitDetail.recruitCompleted);
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
          alert("모집글 삭제에 실패했습니다.");
        }
      });
  }

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
    fetch(`${RECRUIT_SERVER}/completion`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
      credentials: "include",
      body: JSON.stringify({
        recruitId: recruitId.toString(),
        title: Title.toString(),
      }),
    }).then((response) => response.json());
  };

  // if user click apply button
  const onApplyHandler = (e) => {
    if (userId) {
      applyRequest(userId, rid);
    } else {
      alert("로그인이 필요한 기능입니다.");
    }
  };

  // if writer click complete button
  const onCompleteHandler = () => {
    if (userId) {
      completeRequest(rid);
    } else {
      alert("로그인이 필요한 기능입니다.");
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

  useEffect(() => {
    fetchRecruitDetail();
    if (userId) {
      fetchUserInfo();
    }
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
      {Title === undefined ? (
        <LoadingOutlined style={{ fontSize: "3rem" }} />
      ) : (
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
            {userId !== WriterId ? (
              CheckApply === false ? (
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
              ) : (
                <Button
                  disabled
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "white",
                    backgroundColor: "gray",
                    width: "4rem",
                    height: "2.5rem",
                    marginRight: "2rem",
                  }}
                >
                  Apply
                </Button>
              )
            ) : IsCompleted === undefined ? (
              <LoadingOutlined style={{ fontSize: "3rem" }} />
            ) : IsCompleted === false ? (
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
            ) : (
              <>
                <Button
                  disabled
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "white",
                    backgroundColor: "gray",
                    width: "4rem",
                    height: "2.5rem",
                    marginRight: "2rem",
                  }}
                >
                  <a href={`/recruit/update/${rid}`}>Edit</a>
                </Button>
                <Button
                  disabled
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "white",
                    backgroundColor: "gray",
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
      )}
    </div>
  );
}

export default RecruitDetailPage;
