import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";

const Home = () => {
  return (
    <div className="flex flex-col bg-gray-200">
      <div className="flex">
        <Navbar />
      </div>
      {/* Sidebar */}
      <div class="flex">
        <Sidebar />
      </div>
    </div>
  );
};

export default Home;
