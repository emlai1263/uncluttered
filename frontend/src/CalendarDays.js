import React, { useState } from "react";

function CalendarDays(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [mousePosition, setMousePosition] = useState(0);

  const mouseClick = (e) => {
    setMousePosition(e.clientX);
  };

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleDayClick = (day) => {
    const tasksForDay = props.tasks.filter((task) => {
      const taskDateStr = new Date(task.dueDate).toDateString();
      const dayDateStr = day.date.toDateString();
      return taskDateStr === dayDateStr;
    });

    if (tasksForDay.length > 3) {
      setSelectedTasks(tasksForDay);
      toggleModal();
    } else {
      props.changeCurrentDay(day);
    }
  };

  let firstDayOfMonth = new Date(
    props.day.getFullYear(),
    props.day.getMonth(),
    1,
  );
  let weekdayOfFirstDay = firstDayOfMonth.getDay();
  let currentDays = [];

  for (let day = 0; day < 35; day++) {
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
          return taskDateStr === dayDateStr;
        });

        return (
          <div
            key={`${day.year}-${day.month}-${day.number}`}
            className={
              "calendar-day w-32 h-32 p-2 border-x-2 border-y-2" +
              (day.currentMonth ? " current" : "") +
              (day.selected ? " selected" : "")
            }
            onClick={() => handleDayClick(day)}
          >
            <p className="text-right mr-2">{day.number}</p>
            {tasksForDay.slice(0, 3).map((task) => (
              <div key={task._id}>
                <p className="mt-0 mb-0 text bg-sky rounded-md">
                  <small>
                    <small className="mt-0">{task.title}</small>
                  </small>
                </p>
              </div>
            ))}
            {tasksForDay.length > 3 && (
              <button
                className="see-more-button text"
                onClick={() => handleDayClick(day)}
              >
                See more
              </button>
            )}
          </div>
        );
      })}
      {modalVisible && (
        <div className="modal absolute left-100">
          <div className="modal-content">
            <span className="close" onClick={toggleModal}>
              &times;
            </span>
            <div className="modal-body bg-white size-72 text-3xl border-2">
              <h4>Tasks for the day:</h4>
              {selectedTasks.map((task) => (
                <div key={task._id}>
                  <p className="mt-0 mb-0 text bg-sky rounded-md">
                    {task.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default CalendarDays;
