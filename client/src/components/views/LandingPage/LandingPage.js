import React, { useEffect, useState } from "react";
import { RECRUIT_SERVER } from "../../../Config";

import { Typography, Row, Col, Card } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import styles from "./LandingPage.module.css";

function LandingPage() {
  const { Title } = Typography;
  const [Recruits, setRecruits] = useState(undefined);

  const fetchRecruits = () => {
    fetch(`${RECRUIT_SERVER}/latestRecruits`, {
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
          alert("모집글을 불러오는데 실패했습니다.");
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
        <Col key={index} lg={6} md={8} xs={24}>
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
      <Title level={2}>Latest</Title>
      <hr />
      <Row gutter={(32, 16)} className={styles.row}>
        {Recruits === undefined ? (
          <LoadingOutlined className={styles.loading} />
        ) : Recruits.length !== 0 ? (
          renderCards()
        ) : (
          <p>모집글이 없습니다.</p>
        )}
      </Row>
    </div>
  );
}

export default LandingPage;
