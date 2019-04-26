import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AppLayout from 'components/AppLayout';
import { SIDE_BAR_ITEMS } from 'app/constants';
import NotificationManager from 'views/NotificationManager';
import EducatorApp, { Contents, Themes, Schools } from 'views/EducatorApp';

const App = (
    <Router>
        <AppLayout title='Push Notification Manager' sideBarItems={SIDE_BAR_ITEMS}>
            <Route path='/' exact component={NotificationManager} />
            <Route path='/push-notifications'  component={NotificationManager} />
            {/* <Route path='/educator-app'  component={EducatorApp} />         */}
            <Route path='/educator-app/contents'  component={Contents} /> 
            <Route path='/educator-app/themes'  component={Themes} /> 
            <Route path='/educator-app/schools'  component={Schools} /> 
        </AppLayout>
    </Router>
)
ReactDOM.render(App, document.getElementById('root'));

