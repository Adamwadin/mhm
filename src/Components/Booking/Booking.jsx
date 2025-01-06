import React, { useState, useEffect, useContext } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import styles from "./Booking.module.css";
import { useCart } from '../../contexts/CartContext'; 
import Cart from "../Cart/Cart";

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
  const { user, isAuthenticated } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const { cart, addToCart, clearCart } = useCart(); 
  

  useEffect(() => {
    axios
      .get("http://localhost:5000/bookings")
      .then((response) => {
        setBookings(
          response.data.map((booking) => ({
            ...booking,
            start: new Date(booking.start_time),
            end: new Date(booking.end_time),
            
          }))
          
        );
        
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching bookings:", error);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }


  const seasonalPrices = [
    { start: "2025-01-01", end: "2025-05-01", price: 785, color: "#a3c8f5a4" },
    { start: "2025-11-01", end: "2025-12-31", price: 785, color: "#a3c8f597" }, 
    { start: "2025-05-01", end: "2025-05-31", price: 928, color: "#a9d3a79e" },
    { start: "2025-10-01", end: "2025-10-31", price: 928, color: "#f5c49ea7" }, 
    { start: "2025-06-01", end: "2025-09-30", price: 1071, color: "#f4df8ca1" }, 
  ];

  const getSeasonalPrice = (date) => {
    const season = seasonalPrices.find(
      (season) =>
        new Date(date) >= new Date(season.start) && new Date(date) <= new Date(season.end)
    );
    return season ? { price: season.price, color: season.color } : null;
  };

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
        start < new Date(booking.end) && end > new Date(booking.start)
    );
  
    if (isOverlapping) {
      alert("This date range is already booked. Please choose another time.");
      return;
    }

    if (cart.length > 0) {
      const confirmReplace = window.confirm(
        "Your cart already contains a booking. Would you like to replace it?"
      );
  
      if (!confirmReplace) {
        return;
      } else {
       
        clearCart();
      }
    }
  
    const amount = prompt("Enter amount of people staying:");
    const booked_by = prompt("Enter your name or email:");
    if (amount && booked_by) {
      const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  
      const seasonalPrice = getSeasonalPrice(start);
      const price = seasonalPrice ? seasonalPrice.price : 0;
  
      const newBooking = {
        amount,
        booked_by,
        start_time: new Date(start).toLocaleString(),
        end_time: new Date(end).toLocaleString(),
        color: randomColor,
        price, 
      };
  
      axios
        .post("http://localhost:5000/bookings", newBooking)
        .then(() => setBookings((prev) => [...prev, { ...newBooking, start, end }]))
        .catch((error) => console.error("Error adding booking:", error));
  


      addToCart([{ start, end, amount, booked_by, price }]);
    }
  };
  

  const handleDeleteBooking = (id) => {
    axios
      .delete(`http://localhost:5000/bookings/${id}`)
      .then(() => setBookings((prev) => prev.filter((booking) => booking.id !== id)))
      .catch((error) => console.error("Error deleting booking:", error));
  };

  const bookingStyleGetter = (booking) => {
    const seasonalPrice = getSeasonalPrice(booking.start);
    return {
      className: styles.booking,
      style: {
        backgroundColor: seasonalPrice ? seasonalPrice.color : "#8d6cb3",
      },
      title: `Price: ${seasonalPrice ? seasonalPrice.price : "No seasonal price"}`,
    };
  };

 

  return (
    <div className={styles.container}>
      {isAuthenticated ? (
        <div className={styles.bookingAndCartWrapper}>
          <div className={styles.calendarContainer}>
            <h2 className={styles.calendarHeader}>Apartment Bookings</h2>
            {loading ? (
              <p>Loading...</p>
            ) : (
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
                    className: `${isBooked ? styles.bookedDay : ""} ${styles.dayCell}`,
                    style: {},
                  };
                }}
              />
            )}
          </div>
          <div className={styles.cartContainer}>
            <Cart /> 
          </div>
        </div>
      ) : (
        <div className={styles.loginPrompt}>
          <h3>Please log in to book a date.</h3>
        </div>
      )}
    </div>
  );
  
};

export default BookableCalendar;
