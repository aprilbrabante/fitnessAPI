/*****************
MAIN JS(Index.js)
******************/
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// import env file
require('dotenv').config();

// Importing Routes
const userRoutes = require("./routes/user");
const workoutRoutes = require("./routes/workout");

//[SECTION] Server Setup
const app = express();
app.use(express.json());

const corsOptions = {

	origin: ['http://localhost:5173'],
	credentials: true,
	optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// DB Connection
mongoose.connect(process.env.MONGODB_STRING);
mongoose.connection.once('open', () => console.log('Now connected to MongoDB Atlas'));

// Calling Routes
app.use("/users", userRoutes);
app.use("/workouts", workoutRoutes);

if(require.main === module) {
	//"process.env.PORT || 3000" will use the environment variable if it is available OR will use port 3000 if none is defined
	app.listen(process.env.PORT || 3000, () => {
		console.log(`API is now online on port ${process.env.PORT || 3000}`)
	})
}

module.exports = { app, mongoose };