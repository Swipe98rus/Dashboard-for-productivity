import React from 'react';
import Dashboard from  '../api/dashboard';
import { updateLocalStorage } from '../localStorage';

import Header from './Hello';
import Content from './Content';
import ConnectForm from './ConnectForm';


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
    },
    error: false,
  }
  this.createInputRef = React.createRef();
  this.joinInputRef = React.createRef();
  this.errorMessageRef = React.createRef();
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

//Clean up input
  this.createInputRef.current.value = '';
  
}


async joinHandleSubmit(e){
e.preventDefault();
//Get VALUE
  const inputValue = this.joinInputRef.current.value.trim();
  const dash_ID = Dashboard.findOne({_userId: inputValue}) ? 
                    Dashboard.findOne({_userId: inputValue})._id : false ;

//Check on availability
  if(Dashboard.findOne({_userId: inputValue})){
    updateLocalStorage(true, dash_ID, inputValue);
    this.setState({
      join_userID: dash_ID,
      dash_user_ID: localStorage.getItem('user_id'),
      storage: {
        connect: localStorage.getItem('connect'),
        dash_ID: localStorage.getItem('dashboard_id'),
      }
    })
  }else{
  //Mark about errors
    await this.setState({
      error: true,
    })

  //Add error classList
    this.errorMessageRef.current.classList.value = 'grid-center wrap-error-message error-active';

  //Delete error message
    setTimeout(()=>{
      this.setState({
        error: false,
      })
    }, 1500);
  }

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
              connect = { this.state.storage.connect }
              error = { this.state.error }
              errorMessageRef = { this.errorMessageRef }    />
  </div>
)
}};

export default App;
