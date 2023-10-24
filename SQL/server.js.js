const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
const port = 3000;

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'abhishek@2003@sql',
    database: 'traveldatabase'// Change this database name to your required database
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to database: ' + err.stack);
        return;
    }
    console.log('Connected to the database');
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.post('/searchFlight', (req, res) => {
    const { source, destination } = req.body;
    const queryString = 'SELECT * FROM flights WHERE source = ? AND destination = ?';
    connection.query(queryString, [source, destination], (err, results) => {
        if (err) {
            console.error('Error searching for flights: ' + err.stack);
            res.status(500).send('Error searching for flights');
            return;
        }
        res.json(results);
    });
});

app.post('/bookFlight', (req, res) => {
    const { flight_id, booking_date, seats, total_cost } = req.body;
    const queryString = 'INSERT INTO flight_bookings (flight_id, booking_date, seats, total_cost) VALUES (?, ?, ?, ?)';
    connection.query(queryString, [flight_id, booking_date, seats, total_cost], (err, results) => {
        if (err) {
            console.error('Error booking the flight: ' + err.stack);
            res.status(500).send('Error booking the flight');
            return;
        }
        console.log('Flight booked successfully!');
        res.send('Flight booked successfully!');
    });
});


app.post('/bookHotel', (req, res) => {
    const { id, hotel_id, booking_date, nights, total_price } = req.body;
    const queryString = 'INSERT INTO hotel_bookings (id, hotel_id, booking_date, nights, total_price) VALUES (?, ?, ?, ?, ?)';
    connection.query(queryString, [id, hotel_id, booking_date, nights, total_price], (err, results) => {
        if (err) {
            console.error('Error booking the hotel:123 ' + err.stack);
            res.status(500).send('Error booking the hotel');
            return;
        }
        console.log('Hotel booked successfully!');
        res.send('Hotel booked successfully!');
    });
});

app.get('/getFlightBookings', (req, res) => {
    const queryString = 'SELECT * FROM flight_bookings';
    connection.query(queryString, (err, results) => {
        if (err) {
            console.error('Error fetching flight bookings: ' + err.stack);
            res.status(500).send('Error fetching flight bookings');
            return;
        }
        res.json(results);
    });
});


app.post('/searchHotel', (req, res) => {
    const { place, room_type } = req.body;
    const queryString = 'SELECT * FROM hotels WHERE place = ? AND room_type = ?';
    connection.query(queryString, [place, room_type], (err, results) => {
        if (err) {
            console.error('Error searching for hotels: ' + err.stack);
            res.status(500).send('Error searching for hotels');
            return;
        }else
        console.log(results);
        res.json(results);
    });
});

app.get('/getHotelBookings', (req, res) => {
    const queryString = 'SELECT * FROM hotel_bookings';
    connection.query(queryString, (err, results) => {
        if (err) {
            console.error('Error fetching hotel bookings: ' + err.stack);
            res.status(500).send('Error fetching hotel bookings');
            return;
        }
        res.json(results);
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
