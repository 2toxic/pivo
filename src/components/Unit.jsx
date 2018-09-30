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
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LinkIcon from '@material-ui/icons/Link';
import PhoneIcon from '@material-ui/icons/Phone';

import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import classnames from 'classnames';
import axios from 'axios'
import cocktail from './cocktail.png'

const styles = theme => ({
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
  card: {
    maxWidth: '100%',
  },
  mile_card: {
    maxWidth: '700px',
    marginBottom: '10px',
    backgroundColor: '#F8F8F8',
  },
  mile_details_container: {
  },
  mile_details: {
    minWidth: '300px',
  },
  media: {
    // ⚠️ object-fit is not supported by IE11.
    objectFit: 'cover',
  },
  center_wrapper: {
    display: 'flex',
    justifyContent: 'center',
  },
  last_mile_img: {
    objectFit: 'contain',
  },
});

class Unit extends React.Component {
  state = {
    mile_expanded: false,
    mile_expand_button_msg: 'show way',
    info_expanded: false,
    info_expand_button_msg: 'show info'
  };

  handleExpandMileClick = () => {
    this.setState(state => {
      let msg = 'close way';
      if (state.mile_expanded) {
        msg = 'show way';
      }
      let info_exp = state.info_expanded;
      let info_msg = state.info_expand_button_msg;
      if (!state.mile_expanded && state.info_expanded) {
        info_exp = false;
        info_msg = 'show info';
      }

      return {
        mile_expanded: !state.mile_expanded,
        mile_expand_button_msg: msg,
        info_expanded: info_exp,
        info_expand_button_msg: info_msg,
      }});
  };

  handleExpandInfoClick = () => {
    this.setState(state => {
      let msg = 'close info';
      if (state.info_expanded) {
        msg = 'show info';
      }

      let mile_exp = state.mile_expanded;
      let mile_msg = state.mile_expand_button_msg;
      if (!state.info_expanded && state.mile_expanded) {
        mile_exp = false;
        mile_msg = 'show way';
      }
      return {
        info_expanded: !state.info_expanded,
        info_expand_button_msg: msg,
        mile_expanded: mile_exp,
        mile_expand_button_msg: mile_msg,
      }});
  };

  set_data_from_apis() {
    let { navicontainer, naviaddress } = this.state.eatout;
    axios.get(`https://api.naviaddress.com/api/v1.5/Addresses/${navicontainer}/${naviaddress}?lang=ru`)
      .then(res => {
        const resp = res.data.result;
        if (resp.cover.length < 1) {
          this.setState({ cover: cocktail });
        } else {
          this.setState({
            name: resp.name,
            cover: resp.cover[0].image,
            description: resp.description,
            location: resp.postal_address,
            mile: resp.last_mile,
            // convert [{type: t, value: v}, ...] to {t: v, ...}
            info: resp.contacts.reduce((map, obj) => { map[obj.type] = obj.value; return map}, {}),
          });
        }
      })
      .catch(error => {
        this.setState({ cover: cocktail });
      });
  }

  componentDidMount = () => {
    axios.get(`https://apivo.0sk.in/p/` + this.props.match.params.id)
      .then(res => {
        let stars = [];
        for (let j = 0; j < (res.data.rating || 0); j++) {
          stars.push(
            <StarIcon />
          )
        }
        for (let j = (res.data.rating || 0); j < 5; j++) {
          stars.push(
            <StarBorderIcon />
          )
        }
        this.setState({
          eatout: res.data,
          stars: stars,
        });
        this.set_data_from_apis();
      })
      .catch(error => {
        console.log(error);
      });
  }

  display_mile = () => {
    if (!this.state.mile || !this.state.mile.steps) {
      return <Typography paragraph>Owner did not provide last mile info</Typography>;
    }
    let steps = this.state.mile.steps;
    let content = []
    for (let i = 0; i < steps.length; i++) {
      content.push(
      <div className={this.props.classes.center_wrapper} key={`step-${i}`}>
        <Card className={this.props.classes.mile_card}>
        <div className={this.props.classes.mile_details_container}>
          <CardContent className={this.props.classes.mile_details}>
            <Typography component="p">
              {steps[i].text}
            </Typography>
          </CardContent>
        </div>
        <CardMedia
          component="img"
          className={this.props.classes.media}
          height="500"
          image={steps[i].image}
          />
        </Card>
      </div>
      )
    }

    return content;
  }

  display_info = () => {
    let info = this.state.info;
    if (!info) {
      return;
    }
    let phone_and_link = [];
    let other = [];
    if ('website' in info) {
      phone_and_link.push(
        <ListItem button component='a' href={info.website}>
          <ListItemIcon>
            <LinkIcon />
          </ListItemIcon>
          <ListItemText primary={info.website} />
        </ListItem>
      )
    }
    if ('phone' in info) {
      phone_and_link.push(
        <ListItem button component='a' href={`tel:${info.phone}`}>
          <ListItemIcon>
            <PhoneIcon />
          </ListItemIcon>
          <ListItemText primary={info.phone} />
        </ListItem>
      )
    }

    for (var contact in info) {
      if (['website', 'phone'].indexOf(contact) === -1) {
        other.push(
          <ListItem button component='a' href={info[contact]}>
            <ListItemText primary={contact} secondary={info[contact]} />
          </ListItem>
        )
      }
    }
    return (
      <div className={this.props.classes.center_wrapper}>
            <List>
              {phone_and_link}
              {other}
            </List>
      </div>
    )
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
                <Typography component="p">
                  {this.state.stars}
                </Typography>
                {this.display_info()}
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
                {this.display_mile()}
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
