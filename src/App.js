import React from 'react';
import './App.css';
import './styles/main.css';
import Todo from "./components/Todo";
import SignIn from "./components/SignIn"

function App() {
  return (
    <div className="App">
      <Todo/>
      {/*<SignIn />*/}
    </div>
  );
}

export default App;
