import { useState, useContext } from 'react'
import Card from './shared/Card'
import { PropTypes } from 'prop-types';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import FeedbackContext from '../context/FeedbackContext'

const FeedbackItem = ({ item }) => {
  const { deleteFeedback, editFeedback } = useContext(FeedbackContext);

  return (
    <Card>
      <div className='num-display'>{item.rating}</div>
      <button onClick={() => deleteFeedback(item.id)} className='close'>
        <CloseIcon color='secondary'/>
      </button>
      <button onClick={() => editFeedback(item)} className='edit'>
        <EditIcon color='secondary'/>
      </button>
      <div>{item.text}</div>
    </Card>
  )
}

FeedbackItem.propType = {
 item: PropTypes.object.isRequried
}
export default FeedbackItem
