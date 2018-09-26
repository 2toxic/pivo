import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import ThumbUpIcon from '@material-ui/icons/ThumbUp'
import ThumbDownIcon from '@material-ui/icons/ThumbDown'
import axios from 'axios'

const styles = theme => ({
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
  card: {
    maxWidth: 800,
  },
  media: {
    // ⚠️ object-fit is not supported by IE11.
    objectFit: 'cover',
  },
  center_wrapper: {
    display: 'flex',
    justifyContent: 'center',
  },
});

class Unit extends React.Component {
  state = {
    unit: {}
  };

  componentDidMount() {
    axios.get(`http://localhost:8000/api/get_place/` + this.props.match.params.id)
      .then(res => {
        const unit = res.data;
        this.setState({ unit });
      })
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.center_wrapper}>
          <Card className={classes.card}>
            <CardActionArea>
              <CardMedia
                component="img"
                className={classes.media}
                height="400"
                image="http://progorodsamara.ru/userfiles/picoriginal/img-20160623155118-759.jpg"
                title={this.state.unit.id}
              />
              <CardContent>
                <Typography gutterBottom variant="headline" component="h2">
                  {this.state.unit.name}
                </Typography>
                <Typography component="p">
                  {this.state.unit.location}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary">
                <ThumbUpIcon />
              </Button>
              <Button size="small" color="primary">
                <ThumbDownIcon />
              </Button>
            </CardActions>
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
