//Load the index controller
var index = require('../../app/controllers/index.server.controller');
// Load the 'tasks' controller
var tasks = require('../../app/controllers/tasks.server.controller');

// Define the routes module' method
module.exports = function (app) {
    // Set up the 'users' base routes
    //
    //show the 'index' page if a GET request is made to root
    app.route('/').get(index.render);
    //show the 'add_task' page if a GET request is made to /tasks
    app.route('/tasks').get(index.renderAdd);

    app.route('/list_tasks').get(tasks.readTasks);

    // a post request to /tasks will execute createTask method in tasks.server.controller
    app.route('/tasks').post(tasks.createTask);
    
    // Set up the 'courses' parameterized routes
    app.route('/list_tasks/:taskId')
        .get(tasks.read)
        .put(tasks.updateByTaskId)
        .delete(tasks.deleteByTaskId);

    
};
