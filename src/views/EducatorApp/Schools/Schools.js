import React, { useState, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
          Button,         
          Paper, 
          Table, 
          TableBody, 
          TableCell, 
          TableHead, 
          TableRow, 
          Switch,
        } from '@material-ui/core';

import withRoot from 'withRoot';
import { getThemes, getSchools, updateSchool } from 'services';
import SchoolDialog from './components/SchoolDialog';
import uuid from 'uuid/v4';

console.log(uuid());

const styles = theme => ({
  container: {
    display: 'flex',
    justifyContent: 'center'
  },
  root: {
    width: 550,
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
    // display: 'flex',
    // justifyContent: 'center'
    
  },
  table: {
    // minWidth: 700,
    maxWidth: 500
  },
  modal: {
    maxWidth: 400,
    top: '50%',
    left: '50%'
  },
  header: {
    fontSize: 16
  },
  addschoolBtn: {
    display: 'flex',
    justifyContent:'center'
  }
});

let id = 0;
// function createData(name, calories, fat, carbs, protein) {
//   id += 1;
//   return { id, name, calories, fat, carbs, protein };
// }



function SchoolList(props) {
  const [ schools, setSchools ] = useState([]);
  const [ open, setOpen ] = useState(false);
  const [ selectedSchool, setSelectedSchool ] = useState({});
  const [ themeNames, setThemeNames ] = useState([]);
  const [ themes, setThemes ] = useState({});
  const [ saveData, setSaveData ] = useState(false);
  const [ schoolEdited, setSchoolEdited] = useState('');
  const [ addingSchool, setAddingSchool ] = useState(false);
  
  useEffect(() => {
    const getThemesAndSchools = async () => {
      const themesRef = await getThemes();
      setThemes(themesRef)
      setThemeNames(Object.values(themesRef).map(themeObj => themeObj.name))
      const schoolsRef = await getSchools();
      setSchools(Object.entries(schoolsRef).map(schoolObj => ({
        id: schoolObj[0], 
        name: schoolObj[1].name,
        isActive: schoolObj[1].isActive,
        logoURL: schoolObj[1].logoURL,
        themes: schoolObj[1].themes.map(theme => themesRef[theme].name)
      })))
    } 
    getThemesAndSchools();
  }, []);
   
  
  
  useEffect(() => {    
    console.log('in effect 2', { schoolEdited, schools });
    const selectedSchool = schools.filter(school => school.id === schoolEdited)[0];  
    if ( selectedSchool && themes && schoolEdited && saveData ) {                
      updateSchool(selectedSchool, themes);
      saveData && setSaveData(false);      
    }
  }, [ schoolEdited, saveData ]);
  
  const handleSwitchChange = id => (event) => {
    setSchools(schools.map(school => {
      if( school.id === id ) {
        return { ...school, isActive: event.target.checked }
      }
      return school;
    })); 
    // setSelectedSchool(schools.filter(school => school.id === id)[0])
    setSchoolEdited(id);
    setSaveData(true);
  }

  const handleClick = id => () => {
    setSelectedSchool(schools.filter(school => school.id === id)[0]);
    setOpen(true);
  }


  const handleSubmit = (type) => () => {    
    console.log({type});
    if (type === 'Edit') {      
      setOpen(false);    
      setSchools(schools.map(school => school.id === selectedSchool.id 
                              ? selectedSchool  : school));    
      setSchoolEdited(selectedSchool.id); 
      setSaveData(true);   
    }

    if (type === 'Add') {
      setAddingSchool(false);
      setOpen(false);   
      const newSchool = { ...selectedSchool, id: uuid(), isActive: true}
      console.log({ newSchool });
      setSchoolEdited(newSchool.id);
      setSchools([...schools, newSchool]);
      setSaveData(true);
    }
  }

  const handleCancel = () => {
    setOpen(false);
  }

  const handleInput = (type) => event => {
    setSelectedSchool({...selectedSchool, [type]: event.target.value})
  }
  
  const { classes } = props;

  const handleAddSchool = () => {
    setSelectedSchool({});
    setAddingSchool(true)
    setOpen(true);
  }
  return (
    <div className={classes.container}>    
    <SchoolDialog 
      title={ `${!addingSchool ? 'Edit ' : 'Add '} School` }
      prompt={ `${!addingSchool ? 'Edit ' : 'Add '} School Details` }
      handleInput={handleInput}
      handleSubmit={handleSubmit(!addingSchool ? 'Edit' : 'Add')}
      open={open} 
      handleCancel={handleCancel} 
      selectedSchool={selectedSchool}
      themeNames={themeNames}
    /> 
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead  >
          <TableRow>
            <TableCell className={classes.header} align="center">Name</TableCell>
            <TableCell className={classes.header} align="center">is Active</TableCell>            
          </TableRow>
        </TableHead>
        <TableBody>
          {schools.map(school => (
            <TableRow key={school.id}>
              <TableCell component="th" scope="row" align='center'>
                <Button onClick={handleClick(school.id)}>{school.name}</Button>
              </TableCell>
              <TableCell align="center">
              <Switch
                className={classes.switch}
                checked={school.isActive}
                onChange={handleSwitchChange(school.id)}
                value={school.isActive}
                color="primary"
              />
              </TableCell>              
            </TableRow>
          ))}
          
        </TableBody>
      </Table>
      <div className={classes.addschoolBtn}>
        <Button onClick={handleAddSchool} color='primary'>Add School</Button>
      </div>
    </Paper>
    </div>

  );
}

SchoolList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(SchoolList));

