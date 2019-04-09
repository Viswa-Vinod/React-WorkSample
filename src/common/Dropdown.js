import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

class Dropdown extends React.Component {
    selection='';
  state = {
    anchorEl: null,
  };

  handleClick = event => {    
    !this.props.disabled && this.setState({ anchorEl: event.currentTarget });    
  };

  handleClose = (event) => {
    this.selection = event.target.textContent;
    // console.log('selection in dropdown', this.selection);
    const { handleSelection } = this.props;   
    this.setState({ anchorEl: null }, ()=>handleSelection(this.selection));
  };

  render() {
    const { anchorEl } = this.state;
    const { menuList, disabled, deselect } = this.props;
    if (disabled) this.selection = '';
    
    return (
      <div>
        <Button
          aria-owns={anchorEl ? 'simple-menu' : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
          disabled={disabled}
        >
          {deselect ? 'Select' : (this.selection || 'Select')}
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
            {
                menuList.map(menuItem => <MenuItem onClick={this.handleClose} key={menuItem}>{menuItem}</MenuItem>)
            }
          
        </Menu>
      </div>
    );
  }
}

export default Dropdown;
