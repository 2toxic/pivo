import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarTwoToneIcon from '@material-ui/icons/StarTwoTone';

import axios from 'axios';

const styles = theme => ({
});

class Rateit extends React.Component {

  state = {}

  handleStar = (event) => {
    event.stopPropagation();
  };

  click = (event, idx) => {
    event.stopPropagation();
    let stars_text = <Typography variant='subheading' style={{color: 'green',}}>Rated</Typography>
    let stars_text_error = <Typography variant='subheading' style={{color: 'red',}}>Error occured</Typography>
    axios({
      url: `https://apivo.0sk.in/rate/${this.props.for_id}`,
      method: 'POST',
      data: {rating: idx + 1}
    }).then(resp => {
      if (resp.error) {
        this.setState({ stars: stars_text_error });
      }
      else {
        this.setState({ stars: stars_text });
      }
    }).catch(err => {
      this.setState({ stars: stars_text_error });
    });
  }

  enter = (event, idx) => {
    event.stopPropagation();
    let stars = [];
    for (let i = 0; i < idx + 1; i++) {
      stars.push(
        <StarIcon
          onClick={event => { this.click(event, i) }}
          onMouseEnter={event => {this.enter(event, i) }}
          onMouseLeave={event => {this.leave(event, i) }}
        />
      )
    }
    for (let i = idx + 1; i < 5; i++) {
      stars.push(
        <StarTwoToneIcon
          onClick={event => { this.click(event, i) }}
          onMouseEnter={event => {this.enter(event, i) }}
          onMouseLeave={event => {this.leave(event, i) }}
        />
      )
    }
    this.setState({ stars: stars });
  }

  leave = (event, idx) => {
    event.stopPropagation();
    this.draw_normal_stars();
  }

  draw_normal_stars = () => {
    let stars = [];
    for (let i = 0; i < this.props.rating; i++) {
      stars.push(
        <StarIcon
          onClick={event => { this.click(event, i) }}
          onMouseEnter={event => {this.enter(event, i) }}
          onMouseLeave={event => {this.leave(event, i) }}
        />
      )
    }
    for (let i = this.props.rating; i < 5; i++) {
      stars.push(
        <StarBorderIcon
          onClick={event => { this.click(event, i) }}
          onMouseEnter={event => {this.enter(event, i) }}
          onMouseLeave={event => {this.leave(event, i) }}
        />
      )
    }
    this.setState({ stars: stars });
  }

  componentDidMount = () => {
    this.draw_normal_stars();
  }

  render() {

    return (
      <div>
        {this.state.stars}
      </div>
    );
  }
}

Rateit.propTypes = {
  classes: PropTypes.object.isRequired,
};

// We need an intermediary variable for handling the recursive nesting.
const RateitWrapped = withStyles(styles)(Rateit);

export default RateitWrapped;
