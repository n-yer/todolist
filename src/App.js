import React from 'react';
import './App.css';
import Helmet from 'react-helmet';


class Task extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      completed: 0,
    }
  }


  render(){
    return(
      <li className="task">
        <input type="checkbox" className="task-checkbox" onClick={() => this.props.onClick()}/>
        <p className="task-name">{this.props.title}</p>
        <p>Completed: {this.props.completed}</p>
      </li>
      
    );
  }
}

class ToDoList extends React.Component{
  constructor(props){
    super(props);

    this.defaultTasks = ["Task 1", "Task 2", "Task 3", "Task 4"]
    
  }

  handleTaskClick(){
    this.props.completed = 1;
  }

  createTask(title){
    return <Task title={title} completed={0} onClick={() => this.handleTaskClick()}/>;
  }
  render(){
    return(

      <div className="main">
        <div className="task-list">
          {
            for(var i=0; i< this.defaultTasks.length; i++){
              createTask(this.defaultTasks[i])
            }
          
          }
        </div>
      </div>
      
      
    );
  }
}
function App() {
  
  

  return (
    <div className="App">
      <Helmet>
        <meta charSet="utf-8" />
        <title>To Do List</title>
        <link rel="icon" type="image/png" href="http://example.com/myicon.png" /> 
      </Helmet>




      <ToDoList/>
    </div>
  );
}

export default App;
