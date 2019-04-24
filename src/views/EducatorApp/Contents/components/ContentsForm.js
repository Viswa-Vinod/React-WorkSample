import React from 'react'
import { TextField, FormControl, InputLabel, Switch } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Dropdown from 'components/Dropdown';
import withRoot from 'withRoot';

const styles = theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent:'center',      
        width: '100%'      
      },
    formControl: {
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    label: {
        fontSize: 20
    },
    textField: {
        marginBottom: 20
    }        
    
});

function ContentsForm({ classes, handleInput }) {
    const handleSelection = (type) => (selection) => {
        console.log(selection)
    }

    const handleSwitchChange = (event) => {
        console.log(event.target.checked)
    }
  return (
    <div className={classes.root}>
        <Dropdown 
                  menuList={['Dog', 'Cat']} 
                  handleSelection={handleSelection('video')}
                //   disabled={shouldBeDisabled}
                //   deselect={backEndName === 'videoId' ? !this.state[`${backEndName}Value`]: false}
                  prompt='Video'                   
        />
        <Dropdown 
                  menuList={['Dog', 'Cat']} 
                  handleSelection={handleSelection('theme')}
                //   disabled={shouldBeDisabled}
                //   deselect={backEndName === 'videoId' ? !this.state[`${backEndName}Value`]: false}
                  prompt='Theme'                   
        />
        <div className={classes.formControl}>
            <InputLabel className={classes.label} shrink>{'Has Lesson Plan ?'}</InputLabel> 
                <Switch
                    // className={this.props.classes.switch}
                    // checked={this.state[fieldObj.backEndName]}
                    onChange={handleSwitchChange}
                    // value={fieldObj.backEndName}
                    color="primary"
            />
        </div> 
        {/* <FormControl className={classes.formControl}> */}
        
        {/* </FormControl> */}
        <TextField 
            required
            variant='outlined'
        //   id={backEndName}
            label={'Lesson Plan URL'} 
        //   disabled={shouldBeDisabled} 
            className={classes.textField} 
        //   value={} 
            onChange={handleInput}
        />
        <TextField 
              required
              variant='outlined'
            //   id={backEndName}
              label={'Video URL'} 
            //   disabled={shouldBeDisabled} 
              className={classes.textField} 
            //   value={} 
              onChange={handleInput}
        />
        <TextField 
              required
              variant='outlined'
            //   id={backEndName}
              label={'Thumbnail URL'} 
            //   disabled={shouldBeDisabled} 
              className={classes.textField} 
            //   value={} 
              onChange={handleInput}
        />
    </div>
  )
}

export default withRoot(withStyles(styles)(ContentsForm));