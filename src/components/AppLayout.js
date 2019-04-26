import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { 
        Drawer, 
        CssBaseline, 
        AppBar,
        Collapse, 
        Toolbar, 
        List, 
        Typography, 
        Divider, 
        IconButton, 
        Menu, 
        ListItem, 
        ListItemText } from '@material-ui/core';
import withRoot from 'withRoot';
import MenuIcon from '@material-ui/icons/Menu';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import Links from 'utils/links';


const drawerWidth = 240;

const styles = theme => ({
  appBarRoot: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  compoundMenu: {
    borderColor: 'red',
    // display: 'flex',
    // flexDirection: 'column',
    // alignItems: 'flex-start'
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
    borderColor: 'red',
    borderWidth: 1
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }), 
    marginLeft: 0,
  }
});

class PersistentDrawerLeft extends React.Component {
  state = {
    open: false,
    submenuOpen: false,
    title:'Push Notification Manager'
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  toggleSubmenu = menu => () => {
    // console.log({menu})
    this.setState((prevState) => ({ submenuOpen:!prevState.submenuOpen, title: menu }))
  }

  handleClick = (menu) => () => {
    // console.log({menu})
    this.setState({ title: menu})
  }
  render() {
    const { classes, theme, children, sideBarItems } = this.props;
    const { open, submenuOpen, title } = this.state;

    return (
      <div className={classes.appBarRoot}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar disableGutters={!open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
             
                <Typography variant="h6" color="inherit" noWrap>
                    {title}
                </Typography>
             
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>
          <Divider />
          <List>
            {sideBarItems.map((item) =>  {
             
             if (typeof item === 'string') 
              return (
                <ListItem button onClick={this.handleClick(item)} key={item}>
                  <Link to={Links.computeLinkString(item)}>
                      <ListItemText primary={item}/>
                  </Link>
                </ListItem>
              )
              if (typeof item === 'object') {
                for ( let key in item) {                  
                  const subMenus = item[key];
                    return (
                      [
                      <ListItem button key={key} onClick={this.toggleSubmenu(key)} className={classes.compoundMenu}>
                        <Link to={Links.computeLinkString(key)}> 
                        <ListItemText primary={key} />
                        </Link>
                        {submenuOpen ? <ExpandLess /> : <ExpandMore />}
                      </ListItem>,
                        <Collapse key='collapse' in={submenuOpen} timeout="auto" unmountOnExit>
                        <List key='submenus' component='div'  disablePadding>
                        {subMenus.map(subMenu => (
                          <ListItem button key={subMenu} className={classes.nested} onClick={this.handleClick(subMenu)}>
                            <Link to={Links.computeLinkObject({ menu: key, subMenu})}>
                              <ListItemText inset primary={subMenu}/>
                            </Link>
                          </ListItem>                          
                        ))}
                        </List>                       
                        </Collapse>
                      ]
                    )
                  }                
              }
            })
            }
          </List>          
        </Drawer>
        <main
          className={classNames(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader} />
          {children}
        </main>
      </div>
    );
  }
}

export default withRoot(withStyles(styles)(PersistentDrawerLeft));