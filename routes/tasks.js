const express = require('express');
const router = express.Router();

// import get task from the controller
const {getAllTasks,createTask,getTask,updateTask,deleteTask} = require('../controllers/tasks')


router.route('/').post(createTask);
router.route('/').get(getAllTasks);
router.route('/:id').get(getTask);
router.route('/:id').patch(updateTask);
router.route('/:id').delete(deleteTask);

module.exports = router