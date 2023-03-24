import React from "react";
import { Route, Routes } from "react-router";
import AddPersonPage from "../pages/AddPersonPage";
import HomePage from "../pages/HomePage";

const AppRouter = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/addPerson" element={<AddPersonPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </div>
  );
};

export default AppRouter;
