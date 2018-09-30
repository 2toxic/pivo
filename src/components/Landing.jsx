import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';


import { Link } from 'react-router-dom';

const styles = theme => ({
  heroUnit: {
    backgroundColor: theme.palette.background.paper,
  },
  heroContent: {
    maxWidth: 850,
    margin: '0 auto',
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
  },
  heroButtons: {
    marginTop: theme.spacing.unit * 4,
  },
  logo: {
    fontFamily: '"Comfortaa"',
    fontSize: '10rem',
  },
  mheroUnit: {
    backgroundColor: theme.palette.background.paper,
  },
  mheroContent: {
    width: '90%',
    margin: '0 auto',
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
  },
  mheroButtons: {
    marginTop: theme.spacing.unit * 4,
  },
  mlogo: {
    fontFamily: '"Comfortaa"',
    fontSize: '5.5rem',
  },
});

class Landing extends React.Component {

  render = () => {
    const { classes } = this.props;

    if (localStorage.getItem('userid') !== '0') {
      this.props.history.push('/home');
    }

    return (
      <div>
        <Hidden smDown implementation="css">
          <div className={classes.heroUnit}>
            <div className={classes.heroContent}>
              <Typography align="center" color="textPrimary" className={classes.logo} gutterBottom>
                eatout
              </Typography>
              <Typography variant="subheading" align="center" color="textSecondary" paragraph>
                Recommendation system for restaurants, bars & cafes.
                Integrated with TripAdvisor and Naviaddress, it can delivery most recent and full information about places.
                Using modern machine learing techniques, we can provide recommendations based on your character.
              </Typography>
              <div className={classes.heroButtons}>
                <Grid container spacing={16} justify="center">
                  <Grid item>
                    <Button variant="contained" color="primary" component={Link} to='/login'>
                      register
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button variant="outlined" color="primary" component={Link} to='/login'>
                      login
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </div>
          </div>
        </Hidden>
        <Hidden mdUp>
          <div className={classes.mheroUnit}>
            <div className={classes.mheroContent}>
              <Typography align="center" color="textPrimary" className={classes.mlogo} gutterBottom>
                eatout
              </Typography>
              <Typography variant="subheading" align="center" color="textSecondary" paragraph>
                Recommendation system for restaurants, bars & cafes.
                Integrated with TripAdvisor and Naviaddress, it can delivery most recent and full information about places.
                Using modern machine learing techniques, we can provide recommendations based on your character.
              </Typography>
              <div className={classes.mheroButtons}>
                <Grid container spacing={16} justify="center">
                  <Grid item>
                    <Button variant="contained" color="primary" component={Link} to='/login'>
                      register
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button variant="outlined" color="primary" component={Link} to='/login'>
                      login
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </div>
          </div>
        </Hidden>
      </div>
    )
  }
};

Landing.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Landing);
