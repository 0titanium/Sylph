import React, { Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./components/views/NavBar/NavBar";
import LandingPage from "./components/views/LandingPage/LandingPage";
import SignUpPage from "./components/views/SignUpPage/SignUpPage";
import SignInPage from "./components/views/SignInPage/SignInPage";
import MyPage from "./components/views/MyPage/MyPage";
import RecruitPage from "./components/views/RecruitPage/RecruitPage";
import RecruitDetailPage from "./components/views/RecruitDetailPage/RecruitDetailPage";
import Footer from "./components/views/Footer/Footer";
import Auth from "./hoc/auth";

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NavBar />
      <div style={{ paddingTop: "69px", minHeight: "calc(100vh - 80px)" }}>
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/signup" component={Auth(SignUpPage, false)} />
          <Route exact path="/signin" component={Auth(SignInPage, false)} />
          <Route
            exact
            path="/recruit/post"
            component={Auth(RecruitPage, true)}
          />
          <Route
            exact
            path="/mypage"
            component={Auth(MyPage, true)}
          />
          <Route
            exact
            path="/recruit/:recruitId"
            component={Auth(RecruitDetailPage, null)}
          />
        </Switch>
      </div>
      <Footer />
    </Suspense>
  );
}

export default App;
