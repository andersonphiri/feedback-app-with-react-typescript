import React from 'react'
import Card from './Card'
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <Card>
          <h1>OOsh!!! sorry, not found</h1>
         <p>
        <Link to={'/'}>
          Go Back Home
        </Link>
      </p>
    </Card>
   
  )
}

export default NotFound