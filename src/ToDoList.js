import React from "react"
import Task from "./Task"
import Banner from "./Banner"


class ToDoList extends React.Component{
    constructor(props){
      super(props);
  
     /* 
      this.taskObjects = [
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
        }
    ]*/
      
    this.taskObjects = this.props.initialTasks
    
     
      this.state = {
        newTask : {
            name: "",
            priority: "Low",
            note: ""
        },
        removeTask: "",
        tasks : this.taskObjects.map(todoItem => <Task 
            key={todoItem.id} 
            id={todoItem.id} 
            title={todoItem.name} 
            completed={todoItem.completed} 
            priority={todoItem.priority} 
            note={todoItem.note} 
            handleChange={this.handleTaskChange.bind(this)} 
            handleDeleteTask={this.handleDeleteTask.bind(this)}/>),
        randomQuote: {}
      }
      
     
      
    }


    componentDidMount(){
        fetch("https://quotes.rest/qod?language=en").then(response => response.json()).then(data => {this.setState({randomQuote: {quote: data.contents.quotes[0].quote, author: data.contents.quotes[0].author}})})
        
    }
    
    findTaskById(taskObjects, id){
        for(var i=0; i< taskObjects.length; i++){
            if(taskObjects[i].id === id){
                return i
            }
        }

        return -1
    }

    sortByUncompleted(){

       
        let sortedTaskObjects = []
        
        for(var i=0; i< this.taskObjects.length; i++){
            if(!this.taskObjects[i].completed)
                sortedTaskObjects.push(this.taskObjects[i])
        }
        
        for(var i=0; i< this.taskObjects.length; i++){
            if(this.taskObjects[i].completed)
                sortedTaskObjects.push(this.taskObjects[i])
        }

        this.taskObjects = sortedTaskObjects
        console.log(this.taskObjects)
        this.setState({tasks : this.taskObjects.map((todoItem, i) => <Task 
            key={todoItem.id} 
            id={todoItem.id} 
            title={todoItem.name} 
            completed={todoItem.completed} 
            priority={todoItem.priority} 
            note={todoItem.note} 
            handleChange={this.handleTaskChange.bind(this)} 
            handleDeleteTask={this.handleDeleteTask.bind(this)}/>)})
            //update array of tasks in parent
            this.props.onChange(this.taskObjects)
    }
    handleTaskChange(id){
        

        const taskArrayIndex = this.findTaskById(this.taskObjects, id)
        
        this.taskObjects[taskArrayIndex].completed = !this.taskObjects[taskArrayIndex].completed
        console.log(this.taskObjects[taskArrayIndex])
        this.setState({
            tasks : this.taskObjects.map(todoItem => <Task 
                key={todoItem.id} 
                id={todoItem.id} 
                title={todoItem.name} 
                completed={todoItem.completed} 
                priority={todoItem.priority} 
                note={todoItem.note} 
                handleChange={this.handleTaskChange.bind(this)} 
                handleDeleteTask={this.handleDeleteTask.bind(this)}/>)
        })
        //update array of tasks in parent
        this.props.onChange(this.taskObjects)

    }
    handleDeleteTask(id){
        
        //get array index of task to be deleted
        const taskArrayIndex = this.findTaskById(this.taskObjects, id)
        //remove the task from tasks array
        this.taskObjects.splice(taskArrayIndex, 1)
        //set state with the updated tasks
        this.setState({
            tasks : this.taskObjects.map(todoItem => <Task 
                key={todoItem.id} id={todoItem.id} 
                title={todoItem.name} 
                completed={todoItem.completed} 
                priority={todoItem.priority} 
                note={todoItem.note} 
                handleChange={this.handleTaskChange.bind(this)} 
                handleDeleteTask={this.handleDeleteTask.bind(this)}/>)
        })
        //update array of tasks in parent
        this.props.onChange(this.taskObjects)
    }
    addNewTask(){
       this.sortByUncompleted()
        if(this.state.newTask.name !== ""){
          this.taskObjects.push({
              name: this.state.newTask.name,
              id: this.taskObjects.length === 0 ? 1 : this.taskObjects[this.taskObjects.length-1].id + 1,
              completed: false,
              priority: this.state.newTask.priority,
              note: this.state.newTask.note
          })
          console.log(this.taskObjects)

          //update array of tasks in parent
          this.props.onChange(this.taskObjects)

          this.setState(prevState => ({
            newTask : {
                name: "",
                priority: prevState.newTask.priority,
                note: ""
            },
            tasks : this.taskObjects.map(todoItem => <Task 
                key={todoItem.id} 
                id={todoItem.id} 
                title={todoItem.name} 
                completed={todoItem.completed} 
                priority={todoItem.priority} 
                note={todoItem.note} 
                handleChange={this.handleTaskChange.bind(this)} 
                handleDeleteTask={this.handleDeleteTask.bind(this)}/>)
        }))
            
        }
         
    }
    render(){
        return(
            

                <div className="main">
                    <Banner quote={this.state.randomQuote.quote} author={this.state.randomQuote.author} bgImg={"url('https://source.unsplash.com/1600x400/?nature')"} />

                    <div className="add-task-container">
                            
                        <input onChange={(e) => {this.setState({newTask: {...this.state.newTask, name: e.target.value}})}} value={this.state.newTask.name} placeholder="Add a new task!"></input>
                        <div className="note-container">
                            <p>Notes</p>
                            <input type="text" onChange={(e) => {this.setState({newTask: {...this.state.newTask, note: e.target.value}})}} value={this.state.newTask.note} placeholder="Enter task notes" ></input>
                        </div>
                        <div className="priority-select-container">
                            <p>Priority</p>
                            <select name="priority" id="new-task-priority" className="select-priority" onChange={(e) => {this.setState({newTask: {...this.state.newTask, priority: e.target.value}})}}>
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                            </select>
                        </div>
                        
                        <button className="hero-button" onClick={this.addNewTask.bind(this)}>Add Task</button>
                    </div>
                    <div className="task-list">
                        
                        {this.taskObjects.length === 0 ? <h1>Add some tasks to get started!</h1> : this.state.tasks}
                    </div>
                    
                </div>
                
            
            
        )
    }

    
  }

export default ToDoList