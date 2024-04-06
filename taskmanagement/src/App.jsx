import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useEffect, useState, useRef } from "react";
import PopupWindow from './PopupWindow';
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
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
  const [allEvents, setAllEvents] = useState(events);
  const [isNewEventPopupOpen, setIsNewEventPopupOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null); // Create a ref for the hamburger menu

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false); // Close the hamburger menu if click occurs outside
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleAddEvent = (newEvent) => {

    // Check that the fields are not empty
    var checker = newEvent.end.toString().length > 0 && newEvent.start.toString().length > 0 && newEvent.title.length > 0;
    if(!checker)
      return;

    newEvent.start = new Date(newEvent.start);
    newEvent.end = new Date(newEvent.end);

    setAllEvents([...allEvents, newEvent]);

    // Set cookies
    setCookie(newEvent.title, newEvent);
  }

  function handleDeleteEvent(eventId) {
    setAllEvents(prevEvents => prevEvents.filter(event => event !== eventId))

    // Delete cookies
    deleteCookie(eventId.title, eventId);
  };

  const handleClearEvents = () => {
    setAllEvents([]); // Clear all events
    setIsMenuOpen(false);

    // Clear all cookies
    document.cookie.split(";").forEach(cookie => {
      document.cookie = cookie
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
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

  const handleOpenPopup = () => {
    setIsNewEventPopupOpen(true);
    setIsMenuOpen(false); // Close the hamburger menu when opening the popup
  };

  return (
    <>
      <div className="App">

        <div ref={menuRef} className={`menuContainer ${isMenuOpen ? 'open' : ''}`}>
          <button className="menuButton" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            &#9776;
          </button>
          {isMenuOpen && (
            <div className="dropdownMenu">
              <button className="menuItem" onClick={handleClearEvents}>
                Clear All Events
              </button>
              <button className="menuItem" onClick={handleOpenPopup}>
                Add New Event
              </button>
            </div>
          )}
        </div>
        <h1>Calendar</h1>

        {/* Render the PopupWindow component */}
        <PopupWindow isOpen={isNewEventPopupOpen} onClose={() => setIsNewEventPopupOpen(false)} onSave={handleAddEvent} />

        <div className="CalendarContainer">
          <Calendar className="Calendar" localizer={localizer} events={allEvents} startAccessor="start" endAccessor="end" onSelectEvent={handleDeleteEvent} />
        </div>

      </div>
    </>
  )
}

export default App;
