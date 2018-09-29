import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

import LocalDiningIcon from '@material-ui/icons/LocalDining';
import LocalCafeIcon from '@material-ui/icons/LocalCafe';
import LocalBarIcon from '@material-ui/icons/LocalBar';

import { Link } from 'react-router-dom';

import axios from 'axios'

const styles = theme => ({
  textField: {
    minWidth: '50%',
  },
  nothing_found: {
    textAlign: 'center',
  },
});

class Unit extends React.Component {
  state = {
    listitems: '',
  };

  handleChange = (event) => {
    if (event.target.id !== 'search_places') {
      return;
    }
    if (event.target.value === '') {
      this.setState({ listitems: [] });
      return;
    }
    this.setState({ 'search_places': event.target.value });
    axios({
      url: 'http://localhost:8000/p/range/0/10/' + event.target.value,
      method: 'GET',
      withCredentials: true,
    }).then((resp) => {
      let items = [];
      for (let i = 0; i < resp.data.length; i++) {
        let container = resp.data[i].navicontainer;
        let address = resp.data[i].naviaddress;
        console.log(resp.data[i]);
        axios({
          url: `https://api.naviaddress.com/api/v1.5/Addresses/${container}/${address}?lang=ru`
        }).then(resp2 => {
          let icon = '';
          let naviresp = resp2.data.result;
          if (naviresp.category) {
            if (naviresp.category.id === 5) {
              icon = <ListItemIcon>
                       <LocalBarIcon />
                     </ListItemIcon>
            }
            if (naviresp.category.id === 6) {
              icon = <ListItemIcon>
                       <LocalCafeIcon />
                     </ListItemIcon>
            }
            if (naviresp.category.id === 4) {
              icon = <ListItemIcon>
                       <LocalDiningIcon />
                     </ListItemIcon>
            }
          }
          items.push(
            <ListItem key={'litem' + i} button component={Link} to={`/unit/${resp.data[i].id}`}>
              {icon}
              <ListItemText inset primary={resp.data[i].name} />
            </ListItem>
          )
          this.setState({ listitems: items });
        }).catch(err => {
          items.push(
            <ListItem key={'litem' + i} button component={Link} to={`/unit/${resp.data[i].id}`}>
              <ListItemText inset primary={resp.data[i].name} />
            </ListItem>
          )
          this.setState({ listitems: items });
        });
      }
      this.setState({ listitems: items });
    }).catch((err) => {
      console.log(err);
      this.setState({
        listitems: [
          <ListItem>
            <ListItemText inset primary="Nothing found" className={this.props.classes.nothing_found} />
          </ListItem>
        ]
      })
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <Grid container
        alignItems="center"
        justify="center"
        >
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <form>
            <FormControl className={classes.textField}>
              <InputLabel htmlFor="search_places">Search places</InputLabel>
              <Input id="search_places" onChange={this.handleChange} />
            </FormControl>
          </form>
          <List>
            {this.state.listitems}
          </List>
        </Grid>
      </Grid>
    )
  }
}

Unit.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Unit);
