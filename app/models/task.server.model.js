// Load the Mongoose module and Schema object
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
// Define a new 'TaskSchema'
var TaskSchema = new Schema({
    taskId: { type: String, unique: true, required:true },
    gameGenre: String,
    gamePlayedPerYear: Number,
    age: Number
});
// Create the 'Task' model out of the 'TaskSchema'
mongoose.model('Task', TaskSchema);
