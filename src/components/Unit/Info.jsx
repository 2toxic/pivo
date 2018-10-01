import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LinkIcon from '@material-ui/icons/Link';
import PhoneIcon from '@material-ui/icons/Phone';

const styles = theme => ({
  center_wrapper: {
    display: 'flex',
    justifyContent: 'center',
  },
});

class Info extends React.Component {
  render() {
    const { classes } = this.props;

    let info = this.props.info;
    if (!info) return [];

    let phone_and_link = [];
    let other = [];
    if ('website' in info) {
      phone_and_link.push(
        <ListItem button component='a' href={info.website} key='website'>
          <ListItemIcon>
            <LinkIcon />
          </ListItemIcon>
          <ListItemText primary={info.website} />
        </ListItem>
      )
    }
    if ('phone' in info) {
      phone_and_link.push(
        <ListItem button component='a' href={`tel:${info.phone}`} key='phone'>
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
          <ListItem button component='a' href={info[contact]} key={contact}>
            <ListItemText primary={contact} secondary={info[contact]} />
          </ListItem>
        )
      }
    }
    return (
      <div className={classes.center_wrapper}>
        <List>
          {phone_and_link}
          {other}
        </List>
      </div>
    )
  }
}

Info.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Info);
