import React from 'react';
import {useContext} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import { FeedbackInterface } from '../data/FeedbackData'
import { OrNull } from '../utils';
import FeedbackItem from './FeedbackItem'
import { FeedbackContext } from './context/FeedbackContext';
import Spinner from './shared/Spinner';
export interface FeedbackListInterface {
   // feedbacks: Array<FeedbackInterface>, // OrNull<Map<number, FeedbackInterface>>,
    handleDelete: (id : string) => void;
}

const FeedbackList = () => {
  const { feedbacks, isLoading } = useContext(FeedbackContext);
    if (!isLoading && (!feedbacks || !feedbacks || feedbacks.size === 0)) {
    return <p>no feedback yet</p>
  }
  const vals = !feedbacks ? [] : [...feedbacks.values()];
  return isLoading ? <Spinner /> : (<div className="feedback-list">
    <AnimatePresence>
      {
        vals.map((item) => (
          <motion.div key={item.id} initial={{
            opacity: 0
          }} 
          animate={{opacity: 1}}
          exit={{opacity: 1}}
          
          >
            <FeedbackItem key={item.id}
              text={item.text} rating={item.rating} id={item.id} />
          </motion.div>
          
        ))
      }
    </AnimatePresence>
    
  </div>);
 /*  return (<div className="feedback-list">
    {
        
          feedbacks.map((item) => (   
            <FeedbackItem key={item.id} 
            handleDelete = {handleDelete}
            text={item.text} rating={item.rating} id={item.id} />
        ))
    }
  </div>); */
}

export default FeedbackList