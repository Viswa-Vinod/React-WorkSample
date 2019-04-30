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
       handleInput, 
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
        onChange={handleInput('name')}
        value={selectedSchool && selectedSchool.name || ''}
      />
       <TextField
        autoFocus
        margin="dense"
        id="url"
        label="Logo URL"
        type="text"
        fullWidth
        onChange={handleInput('logoURL')}
        value={selectedSchool && selectedSchool.logoURL || ''}
      />
       {/* <TextField
        autoFocus
        margin="dense"
        id="logo"
        label="logo"
        type="text"
        fullWidth
        onChange={handleInput('logo')}
        value={selectedSchool && selectedSchool.logoURL || ''}
      /> */}
       <SelectItem 
        prompt='Select Themes'
        onChange={handleInput('themes')}
        items={themeNames}
        itemDefault={selectedSchool && selectedSchool.themes || []} 
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
