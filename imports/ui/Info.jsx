import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';
import Links from '../api/links';

class Info extends Component {
  render() {
    const links = this.props.links.map(
      link => this.makeLink(link)
    );


    return (
      <div>
        <h2>Learn Meteor!</h2>
        <ul>{ links }</ul>
        <form onSubmit={(e)=>{this.handleSubmit(e)}}>
          <input type="text" placeholder="Type some text" ref="textInput"/>
        </form>
      </div>
    );
  }

remove(e, link){
  e.preventDefault();
  console.log(link)
  Links.remove(link)
}

handleSubmit(e){
  e.preventDefault();

  const link = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
  console.log(link);
  Links.insert({
    title: link,
    url: link,
  })

  ReactDOM.findDOMNode(this.refs.textInput).value = '';
}

  makeLink(link) {
    return (
      <li key={link._id}>
        <a href={link.url} target="_blank">{link.title}</a>
        <button onClick={(e)=>{this.remove(e, link._id)}}>X</button>
      </li>
    );
  }
}

export default InfoContainer = withTracker(() => ({
    links: Links.find().fetch(),
}))(Info);
