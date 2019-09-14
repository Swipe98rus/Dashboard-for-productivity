import React from 'react';
import ReactDOM from 'react-dom';
import Todos from '../api/todos.js';


export default class ToDos extends React.Component{

handleSubmit(e){
    e.preventDefault();  

    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

    Todos.insert({
        text: text,
        doing: false,
        done: false,
    })
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
}

markAsDoing(id){
    Todos.update(id, {
        $set: { doing: true, }
    })
}

    render(){
        const filteredTodos = this.props.todos.filter( todo =>{
            return todo.doing === false && todo.done === false ? todo : false
        })
        return(
            <div className="list-task-container">
                <div className="wrap-title grid-center red-title">
                    <div>
                        <h3>ToDos</h3>
                    </div>
                    <div>
                        <form className="new-task" onSubmit={(e)=>{ this.handleSubmit(e) }}>
                            <input type="text" 
                                    placeholder="Type your task here"
                                    ref="textInput"/>
                        </form>
                    </div>
                </div>
                <div className="wrap-task">
                    <ul className="task-list red-list">
                        { filteredTodos.map( todo =>{
                            return <li key={todo._id}
                                        onClick={(e)=>{this.markAsDoing(todo._id)}}>{todo.text}</li>
                        })}
                    </ul>
                </div>
            </div>
        )
    }
}