import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import CircularProgress from '@material-ui/core/CircularProgress';
import Slider from '@material-ui/lab/Slider';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Hidden from '@material-ui/core/Hidden';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import RatingItem from './RatingItem';

import axios from 'axios';

const styles = theme => ({
  slider: {
    maxWidth: 400,
    width: '100%',
  },
  textField: {
    //minWidth: '50%',
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    //padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    marginTop: -30,
  },
  progress: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    //padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  nothing_found: {
    textAlign: 'center',
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    //maxWidth: 400,
    width: 600,
  },
  paper_responsive: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    width: '100%',
  },
  slider_text: {
    whiteSpace: 'nowrap',
  },
  formControl: {
    minWidth: 120,
  }
});

class Rating extends React.Component {
  constructor (props) {
      super(props);
      this.state = {
          listitems: '',
          snack_open: false,
          type: 'all',
      }
  }

  componentDidMount = () => {
    this.getRecommends(2);
  }

  getRecommends = (raduis, lat, lon) => {
    this.setState({ listitems: [] })
    let distance = this.state.distance;
    axios({
      url: `https://apivo.0sk.in/r`,
      method: 'GET',
      withCredentials: true,
    }).then((resp) => {
      console.log(resp);
      let items = [];
      for (let i = 0; i < resp.data.length; i++) {
        items.push(
          <RatingItem
            data={resp.data[i].place}
            rated={resp.data[i].rating}
            key={'pl_item_' + i}
            history={this.props.history}

            />
        )
      }
      this.setState({ listitems: items });
      this.forceUpdate();
    }).catch((err) => {
      console.log(err);
      this.setState({
        listitems: [
          <ListItem>
              <ListItemText inset primary="Nothing here" className={this.props.classes.nothing_found} />
          </ListItem>
        ]
      })
    });
  }

  handleSelectChange = event => {
    this.setState({ type: event.target.value });
    if (!("geolocation" in navigator)) {
      this.setState({ snack_open: true, });
    }
    else {
      navigator.geolocation.getCurrentPosition(
        pos => { this.getRecommends(this.state.distance, pos.coords.latitude, pos.coords.longitude); },
        err => { this.setState({ snack_open: true, }) }
      );
    }
  };

  handleDistance = (event, value) => {
    this.setState({ distance: value });
    if (!("geolocation" in navigator)) {
      this.setState({ snack_open: true, });
    }
    else {
      navigator.geolocation.getCurrentPosition(
        pos => { this.getRecommends(value, pos.coords.latitude, pos.coords.longitude); },
        err => { this.setState({ snack_open: true, }) }
      );
    }
  }

  handleSnackClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ snack_open: false });
  };

  render() {
    const { classes } = this.props;
    let render_items = this.state.listitems;
    if (render_items.length < 1) {
      render_items = [
        <ListItem className={this.props.classes.progress}>
            <CircularProgress />
        </ListItem>
      ]
    }
    return (
      <div>
        <Hidden smDown implementation="css">
          <div className={this.props.classes.root}>
              <List>
                {render_items}
              </List>
          </div>
        </Hidden>
        <Hidden mdUp>
          <div>
              <List>
                {render_items}
              </List>
          </div>
        </Hidden>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.snack_open}
          autoHideDuration={6000}
          onClose={this.handleSnackClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">You must allow geolocation</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={this.props.classes.close}
              onClick={this.handleSnackClose}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </div>
    )
  }
}

Rating.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Rating);
