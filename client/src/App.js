import React, { Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./components/views/NavBar/NavBar";
import LandingPage from "./components/views/LandingPage/LandingPage";
import PagesFilteredByPositions from "./components/views/PagesFiltered/PagesFilteredByPositions";
import PagesFilteredByLanguages from "./components/views/PagesFiltered/PagesFilteredByLanguages";
import SignUpPage from "./components/views/SignUpPage/SignUpPage";
import SignInPage from "./components/views/SignInPage/SignInPage";
import MyPage from "./components/views/MyPage/MyPage";
import UpdateMyInfo from "./components/views/UpdateMyInfo/UpdateMyInfo";
import RecruitPage from "./components/views/RecruitPage/RecruitPage";
import RecruitDetailPage from "./components/views/RecruitDetailPage/RecruitDetailPage";
import UpdateRecruitPage from "./components/views/UpdateRecruitPage/UpdateRecruitPage";
import Footer from "./components/views/Footer/Footer";
import Auth from "./hoc/auth";

import styles from "./App.module.css";
import NotFoundPage from "./components/views/NotFoundPage/NotFoundPage";

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NavBar />
      <div className={styles.container}>
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route
            exact
            path="/positions/:pname"
            component={Auth(PagesFilteredByPositions, null)}
          />
          <Route
            exact
            path="/languages/:lname"
            component={Auth(PagesFilteredByLanguages, null)}
          />
          <Route exact path="/signup" component={Auth(SignUpPage, false)} />
          <Route exact path="/signin" component={Auth(SignInPage, false)} />
          <Route
            exact
            path="/recruit/post"
            component={Auth(RecruitPage, true)}
          />
          <Route exact path="/mypage" component={Auth(MyPage, true)} />
          <Route
            exact
            path="/mypage/update"
            component={Auth(UpdateMyInfo, true)}
          />
          <Route
            exact
            path="/recruit/:recruitId"
            component={Auth(RecruitDetailPage, null)}
          />
          <Route
            exact
            path="/recruit/update/:recruitId"
            component={Auth(UpdateRecruitPage, null)}
          />
          <Route path={"*"} component={NotFoundPage} />
        </Switch>
      </div>
      <Footer />
    </Suspense>
  );
}

export default App;
