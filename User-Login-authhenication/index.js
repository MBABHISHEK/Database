const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const path = require('path');
const app = express();
const cors = require('cors');
const port = 3000;

app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'abhishek@2003@sql',
    database: 'login'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to database: ' + err.stack);
        return;
    }
    console.log('Connected to database as ID ' + connection.threadId);
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Registration endpoint
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    connection.query(
        'INSERT INTO users (username, password) VALUES (?, ?)',
        [username, hashedPassword],
        (error, results, fields) => {
            if (error) throw error;
            res.send('Registration successful');
        }
    );
});

// Login endpoint
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    connection.query(
        'SELECT * FROM users WHERE username = ?',
        [username],
        async (error, results, fields) => {
            if (results.length > 0) {
                const user = results[0];
                const passwordMatch = await bcrypt.compare(password, user.password);
                if (passwordMatch) {
                    res.cookie('user', user.id, { maxAge: 900000, httpOnly: true });
                    res.send('Login successful');
                } else {
                    res.send('Invalid username or password');
                }
            } else {
                res.send('Invalid username or password');
            }
        }
    );
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
