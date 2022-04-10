import React from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import PreloaderWrapper from "@components/PreloaderWrapper";
import StageRoute from "./StageRoute";
import StageRedirect from "./StageRedirect";
import { SignUpPage } from "@pages/SignUp";
import { LoginPage } from "@pages/Login";
import MainPage from "@pages/MainPage";
import MainElement from "./MainElement";
import Logout from "./Logout";
import "react-toastify/dist/ReactToastify.css";

const App = () => (
  <>
    <PreloaderWrapper>
      <Router>
        <Routes>
          <Route path="/" element={<MainElement />}>
            <Route index element={<MainPage />} />
          </Route>
          <Route
            element={
              <StageRoute stage={-1}>
                <Outlet />
              </StageRoute>
            }
          >
            <Route exact path="/sign_up" element={<SignUpPage />} />
            <Route exact path="/login" element={<LoginPage />} />
          </Route>
          <Route exact path="/logout" element={<Logout />} />
          <Route from="*" element={<StageRedirect />} />
        </Routes>
      </Router>
    </PreloaderWrapper>
    <ToastContainer />
  </>
);

export default App;
