import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
});

class Unit extends React.Component {
  state = {
    user: ''
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        Here comes unit's description
        {this.props}
      </div>
    )
  }
}

Unit.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Unit);
