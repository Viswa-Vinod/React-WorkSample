import React from 'react';
import PropTypes from 'prop-types';
// import Button from '@material-ui/core/Button';
// import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import withRoot from '../../withRoot';
import AppLayout from '../../common/AppLayout';
import Panel from '../../common/Panel';

import PayloadForm from './PayloadForm';
import UsersForm from './UsersForm';
import NotificationActions from './NotificationActions';

import { setOne } from '../../services/firestore';

const styles = theme => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 5,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
});

const panelStyles = {
  maxWidth: '50%',
  marginBottom: 20
} 

const sideBarItems = ['Push Notifications', 'Video Uploads', 'Analytics']

// const validateUserEntries = ( payload, userParams ) => {
//   let valid = true, msg='';
//   const { timeElapsedMin, timeElapsedMax} = userParams;
//   const { title, body } = payload;

//   if (timeElapsedMax <= timeElapsedMin) { 
//     valid = false;
//     msg = 'Time Elapsed Min should be greater than Time Elasped Max';
//   } 

// }
class NotificationManager extends React.Component {
  
  state = {
    validPayload: false,
    validUserParams: false
  }

  payload = { 
              appState: 'background', 
              type: 'video', 
              title:'', 
              body: '', 
              webUrl: '', 
              videoId: '', 
              videoCategory:'', 
              image:'' 
            };

  userParams = { 
                  isSignedUp: false, 
                  hasSubscribed: false, 
                  hasViewedVideos: false, 
                  subscriptionWillExpireIn: 10000, 
                  timeElapsedMax: 10000, 
                  timeElapsedMin: 0, 
                  hasOpenedApp:'do not use', 
                  hasViewedSamples: 'do not use' 
              };

  handlePayloadInput = (name, value) => {
    this.payload[name] = value; 
    //console.log({payload: this.payload})   
  }

  handleUserParamInput = (name, value) => {
    this.userParams[name] = value;
    // console.log({userParams: this.userParams})
  }

  handleClick = async (actionType) => {
    if (actionType === 'send') {
      // validateUserEntries(this.payload,this.userParams);
      try {
        console.log('sending data to DB', {payload: this.payload, userParams: this.userParams})
        await setOne('Notification', 'Payload', this.payload);
        await setOne('Notification', 'userParameters', this.userParams);
      } catch (Error) {
        console.log({Error})
      }
    }
  }

  handleValidity = type => validityStatus => {    
    // console.log({type, validityStatus})
    this.setState({[type]: validityStatus})
  }

  render() {
    const { classes } = this.props;
    const { validPayload, validUserParams } = this.state;

    return (
      
      <AppLayout title='Push Notification Manager' sideBarItems={sideBarItems}>
      <div className={classes.root}>
        <Panel title='Payload' styling={panelStyles}>
          <PayloadForm 
              handleInput={this.handlePayloadInput} 
              validity={this.handleValidity('validPayload')}
          />          
        </Panel>
        <Panel title='Users' styling={panelStyles}>
          <UsersForm 
              handleInput={this.handleUserParamInput}
              validity={this.handleValidity('validUserParams')}    
          />
        </Panel>
        <Panel title='Actions' styling={panelStyles} >
          <NotificationActions 
              handleClick={this.handleClick} 
              validForm={validPayload && validUserParams} />
        </Panel>       
      </div>
      </AppLayout>
    );
  }
}

NotificationManager.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(NotificationManager));
