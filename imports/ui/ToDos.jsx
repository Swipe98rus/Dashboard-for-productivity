import React from 'react';
import ReactDOM from 'react-dom';
import Dashboard from '../api/dashboard';
import { withTracker } from 'meteor/react-meteor-data';
//Lib for create random ID
import uuidv4 from 'uuid/v4'

class ToDos extends React.Component{


async handleSubmit(e){
    e.preventDefault();  
//Get text from INPUT
    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
    await this.updateCollection(text);

//Clean up input
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
}


async updateCollection(text){
//Get some const
    const getCollection = Dashboard.findOne({_id: this.props.id}).collection;
    const copy = [...getCollection];

//Create and push new object/todo
    await copy.push({
        _id: uuidv4(),
        text: text,
        doing: false,
        done: false,
    });

//Update dashboard
    await Dashboard.update(this.props.id, {
        $set: {
            collection: copy,
        }
    })

}


async markAsDoing(ID){
    const copy = [ ...Dashboard.findOne({_id: this.props.id}).collection ];
//Mark our object/task as DOING
    for(let item of copy){
        if(item._id == ID){
            item.doing = true;
        }
    }
//Update dashboard
    await Dashboard.update(this.props.id, {
        $set: {
            collection: copy,
        }
    })

}

    render(){
        //Filter our dashboard
        const filtered_list = this.props.todos.filter( item =>{
            return !item.doing && !item.done ? item : false
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
                         {
                           filtered_list.map( item =>{
                                 return <li key={item._id} 
                                            onClick={()=>{this.markAsDoing(item._id)}}>{item.text}</li>
                             })
                         }
                    </ul>
                </div>
            </div>
        )
    }
} 

export default withTracker( props =>({
    todos: Dashboard.findOne({_id: props.id }) ? Dashboard.findOne({_id: props.id }).collection : [],
}))(ToDos);