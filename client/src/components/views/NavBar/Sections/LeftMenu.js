import React from "react";
import { Menu, Dropdown } from "antd";

function LeftMenu(props) {
  const onPositionsClick = () => {
    console.log("all");
  };
  const onLanguagesClick = () => {};

  const positionsMenu = (
    <Menu>
      <Menu.Item key="1" onClick={onPositionsClick}>
        Frontend
      </Menu.Item>
      <Menu.Item key="2">Backend</Menu.Item>
      <Menu.Item key="3">Full stack</Menu.Item>
      <Menu.Item key="4">iOS</Menu.Item>
      <Menu.Item key="5">Android</Menu.Item>
      <Menu.Item key="6">Game Client</Menu.Item>
      <Menu.Item key="7">Game Server</Menu.Item>
    </Menu>
  );

  const languagesMenu = (
    <Menu onClick={onLanguagesClick}>
      <Menu.Item key="1">JavaScript</Menu.Item>
      <Menu.Item key="2">TypeScript</Menu.Item>
      <Menu.Item key="3">Java</Menu.Item>
      <Menu.Item key="4">Python</Menu.Item>
      <Menu.Item key="5">Swift</Menu.Item>
      <Menu.Item key="6">Kotlin</Menu.Item>
      <Menu.Item key="7">php</Menu.Item>
      <Menu.Item key="8">C</Menu.Item>
      <Menu.Item key="9">C++</Menu.Item>
      <Menu.Item key="10">C#</Menu.Item>
    </Menu>
  );

  return (
    <Menu mode={props.mode}>
      <Menu.Item key="postions">
        <Dropdown overlay={positionsMenu}>
          <div>Positions</div>
        </Dropdown>
      </Menu.Item>
      <Menu.Item key="tech-stacks">
        <Dropdown overlay={languagesMenu}>
          <div>Languages</div>
        </Dropdown>
      </Menu.Item>
    </Menu>
  );
}

export default LeftMenu;
