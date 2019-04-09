import React from 'react';
import ReactDOM from 'react-dom';
import NotificationManager from './pages/NotificationManager';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<NotificationManager />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
