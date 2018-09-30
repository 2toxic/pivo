import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

import PlaylistItem from './PlaylistItem';

import axios from 'axios';

const styles = theme => ({
  textField: {
    minWidth: '50%',
  },
  nothing_found: {
    textAlign: 'center',
  },
});

class Playlist extends React.Component {
  constructor (props) {
      super(props);
      this.state = {
          listitems: '',
      }
  }

  componentDidMount = () => {
    this.setState({ listitems: [] })

    axios({
      url: 'https://apivo.0sk.in/demo',
      method: 'GET',
      withCredentials: true,
    }).then((resp) => {
      let items = [];
      for (let i = 0; i < resp.data.length; i++) {
        items.push(
          <PlaylistItem
            data={resp.data[i]}
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
              <ListItemText inset primary="Nothing for you :(" className={this.props.classes.nothing_found} />
          </ListItem>
        ]
      })
    });
  }

  render() {
    let render_items = this.state.listitems;
    if (render_items.length < 1) {
      render_items = [
        <ListItem>
            <CircularProgress />
        </ListItem>
      ]
    }
    return (
      <Grid container
        alignItems="center"
        justify="center"
        >
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <List>
            {render_items}
          </List>
        </Grid>
      </Grid>
    )
  }
}

Playlist.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Playlist);
