import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./App.css";

const locales = {
  "en-US": require("date-fns/locale/en-US"),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales
});

const events = [];

function App() {
  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
  const [allEvents, setAllEvents] = useState(events);

  function handleAddEvent() {
    setAllEvents([...allEvents, newEvent]);

    // Set cookies
  }

  function handleDeleteEvent(eventId) {
    const updatedEvents = events.filter(event => event.id !== eventId);
    setAllEvents(updatedEvents);
  };

  return (
    <>
      <div className="App">

        <h1>Calendar</h1>

        <h2>Add New Event</h2>

        <div className="TopBar">
          <ul>
            <li className="ListItem1">
              <input className="InputBox" type="text" placeholder="Event Title" value={newEvent.title} onChange={(mEvent) => setNewEvent({ ...newEvent, title: mEvent.target.value })} />
            </li>

            <li className="ListItem2">
              <DatePicker className="StartDate" placeholderText="Start Date" selected={newEvent.start} onChange={(start) => setNewEvent({ ...newEvent, start })} />
            </li>

            <li className="ListItem3">
              <DatePicker className="EndDate" placeholderText="End Date" selected={newEvent.end} onChange={(end) => setNewEvent({ ...newEvent, end })} />
            </li>

            <li className="ListItem4">
              <button className="AddEventButton" onClick={handleAddEvent}>
                Add Event
              </button>
            </li>
          </ul>
        </div>

        <div className="CalendarContainer">
          <Calendar className="Calendar" localizer={localizer} events={allEvents} startAccessor="start" endAccessor="end" onSelectEvent={handleDeleteEvent} />
        </div>

      </div>
    </>
  )
}

export default App;
