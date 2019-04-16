import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Button, TextField } from '@material-ui/core';

import withRoot from '../../withRoot';

const styles = theme => ({
  root: {    
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },  
  button: {
    margin: theme.spacing.unit,
    width: 200
  },
  input: {
    display: 'none',
  },
  schedule: {
    display: 'flex',
    justifyContent: 'flex-end'    
  }
});

const getCurrentDate = () => {
  const now = new Date();
  return `${now.toLocaleDateString()}T${now.getHours()}:${now.getMinutes()}`
}


function NotificationActions(props) {
  const { classes, handleClick, validForm, handleSchedule } = props;
  // console.log({validForm})
  return (
    <div className={classes.root}>       
      <Button 
        variant="contained" 
        color="primary" 
        className={classes.button} 
        disabled={!validForm} 
        onClick={ handleClick('send')}
        size="small"
      >
        Send Notification
      </Button>        
      <TextField
        id="datetime-local"
        label="Schedule Notification"
        type="datetime-local"
        disabled={!validForm}
        defaultValue={getCurrentDate()}
        onChange={handleSchedule}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}      
      />     
      </div>
    
  );
}

NotificationActions.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(NotificationActions));
