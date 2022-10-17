import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 500,
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

const ExplanationCard = () => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h4" gutterBottom>
          使い方
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          １. 作成ボタンをクリックして共有スペース（URL）を作成する
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          ２. 作成されたURLを共有する
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          ３. URLにアクセスしスケジュールの登録
        </Typography>
      </CardContent>
    </Card>
  );
}
export default ExplanationCard;