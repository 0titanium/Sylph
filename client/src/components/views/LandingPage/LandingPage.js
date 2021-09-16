import React, { useEffect, useState } from "react";
import { RECRUIT_SERVER } from "../../../Config";

import { Typography, Row, Col, Card } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

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
          console.log(data.recruits);
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
      return (
        <Col key={index} lg={6} md={8} xs={24}>
          <Card
            title={recruit.title}
            extra={<a href={`/recruit/${recruit._id}`}>More</a>}
            style={{ width: 300 }}
          >
            <p>{recruit.projectDetail}</p>
            <p>{recruit.recruitPositions.map((position, index) => (position+" "))}</p>
          </Card>
        </Col>
      );
    });
  };

  return (
    <div style={{ width: "85%", margin: "3rem auto" }}>
      <Title level={2}>Latest</Title>
      <hr />
      <Row gutter={(32, 16)} style={{ marginTop: "2rem" }}>
        {Recruits === undefined ? (
          <LoadingOutlined style={{ fontSize: "3rem" }} />
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
