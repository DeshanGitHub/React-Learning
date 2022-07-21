import React from "react";
import HomePage from "../pages/Home";
import Login from "../pages/Session/Login";
import NotFound from "../pages/Session/NotFound";
import { Routes, Route } from "react-router-dom";
import FlexBoxLayout from "../pages/Layouts/FlexBox";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<HomePage />} />
      <Route path="login" element={<Login />} />
      <Route path="flex-layout" element={<FlexBoxLayout />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
