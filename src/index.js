import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

if (localStorage.getItem('username') === null) {
  localStorage.setItem('username', 'ANONYMOUS');
}
if (localStorage.getItem('userid') === null) {
  localStorage.setItem('userid', 0);
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
