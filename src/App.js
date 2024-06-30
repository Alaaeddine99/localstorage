// src/App.js
import React from 'react';
import TaskList from './components/TaskList';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>To-Do List</h1>
      </header>
      <TaskList />
    </div>
  );
};

export default App;
