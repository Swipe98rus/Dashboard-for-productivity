import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import Dashboard from '../api/dashboard';


class Doing extends React.Component{

async markAsDone(ID){
    const copy = [ ...Dashboard.findOne({_id: this.props.id}).collection ];

    for(let item of copy){
        if(item._id == ID){
            item.done = true;
        }
    }
    
    await Dashboard.update(this.props.id, {
        $set: {
            collection: copy,
        }
    })

}
    render(){
        const filtered_list = this.props.todos.filter( item =>{
            return item.doing && !item.done ? item : false
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
                        {
                            filtered_list.map( item =>{
                                return <li key={item._id} onClick={()=>{this.markAsDone(item._id)}}>{item.text}</li>
                            } )
                        }
                    </ul>
                </div>
            </div>
        )
    }
}
export default withTracker((props)=>({
    todos: Dashboard.findOne({_id: props.id }) ? Dashboard.findOne({_id: props.id }).collection : [],
}))(Doing)