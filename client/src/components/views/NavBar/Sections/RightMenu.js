/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signoutUser } from "../../../../_actions/user_action";
import { Menu, Dropdown, Avatar } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { getCookie } from "../../../../utils/getCookie";
import { USER_SERVER } from "../../../../Config";

function RightMenu(props) {
  const userId = getCookie("user_id", document.cookie);
  const dispatch = useDispatch();
  const [UserNickame, setUserNickame] = useState("");
  const [UserImage, setUserImage] = useState("");
  const userInfo = {
    userId: userId,
  };

  const fetchUser = (userInfo) => {
    // Axios.post(`${USER_SERVER}/userInfo`, userInfo).then((response) => {
    //   if (response.data.success) {
    //     console.log(response.data);
    //     if (response.data.userName) {
    //       setUserName(response.data.userName);
    //     }
    //     setUserImage(response.data.userImage);
    //   } else {
    //     alert("사용자 정보를 불러오는데 실패했습니다.");
    //   }
    // });
  };

  useEffect(() => {
    if (userId) {
      fetchUser(userInfo);
    }
  }, [userInfo, userId]);

  const signoutHandler = () => {
    dispatch(signoutUser()).then((response) => {
      if (response.payload.signoutSuccess) {
        setUserImage("");
        setUserNickame("");
        props.history.push("/signin"); // withRouter 필요
      } else {
        alert("Error");
      }
    });
  };

  const menu = (
    <Menu>
      <Menu.Item key="0">
        <a href="/mypage">My Page</a>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="1">
        <a onClick={signoutHandler}>Sign out</a>
      </Menu.Item>
    </Menu>
  );

  if (!userId) {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="signin">
          <a href="/signin">Signin</a>
        </Menu.Item>
        <Menu.Item key="signup">
          <a href="/signup">Signup</a>
        </Menu.Item>
      </Menu>
    );
  } else {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="recruit">
          <a href="/">Recruit</a>
        </Menu.Item>
        {/* avatar + name - click - dropdown - mypage, logout */}
        <Dropdown overlay={menu} trigger={["click"]}>
          <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
            <Avatar src={UserImage} style={{ marginRight: "7px" }} />
            <p style={{ display: "inline" }}>{UserNickame}</p>
            <DownOutlined style={{ marginLeft: "5px" }} />
          </a>
        </Dropdown>
      </Menu>
    );
  }
}

export default withRouter(RightMenu);
