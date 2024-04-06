import React, { useState } from 'react';
import "./PopupWindow.css";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
import moment from "moment";

const PopupWindow = ({ isOpen, onClose, onSave }) => {
  const [newEvent, setNewEvent] = useState({ title: "", start: moment(), end: moment() });

  const handleSave = () => {
    onSave(newEvent);
    setNewEvent({ title: '', start: moment(), end: moment()});
    onClose();
  };

  return (
      <div className={`popupWindow ${isOpen ? 'open' : ''}`}>
      <div className="popupContent">
        <h2>Add New Event</h2>

        <div className="TopBar">
          <ul>
            <li className="ListItem1">
              <input className="InputBox" type="text" placeholder="Event Title" value={newEvent.title} onChange={(mEvent) => setNewEvent({ ...newEvent, title: mEvent.target.value })} />
            </li>

            <li className="ListItem2">
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DateTimePicker
                    className="StartDate" label="Start Date & Time" 
                    viewRenderers={{
                        hours: renderTimeViewClock,
                        minutes: renderTimeViewClock,
                        seconds: renderTimeViewClock,
                    }}
                    selected={newEvent.start} onChange={(event) => setNewEvent({ ...newEvent, start: event})}
                    value={newEvent.start}
                    closeOnSelect={false}
                />
            </LocalizationProvider>
            </li>

            <li className="ListItem3">
            <LocalizationProvider dateAdapter={AdapterMoment}>
                <DateTimePicker
                    className="EndDate" label="End Date & Time" 
                    viewRenderers={{
                        hours: renderTimeViewClock,
                        minutes: renderTimeViewClock,
                        seconds: renderTimeViewClock,
                    }}
                    selected={newEvent.end} onChange={(event) => setNewEvent({ ...newEvent, end: event})}
                    value={newEvent.end}
                    closeOnSelect={false}
                />
            </LocalizationProvider>
            </li>

            <li className="ListItem4">
              <button className="AddEventButton" onClick={handleSave}>
                Add Event
              </button>
            </li>
          </ul>
        </div>

      </div>
    </div>
  );
};

export default PopupWindow;
