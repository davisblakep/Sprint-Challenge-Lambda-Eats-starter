import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom'


const useStyles = makeStyles({
  root: {
    minWidth: 275,
    maxWidth: 275,
    marginLeft: 500,
    marginRight: 500,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});


export default function OrderPage(props) {
  const classes = useStyles();

  return (
    <div className="order-container">
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h2">
          Thank you!
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Your order is on its way.
        </Typography>
      </CardContent>
      <CardActions>
        <Link to="/" style={{textDecoration: "none"}}>
        <Button size="small">Home</Button>
        </Link>
      </CardActions>
    </Card>
    </div>
  );
}

