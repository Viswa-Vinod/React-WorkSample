import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import withRoot from '../../withRoot';

const styles = theme => ({
  root: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-evenly'
  },
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

function NotificationActions(props) {
  const { classes, handleClick, validForm } = props;
  // console.log({validForm})
  return (
    <div className={classes.root}>
     
      <Button 
        variant="contained" 
        color="primary" 
        className={classes.button} 
        disabled={!validForm} 
        onClick={() => handleClick('send')}
      >
        Send Notification
      </Button>
      <Button 
        variant="outlined" 
        color="secondary" 
        className={classes.button} 
        disabled onClick={()=>handleClick('schedule')}
      >
        Schedule Notification
      </Button>      
    </div>
  );
}

NotificationActions.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(NotificationActions));
