import { Routes, Route } from "react-router-dom";
import React from "react";
import { route } from "./route";
import Formpage from "../pages/formPage";

const Router = () => {
  return (
    <Routes>
      {/* default */}
      <Route path={route.default} element={<Formpage />} />
    </Routes>
  );
};

export default Router;
