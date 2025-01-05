import React, { useEffect, useState, useMemo } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import axios from "axios";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import styles from "./Booking.module.css";

const locales = {
  "en-US": require("date-fns/locale/en-US"),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const BookableCalendar = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/bookings")
      .then((response) => setBookings(response.data.map((booking) => ({
        ...booking,
        start: convertToLocalTime(booking.start_time),
        end: convertToLocalTime(booking.end_time),
      }))))
      .catch((error) => console.error("Error fetching bookings:", error, error.response));
  }, []);
  
  
  const convertToLocalTime = (utcDate) => {
    const date = new Date(utcDate);
    return new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    
  };

  const handleSelectSlot = ({ start, end }) => {

    const dayDifference = (new Date(end) - new Date(start)) / (1000 * 60 * 60 * 24);

    if (dayDifference < 3) {
      alert("The minimum rental period is 3 days. Please select a longer duration.");
      return; 
    }
    const isOverlapping = bookings.some(
      (booking) =>
        (start < new Date(booking.end) && end > new Date(booking.start)) 
    );
  
    if (isOverlapping) {
      alert("This date range is already booked. Please choose another time.");
      return; 
    }
  
    const amount = prompt("Enter amount of people staying:");
    const booked_by = prompt("Enter your name or email:");
    if (amount && booked_by) {
      const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;

      const newBooking = {
        amount,
        booked_by,
        start_time: start.toISOString().slice(0, 19).replace("T", " "),
        end_time: end.toISOString().slice(0, 19).replace("T", " "),

        color: randomColor,
      };
      axios
        .post("http://localhost:5000/bookings", newBooking)
        .then(() => setBookings((prev) => [...prev, { ...newBooking, start, end }]))
        .catch((error) => console.error("Error adding booking:", error));
    }
  };

 const handleDeleteBooking = (id) => {
    axios
      .delete(`http://localhost:5000/bookings/${id}`)
      .then(() => setBookings((prev) => prev.filter((booking) => booking.id !== id)))
      .catch((error) => console.error("Error deleting booking:", error));
  }


  const bookingStyleGetter = (booking) => ({
    className: styles.booking,
    style: { backgroundColor: booking.color || "#8d6cb3" },
  });

  return (
    <div className={styles.calendarContainer}>
      <h2 className={styles.calendarHeader}>Apartment Bookings</h2>
      <Calendar
  localizer={localizer}
  events={bookings}
  startAccessor="start"
  endAccessor="end"
  selectable
  onSelectSlot={handleSelectSlot}
  onSelectEvent={(booking) => {
    const confirmation = window.confirm(`Do you want to delete this booking for ${booking.amount}?`);
    if (confirmation) {
      handleDeleteBooking(booking.id);
    }
  }}
  
  views={["month", "week", "day", "agenda"]}
  eventPropGetter={bookingStyleGetter}
  className={styles.calendar}
  dayPropGetter={(date) => {
    const isBooked = bookings.some(
      (booking) =>
        date >= new Date(booking.start).setHours(0, 0, 0, 0) &&
        date <= new Date(booking.end).setHours(0, 0, 0, 0)
    );
    return {
      className: isBooked ? styles.bookedDay : "",
      style: isBooked ? { backgroundColor: "#2e2e2e86", color: "#fff" } : {},
    };
  }}
/>


    </div>
  );
};

export default BookableCalendar;
