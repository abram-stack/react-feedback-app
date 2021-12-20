import { useState } from 'react'
import Card from './shared/Card'
import { PropTypes } from 'prop-types';
import CloseIcon from '@mui/icons-material/Close';

const FeedbackItem = ({ item, handleDelete }) => {
  return (
    <Card>
      <div className='num-display'>{item.rating}</div>
      <button onClick={() => handleDelete(item.id)} className='close'>
        <CloseIcon color='primary'/>
      </button>
      <div>{item.text}</div>
    </Card>
  )
}

FeedbackItem.propType = {
 item: PropTypes.object.isRequried
}
export default FeedbackItem
