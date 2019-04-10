import React from 'react';
import PropTypes from 'prop-types';
// import Button from '@material-ui/core/Button';
// import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { CircularProgress, Modal, Typography } from '@material-ui/core';

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
  },
  loader: {    
    marginLeft: '50%'
  },
  modal: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none',
  },
});

const panelStyles = {
  maxWidth: '50%',
  marginBottom: 20
} 



function getModalStyle() {
  const top = 50;
  const left = 50;;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}


const sideBarItems = ['Push Notifications', 'Video Uploads', 'Analytics'];
const NOTIFICATION_CLOUD_FUNCTION = 'https://us-central1-testapp-6ab58.cloudfunctions.net/sendNotificationLastSeen';


class NotificationManager extends React.Component {
  
  state = {
    validPayload: false,
    validUserParams: false,
    sendingNotification: false
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
      this.setState({ sendingNotification: true });
      try {
        console.log('sending data to DB', {payload: this.payload, userParams: this.userParams});
        // setTimeout(()=>this.setState({ sendingNotification: false }), 3000);
        await setOne('Notification', 'Payload', this.payload);
        await setOne('Notification', 'userParameters', this.userParams);
        fetch(NOTIFICATION_CLOUD_FUNCTION)
          .then(response => response.json())
          .then(data => {
                console.log({data});
                this.setState({ sendingNotification: false });
          })
          .catch(err=>{
            console.log({err});
            this.setState({ sendingNotification: false });
          });

      } catch (Error) {
        console.log({Error})
      }
    }
  }

  handleValidity = type => validityStatus => {    
    console.log({type, validityStatus})
    this.setState({[type]: validityStatus})
  }

  render() {
    const { classes } = this.props;
    const { validPayload, validUserParams, sendingNotification } = this.state;
    
    return (
      
      <AppLayout title='Push Notification Manager' sideBarItems={sideBarItems}>
      <div className={classes.root} >
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={sendingNotification}
          onClose={()=>{}}
        >
          <div style={getModalStyle()} className={classes.modal}>
            <Typography variant="h6" id="modal-title">
              Sending Notification
            </Typography>
            <CircularProgress className={classes.loader}/>
            <Typography variant="subtitle1" id="simple-modal-description">
              Please wait while notification is being sent
            </Typography>
            
          </div>
        </Modal>
        <Panel title='Payload' styling={panelStyles} >
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
              validForm={validPayload && validUserParams && !sendingNotification} />
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
