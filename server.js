const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// Middleware to check if request is within working hours
function workingHours(req, res, next) {
    const now = new Date();
    const day = now.getDay();
    const hour = now.getHours();
    if (day >= 1 && day <= 5 && hour >= 9 && hour <17) {
        next();
    } else {
        res.send('The web application is only available Monday to Friday, from 9 to 17.');
    }
}

// Set up view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Use the working hours middleware
app.use(workingHours);

// Define routes
app.get('/', (req, res) => {
    res.render('home');
});

app.get('/services', (req, res) => {
    res.render('services');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
