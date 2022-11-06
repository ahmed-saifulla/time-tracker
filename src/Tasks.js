import { useState, useEffect } from 'react';
import './App.css';
import Task from './Task';

function Tasks(props) {
    
    return (
        <div className="tasks br-12">
          <div className="tasks-header">
            <h3>Tasks</h3>
            <button className="clear-tasks-btn br-4" onClick={() => {
              props.onClear()
            }}>Clear</button>
          </div>

          {props.tasks.map((task, i) => (
             <Task key={i} task={task} /> 
          ))} 
        </div>
    );
}

export default Tasks;
