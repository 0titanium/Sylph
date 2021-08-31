import React, { useEffect } from "react";
import { Descriptions, Button } from "antd";

function MyInfo() {
  const fetchUserInfo = () => {};

  useEffect(() => {}, []);

  return (
    <div style={{ height: "100%" }}>
    <Descriptions bordered title="User Info" size="default" layout="vertical" extra={<Button type="primary">Edit</Button>}>
        <Descriptions.Item label="image">user image</Descriptions.Item>
        <Descriptions.Item label="id">user id</Descriptions.Item>
        <Descriptions.Item label="nickname">user nickname</Descriptions.Item>
        <Descriptions.Item label="position">user position</Descriptions.Item>
        <Descriptions.Item label="skills">user skills</Descriptions.Item>
        <Descriptions.Item label="careers">user careers</Descriptions.Item>
    </Descriptions> 
      {/* <a href="/">update</a>

      <div>
        <div>user image, id</div>
        <div>user nickname</div>
        <div>user position</div>
        <div>user skills</div>
        <div>user careers</div>
      </div> */}
    </div>
  );
}

export default MyInfo;
