// src/TaskList.js
import React, { useState, useEffect } from 'react'
import TaskForm from './TaskForm'
import TaskItem from './TaskItem'

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [taskToEdit, setTaskToEdit] = useState(null);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addOrUpdateTask = (task) => {
    if (taskToEdit) {
      setTasks(tasks.map(t => t.id === task.id ? task : t));
      setTaskToEdit(null);
    } else {
      setTasks([...tasks, task]);
    }
  };

  const deleteTask = (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setTasks(tasks.filter(t => t.id !== id));
    }
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const editTask = (task) => {
    setTaskToEdit(task);
  };

  return (
    <div className="task-list">
      <TaskForm onSave={addOrUpdateTask} taskToEdit={taskToEdit} />
      <div className="tasks">
        {tasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            onEdit={editTask}
            onDelete={deleteTask}
            onToggleComplete={toggleComplete}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskList;
