import React from 'react';
import { Outlet } from 'react-router-dom';
import "../styles/HomeLayout.css";

const HomeLayout = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default HomeLayout;