const asyncWrapper = require('../middleware/async');
const Task = require('../models/Tasks')
const {createCustomError} =  require ('../error/custom-error')


const getAllTasks = asyncWrapper (async (req, res) => {
    const tasks = await Task.find({});
    res.status(200).json({ tasks});
  })



const createTask = asyncWrapper (async (req, res) => {
    const task = await Task.create(req.body);
    res.status(201).json({ task });
 
  })



const getTask =  asyncWrapper (async (req, res) => {
        const {id:taskID} = req.params;
        const task = await Task.findOne({_id:taskID});
        if(!task){
        
          return next(createCustomError (`No task with id : ${taskID}`,404))
            // return res.status(404).json({msg:`No task with id : ${taskID}`})
        }
        res.status(200).json({task})
  
});



const deleteTask = asyncWrapper (async (req, res) => {
    
        const {id:taskID} = req.params;
        const task = await Task.findOneAndDelete({_id:taskID});
        if(!task){
          return next(createCustomError (`No task with id : ${taskID}`,404))
        }
        res.status(200).json({task})

 

});

const updateTask = asyncWrapper (async (req, res) => {
    const { id: taskID } = req.params;
    // Find the task by ID and update it
    const updatedTask = await Task.findByIdAndUpdate(taskID, req.body, {
      new: true, // Return the updated task in the response
      runValidators: true, // Run validation defined in the TaskSchema
    });
    if (!updatedTask) {
      return next(createCustomError (`No task with id : ${taskID}`,404))
    }
    res.status(200).json({ task: updatedTask });
 
});








module.exports = {
  getAllTasks,
  createTask,
  deleteTask,
  getTask,
  updateTask,
  
};
