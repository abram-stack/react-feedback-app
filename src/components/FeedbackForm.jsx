import { useState, useContext, useEffect, React } from 'react'
import Card from "./shared/Card";
import Button from './shared/Button';
import RatingSelect from './RatingSelect';
import FeedbackContext from '../context/FeedbackContext';

const FeedbackForm = () => {
  const { addFeedback, feedbackEditEntry } = useContext(FeedbackContext);

  const [text, setText] = useState('');
  const [rating, setRating] = useState('');
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (feedbackEditEntry.edit === true) {
      setBtnDisabled(false)
      setText(feedbackEditEntry.item.text)
      setRating(feedbackEditEntry.item.rating)
    }
  }, [feedbackEditEntry])

  const handleTextChange = (e) => {
    if (text === '') {
      setBtnDisabled(true)
      setMessage(null)
    }
    else if (text !== '' && text.trim().length <= 10) {
      setMessage('Text must be at least 10 characters')
      setBtnDisabled(true)
    }
    else {
      setMessage(null)
      setBtnDisabled(false)
    }
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim().length > 10) {
      const newFeedback = {
        text: text,
        rating: rating
      }
      addFeedback(newFeedback);
      setText('');
    }
  }
  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <h2>How would you rate your service with us</h2>
        <RatingSelect select={(rating) => setRating(rating)}/>
        <div className='input-group'>
          <input
            onChange={handleTextChange}
            type='text'
            placeholder='write a review'
            value={text}
          />
          {/* <Button>Send</Button> */}
          <Button type='submit' isDisabled={btnDisabled}>Send</Button>
        </div>
        {message &&<div className='message'>{message}</div> }
      </form>
    </Card>
  );
};

export default FeedbackForm;
