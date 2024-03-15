import React from "react";

function CalendarDays(props) {
  let firstDayOfMonth = new Date(
    props.day.getFullYear(),
    props.day.getMonth(),
    1,
  );
  let weekdayOfFirstDay = firstDayOfMonth.getDay();
  let currentDays = [];

  for (let day = 0; day < 42; day++) {
    if (day === 0 && weekdayOfFirstDay === 0) {
      firstDayOfMonth.setDate(firstDayOfMonth.getDate() - 7);
    } else if (day === 0) {
      firstDayOfMonth.setDate(
        firstDayOfMonth.getDate() + (day - weekdayOfFirstDay),
      );
    } else {
      firstDayOfMonth.setDate(firstDayOfMonth.getDate() + 1);
    }

    let calendarDay = {
      currentMonth: firstDayOfMonth.getMonth() === props.day.getMonth(),
      date: new Date(firstDayOfMonth),
      month: firstDayOfMonth.getMonth(),
      number: firstDayOfMonth.getDate(),
      selected: firstDayOfMonth.toDateString() === props.day.toDateString(),
      year: firstDayOfMonth.getFullYear(),
    };

    currentDays.push(calendarDay);
  }

  return (
    <div className="table-content">
      {currentDays.map((day) => {
        const tasksForDay = props.tasks.filter((task) => {
          const taskDateStr = new Date(task.dueDate).toDateString();
          const dayDateStr = day.date.toDateString();
          // console.log("Task Date:", taskDateStr);
          // console.log("Day Date:", dayDateStr);
          return taskDateStr === dayDateStr;
        });
        // console.log("Tasks for day", day.number, ":", tasksForDay);
        return (
          <div
            key={`${day.year}-${day.month}-${day.number}`}
            className={
              "calendar-day" +
              (day.currentMonth ? " current" : "") +
              (day.selected ? " selected" : "")
            }
            onClick={() => props.changeCurrentDay(day)}
          >
            <p>{day.number}</p>
            {tasksForDay.map((task) => (
              <div key={task._id}>
                <p style={{ margin: "0rem 0" }}>
                  <small>
                    <small>{task.title}</small>
                  </small>
                </p>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}

export default CalendarDays;
