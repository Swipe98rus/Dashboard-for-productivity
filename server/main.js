import { Meteor } from 'meteor/meteor';
import Todos from '/imports/api/todos';

function insertLink(title, url) {
  Todos.insert({ title, url, createdAt: new Date() });
}

Meteor.startup(() => {});
