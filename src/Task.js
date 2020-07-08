import React from "react"



function Task(props){



    return(
        <li className={props.completed ? "task complete-task" : "task"} >
          <input type="checkbox" className="task-checkbox" checked={props.completed} onChange={()=>props.handleChange(props.id)} />
          <div className="task-text">
            <p className="task-name">{props.title}</p>
            <p className="task-note">{props.note}</p>
          </div>
          
          <div className="priority-container">
              <span className="dot" style={{backgroundColor: props.priority === "High" ? "red" : props.priority === "Medium" ? "orange" : "green"}}></span>
              <p className="priority-text">{props.priority} Priority</p>
          </div>
          <button className="delete-btn" onClick={()=>props.handleDeleteTask(props.id)}>X</button>
        </li>
    )
}

export default Task