/*****************
WORKOUT CONTROLLER
******************/
const Workout = require("../models/Workout");

const auth = require("../auth");
const { errorHandler } = require("../auth");

module.exports.createWorkout = (req, res) => {

	const {name, duration, status} = req.body;
	// Input Validation Check
	if (!name) {
		return res.status(400).send({ error: "Input workout name" });
	} else if (!duration) {
		return res.status(400).send({ error: "Input workout duration" });
	}

	// Create New Workout
	let newWorkout = new Workout({
		name: name,
		duration: duration,
		status: status,
		userId: req.user.id
	});

	return newWorkout.save()
	.then((result) => res.status(201).send(result))
	.catch(error => errorHandler(error, req, res))
}

module.exports.getMyWorkouts = (req, res) => {
	return Workout.find({})
	.then(workout => {
		if(!workout){
			return res.status(404).send({ error: "No workout found" })
		} else {
			return res.status(200).send({"workouts" : workout});
		}  
	})
	.catch(error => errorHandler(error, req, res));
};

module.exports.updateWorkout = (req, res) => {

	const workoutId = req.params.workoutId;
	const {name, duration, status} = req.body;

	let updateWorkout = {
		name: name,
		duration: duration,
		status: status
	}

	return Workout.findByIdAndUpdate(workoutId, updateWorkout, { new: true })
	.then(workout => {
		if(workout) {
			res.status(200).send({ 
				message: "Workout updated successfully",
				"updatedWorkout" : workout
			});
		} else {
			res.status(404).send({ error: "Workout not found" });
		}
	})
	.catch(error => errorHandler(error, req, res));
}

module.exports.deleteWorkout = (req, res) => {

	const workoutId = req.params.workoutId;

	return Workout.findByIdAndDelete(workoutId)
		.then(workout => {
			if (workout) {
				res.status(200).send({
					message: "Workout deleted successfully"
				});
			} else {
				res.status(404).send({ error: "Workout not found" });
			}
		})
		.catch(error => errorHandler(error, req, res));
};


module.exports.completeWorkoutStatus = (req, res) => {

	const workoutId = req.params.workoutId;

	let updateWorkout = {
		status: "completed"
	}

	return Workout.findByIdAndUpdate(workoutId, updateWorkout, { new: true })
	.then(workout => {
		if(workout) {
			res.status(200).send({ 
				message: "Workout status updated successfully",
				"updatedWorkout" : workout
			});
		} else {
			res.status(404).send({ error: "Workout not found" });
		}
	})
	.catch(error => errorHandler(error, req, res));
}