import React, { useEffect, useState } from "react";

import { Button, Modal, Descriptions } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import styles from "./ViewProfile.module.css";

function ViewProfile(props) {
  const [visible, setVisible] = useState(false);

  const [UserData, setUserData] = useState(undefined);

  useEffect(() => {
    setUserData(props.userData);
  }, [props.userData]);

  return (
    <>
      <Button
        className={styles.btn}
        type="primary"
        onClick={() => setVisible(true)}
      >
        프로필 확인
      </Button>
      <Modal
        title="지원자 프로필"
        centered
        visible={visible}
        onOk={() => setVisible(false)}
        okButtonProps={{
          style: {
            display: "flex",
            margin: "auto",
          },
        }}
        cancelButtonProps={{ style: { display: "none" } }}
        width={800}
      >
        {UserData === undefined ? (
          <LoadingOutlined className={styles.loading} />
        ) : (
          <Descriptions bordered size="default" column={1}>
            <Descriptions.Item label="image" labelStyle={{ width: "100px" }}>
              {UserData.image}
            </Descriptions.Item>
            <Descriptions.Item label="id">{UserData.id}</Descriptions.Item>
            <Descriptions.Item label="nickname">
              {UserData.nickname}
            </Descriptions.Item>
            <Descriptions.Item label="position">
              {UserData.position}
            </Descriptions.Item>
            <Descriptions.Item label="skills">
              {UserData.skills.map((skill, index) => skill + " ")}
            </Descriptions.Item>
            <Descriptions.Item label="careers">
              {UserData.careers}
            </Descriptions.Item>
            <Descriptions.Item label="GitHub Address">
              <a href={UserData.githubaddress} target="_blank" rel="noreferrer">
                {UserData.githubaddress}
              </a>
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </>
  );
}

export default ViewProfile;
