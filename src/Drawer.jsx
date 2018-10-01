import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import Divider from '@material-ui/core/Divider';
import { Route, Switch } from 'react-router-dom';
import Search from './components/Search.jsx';
import Playlist from './components/Playlist.jsx';
import Unit from './components/Unit/Unit.jsx';
import Rating from './components/Rating.jsx';
import AccountHeader from './components/account.jsx'

import MenuIcon from '@material-ui/icons/Menu';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SearchIcon from '@material-ui/icons/Search';
import BlurOnIcon from '@material-ui/icons/BlurOn';
import StarIcon from '@material-ui/icons/Star';
import { Link } from 'react-router-dom';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  appBar: {
    position: 'fixed',
    marginLeft: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
    //height: '72px',
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    border: 0,
    [theme.breakpoints.up('md')]: {
      position: 'relative',
    },
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    [theme.breakpoints.up('md')]: {
      marginLeft: drawerWidth,
    },
  },
  logo: {
    fontFamily: '"Comfortaa"',
    fontSize: '2rem',
  },
  desktopdrawer: {
    position: 'fixed',
  }
});

class ResponsiveDrawer extends React.Component {
  state = {
    mobileOpen: false,
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  render() {
    const { classes } = this.props;

    const drawer = (
      <div>
        <AccountHeader />
        <Divider />
        <List>
          <ListItem button component={Link} to="/search" onClick={this.handleDrawerToggle}>
            <ListItemIcon>
              <SearchIcon />
            </ListItemIcon>
            <ListItemText primary="Search" />
          </ListItem>
          <ListItem button component={Link} to="/playlist" onClick={this.handleDrawerToggle}>
            <ListItemIcon>
              <BlurOnIcon />
            </ListItemIcon>
            <ListItemText primary="Recommendations" />
          </ListItem>
          <ListItem button component={Link} to="/rating" onClick={this.handleDrawerToggle}>
            <ListItemIcon>
              <StarIcon />
            </ListItemIcon>
            <ListItemText primary="My Ratings" />
          </ListItem>
        </List>
      </div>
    );

    return (
      <div className={classes.root}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerToggle}
              className={classes.navIconHide}
            >
              <MenuIcon />
            </IconButton>
            <Typography className={classes.logo} color="inherit" noWrap>
              eatout
            </Typography>
          </Toolbar>
        </AppBar>
        <Hidden mdUp>
          <SwipeableDrawer
            variant="temporary"
            anchor="left"
            open={this.state.mobileOpen}
            onOpen={this.handleDrawerToggle}
            onClose={this.handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </SwipeableDrawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            variant="permanent"
            className={classes.desktopdrawer}
            open
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Switch>
            <Route exact path='/search' component={Search} />
            <Route exact path='/playlist' component={Playlist} />
            <Route exact path='/' component={Playlist}/>
            <Route exact path='/rating' component={Rating} />
            <Route path='/unit/:id' component={Unit} />
          </Switch>
        </main>
      </div>
    );
  }
}

ResponsiveDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(ResponsiveDrawer);
