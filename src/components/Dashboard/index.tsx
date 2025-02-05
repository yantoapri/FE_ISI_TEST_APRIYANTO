"use client"
import { useEffect } from "react";
import Breadcrumb from "../Breadcrumbs/Breadcrumb";

const Dashboard = () => {

  return (
    <div className="mx-auto max-w-7xl">
      <Breadcrumb pageName="" />

      <div className="grid grid-cols-12 gap-2 md:gap-2 2xl:gap-7.5 text-center">
        <h2>HELLO WORD</h2>
      </div>
    </div>
  );
};

export default Dashboard;
