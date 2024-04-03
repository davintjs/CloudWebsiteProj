import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Cookies from 'universal-cookie';
import moment from "moment";
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

let events = [];

function App() {
  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
  const [allEvents, setAllEvents] = useState(events);

  // Load cookies once on component mount
  useEffect(() => {
    const cookies = new Cookies();
    const res = cookies.getAll();

    let tempEventArray = [];

    Object.entries(res).forEach(([cookieName, cookieValue]) => {
      const { title, start, end } = cookieValue;
      tempEventArray.push(
        {
          title: title,
          start: moment(start).toDate(),
          end: moment(end).toDate(),
        }
      )
    });

    setAllEvents(tempEventArray);
    
  }, []);

  function handleAddEvent() {
    var date = new Date(newEvent.end);
    date.setDate(date.getDate() + 1);
    newEvent.end = date;

    setAllEvents([...allEvents, newEvent]);

    // Set cookies
    setCookie(newEvent.title, newEvent);
  }

  function handleDeleteEvent(eventId) {
    setAllEvents(prevEvents => prevEvents.filter(event => event !== eventId))

    // Delete cookies
    deleteCookie(eventId.title, eventId);
  };

  function setCookie(cookieName, cookieValue)
  {
    const cookies = new Cookies(null, { path : '/' });
    const eventAsString = JSON.stringify(cookieValue)
    cookies.set(cookieName, eventAsString);
  }

  function deleteCookie(cookieName, cookieValue)
  {
    const cookies = new Cookies(null, { path : '/' });
    const eventAsString = JSON.stringify(cookieValue)
    cookies.remove(cookieName, eventAsString);
  }

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
