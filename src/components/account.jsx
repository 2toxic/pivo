import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import { Link } from 'react-router-dom'

import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import FingerprintIcon from '@material-ui/icons/Fingerprint';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import axios from 'axios';

const drawerWidth = 240;

const styles = theme => ({
  account_link: {
    color: '#224444',
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    border: 0,
    [theme.breakpoints.up('md')]: {
      position: 'relative',
    },
  },
});

class AccountHeader extends React.Component {
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleLogout = () => {
    this.handleClose();
    axios({
        url: 'http://localhost:8000/logout',
        method: 'GET',
        withCredentials: true
    }).then((resp) => {
    }).catch((err) => {
      console.log(err);
    });
    localStorage.setItem('username', 'ANONYMOUS');
    localStorage.setItem('userid', 0);
    this.forceUpdate();
  }

  render() {
    const { anchorEl } = this.state;
    const { classes } = this.props;


    let logout_button = '';
    let login_button = '';
    let my_account_button = '';
    let register_button = '';
    if (localStorage.getItem('username') !== 'ANONYMOUS') {
      logout_button = <MenuItem onClick={this.handleLogout}>
        <ListItemIcon>
          <ExitToAppIcon />
        </ListItemIcon>
        <ListItemText inset primary="Logout" />
      </MenuItem>
      my_account_button = <MenuItem onClick={this.handleClose} component={Link} to='/me'>
        <ListItemIcon>
          <AccountCircleIcon />
        </ListItemIcon>
        <ListItemText inset primary="My account" />
      </MenuItem>
    } else {
      login_button = <MenuItem component={Link} to='/login' onClick={this.handleClose}>
          <ListItemIcon>
            <FingerprintIcon />
          </ListItemIcon>
          <ListItemText inset primary="Login" />
        </MenuItem>
      register_button = <MenuItem component={Link} to='/register' onClick={this.handleClose}>
        <ListItemIcon>
          <PersonAddIcon />
        </ListItemIcon>
        <ListItemText inset primary="Register" />
      </MenuItem>
    }

    return (
      <div>
        <div className={classes.toolbar}>
          <CardHeader
          avatar={
            <Avatar aria-label={localStorage.getItem('username')} className={classes.account_icons}>
              {localStorage.getItem('username')[0].toUpperCase()}
            </Avatar>
          }
          title={
            <div>
            <Button
              aria-owns={anchorEl ? 'simple-menu' : null}
              aria-haspopup="true"
              onClick={this.handleClick}
              className={classes.account_link}
            >
              {localStorage.getItem('username')}
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={this.handleClose}
            >
              {my_account_button}
              {logout_button}
              {login_button}
              {register_button}
            </Menu>
            </div>
          }
            />
        </div>
      </div>
    );
  }
}



export default withStyles(styles, { withTheme: true })(AccountHeader);
