import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RECRUIT_SERVER } from "../../../Config";

import { Typography, Row, Col, Card } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import styles from "./PagesFiltered.module.css";

function PagesFilteredByLanguages() {
  const { Title } = Typography;
  const [Recruits, setRecruits] = useState(null);
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
            className={styles.card}
          >
            <p>{recruit.projectDetail}</p>
            <p>{recruit.recruitPositions}</p>
          </Card>
        </Col>
      );
    });
  };

  return (
    <div className={styles.container}>
      <Title level={2}>{lname}</Title>
      <hr />
      <Row gutter={(32, 16)} className={styles.row}>
        {Recruits === null ? (
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

export default PagesFilteredByLanguages;
