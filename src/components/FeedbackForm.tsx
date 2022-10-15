import React from 'react'
import Card from './shared/Card'
import { useState } from 'react'
import { ChangeEvent } from 'react';
import Button from './shared/Button';
import { OrNull } from '../utils';
import RatingSelect from './RatingSelect';
import { FormEvent } from 'react';
import {useContext, useEffect} from 'react';
import { FeedbackContext } from './context/FeedbackContext';
import { FeedbackItemEditInterface } from './FeedbackItem';

export interface FeedbackInterface {
    readonly text: string,
    readonly rating: number,
    id: string

}
export class Feedback implements FeedbackInterface {
    readonly text: string;
    readonly rating : number;
    public id: string;
    constructor (_text : string, _rating : number) {
        this.text = _text;
        this.rating = _rating;
        this.id = '';
    }
    setId(_id : string) {
        this.id = _id;
    }
}

export interface FeedbackFormModelInterface {
   //  handleAdd: (feedback : Feedback) => void,
}

const FeedbackForm = () => {
    const {addFeedback, feedbackEdit, updateFeedback} = useContext(FeedbackContext);

    useEffect(() => {
        if (feedbackEdit?.item && feedbackEdit.edit === true) {
            console.log('helloe from side effect');
            setDisableBtn(false);
            setText(feedbackEdit.item.text);
            setRating(feedbackEdit.item.rating);
        }
        
    }, [feedbackEdit]);


    const [text, setText] = useState<string>('');
    const [btnDisabled, setDisableBtn] = useState<boolean>(true);
    const [rating, setRating] = useState(10);
    const [message, setMessage] = useState<OrNull<string>>('');
    const handleTextChange = (e : ChangeEvent<HTMLInputElement>) : void => {
        
        if (text === '') {
            setDisableBtn(true);
            setMessage(null);
        } else if (text !== '' && text.trim().length <= 9) {
            setDisableBtn(true);
            setMessage('text must be at least 10 characters');
        } else {
            setDisableBtn(false);
            setMessage(null);
        }
        setText(e.target.value);
        
    }

    /* const setRating = (rating : number) : void => {

    } */

    const handleSubmit = ( e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (text.length >= 10) {
            // then submit
            const feedabck = new Feedback(text, rating);
            if (feedbackEdit && feedbackEdit.edit && feedbackEdit.item) {
                const id = feedbackEdit.item.id;
                updateFeedback && updateFeedback({ item: { id: id, rating: rating, text: text  }, edit: true })
            }else {
                addFeedback && addFeedback(feedabck);
            // handleAdd(feedabck);
            }
            
            setText('');
            setRating(0);
        }

    }
  return (
    <Card>
        <form onSubmit={handleSubmit}>
            <h2>how would rate your service with us?</h2>
            <RatingSelect select={(rating) => setRating(rating)} />
            <div className="input-group">
                <input type="text" onChange={handleTextChange} placeholder='Write your review' value={text}></input>

                <Button type='submit' version='primary' isDisabled={btnDisabled}>
                    Send
                </Button>

            </div>
            {message && <div className='message'>{message}</div>}

        </form>
    </Card>
  )
}

export default FeedbackForm