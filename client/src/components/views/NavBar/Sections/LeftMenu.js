import React from "react";
import { Menu } from "antd";

function LeftMenu(props) {

  return (
    <Menu mode={props.mode}>
      <Menu.Item key="postions">
        <a href="/">Positions</a>
      </Menu.Item>
      <Menu.Item key="tech-stacks">
        <a href="/">Tech Stacks</a>
      </Menu.Item>
    </Menu>
  );
}

export default LeftMenu;
