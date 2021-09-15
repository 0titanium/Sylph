import React from "react";
import { Menu, Dropdown } from "antd";

function LeftMenu(props) {
  const onPositionsClick = () => {};
  const onTechStacksClick = () => {};

  const positionsMenu = (
    <Menu onClick={onPositionsClick}>
      <Menu.Item key="1">Frontend</Menu.Item>
      <Menu.Item key="2">Backend</Menu.Item>
      <Menu.Item key="3">Full stack</Menu.Item>
      <Menu.Item key="4">iOS</Menu.Item>
      <Menu.Item key="5">Android</Menu.Item>
      <Menu.Item key="6">Game</Menu.Item>
    </Menu>
  );

  const techStacksMenu = (
    <Menu onClick={onTechStacksClick}>
      <Menu.Item key="1">JavaScript</Menu.Item>
      <Menu.Item key="2">Java</Menu.Item>
      <Menu.Item key="3">Python</Menu.Item>
      <Menu.Item key="4">Swift</Menu.Item>
      <Menu.Item key="5">Kotlin</Menu.Item>
      <Menu.Item key="6">php</Menu.Item>
      <Menu.Item key="7">C</Menu.Item>
      <Menu.Item key="8">C++</Menu.Item>
      <Menu.Item key="9">C#</Menu.Item>
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
        <Dropdown overlay={techStacksMenu}>
          <div>Tech Stacks</div>
        </Dropdown>
      </Menu.Item>
    </Menu>
  );
}

export default LeftMenu;
