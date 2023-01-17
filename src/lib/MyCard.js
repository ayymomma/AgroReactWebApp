import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(() => ({
  card: {
    width: '100%',
    backgroundColor: '#white',
  },
  cardContent: {
    textAlign: 'center',
    padding: "10px",
  },
  typography: {
    color: '#224957',
    height: "100%",
    display: "flex",
    justifyContent:"space-between",
  },
  img: {
    marginRight: "30px",
  }
}));

function MyCard({ title, description, image, value}) {
  const classes = useStyles();
  return (
    <Grid item xs={3}>
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <Typography variant="h5" component="div" className={classes.typography}>
            <img alt="icon" width={30} height={30} src={image} className='classes.img'/>
            {title}
          </Typography>
          <Typography variant="h5" component="div" className={classes.typography}>
            <p/>
            {value}
          </Typography>
          <hr />
          <Typography variant="body2" className={classes.typography}>
            {description}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default MyCard;
