import React, { Component } from "react";
import CalendarDays from "./CalendarDays";
import "./Calendar.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

export default class Calendar extends Component {
  constructor() {
    super();
    this.weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    this.months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    this.state = {
      currentDay: new Date(),
    };
  }

  changeCurrentDay = (day) => {
    this.setState({ currentDay: new Date(day.year, day.month, day.number) });
  };

  nextMonth = () => {
    const { currentDay } = this.state;
    const nextMonth = new Date(
      currentDay.getFullYear(),
      currentDay.getMonth() + 1,
      1
    );
    this.setState({ currentDay: nextMonth });
  };

  prevMonth = () => {
    const { currentDay } = this.state;
    const prevMonth = new Date(
      currentDay.getFullYear(),
      currentDay.getMonth() - 1,
      1
    );
    this.setState({ currentDay: prevMonth });
  };

  render() {
    return (
      <div className="calendar">
        <div className="fixed z-0 flex flex-wrap bg-white w-screen min-h-screen"></div>
        <Navbar />
        <Sidebar />
        <div className="calendar-container mt-32 z-50">
          <div className="calendar-header">
            <button onClick={this.prevMonth}>←</button>
            <h2>
              {this.months[this.state.currentDay.getMonth()]}
              {this.state.currentDay.getFullYear()}
            </h2>
            <button onClick={this.nextMonth}>→</button>
          </div>

          <div className="calendar-body">
            <div className="table-header">
              {this.weekdays.map((weekday) => {
                return (
                  <div className="weekday">
                    <p>{weekday}</p>
                  </div>
                );
              })}
            </div>
            {
              <CalendarDays
                day={this.state.currentDay}
                changeCurrentDay={this.changeCurrentDay}
              />
            }
          </div>
        </div>
      </div>
    );
  }
}
