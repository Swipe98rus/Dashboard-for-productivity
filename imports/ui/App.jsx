import React from 'react';
import Dashboard from  '../api/dashboard';


import Header from './Hello';
import Content from './Content';
import ConnectForm from './ConnectForm'

import { updateLocalStorage } from '../localStorage'

class App extends React.Component{
constructor(props){
  super(props)
  this.state = {
    create_userID: null,
    join_userID: null,
    dash_user_ID: localStorage.getItem('user_id'),
    storage: {
      connect: localStorage.getItem('connect'),
      dash_ID: localStorage.getItem('dashboard_id'),
    }
  }
  this.createInputRef = React.createRef();
  this.joinInputRef = React.createRef();
  this.createHandleSubmit = this.createHandleSubmit.bind(this);
  this.joinHandleSubmit = this.joinHandleSubmit.bind(this);
  this.disconnect = this.disconnect.bind(this);
}
async createHandleSubmit(e){
e.preventDefault();
//Get VALUE
  const inputValue = this.createInputRef.current.value.trim();

//Create new OBJECT with collection
  Dashboard.insert({
    _userId: inputValue,
    collection: [],
  })
  const dash_ID = Dashboard.findOne({_userId: inputValue})._id;
  updateLocalStorage(true, dash_ID, inputValue);
//Save id in state
  this.setState({
    create_userID: dash_ID,
    dash_user_ID: localStorage.getItem('user_id'),
    storage: {
      connect: localStorage.getItem('connect'),
      dash_ID: localStorage.getItem('dashboard_id'),
    }
  })

//CLean up input
  this.createInputRef.current.value = '';
  
}


async joinHandleSubmit(e){
e.preventDefault();
//Get VALUE
  const inputValue = this.joinInputRef.current.value.trim();
  const dash_ID = Dashboard.findOne({_userId: inputValue})._id ;
  updateLocalStorage(true, dash_ID, inputValue);
  this.setState({
    join_userID: dash_ID,
    dash_user_ID: localStorage.getItem('user_id'),
    storage: {
      connect: localStorage.getItem('connect'),
      dash_ID: localStorage.getItem('dashboard_id'),
    }
  })

//Clean up
  this.joinInputRef.current.value = '';
}


async disconnect(){
  updateLocalStorage(false, null, null);
  this.setState({
    create_userID: null,
    join_userID: null,
    dash_user_ID: localStorage.getItem('user_id'),
    storage: {
      connect: localStorage.getItem('connect'),
      dash_ID: localStorage.getItem('dashboard_id'),
    }
  })
}

render(){
return (
  <div className="App background-gradient">
    <Header />

    <ConnectForm  createHandleSubmit = { this.createHandleSubmit }
                  joinHandleSubmit = { this.joinHandleSubmit }
                  disconnect = { this.disconnect }
                  createInputRef = { this.createInputRef }     
                  joinInputRef = { this.joinInputRef }
                  connect = { this.state.storage.connect } 
                  dashboard_id = { this.state.dash_user_ID }         />

    <Content  create_userID= { this.state.storage.dash_ID }
              join_userID = { this.state.storage.dash_ID }
              connect = { this.state.storage.connect }    />
  </div>
)
}};

export default App;
