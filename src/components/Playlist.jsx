import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import {Link} from 'react-router-dom';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import cocktail from './cocktail.png';

import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';

import axios from 'axios'

const styles = theme => ({
  textField: {
    minWidth: '50%',
  },
  nothing_found: {
    textAlign: 'center',
  },
  card: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
    minWidth: '400px',
  },
  cover: {
    width: 151,
    height: 151,
  },
});

class Unit extends React.Component {
  constructor (props) {
      super(props);
      this.state = {
          email: '',
          password: '',
          logged_in: false,
          email_error: '',
          password_error: '',
          listitems: '',
      }
  }

  componentDidMount = () => {
    const { classes } = this.props;
    this.setState({ listitems: [] })

    axios({
      url: 'http://localhost:8000/demo',
      method: 'GET',
      withCredentials: true,
    }).then((resp) => {
      let items = [];
      for (let i = 0; i < resp.data.length; i++) {
        let stars = [];
        for (let j = 0; j < (resp.data[i].rating || 0); j++) {
          stars.push(
            <StarIcon />
          )
        }
        for (let j = (resp.data[i].rating || 0); j < 5; j++) {
          stars.push(
            <StarBorderIcon />
          )
        }
        let container = resp.data[i].navicontainer;
        let address = resp.data[i].naviaddress;
        axios({
          url: `https://api.naviaddress.com/api/v1.5/Addresses/${container}/${address}?lang=ru`,
        }).then(resp2 => {
          let image = cocktail;
          if (resp2.data.result.cover) {
            if (resp2.data.result.cover.length > 0) {
              image = resp2.data.result.cover[0].image;
            }
          }
          items.push(
            <ListItem key={'litem' + i} button component={Link} to={`/unit/${resp.data[i].id}`}>
              <Card className={classes.card}>
                <div className={classes.details}>
                  <CardContent className={classes.content}>
                    <Typography variant="headline">{resp.data[i].name}</Typography>
                    <Typography variant="subheading" color="textSecondary">
                      {stars}
                    </Typography>
                  </CardContent>
                </div>
                <CardMedia
                  className={classes.cover}
                  image={image}
                  title="Live from space album cover"
                />
              </Card>
            </ListItem>
          )
        }).catch(err => {
          items.push(
            <ListItem key={'litem' + i} button component={Link} to={`/unit/${resp.data[i].id}`}>
              <Card className={classes.card}>
                <div className={classes.details}>
                  <CardContent className={classes.content}>
                    <Typography variant="headline">{resp.data[i].name}</Typography>
                    <Typography variant="subheading" color="textSecondary">
                      {stars}
                    </Typography>
                  </CardContent>
                </div>
                <CardMedia
                  className={classes.cover}
                  image={cocktail}
                  title=""
                />
              </Card>
            </ListItem>
          )
        });
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
    this.interval = setInterval(() => this.setState({ time: Date.now() }), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
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

Unit.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Unit);
