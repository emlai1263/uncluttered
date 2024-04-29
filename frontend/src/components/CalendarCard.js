import React from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

export default function CalendarCard() {
  return (
    <div>
      <Popup
        trigger={<button> See More </button>}
        position="right center"
      ></Popup>
    </div>
  );
}
