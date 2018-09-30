import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';


const styles = theme => ({
  center_wrapper: {
    display: 'flex',
    justifyContent: 'center',
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
  last_mile_img: {
    objectFit: 'contain',
  },
});

class Mile extends React.Component {

  render() {
    const { classes } = this.props

    if (!this.props.mile || !this.props.mile.steps) {
      return <Typography paragraph>Owner did not provide last mile info</Typography>;
    }
    let steps = this.props.mile.steps;
    let content = []
    for (let i = 0; i < steps.length; i++) {
      content.push(
      <div className={classes.center_wrapper} key={`step-${i}`}>
        <Card className={classes.mile_card}>
        <div className={classes.mile_details_container}>
          <CardContent className={classes.mile_details}>
            <Typography component="p">
              {steps[i].text}
            </Typography>
          </CardContent>
        </div>
        <CardMedia
          component="img"
          className={classes.media}
          height="500"
          image={steps[i].image}
          />
        </Card>
      </div>
      )
    }

    return content;
  }
}

Mile.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Mile);
