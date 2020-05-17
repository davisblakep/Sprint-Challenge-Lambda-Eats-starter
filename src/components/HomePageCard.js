import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export default function HomePageCard() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Monster Jam XXV
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Welcome to Monster Jam XXV!  We have an exciting line-up this year and we look forward to another amazing show.  Click to sign-up, or view the current sign-up sheet.  Good luck!
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
          <Link to="/signup" style={{textDecoration: "none"}}>
        <Button size="small" color="primary">
          Sign Up
        </Button>
        </Link>
        <Link to="members" style={{textDecoration: "none"}}>
        <Button size="small" color="primary">
          Members
        </Button>
        </Link>
      </CardActions>
    </Card>
  );
}
