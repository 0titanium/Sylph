import React, { Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./components/views/NavBar/NavBar";
import LandingPage from "./components/views/LandingPage/LandingPage";
import SignUpPage from "./components/views/SignUpPage/SignUpPage";
import SignInPage from "./components/views/SignInPage/SignInPage";
import Footer from "./components/views/Footer/Footer";

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NavBar />
      <div style={{ paddingTop: "69px", minHeight: "calc(100vh - 80px)" }}>
        <Switch>
          {/* <Route exact path="/" component={Auth(LandingPage, null)} /> */}
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/signup" component={SignUpPage} />
          <Route exact path="/signin" component={SignInPage} />
        </Switch>
      </div>
      <Footer />
    </Suspense>
  );
}

export default App;
