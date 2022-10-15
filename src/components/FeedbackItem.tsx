import { FeedbackInterface } from '../data/FeedbackData';
import Card from './shared/Card';
import { FaTimes, FaEdit } from 'react-icons/fa';
import { useContext } from 'react';
import { FeedbackContext } from './context/FeedbackContext';
import { OrNull } from '../utils';

export interface FeedbackItemModelInterface extends FeedbackInterface {
    rating: number,
    text: string,
    id: string,
    // handleDelete: (id: string) => void,
}

export interface FeedbackItemEditInterface {
  item: OrNull<FeedbackInterface>,
  edit: boolean ,
  // handleDelete: (id: string) => void,
}

function FeedbackItem(props: FeedbackItemModelInterface) {
  const { deleteFeedback, editFeedback } = useContext(FeedbackContext);
  return (
      <Card reverse>
          <div className="num-display">{props.rating}</div>
          <button className='edit' onClick={() => editFeedback && editFeedback({item: props, edit: true})}>
            <FaEdit color='purple' />
          </button>
      <button onClick={() => deleteFeedback && deleteFeedback(props.id) } className='close'>
            <FaTimes color='purple' />
          </button>
          <div className="text-display">{props.text}</div>
      </Card>
  )
}

export default FeedbackItem