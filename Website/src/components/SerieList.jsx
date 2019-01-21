import React from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Typography from '@material-ui/core/Typography';
import CircularProgressbar from 'react-circular-progressbar';

const scoringClass = score => score < 0.5
  ? 'pretty-bad'
  : score < 0.8
    ? 'pretty-good'
    : 'excellent';

const SerieList = (props) => {
  const { listOfSeries = [] } = props;
  return (
    <List className='serie-list'>
      {
        listOfSeries.map(serie =>
          <ListItem alignItems='flex-start' className='serie-list__element' key={`serie-${serie.name}`}>
            <ListItemAvatar className='serie-list__element--score'>
              <CircularProgressbar
                percentage={Math.round(serie.score * 100)}
                text={`${Math.round(serie.score * 10)} / 10`}
                initialAnimation={true}
                className={`pie-chart ${scoringClass(serie.score)}`} />
            </ListItemAvatar>
            <ListItemText className='serie-list__element--title'
              primary={serie.name}
              secondary={
                <React.Fragment>
                  <Typography component='span' color='textPrimary' className='inline'>
                    {serie.numberOfTweets}
                  </Typography>
                  tweets about this TV Series.
                </React.Fragment>
              }
            />
          </ListItem>
        )
      }
    </List>
  );
}

SerieList.propTypes = {
  listOfSeries: PropTypes.array.isRequired,
};

export default SerieList;