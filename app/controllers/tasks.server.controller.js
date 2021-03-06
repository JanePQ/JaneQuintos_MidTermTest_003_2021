// Load the 'Task' Mongoose model
var Task = require('mongoose').model('Task');

// Create a new 'createTask' controller method
exports.createTask = function (req, res, next) {
    // Create a new instance of the 'Task' Mongoose model
    var task = new Task(req.body);
    // Use the 'Task' instance's 'save' method to save a new task document
    task.save(function (err) {
        if (err) {
            // Call the next middleware with an error message
            return next(err);
        } else {
            // Use the 'response' object to send a JSON response
            res.json(task);
            
        }
    });
};

// Create a new 'readTasks' controller method
exports.readTasks = function (req, res, next) {
    console.log('in readTasks')
    // Use the 'Task' static 'find' method to retrieve the list of items
    Task.find({}, function (err, tasks) {
        console.log(tasks)
        if (err) {
            // Call the next middleware with an error message
            console.log('some error in readTask method')
            return next(err);
        } else {
            //
            res.render('tasks', {
                title: 'Survey Lists',
                tasks: tasks
            });
        }
    });
};


// 'read' controller method to display a task
exports.read = function(req, res) {
	// Use the 'response' object to send a JSON response
	res.json(req.task);
};
//
//update a task by task id
exports.updateByTaskId = function (req, res, next) {

    let query = {"taskId": req.params.taskId};

    // Use the 'Task' static 'findOneAndUpdate' method 
    // to update a specific task by task id
    Task.findOneAndUpdate(query, req.body, (err, task) => {
        if (err) {
            console.log(err);
            // Call the next middleware with an error message
            return next(err);
        } else {
            console.log(task);
        
            // Use the 'response' object to send a JSON response
            res.redirect('/list_tasks'); //display all tasks
        }
    });
};

//update a task by task id
exports.deleteByTaskId = function (req, res, next) {
    
    //initialize findOneAndUpdate method arguments
    var query = { "taskId": req.params.taskId };  

    // Use the 'Task' static 'findOneAndUpdate' method 
    // to update a specific task by task id
    Task.remove(query, (err, task) => {
        if (err) {
            console.log(err);
            // Call the next middleware with an error message
            return next(err);
        } else {
            console.log(task);
        
            // Use the 'response' object to send a JSON response
            res.redirect('/list_tasks'); //display all tasks
        }
    })
};

// ‘findTaskByTaskId’ controller method to find a task by its task id
exports.findTaskByTaskId = function (req, res, next, taskId) {    
	// Use the 'Course' static 'findOne' method to retrieve a specific task
	Task.findOne({
		taskId: taskId //using the task id instead of id
	}, (err, task) => {
		if (err) {
			// Call the next middleware with an error message
			return next(err);
		} else {
			// Set the 'req.task' property
            req.task = task;
            console.log(task);
			// Call the next middleware
			next();
		}
	});
};

