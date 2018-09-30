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
import Rateit from '../Rateit.jsx';
import Info from './Info.jsx';
import Mile from './Mile.jsx';
import { full_info as eatout_place } from '../../api_calls.jsx';

const styles = theme => ({
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
  card: {
    maxWidth: '100%',
  },
  media: {
    // ⚠️ object-fit is not supported by IE11.
    objectFit: 'cover',
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


  componentDidMount = () => {
    eatout_place(this.props.match.params.id, res => {
      this.setState({
        eatout: res.eo,
        name: res.name,
        cover: res.image,
        description: res.navi.description,
        location: res.address,
        mile: res.navi.last_mile,
        // convert [{type: t, value: v}, ...] to {t: v, ...}
        info: res.navi.contacts ? res.navi.contacts.reduce((map, obj) => { map[obj.type] = obj.value; return map}, {}) : [],
        rateit: <Rateit key='the_only_rate' for_id={res.id} rating={res.rating} />
      });
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
                  {this.state.location}
                  {this.state.rateit}
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
