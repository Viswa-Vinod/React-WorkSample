import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
          Button,         
          Modal,
          Paper, 
          Table, 
          TableBody, 
          TableCell, 
          TableHead, 
          TableRow, 
          Switch,
          TextField 
        } from '@material-ui/core';

import SelectItem from 'components/SelectItem';
import withRoot from 'withRoot';
import { getThemes } from 'services/themes';
import SchoolDialog from './components/SchoolDialog';

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
  }
});

let id = 0;
// function createData(name, calories, fat, carbs, protein) {
//   id += 1;
//   return { id, name, calories, fat, carbs, protein };
// }

const rows = [
  { id: 1, name: 'School 1', isActive: true, themes: ['Fruits', 'Vegetables', 'Languages']},
  { id: 2, name: 'School 2', isActive: false, themes: ['Fruits']},
  { id: 3, name: 'School 3', isActive: true, themes: ['Fruits']},
  { id: 4, name: 'School 4', isActive: true, themes: ['Fruits']},
  { id: 5, name: 'School 5', isActive: false, themes: ['Fruits', 'Vegetables', 'Colors']}
];

function SimpleTable(props) {
  const [ schools, setSchools ] = useState([]);
  const [ open, setOpen ] = useState(false);
  const [ selectedSchool, setSelectedSchool ] = useState({});
  const [ themeNames, setThemeNames ] = useState([]);
  const [ theme, setTheme ] = useState([]);

  useEffect(() => {
    const getThemeNames = async () => {
      const themesRef = await getThemes();
      setThemeNames(Object.values(themesRef).map(themeObj => themeObj.name))
      setSchools(rows)
    } 
    getThemeNames();
  }, [])
  
  const handleSwitchChange = id => (event) => {
    setSchools(schools.map(school => {
      if( school.id === id ) {
        return { ...school, isActive: event.target.checked }
      }
      return school;
    }));    
    
  }

  const handleClick = id => () => {
    setSelectedSchool(schools.filter(school => school.id === id)[0]);
    setOpen(true);
  }

  const handleChange = (id, field) => (event) => {
    // setSchools(schools.map(school => school.id === id ? {...school, [field]: event.target.value} : school))
    // setSelectedSchool(schools.filter(school => school.id === id)[0]);
        
  }

  const handleSubmit = (event) => {    
    setOpen(false);
    setSchools(schools.map(school => school.id === selectedSchool.id ? selectedSchool : school))
  }

  const handleCancel = () => {
    setOpen(false);
  }

  const handleInput = (type) => event => {
    console.log({...selectedSchool, [type]: event.target.value})
    setSelectedSchool({...selectedSchool, [type]: event.target.value})
  }

  const handleSelection = (type) => (event) => {        
    if (type === 'theme') {
      setTheme(event.target.value);
    }
}
  const { classes } = props;

  return (
    <div className={classes.container}>    
    <SchoolDialog 
      title='Edit School'
      prompt='Edit School Details'
      handleTextInput={handleInput}
      handleSelection={handleSelection}
      handleSubmit={handleSubmit}
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
    </Paper>
    </div>

  );
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(SimpleTable));

