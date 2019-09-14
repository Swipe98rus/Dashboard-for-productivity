import React from 'react';
import Todos from '../api/todos.js';


export default class Doing extends React.Component{

markAsDone(id){
    Todos.update(id, {
        $set: { done: true, }
    })
}

    render(){
        const filteredDoing = this.props.todos.filter( todo =>{
            return todo.doing === true && todo.done === false ? todo : false
        })
        return(
            <div className="list-task-container">
                <div className="wrap-title grid-center yellow-title">
                    <div>
                        <h3>Doing</h3>
                    </div>
                </div>
                <div className="wrap-task">
                    <ul className="task-list yellow-list">
                        { filteredDoing.map( todo =>{
                            return <li key={todo._id}
                                        onClick={(e)=>{this.markAsDone(todo._id)}}>{todo.text}</li>
                        })}
                    </ul>
                </div>
            </div>
        )
    }
}