const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "apartment_booking_app",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the MySQL database.");
});

app.get("/bookings", (req, res) => {
  const query = "SELECT * FROM bookings";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching bookings:", err);
      res.status(500).send("Server error");
      return;
    }
    res.json(results);
  });
});

app.post("/bookings", (req, res) => {
  const { amount, booked_by, start_time, end_time, color } = req.body;
  const query =
    "INSERT INTO bookings (amount, booked_by, start_time, end_time, color) VALUES (?, ?, ?, ?, ?)";
  db.query(
    query,
    [amount, booked_by, start_time, end_time, color || "#8d6cb3"],
    (err, results) => {
      if (err) {
        console.error("Error adding booking:", err);
        res.status(500).send("Server error");
        return;
      }
      res.status(201).send("Booking added successfully");
    }
  );
});

app.delete("/bookings/:id", (req, res) => {
  const query = "DELETE FROM bookings WHERE id = ?";
  db.query(query, [req.params.id], (err, results) => {
    if (err) {
      console.error("Error deleting booking:", err);
      res.status(500).send("Server error");
      return;
    }
    res.status(200).send("Booking deleted successfully");
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
