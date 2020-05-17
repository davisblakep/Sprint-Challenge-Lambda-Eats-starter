import React from 'react';
import {Link} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function NavAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{backgroundColor: "black"}}>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <Link style={{textDecoration: "none", color: "white"}} to="/">
            <HomeIcon />
            </Link>
          </IconButton>
          <Typography variant="h6" className={classes.title}>
          Monster Jam XXV Members
          </Typography>
          <Link style={{textDecoration: "none", color: "white"}} to="/signup">
          <Button color="inherit">Sign Up</Button>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}