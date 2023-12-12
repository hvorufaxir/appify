/*
    File Name: ComplexCode.js
    Description: This code demonstrates a complex implementation of a social media platform.
*/

// Import required libraries
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// Create an Express application
const app = express();

// Middleware to parse request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connect to MongoDB database
mongoose.connect("mongodb://localhost/social_media_database", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => console.log("Connected to MongoDB database"));

// Define Mongoose Schema for User
const userSchema = new mongoose.Schema(
  {
    username: String,
    age: Number,
    email: String,
  },
  { timestamps: true }
);

// Create User model
const UserModel = mongoose.model("User", userSchema);

// Express route for creating a new user
app.post("/users", (req, res) => {
  const { username, age, email } = req.body;
  const user = new UserModel({ username, age, email });
  user.save(err => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to create user" });
    } else {
      res.json(user);
    }
  });
});

// Express route for retrieving all users
app.get("/users", (_, res) => {
  UserModel.find({}, (err, users) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to retrieve users" });
    } else {
      res.json(users);
    }
  });
});

// Express route for retrieving a single user by ID
app.get("/users/:id", (req, res) => {
  UserModel.findById(req.params.id, (err, user) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to retrieve user" });
    } else {
      res.json(user);
    }
  });
});

// Express route for updating a user
app.put("/users/:id", (req, res) => {
  const { username, age, email } = req.body;
  UserModel.findByIdAndUpdate(
    req.params.id,
    { username, age, email },
    { new: true },
    (err, user) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to update user" });
      } else {
        res.json(user);
      }
    }
  );
});

// Express route for deleting a user
app.delete("/users/:id", (req, res) => {
  UserModel.findByIdAndDelete(req.params.id, err => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to delete user" });
    } else {
      res.json({ message: "User deleted successfully" });
    }
  });
});

// Start the Express server
app.listen(3000, () => console.log("Server started on port 3000"));