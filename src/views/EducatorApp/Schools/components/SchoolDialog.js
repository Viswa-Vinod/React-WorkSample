import React from 'react'
import { 
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
    Button 
} from '@material-ui/core';
import SelectItem from 'components/SelectItem';

export default function SchoolDialog(props) {
   const { 
       title, 
       prompt, 
       handleTextInput, 
       handleSelection, 
       handleSubmit, 
       open, 
       handleCancel, 
       selectedSchool,
       themeNames 
    } = props; 
  return (
    <Dialog
    open={open}
    onClose={handleCancel}
    aria-labelledby="form-dialog-title"
  >
    <DialogTitle id="form-dialog-title">{title}</DialogTitle>
    <DialogContent>
      <DialogContentText>
        {prompt}
      </DialogContentText>

      <TextField
        autoFocus
        margin="dense"
        id="name"
        label="Name"
        type="text"
        fullWidth
        onChange={handleTextInput('name')}
        value={selectedSchool.name}
      />
       <TextField
        autoFocus
        margin="dense"
        id="url"
        label="URL"
        type="text"
        fullWidth
        onChange={handleTextInput('url')}
      />
       <TextField
        autoFocus
        margin="dense"
        id="logo"
        label="logo"
        type="text"
        fullWidth
        onChange={handleTextInput('logo')}
      />
       <SelectItem 
        prompt='Select Themes'
        onChange={handleSelection('theme')}
        items={themeNames}
        itemDefault={selectedSchool.themes} 
        multiple
    /> 
    </DialogContent>
    <DialogActions>
      <Button onClick={handleCancel} color="primary">
        Cancel
      </Button>
      <Button onClick={handleSubmit} color="primary" >
        Submit
      </Button>
    </DialogActions>
  </Dialog>

  )
}
