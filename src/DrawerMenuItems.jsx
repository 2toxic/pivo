import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MapIcon from '@material-ui/icons/Map';
import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import HomeIcon from '@material-ui/icons/Home';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import { Link } from 'react-router-dom';

export const DrawerMenuItems = (
  <div>
    <ListItem button component={Link} to="/">
      <ListItemIcon>
        <HomeIcon />
      </ListItemIcon>
      <ListItemText primary="Home" />
    </ListItem>
    <ListItem button component={Link} to="/map">
      <ListItemIcon>
        <MapIcon />
      </ListItemIcon>
      <ListItemText primary="Map" />
    </ListItem>
    <ListItem button component={Link} to="/playlist">
      <ListItemIcon>
        <PlaylistPlayIcon />
      </ListItemIcon>
      <ListItemText primary="Playlist" />
    </ListItem>
    <ListItem button component={Link} to="/trending">
      <ListItemIcon>
        <TrendingUpIcon />
      </ListItemIcon>
      <ListItemText primary="Trending" />
    </ListItem>
  </div>
);
