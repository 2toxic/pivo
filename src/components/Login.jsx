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

class Login extends React.Component {
  constructor (props) {
      super(props);
      this.state = {
          email: '',
          password: '',
          logged_in: false,
          email_error: '',
          password_error: '',
      }
      this.handleChange = this.handleChange.bind(this);
  }

  handleChange (event) {
    this.setState({
        [event.target.id]: event.target.value
    })
  }

  do_login = () => {
    this.setState({ email_error: '', password_error: ''});
    axios({
        url: 'http://localhost:8000/login',
        method: 'POST',
        withCredentials: true,
        data: {
                 email: this.state.email,
                 password: this.state.password,
                 remember_me: false,
        },
    })
    .then(resp => {
      if (resp.data.error) {
        if (resp.data.error === 'user_logged_in') {
          this.setState({ logged_in: true, });
          return;
        }
        if (resp.data.error === 'no_user') {
          this.setState({ email_error: 'No such user' });
          return;
        }
        if (resp.data.error === 'wrong_password') {
          this.setState({ password_error: 'Wrong password' });
          return;
        }
        this.setState({ email_error: 'Unknown error' });
        return;
      }
      else {
        localStorage.setItem('username', this.state.email);
        localStorage.setItem('userid', '42');
        this.setState({ logged_in: true, });
        return;
      }
    })
    .catch(err => {
      console.log(err);
    })
  }

  render = () => {
    const { classes } = this.props;

    if (this.state.logged_in || localStorage.getItem('userid') !== '0') {
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
                <FormControl className={classes.textField} error={Boolean(this.state.password_error)} aria-describedby="password-error-text">
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <Input id="password" onChange={this.handleChange} type='password' />
                  <FormHelperText id="password-error-text">{this.state.password_error}</FormHelperText>
                </FormControl>
              </form>
            </CardContent>
            <CardActions>
              <Button onClick={this.do_login}>Login</Button>
              <Button component={Link} to='/register'>Register</Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    )
  }
};

Login.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Login);
