create database traveldatabase;
use traveldatabase;
CREATE TABLE flights (
    id INT AUTO_INCREMENT PRIMARY KEY,
    source VARCHAR(255) NOT NULL,
    destination VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    time DATETIME NOT NULL,
    airline VARCHAR(255) NOT NULL,
    duration INT NOT NULL
);
drop table flights;
drop table flight_bookings;


drop table hotels;
drop table hotel_bookings;
CREATE TABLE hotels (
    id INT AUTO_INCREMENT PRIMARY KEY,
    place VARCHAR(255) NOT NULL,
    room_type VARCHAR(255) NOT NULL,
    price_per_night DECIMAL(10, 2) NOT NULL,
    amenities TEXT,
    rating DECIMAL(3, 2)
);

CREATE TABLE flight_bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    flight_id INT NOT NULL,
    booking_date DATETIME NOT NULL,
    seats INT NOT NULL,
    total_cost DECIMAL(10, 2) NOT NULL
);


CREATE TABLE hotel_bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    hotel_id INT NOT NULL,
    booking_date DATETIME NOT NULL,
    nights INT NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL
);

