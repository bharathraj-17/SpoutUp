const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');

// Create Express app
const app = express();
const port = 3000;

// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse request body
app.use(bodyParser.urlencoded({ extended: true }));

// Define MongoDB connection URI and database name
const mongoURL = 'mongodb://localhost:27017';
const dbName = 'sproutup';
const collectionName = 'clients';

// Endpoint for form submission
app.post('/submit-form', (req, res) => {
    // Get form data from request body
    const { name, email, phone, message } = req.body;

    // Insert form data into MongoDB
    MongoClient.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
        if (err) {
            console.error('Failed to connect to MongoDB:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        collection.insertOne({ name, email, phone, message }, (err, result) => {
            if (err) {
                console.error('Failed to insert document:', err);
                res.status(500).send('Internal Server Error');
                return;
            }

            console.log('Form data inserted:', result.ops);
            res.redirect('/thankyou.html'); // Redirect to thank you page
        });
    });
});

// Route for handling login requests
app.post('/login', async (req, res) => {
    // Extract username and password from request body
    const { username, password } = req.body;

    try {
        // Connect to MongoDB server
        const client = new MongoClient(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();

        // Get the database
        const db = client.db(dbName);

        // Query the database to check if username and password match
        const collection = db.collection('users');
        const user = await collection.findOne({ username, password });

        // If user is found, redirect to index.html
        if (user) {
            res.redirect('index.html');
        } else {
            // If credentials are incorrect, display an error message or redirect back to login page
            res.send('Invalid username or password');
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
