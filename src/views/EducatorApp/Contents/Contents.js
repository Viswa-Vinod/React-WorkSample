import React, { useState, useEffect } from 'react'
import { withStyles } from '@material-ui/core/styles';

import withRoot from 'withRoot';
import Panel from 'components/Panel';
import { getVideos } from 'services/videos/videoInfo';
import { getThemes } from 'services/themes';
import ContentsForm from './components/ContentsForm';

const styles = theme => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 5,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'   
  }
})
//TODO: go into style themes
const panelStyles = {
  maxWidth: '70%',
  marginBottom: 20
} 

function Contents(props) {
  const { classes } = props;
   const [ videos, setVideos ] = useState([]);
   const [ themeNames, setThemeNames ] = useState([]);

   useEffect(() => {
    const getVideoObjects = async () => {
      const videosCollectionRef = await getVideos();
      // console.log({videosCollectionRef});
      const themesRef = await getThemes();
      // console.log({themes: themesRef})
      setVideos(Object.values(videosCollectionRef)
                .map(({id, name, thumbnailURL}) => ({videoURL: id, name, thumbnailURL })));
      setThemeNames(Object.values(themesRef).map(themeObj => themeObj.name))
    } 
    getVideoObjects();
   }, [])
  const handleInput = field => () => {
    console.log(field);
    
  }


  return (
    <div className={classes.root}>
      <Panel title='Contents' styling={panelStyles} >
          <ContentsForm handleNameInput={handleInput('name')} videos={videos} themes={themeNames}/>
      </Panel>   
    </div>
  )
}

export default withRoot(withStyles(styles)(Contents));