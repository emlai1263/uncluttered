import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Dashboard from "./Dashboard";
import { Disclosure, Menu, Transition } from "@headlessui/react";

const Home = () => {
  return (
    <div className="z-0 flex flex-wrap bg-gray-100 w-screen min-h-screen">
      <div className="fixed z-0 flex flex-wrap bg-gray-100 w-screen min-h-screen"></div>
      <div class="z-50 flex h-full ">
        <Navbar />
      </div>
      <div className="z-40 flex">
        <Sidebar />
        <Dashboard />
      </div>
    </div>
  );
};

export default Home;
