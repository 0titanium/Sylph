import React, { useEffect, useState } from "react";
import { Typography, Row, Col, Avatar, Card } from "antd";
import { RECRUIT_SERVER } from "../../../Config";

function LandingPage() {
  const { Title } = Typography;
  const { Meta } = Card;
  const [Recruits, setRecruits] = useState([]);

  const fetchRecruits = () => {
    fetch(`${RECRUIT_SERVER}/latestPosts`, {
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

  const renderCards = Recruits.map((recruit, index) => {
    return (
      <Col key={index} lg={6} md={8} xs={24}>
        <Card
          title={recruit.title}
          extra={<a href={`/recruit/${recruit._id}`}>More</a>}
          style={{ width: 300 }}
        >
          <p>{recruit.projectDetail}</p>
          <p>{recruit.recruitPositions}</p>
        </Card>
      </Col>
    );
  });

  return (
    <div style={{ width: "85%", margin: "3rem auto" }}>
      <Title level={2}>Latest</Title>
      <hr />
      <br />
      <Row gutter={(32, 16)}>{Recruits !== [] && renderCards}</Row>
    </div>
  );
}

export default LandingPage;
