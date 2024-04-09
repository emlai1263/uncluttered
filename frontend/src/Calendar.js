import React, { useEffect, useState } from "react";
import CalendarDays from "./CalendarDays";
import "./Calendar.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import axios from "axios";

export default function Calendar() {
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January ",
    "February ",
    "March ",
    "April ",
    "May ",
    "June ",
    "July ",
    "August ",
    "September ",
    "October ",
    "November ",
    "December ",
  ];

  const [currentDay, setCurrentDay] = useState(new Date());
  const [tasks, setTasks] = useState([]);
  const userId = "65e6328a68059ab797224e0f";

  function changeCurrentDay(day) {
    console.log(day);
    setCurrentDay(new Date(day.year, day.month, day.number));
  }

  function nextMonth() {
    //const { currentDay } = this.state;
    const nextMonth = new Date(
      currentDay.getFullYear(),
      currentDay.getMonth() + 1,
      1,
    );
    setCurrentDay(nextMonth);
  }

  function prevMonth() {
    // const { currentDay } = this.state;
    const prevMonth = new Date(
      currentDay.getFullYear(),
      currentDay.getMonth() - 1,
      1,
    );
    setCurrentDay(prevMonth);
  }

  useEffect(() => {
    fetchAll().then((result) => {
      if (result) console.log(result);
      setTasks(result);
    });
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function fetchAll() {
    console.log("in fetchall");
    try {
      const response = await axios.get(
        "http://localhost:8000/tasks/65e6328a68059ab797224e0f",
      );
      return response.data.users;
    } catch (error) {
      //We're not handling errors. Just logging into the console.
      console.log(error);
      return [];
    }
  }
  return (
    <div className="calendar font-outfit">
      <div className="fixed z-0 flex bg-white w-screen min-h-screen"></div>
      <Navbar className="z-0" />
      <Sidebar />
      <div className="scale-75">
        <div className="flex justify-between items-center">
          <button
            className="px-2 py-2 rounded-sm text-3xl text-left text-white bg-blue"
            onClick={prevMonth}
          >
            ←
          </button>
          <div className="px-4 py-4 mx-8 my-8">
            <h2 className="flex text-6xl mx-auto mb-2 font-bold text-blue bg-white py-10 items-center">
              {months[currentDay.getMonth()]}&nbsp;
              {currentDay.getFullYear()}
            </h2>
          </div>
          <button
            className="px-2 py-2 rounded-sm text-3xl text-right text-white bg-blue"
            onClick={nextMonth}
          >
            →
          </button>
        </div>
        <div className="calendar-body border-2 mb-32">
          <div className="table-header border-2">
            {weekdays.map((weekday) => {
              return (
                <div
                  className="weekday bg-lavender px-0 rounded-md"
                  key={weekday}
                >
                  <p className="mb-0">{weekday}</p>
                </div>
              );
            })}
          </div>
          <CalendarDays
            day={currentDay}
            changeCurrentDay={changeCurrentDay}
            tasks={tasks}
          />
        </div>
      </div>
    </div>
  );
}
