/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signoutUser } from "../../../../_actions/user_action";
import { Menu, Dropdown, Avatar } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { USER_SERVER } from "../../../../Config";
import Alarm from "../../Alarm/Alarm";

function RightMenu(props) {
  const userId = window.localStorage.getItem("user_id");
  const dispatch = useDispatch();
  const [UserNickame, setUserNickame] = useState("");
  const [UserImage, setUserImage] = useState("");
  const [CheckRecruit, setCheckRecruit] = useState(undefined);
  const [visible, setVisible] = useState(false);
  const [Message, setMessage] = useState(undefined);

  const fetchUser = () => {
    fetch(`${USER_SERVER}/userInfo/${userId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setUserImage(data.user[0].image);
          setUserNickame(data.user[0].nickname);
          setCheckRecruit(data.user[0].recruitWriting);
        } else {
          // alert("유저 정보를 불러오는데 실패했습니다.");
          setVisible(true);
          setMessage("유저 정보를 불러오는 것에 실패했습니다.");
        }
      });
  };

  useEffect(() => {
    if (userId) {
      fetchUser();
    }
  }, [userId]);

  const signoutHandler = () => {
    let data = window.localStorage.getItem("x_auth");

    dispatch(signoutUser(data)).then((response) => {
      console.log(response.payload);
      if (response.payload.signoutSuccess) {
        setUserImage("");
        setUserNickame("");
        window.localStorage.removeItem("x_auth");
        window.localStorage.removeItem("user_id");
        props.history.push("/signin"); // withRouter 필요
      } else {
        // alert("sign out에 실패했습니다.");
        setVisible(true);
        setMessage("sign out에 실패했습니다.");
      }
    });
  };

  const onCheckHandler = () => {
    fetchUser();
    setCheckRecruit(CheckRecruit);

    if (CheckRecruit === null || CheckRecruit === undefined) {
      window.location.href = "/recruit/post";
    } else {
      // alert("하나의 프로젝트 팀원만 모집할 수 있습니다.");
      setVisible(true);
      setMessage("하나의 프로젝트 팀원만 모집할 수 있습니다.");
    }
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
      <>
        <Menu mode={props.mode}>
          <Menu.Item key="recruit" onClick={onCheckHandler}>
            <a>Recruit</a>
          </Menu.Item>
          {/* avatar + name - click - dropdown - mypage, logout */}
          <Menu.Item key="dropdwon">
            <Dropdown overlay={menu} trigger={["click"]}>
              <a
                className="ant-dropdown-link"
                onClick={(e) => e.preventDefault()}
              >
                <Avatar
                  className="nav-avatar"
                  src={UserImage}
                  style={{ marginRight: "7px" }}
                />
                <p style={{ display: "inline" }}>{UserNickame}</p>
                <DownOutlined style={{ marginLeft: "5px" }} />
              </a>
            </Dropdown>
          </Menu.Item>
        </Menu>
        <Alarm message={Message} visible={visible} setVisible={setVisible} />
      </>
    );
  }
}

export default withRouter(RightMenu);
