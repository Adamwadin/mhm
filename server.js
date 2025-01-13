const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const stripe = require("stripe")(process.env.REACT_APP_STRIPE_SECRET_KEY);
const app = express();
const PORT = 5000;

app.use(cors({ origin: "http://localhost:3000" }));
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the MySQL database.");
});

const createTableIfNotExist = `
CREATE TABLE IF NOT EXISTS bookings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  amount DECIMAL(10, 2) NOT NULL,
  booked_by VARCHAR(255) NOT NULL,
  start_time DATETIME NOT NULL,
  end_time DATETIME NOT NULL,
  color VARCHAR(7) DEFAULT '#8d6cb3'
)
`;

db.query(createTableIfNotExist, (err, results) => {
  if (err) {
    console.error("Error creating table:", err);
    return;
  }
  console.log("Bookings table is ready.");
});

// endpoint för att hämta alla bokningar
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

// POST endpoint för att lägga till en bokning

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

// DELETE endpoint för att ta bort en bokning

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

// endpoint för att skapa en betalningsintention

app.post("/create-payment-intent", async (req, res) => {
  const { amount, customerEmail, customerName, customerAddress, items } =
    req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd", // Omvandlat till Sek
      receipt_email: customerEmail,
      shipping: {
        name: customerName,
        address: { line1: customerAddress },
      },
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating payment intent.");
  }
});

// endpoint för att bekräfta en bokning
app.post("/confirm-booking", (req, res) => {
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
      res.status(201).json({
        message: "Booking added successfully",
        bookingId: results.insertId,
      });
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
