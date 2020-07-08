import React from 'react';
import './App.css';
import ToDoList from "./ToDoList"
import Stats from "./Stats"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";




function App() {
  
  var taskObjects = [
    {
        name: "do the dishes",
        id: 0,
        completed: false,
        priority: "Low",
        note: "dry them too"
    }, 
    {
        name: "pick up groceries",
        id: 1,
        completed: false,
        priority: "Medium",
        note: "dont forget avocados"
    },
    {
        name: "learn react",
        id: 2,
        completed: false,
        priority: "High",
        note: "chapter 10"
    },
    {
      name: "learn guitar",
      id: 3,
      completed: false,
      priority: "Medium",
      note: "Part 3"
  }

]

  return (
    <div className="App">
      
      <Router>
        <Link to="/"></Link>
        <Link to="/stats"></Link>
        <Switch>
          <Route exact path="/">
            <ToDoList initialTasks={taskObjects} onChange={(tasks) => {taskObjects = tasks;
            console.log("task objects from app.js: " ,taskObjects)}}/>
          </Route>
          <Route exact path="/stats">
            <Stats />
          </Route>
        </Switch>
      </Router>
      
    </div>
  );
}

export default App;
