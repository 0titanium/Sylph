import React from "react";
import MyInfo from "./Sections/MyInfo";
import MyRecruit from "./Sections/MyRecruit";
import ApplyTo from "./Sections/ApplyTo";
import ApplyFor from "./Sections/ApplyFor";

import { Tabs } from "antd";

function MyPage() {
  const { TabPane } = Tabs;

  return (
    <div style={{ width: "65%", height: "80vh", margin: "3rem auto" }}>
      <Tabs defaultActiveKey="1">
        <TabPane tab="My Info" key="1">
          <MyInfo />
        </TabPane>
        <TabPane tab="My Recruit" key="2">
          <MyRecruit />
        </TabPane>
        <TabPane tab="Apply To" key="3">
          <ApplyTo />
        </TabPane>
        <TabPane tab="Apply For" key="4">
          <ApplyFor />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default MyPage;
