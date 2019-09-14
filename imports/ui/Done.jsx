import React from 'react';
import Todos from '../api/todos.js';


export default class Done extends React.Component{
    render(){
        const filteredDone = this.props.todos.filter( todo =>{
            return todo.doing === true && todo.done === true ? todo : false
        })

        const removeAllDone = ()=>{
            for(let done of filteredDone){
                Todos.remove({_id: done._id})
            }
        }
        return(
            <div className="list-task-container">
                <div className="wrap-title grid-center green-title">
                    <div>
                        <h3>Done</h3>
                    </div>
                    <div>
                        <button className="removeButton" onClick={()=>{removeAllDone();}}>Remove all</button>
                    </div>
                </div>
                <div className="wrap-task">
                    <ul className="task-list green-list">
                        { filteredDone.map( todo =>{
                            return <li key={todo._id}>{todo.text}</li>
                        })}
                    </ul>
                </div>
            </div>
        )
    }
}