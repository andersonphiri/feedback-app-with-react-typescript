import React, { useContext, useEffect } from 'react'
import { ChangeEvent } from 'react';

import { useState } from 'react'
import { FeedbackContext } from './context/FeedbackContext';

export interface RatingSelectModelInterface {
    select : (rating : number) => void,
}

const RatingSelect = ({select,} : RatingSelectModelInterface) => {

    const {  feedbackEdit } = useContext(FeedbackContext);

    useEffect(() => {
        if (feedbackEdit?.item && feedbackEdit.edit === true) {
            setSelected(feedbackEdit.item.rating)
        }

    }, [feedbackEdit]);

    const [selected, setSelected] = useState<number>(10);
    const handleChange = (e: ChangeEvent<HTMLInputElement>) : void   =>  {
        setSelected(+e.currentTarget.value);
        select(+e.currentTarget.value);

    }
  return (
      <ul className='rating'>
          {Array.from({ length: 10 }, (_, i) => (
              <li key={`rating-${i + 1}`}>
                  <input
                      type='radio'
                      id={`num${i + 1}`}
                      name='rating'
                      value={i + 1}
                      onChange={handleChange}
                      checked={selected === i + 1}
                  />
                  <label htmlFor={`num${i + 1}`}>{i + 1}</label>
              </li>
          ))}
      </ul>
  )
}

export default RatingSelect