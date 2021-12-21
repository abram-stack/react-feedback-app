import React from 'react'
import Card from '../components/shared/Card'
import {Link} from 'react-router-dom'

const AboutPage = () => {
  return (
    <Card>
      <div className="about">
        <h1>About this project</h1>
        <p>Hello there producer, creator and maker! You have your product out there launched and want to know the feedback!?</p>
        <p>Use this React App so the people could leave some feedback of your product</p>
        <p>
          <Link to='/'>Back to Main Page</Link>
        </p>
        
      </div>
    </Card>
  )
}

export default AboutPage
