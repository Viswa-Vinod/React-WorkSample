import React, { useState } from 'react'
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';

import { withStyles } from '@material-ui/core/styles';
import withRoot from 'withRoot';

const styles = theme => ({
   
    selectFormControl: {
      minWidth: 200
    },
    selectArea: {
      marginLeft: 20,
      marginBottom: 20
    } 
    
});

function SelectItem(props) {
  const  { prompt, onChange, items, itemDefault, multiple = false, classes } = props;
  const [ item, setItem ] = useState(itemDefault);
  const handleChange = (event) => {
    setItem(event.target.value);
    onChange(event);
  }
  return (
    <FormControl className={classes.selectFormControl}>
          <InputLabel htmlFor="video-simple">{prompt}</InputLabel>
          <Select
            value={item}
            className={classes.selectArea}
            onChange={handleChange}
            multiple={multiple}
            // inputProps={{
            //   name: 'Video',
            //   id: 'video-simple',
            // }}
          >
             {
                items
                .map(item => <MenuItem key={item} value={item}>{item}</MenuItem>)
            }
          </Select>
          </FormControl>
  )
}

export default withRoot(withStyles(styles)(SelectItem));