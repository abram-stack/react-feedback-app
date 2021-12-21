import React from 'react'
import { Link } from 'react-router-dom'
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';

const AboutIconLink = () => {
  return (
    <div className='about-link'> 
      <Link to='/about'>
        <QuestionMarkIcon fontSize='medium'/>
      </Link>
    </div>
  )
}

export default AboutIconLink
