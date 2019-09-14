import React from 'react'
import { withTracker } from 'meteor/react-meteor-data';
import Todos from '../api/todos.js'

import ToDos from './ToDos';
import Doing from './Doing';
import Done from './Done';


class Content extends React.Component{
    render(){
        return(
            <div className="content">
                <ToDos todos={this.props.todos}/>
                <Doing todos={this.props.todos}/>
                <Done todos={this.props.todos}/>
            </div>
        )
    }
}

export default withTracker(()=>({
    todos: Todos.find({}).fetch(),
}
))(Content);