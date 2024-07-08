import { Routes, Route } from "react-router-dom";
import React from "react";
import { route } from "./route";
import Formpage from "../pages/formPage";
import ResultPage from "../pages/resultPage";

const Router = () => {
  return (
    <Routes>
      {/* default */}
      <Route path={route.default} element={<Formpage />} />
      <Route path={route.result} element={<ResultPage />} />
    </Routes>
  );
};

export default Router;
