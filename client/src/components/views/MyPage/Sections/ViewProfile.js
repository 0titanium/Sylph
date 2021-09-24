import React, { useEffect, useState } from "react";
import { Button, Modal, Descriptions } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

function ViewProfile(props) {
  const [visible, setVisible] = useState(false);

  const [UserData, setUserData] = useState(undefined);

  useEffect(() => {
    setUserData(props.userData);
  }, [props.userData]);

  return (
    <>
      <Button
        style={{ marginLeft: "1rem" }}
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
        onCancel={() => setVisible(false)}
        width={800}
      >
        {UserData === undefined ? (
          <LoadingOutlined style={{ fontSize: "3rem" }} />
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
              {UserData.githubaddress}
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </>
  );
}

export default ViewProfile;
