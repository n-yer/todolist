import React from 'react';
import './App.css';
import Helmet from 'react-helmet';


class Task extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      completed: 0,
      style: "task",
      deleteMe: 0
    }
  }

  doSomething(e){
    this.state.completed == 0 ? this.setState({completed: 1, style: "task complete-task",}) : this.setState({completed: 0, style: "task",})    
  }

  deletethis(){
    this.setState({deleteMe: 1})
    console.log(this.props.title + " " + this.state.deleteMe)
  }
  render(){
    return(
      <li className={this.state.style} >
        <input type="checkbox" className="task-checkbox" onClick={this.doSomething.bind(this)} />
        <p className="task-name">{this.props.title}</p>
        <button className="delete-btn" onClick={this.deletethis.bind(this)}>X</button>
      </li>
      
    );
  }
}

class ToDoList extends React.Component{
  constructor(props){
    super(props);

    this.defaultTasks = ["Task 1", "Task 2"]
    this.tasks = [];
    for(var i=0; i< this.defaultTasks.length; i++){
      this.tasks.push(this.createTask(this.defaultTasks[i]))
    }
    this.state = {
      newTask : "",
      removeTask: ""
    }
    
  }

  createTask(title){
    return <Task title={title} completed={0} dispose={this.deleteTask.bind(this)} />;
  }
  addNewTask(){
    if(this.state.newTask != ""){
      this.tasks.push(this.createTask(this.state.newTask))
      this.setState({newTask: ""});
    } 
  }

  deleteTask(e){
    console.log(e)
    for(var i = 0; i< this.tasks.length; i++){
      console.log(e.target.deleteMe)
      
        
    }
    //this.tasks.splice(this.tasks.indexOf(e.target.title), 1);
    //this.forceUpdate()
  }
  render(){
    return(

      <div className="main">
        <div className="task-list">
          {this.tasks}
        </div>
        <input onChange={(e) => {this.setState({newTask: e.target.value})}} value={this.state.newTask}></input>
        <button className="hero-button" onClick={this.addNewTask.bind(this)}>Add Task</button>
      </div>
    );
  }
}
function App() {
  
  return (
    <div className="App">
      

      <ToDoList/>
    </div>
  );
}

export default App;
