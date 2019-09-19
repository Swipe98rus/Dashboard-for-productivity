import React from 'react';
import Dashboard from '../api/dashboard';
import { withTracker } from 'meteor/react-meteor-data'


class Done extends React.Component{
render(){
//Filtered dashboard
    const filtered_list = this.props.todos.filter( item =>{
        return item.doing && item.done ? item : false
    })
//Button REMOVE ALL
    const removeAllDone = ()=>{
        let copy = [...this.props.todos];
    //Delete DONE items
        for(let done of filtered_list){
            const filteredCopy = copy.filter( item => item._id != done._id );
            copy = filteredCopy;
        }
    //Update DB dahsboard
        Dashboard.update(this.props.id, {
            $set: {
                collection: copy,
            }
        })
    }
return(
    <div className="list-task-container">
        <div className="wrap-title grid-center green-title">
            <div>
                <h3>Done</h3>
            </div>
            <div>
                <button className="removeButton" 
                        onClick={()=>{removeAllDone()}}>Remove all</button>
            </div>
        </div>
        <div className="wrap-task">
            <ul className="task-list green-list">
            {
                filtered_list.map( item =>{
                    return <li key={item._id}>{item.text}</li>
                } )
            }
            </ul>
        </div>
    </div>
)
}}

export default withTracker( props =>({
    todos: Dashboard.findOne({_id: props.id }) ? Dashboard.findOne({_id: props.id }).collection : [],
}))(Done);