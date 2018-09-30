import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';

import classnames from 'classnames';
import axios from 'axios';
import cocktail from '../cocktail.png';
import Rateit from '../Rateit.jsx';
import Info from './Info.jsx';
import Mile from './Mile.jsx'

const styles = theme => ({
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
  card: {
    maxWidth: '100%',
  },

});

class Unit extends React.Component {
  state = {
    mile_expanded: false,
    mile_expand_button_msg: 'show way',
  };

  handleExpandMileClick = () => {
    this.setState(state => {
      let msg = 'show way';
      if (!state.mile_expanded) {
        msg = 'close way';
      }

      return {
        mile_expanded: !state.mile_expanded,
        mile_expand_button_msg: msg,
      }});
  };

  set_data_from_apis() {
    let { navicontainer, naviaddress } = this.state.eatout;
    axios.get(`https://api.naviaddress.com/api/v1.5/Addresses/${navicontainer}/${naviaddress}?lang=ru`)
      .then(res => {
        const resp = res.data.result;
        if (resp.cover.length < 1) {
          this.setState({ cover: cocktail });
        }
        this.setState({
          name: resp.name,
          cover: resp.cover[0].image,
          description: resp.description,
          location: resp.postal_address,
          mile: resp.last_mile,
          // convert [{type: t, value: v}, ...] to {t: v, ...}
          info: resp.contacts.reduce((map, obj) => { map[obj.type] = obj.value; return map}, {}),
        });
      })
      .catch(error => {
        this.setState({
          cover: this.state.eatout.image_url ? this.state.eatout.image_url : cocktail,
          name: this.state.eatout.name,
          description: '',
          location: '',
          mile: '',
          info: '',
        });
      });
  }

  componentDidMount = () => {
    axios.get(`https://apivo.0sk.in/p/` + this.props.match.params.id)
      .then(res => {
        this.setState({
          eatout: res.data,
          rateit: <Rateit for_id={res.data.id} rating={res.data.rating} />
        });
        this.set_data_from_apis();
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.center_wrapper}>
          <Card className={classes.card}>
              <CardMedia
                component="img"
                className={classes.media}
                height="400"
                image={this.state.cover}
                />
              <CardContent>
                <Typography gutterBottom variant="headline" component="h2">
                  {this.state.name}
                </Typography>
                <Typography component="p">
                  {this.state.location}
                </Typography>
                <Typography component="subheading">
                  {this.state.rateit}
                </Typography>
                <Info info={this.state.info} />
              </CardContent>
            <CardActions>
              <Button size="small" color="primary"
                className={classnames({
                  [this.props.classes.expandOpen]: this.state.mile_expanded,
                })}
                onClick={this.handleExpandMileClick}
                aria-expanded={this.state.mile_expanded}
                disabled={!this.state.mile}
              >
                {this.state.mile_expand_button_msg}
              </Button>
            </CardActions>
            <Collapse in={this.state.mile_expanded} timeout="auto" unmountOnExit>
              <CardContent>
                <Mile mile={this.state.mile} />
              </CardContent>
            </Collapse>
          </Card>
      </div>
    )
  }
}

Unit.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Unit);
