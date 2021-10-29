import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RECRUIT_SERVER } from "../../../Config";
import Alarm from "../Alarm/Alarm";

import { Typography, Row, Col, Card } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import styles from "./PagesFiltered.module.css";

function PagesFilteredByLanguages() {
  const { Title } = Typography;
  const [Recruits, setRecruits] = useState(undefined);
  const [visible, setVisible] = useState(false);
  const [Message, setMessage] = useState(undefined);
  const lname = useParams().lname;

  const fetchRecruits = () => {
    fetch(`${RECRUIT_SERVER}/languages/${lname}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setRecruits(data.recruits);
        } else {
          // alert("모집글을 불러오는데 실패했습니다.");
          setVisible(true);
          setMessage("모집글을 불러오는데 실패했습니다.");
        }
      });
  };

  useEffect(() => {
    fetchRecruits();
  }, []);

  const renderCards = () => {
    return Recruits.reverse().map((recruit, index) => {
      let title =
        recruit.title.length > 25
          ? recruit.title.slice(0, 25) + "..."
          : recruit.title;

      let projectDetail =
        recruit.projectDetail.length > 20
          ? recruit.projectDetail.slice(0, 20) + "..."
          : recruit.projectDetail;

      let recruitPositions = "";

      recruit.recruitPositions.map(
        (position, index) => (recruitPositions += position + " ")
      );

      recruitPositions =
        recruitPositions.length > 25
          ? recruitPositions.slice(0, 25) + "..."
          : recruitPositions;

      return (
        <Col key={index} className={styles.colSt}>
          <Card
            title={title}
            extra={<a href={`/recruit/${recruit._id}`}>More</a>}
            className={styles.oneCard}
          >
            <p>{projectDetail}</p>
            <p>
              {recruit.recruitPositions.map(
                (position, index) => position + " "
              )}
            </p>
          </Card>
        </Col>
      );
    });
  };

  return (
    <div className={styles.landing}>
      <Title level={2}>{lname}</Title>
      <hr />
      <Row gutter={(18, 6)} className={styles.row}>
        {Recruits === undefined ? (
          <LoadingOutlined className={styles.loading} />
        ) : Recruits.length !== 0 ? (
          renderCards()
        ) : (
          <p>모집글이 없습니다.</p>
        )}
      </Row>
      <Alarm message={Message} visible={visible} setVisible={setVisible} />
    </div>
  );
}

export default PagesFilteredByLanguages;
