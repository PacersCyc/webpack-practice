import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
//import Welcome from './welcome'

/*
function tick() {
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );

  ReactDOM.render(
    element,
    document.getElementById('root2')
  );
}

setInterval(tick, 1000);
*/



ReactDOM.render(
  <App name = "Component"/>,
  document.getElementById('root')
)