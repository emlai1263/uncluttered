/* eslint-disable jsx-a11y/anchor-is-valid */
// Navbar Component - using Tailwind CSS

import { Fragment } from "react";
import { Link } from "react-router-dom";
import { Menu, Transition } from "@headlessui/react";
import Categories from "./Categories";
import { useState } from "react";
import categoryIcon from "./categoryIcon.png";
import bellIcon from "./bell_icon.svg";
import Notification from "./Notification";
import Tooltip from "./Tooltip";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
export default function Navbar() {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header class="fixed bg-white shadow-md z-50 h-20 w-full px-16 py-4 flex justify-between items-center">
      <Link to="/" class="text-2xl font-outfit font-semibold text-blue">
        U
      </Link>
      <div>
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
          <Tooltip message="View Categories" position="below">
            {/* Category Icon Button */}
            <button onClick={() => setIsCategoriesOpen(true)} className="mr-4">
              <img
                src={categoryIcon}
                alt="Categories"
                style={{ width: "32px", height: "32px" }}
              />
            </button>
          </Tooltip>

          <Tooltip message="View Notifications" position="below">
            {/* Notifications Icon */}
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="mr-4"
            >
              <img
                className="size-4"
                src={bellIcon}
                alt="Notifications"
                style={{ width: "24px", height: "24px" }}
              />
            </button>
          </Tooltip>
          {/* Notification Panel */}
          {showNotifications && <Notification />}
          {/* Profile dropdown */}
          {/* Search Bar */}
          <input
            className="bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-md px-3 py-2 text-sm font-normal"
            type="text"
            placeholder="Search.."
            name="search"
          />

          <Menu as="div" className="relative ml-3">
            <div>
              <Menu.Button className="relative flex rounded-full bg-white text-sm">
                <span className="absolute -inset-1.5" />
                <span className="sr-only">Open user menu</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="gray"
                  class="w-8 h-8"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={classNames(
                        active ? "bg-gray-100" : "",
                        "block px-4 py-2 text-sm text-gray-700",
                      )}
                    >
                      Settings
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={classNames(
                        active ? "bg-gray-100" : "",
                        "block px-4 py-2 text-sm text-gray-700",
                      )}
                    >
                      Sign out
                    </a>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
      <Categories
        isOpen={isCategoriesOpen}
        onClose={() => setIsCategoriesOpen(false)}
      />
    </header>
  );
}
