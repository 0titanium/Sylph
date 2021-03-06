import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../_actions/user_action";

export default function authFunc(SpecificComponent, option, adminRoute = null) {
  /*
  options
  null => 아무나 출입 가능한 페이지
  true => 로그인한 유저만 출입 가능한 페이지
  false => 로그인한 유저는 출입 불가능한 페이지
  */
  function AuthenticationCheck(props) {
    const dispatch = useDispatch();

    const pushFunc = () => {
      let data =
        window.localStorage.getItem("x_auth") !== ""
          ? window.localStorage.getItem("x_auth")
          : "";

      dispatch(auth(data)).then((response) => {
        // 로그인하지 않은 상태
        if (!response.payload.isAuth) {
          if (option) {
            props.history.push("/signin");
          }
        } else {
          // 로그인한 상태
          if (adminRoute) {
            props.history.push("/");
          } else {
            if (option === false) {
              props.history.push("/");
            }
          }
        }
      });
    };

    useEffect(() => {
      pushFunc();
    }, []);

    return <SpecificComponent {...props} />;
  }
  return AuthenticationCheck;
}
