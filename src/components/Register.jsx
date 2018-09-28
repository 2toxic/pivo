import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

import { Link } from 'react-router-dom';
import axios from 'axios';

const styles = theme => ({
  card: {
    //maxWidth: '50%',
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '100%',
  },
});

class Register extends React.Component {
  constructor (props) {
      super(props);
      this.state = {
          email: '',
          password: '',
          tripadvisor: '',
          email_error: '',
          password_error: '',
      }
      this.handleChange = this.handleChange.bind(this);
  }

  handleChange (event) {
    let copy_state = this.state;
    this.setState({
        [event.target.id]: event.target.value
    })
    copy_state[event.target.id] = event.target.value;
    if (event.target.id === 'password' || event.target.id === 'conf_password') {
      if (copy_state.password !== copy_state.conf_password) {
        this.setState({ password_error: 'Passwords do not match' });
      }
      else {
        this.setState({ password_error: '' });
      }
    }
  }

  do_register = () => {
    if (this.state.password_error) {
      return;
    }
    this.setState({ email_error: '', password_error: ''});
    axios({
        url: 'http://localhost:8000/register',
        method: 'POST',
        withCredentials: true,
        data: {
                 email: this.state.email,
                 password: this.state.password,
                 tripadvisor_username: this.state.tripadvisor,
        },
    })
    .then(resp => {
      if (resp.data.error) {
        if (resp.data.error === 'email_exists') {
          this.setState({ email_error: 'Email already exists', });
          return;
        }
        if (resp.data.error === 'tripadvisor_username_exists') {
          this.setState({ tripadvisor_error: 'Tripadvisor user is already registered' });
          return;
        }
        if (resp.data.error === 'db_commit_failed') {
          this.setState({ email_error: 'Database error' });
          return;
        }
        this.setState({ email_error: 'Unknown error' });
        return;
      }
      else {
        this.props.history.push('/login');
      }
    })
    .catch(err => {
      console.log(err);
    })
  }

  render = () => {
    const { classes } = this.props;

    if (localStorage.getItem('userid') !== '0') {
      this.props.history.push('/home');
    }

    return (
      <Grid container
            alignItems="center"
            justify="center"
            style={{ minHeight: '100vh' }}
      >

        <Grid item xs={10} sm={6} md={4} lg={3}>
          <Card className={classes.card}>
            <CardContent>
              <form className={classes.container} noValidate>
                <FormControl className={classes.textField} error={Boolean(this.state.email_error)} aria-describedby="email-error-text">
                  <InputLabel htmlFor="email">Email</InputLabel>
                  <Input id="email" onChange={this.handleChange} />
                  <FormHelperText id="email-error-text">{this.state.email_error}</FormHelperText>
                </FormControl>
                <FormControl className={classes.textField} error={Boolean(this.state.tripadvisor_error)} aria-describedby="tripadvisor-error-text">
                  <InputLabel htmlFor="tripadvisor">Tripadvisor username</InputLabel>
                  <Input id="tripadvisor" onChange={this.handleChange} />
                  <FormHelperText id="tripadvisor-error-text">{this.state.tripadvisor_error}</FormHelperText>
                </FormControl>
                <FormControl className={classes.textField} error={Boolean(this.state.password_error)} aria-describedby="password-error-text">
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <Input id="password" onChange={this.handleChange} type='password' />
                  <FormHelperText id="password-error-text">{this.state.password_error}</FormHelperText>
                </FormControl>
                <FormControl className={classes.textField} error={Boolean(this.state.password_error)} aria-describedby="conf_password-error-text">
                  <InputLabel htmlFor="conf_password">Confirm password</InputLabel>
                  <Input id="conf_password" onChange={this.handleChange} type='password' />
                  <FormHelperText id="conf_password-error-text">{this.state.password_error}</FormHelperText>
                </FormControl>
              </form>
            </CardContent>
            <CardActions>
              <Button onClick={this.do_register}>Register</Button>
              <Button component={Link} to='/login'>Login</Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    )
  }
};

Register.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Register);
