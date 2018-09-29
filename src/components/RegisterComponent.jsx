import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

import axios from 'axios';

const styles = theme => ({
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

class RegisterComponent extends React.Component {
  constructor (props) {
      super(props);
      this.state = {
          reg_email: '',
          reg_password: '',
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
    if (event.target.id === 'reg_password' || event.target.id === 'reg_conf_password') {
      if (copy_state.reg_password !== copy_state.reg_conf_password) {
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
        url: 'https://apivo.0sk.in/register',
        method: 'POST',
        withCredentials: true,
        data: {
                 email: this.state.reg_email,
                 password: this.state.reg_password,
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
      <div>
        <form className={classes.container} noValidate>
          <FormControl className={classes.textField} error={Boolean(this.state.email_error)} aria-describedby="email-error-text">
            <InputLabel htmlFor="reg_email">Email</InputLabel>
            <Input id="reg_email" onChange={this.handleChange} />
            <FormHelperText id="email-error-text">{this.state.email_error}</FormHelperText>
          </FormControl>
          <FormControl className={classes.textField} error={Boolean(this.state.tripadvisor_error)} aria-describedby="tripadvisor-error-text">
            <InputLabel htmlFor="tripadvisor">Tripadvisor username</InputLabel>
            <Input id="tripadvisor" onChange={this.handleChange} />
            <FormHelperText id="tripadvisor-error-text">{this.state.tripadvisor_error}</FormHelperText>
          </FormControl>
          <FormControl className={classes.textField} error={Boolean(this.state.password_error)} aria-describedby="password-error-text">
            <InputLabel htmlFor="reg_password">Password</InputLabel>
            <Input id="reg_password" onChange={this.handleChange} type='password' />
            <FormHelperText id="password-error-text">{this.state.password_error}</FormHelperText>
          </FormControl>
          <FormControl className={classes.textField} error={Boolean(this.state.password_error)} aria-describedby="conf_password-error-text">
            <InputLabel htmlFor="reg_conf_password">Confirm password</InputLabel>
            <Input id="reg_conf_password" onChange={this.handleChange} type='password' />
            <FormHelperText id="conf_password-error-text">{this.state.password_error}</FormHelperText>
          </FormControl>
        </form>
        <Button onClick={this.do_register}>Register</Button>
      </div>
    )
  }
};

RegisterComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(RegisterComponent);
