import React from 'react'
import {spinner} from '../assets';

const Spinner = () => {
  return (
    <img src={spinner} alt='Loading...' style={{
        width: '200', margin: 'auto' , display: 'block'
    }} >
    </img>
  )
}

export default Spinner