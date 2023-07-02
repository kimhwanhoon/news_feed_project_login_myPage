import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from 'pages/Home';
import ProfilePage from 'pages/ProfilePage';

const Router = () => {
  return (
    // 보일러플레이트
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile-page/user/:id" element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
