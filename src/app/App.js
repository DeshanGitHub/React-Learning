import React from "react";
import HomePage from "../pages/Home";
import Login from "../pages/Session/Login";
import NotFound from "../pages/Session/NotFound";
import { Routes, Route } from "react-router-dom";
import FlexBoxLayout from "../pages/Layouts/FlexBox";
import GridLayout from "../pages/Layouts/Grid";
import Posts from "../../src/pages/posts";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<HomePage />} />
      <Route exact path="posts" element={<Posts />} />
      <Route path="login" element={<Login />} />
      <Route path="flex-layout" element={<FlexBoxLayout />} />
      <Route path="grid-layout" element={<GridLayout />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
