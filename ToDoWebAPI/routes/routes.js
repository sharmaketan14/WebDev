const express = require('express');
const router = express.Router();
const contrl = require('/home/sharmaketan14/Desktop/Codes/WebDevelopmentUdemy/BackEnd/ToDoWebAPI/controllers/controller.js');

router.get('/todo',contrl.getAllTodo);

router.post('/todo',contrl.insertTodo);

router.patch('/todo/:id',contrl.updateTodo);

router.delete('/todo/:id',contrl.deleteTodo);

module.exports = router;