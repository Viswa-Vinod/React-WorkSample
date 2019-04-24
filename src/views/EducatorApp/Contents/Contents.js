import React from 'react'
import { withStyles } from '@material-ui/core/styles';

import withRoot from 'withRoot';
import Panel from 'components/Panel';
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

  const handleInput = field => () => {
    console.log(field);
  }
  return (
    <div className={classes.root}>
      <Panel title='Contents' styling={panelStyles} >
          <ContentsForm handleNameInput={handleInput('name')}/>
      </Panel>   
    </div>
  )
}

export default withRoot(withStyles(styles)(Contents));