import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { FormLabel, FormControl, Switch, Input, InputLabel} from '@material-ui/core';
import {Slider} from '@material-ui/lab';
import withRoot from 'withRoot';

const styles = theme => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent:'center',      
      width: '100%'      
    },
    formControl: {
      // margin: theme.spacing.unit * 3,
      display: 'flex',      
      justifyContent: 'center',      
      flexWrap: 'nowrap',
      margin: theme.spacing.unit      
    },   
    label: {      
      position:'relative',
      top: 10
    },    
    slider: {
        width: 200,
        paddingTop: 20,        
        marginLeft: 20
    }
  });

  
  class UsersForm extends React.Component {    
    isValidUserParams = false;
    boolFields = [
                    {uiName: 'Signed Up', backEndName: 'isSignedUp'}, 
                    {uiName: 'Subscription Valid',backEndName: 'hasSubscribed', showIf: 'isSignedUp'}, 
                    {uiName:'Viewed Videos', backEndName: 'hasViewedVideos', showIf: 'isSignedUp'}
                ]
    numFields = [
                    {uiName: 'Subscription Will Expire In (Days)', backEndName: 'subscriptionWillExpireIn', showIf: 'isSignedUp,hasSubscribed'}, 
                    {uiName: 'Min Time Elapsed (Days)', backEndName: 'timeElapsedMin'}, 
                    {uiName: 'Max Time Elapsed (Days)', backEndName: 'timeElapsedMax'}
                ]

    state = {
        isSignedUp: false,
        hasSubscribed: false, 
        hasViewedVideos: false,
        subscriptionWillExpireIn: 0,
        timeElapsedMin: 0,
        timeElapsedMax: 0
    }

    componentDidUpdate() {
      const { timeElapsedMax, timeElapsedMin } = this.state;
      
      if (( timeElapsedMax < timeElapsedMin ) && this.isValidUserParams ) {
        this.isValidUserParams = false;
        this.props.validity(false)
      }
      if (( timeElapsedMax > timeElapsedMin ) && !this.isValidUserParams ) {
        this.isValidUserParams = true;
        this.props.validity(true)
      } 
    }  
    handleSwitchChange = name => event => {
        this.props.handleInput(name, event.target.checked);        
        this.setState({ [name]: event.target.checked }) ;
    };

    handleSliderChange = name => (event, value) => {                
        this.props.handleInput(name, value);
        this.setState({[name]: value});
    }
    
    arePrerequisitesTrue = (prerequisites) => {
      const showIfs = prerequisites.split(',');
      let prerequisiteArr = [];
      showIfs.forEach(prerequisite => prerequisiteArr.push(this.state[prerequisite]));
      return prerequisiteArr.every(item => item);
    }

    renderField = type => fieldObj =>  {
      
      return (
        (!fieldObj.showIf || this.arePrerequisitesTrue(fieldObj.showIf)) && 
          <div className={this.props.classes.formControl} key={fieldObj.backEndName}>           
          {/* <FormLabel className={this.props.classes.label} required>
            {fieldObj.uiName}
          </FormLabel> */}
          {
              type === 'bool' && (
              <>
              <FormControl>
               <InputLabel className={this.props.classes.label} shrink>{fieldObj.uiName}</InputLabel> 
              <Switch
                className={this.props.classes.switch}
                checked={this.state[fieldObj.backEndName]}
                onChange={this.handleSwitchChange(fieldObj.backEndName)}
                value={fieldObj.backEndName}
                color="primary"
              />
              </FormControl>
              </>)
          }
          {
              type === 'num' && 
              (
                  <>
                   <FormControl>
                      <InputLabel className={this.props.classes.label} shrink>{fieldObj.uiName}</InputLabel> 
                      <Slider 
                              className={this.props.classes.slider}
                              value={this.state[fieldObj.backEndName]}        
                              onChange={this.handleSliderChange(fieldObj.backEndName)}
                              step={1}
                              min={0}                        
                      />
                      <Input readOnly value={this.state[fieldObj.backEndName]} disableUnderline/>
                    </FormControl>
                  </>
              )                
          }
        </div>      
      )
    }
    

    render() {
        
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                { this.boolFields.map(this.renderField('bool')) }             
                { this.numFields.map(this.renderField('num')) }
            </div>
        )
    }
  }

  export default withRoot(withStyles(styles)(UsersForm));