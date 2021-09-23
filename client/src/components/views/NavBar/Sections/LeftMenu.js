import React from "react";
import { Menu, Dropdown } from "antd";

function LeftMenu(props) {
  const positionsMenu = (
    <Menu>
      <Menu.Item key="1">
        <a href="/positions/Frontend">Frontend</a>
      </Menu.Item>
      <Menu.Item key="2">
        <a href="/positions/Backend">Backend</a>
      </Menu.Item>
      <Menu.Item key="3">
        <a href="/positions/Fullstack">Full stack</a>
      </Menu.Item>
      <Menu.Item key="4">
        <a href="/positions/iOS">iOS</a>
      </Menu.Item>
      <Menu.Item key="5">
        <a href="/positions/Android">Android</a>
      </Menu.Item>
      <Menu.Item key="6">
        <a href="/positions/GameClient">Game Client</a>
      </Menu.Item>
      <Menu.Item key="7">
        <a href="/positions/GameServer">Game Server</a>
      </Menu.Item>
    </Menu>
  );

  const languagesMenu = (
    <Menu>
      <Menu.Item key="1">
        <a href="/languages/JavaScript">JavaScript</a>
      </Menu.Item>
      <Menu.Item key="2">
        <a href="/languages/TypeScript">TypeScript</a>
      </Menu.Item>
      <Menu.Item key="3">
        <a href="/languages/Java">Java</a>
      </Menu.Item>
      <Menu.Item key="4">
        <a href="/languages/Python">Python</a>
      </Menu.Item>
      <Menu.Item key="5">
        <a href="/languages/Swift">Swift</a>
      </Menu.Item>
      <Menu.Item key="6">
        <a href="/languages/Kotlin">Kotlin</a>
      </Menu.Item>
      <Menu.Item key="7">
        <a href="/languages/php">php</a>
      </Menu.Item>
      <Menu.Item key="8">
        <a href="/languages/C">C</a>
      </Menu.Item>
      <Menu.Item key="9">
        <a href="/languages/C++">C++</a>
      </Menu.Item>
      <Menu.Item key="10">
        <a href="/languages/C#">C#</a>
      </Menu.Item>
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
