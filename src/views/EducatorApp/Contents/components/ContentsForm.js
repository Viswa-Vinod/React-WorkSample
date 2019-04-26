import React, { useState } from 'react'
import { TextField, InputLabel, Switch, Button } from '@material-ui/core';
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
    button: {
      margin: theme.spacing.unit
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

function ContentsForm({ classes, handleInput, videos, themes }) {
    const [ thumbnailURL, setthumbnailURL ] = useState('');
    const [ videoURL, setVideoURL ] = useState('')
    const [ videoName, setVideoName ] = useState('');
    const [ theme, setTheme ] = useState('');
    const [ hasLessonPlan, setHasLessonPlan ] = useState(false);
    const [ lessonplanURL, setlessonplanURL ] = useState('');

    const handleSubmit = () => {
      console.log({ videoName, theme, hasLessonPlan, lessonplanURL, thumbnailURL, videoURL })
    }

    const handleChange = type => event => {
      console.log(event.target.value);
      switch (type) {
        case 'thumbnailURL':
          return setthumbnailURL(event.target.value);
        case 'videoURL':
          return setVideoURL(event.target.value);
        case 'lessonplanURL':
          return setlessonplanURL(event.target.value);  
        default: 
        break;
      }
    }
    const handleSelection = (type) => (selection) => {
        console.log(selection)
        if (type === 'video') {
          const selectedVideo = videos.filter(video => video.name === selection)[0];
          setthumbnailURL(selectedVideo.thumbnailURL);
          setVideoURL(selectedVideo.videoURL);                
          setVideoName(selectedVideo.name);
        }
        if (type === 'theme') {
          setTheme(selection);
        }
    }

    const handleSwitchChange = (event) => {
        console.log(event.target.checked);
        setHasLessonPlan(event.target.checked);
    }
  return (
    <div className={classes.root}>
        <Dropdown 
                  menuList={videos.map(video => video.name)} 
                  handleSelection={handleSelection('video')}
                //   disabled={shouldBeDisabled}
                //   deselect={backEndName === 'videoId' ? !this.state[`${backEndName}Value`]: false}
                  prompt='Video'                   
        />
        <Dropdown 
                  menuList={themes} 
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
                    value={hasLessonPlan}
                    color="primary"
            />
        </div> 
     
        {hasLessonPlan && <TextField 
            required
            variant='outlined'
        //   id={backEndName}
            label={'Lesson Plan URL'} 
        //   disabled={shouldBeDisabled} 
            className={classes.textField} 
            value={lessonplanURL} 
            onChange={handleChange('lessonplanURL')}
        />}
        <TextField 
              required
              variant='outlined'
            //   id={backEndName}
              label={'Video URL'} 
            //   disabled={shouldBeDisabled} 
              className={classes.textField} 
              value={videoURL} 
              onChange={handleChange('videoURL')}
        />
        <TextField 
              required
              variant='outlined'
            //   id={backEndName}
              label={'Thumbnail URL'} 
            //   disabled={shouldBeDisabled} 
              className={classes.textField} 
              value={thumbnailURL} 
              onChange={handleChange('thumbnailURL')}
        />
        <Button color="primary" className={classes.button} onClick={handleSubmit}>
          Go
        </Button>
    </div>
  )
}

export default withRoot(withStyles(styles)(ContentsForm));