import React from 'react'
import spinner from '../assests/spinner.gif'

const Spinner = () => {
  return (
    <img src={spinner} alt='Loading...' style={{width:'100px', margin:'auto', display:'block'}}>
    </img>
  )
}

export default Spinner
