import React from 'react';
import {useContext} from 'react';
import { FeedbackInterface } from '../data/FeedbackData';
import { OrNull } from '../utils';
import { FeedbackContext } from './context/FeedbackContext';

export interface FeedbackStatsInterface {
   // feedbacks: OrNull<Map<string, FeedbackInterface>>,
};

const FeedbackStats = () => {
  const {feedbacks} = useContext(FeedbackContext);
  //  const vals : Array<FeedbackInterface> = !props.feedbacks ? [] : [...(props.feedbacks.values())];
  const vals: Array<FeedbackInterface> = !feedbacks ? [] : [...feedbacks.values()];
    let average : number = vals.length === 0  ? 0 : vals.reduce ((acc, curr) => {
        return acc + curr.rating;
    }, 0) / vals.length;
    let averageStr : string = average.toFixed(1).replace(/[.,]0$/, '');
  return (
    <div className='feedback-stats'>
      <h4>{vals.length} Reviews</h4>   
          <h4>Average rating: {averageStr}</h4>
        </div>
  )
};

export default FeedbackStats