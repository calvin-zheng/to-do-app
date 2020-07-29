import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <body>
      <input id="input" placeholder="What needs to be done?" />
        <ul id="list"></ul>
      </body>
    </div>
  );
}

function newItem() {
  var item = document.getElementById('input').value;
  var ul = document.getElementById('list');
  var li = document.createElement('li');
  li.appendChild(document.createTextNode("- "+item));
  ul.appendChild(li);

  document.getElementById('input').value = '';

  li.onclick = removeItem;
}

document.body.onkeyup = function(e) {
  if(e.keyCode == 13){
    newItem();
  }
}

function removeItem(e) {
  e.target.remove();
}

export default App;
