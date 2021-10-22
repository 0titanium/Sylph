import React from "react";
import MyInfo from "./Sections/MyInfo";
import MyRecruit from "./Sections/MyRecruit";
import ApplyTo from "./Sections/ApplyTo";
import ApplyFor from "./Sections/ApplyFor";
import ProjectInProgress from "./Sections/ProjectInProgress";

import { Tabs } from "antd";
import styles from "./MyPage.module.css";

function MyPage() {
  const { TabPane } = Tabs;

  return (
    <div className={styles.container}>
      <Tabs defaultActiveKey="1">
        <TabPane tab="My Info" key="1">
          <MyInfo />
        </TabPane>
        <TabPane tab="My Recruit" key="2">
          <MyRecruit />
        </TabPane>
        <TabPane tab="Project In Progress" key="3">
          <ProjectInProgress />
        </TabPane>
        <TabPane tab="Apply To" key="4">
          <ApplyTo />
        </TabPane>
        <TabPane tab="Apply For" key="5">
          <ApplyFor />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default MyPage;
