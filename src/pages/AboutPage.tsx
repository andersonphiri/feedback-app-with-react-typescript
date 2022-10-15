import React from 'react'
import Card from '../components/shared/Card'
import { Link } from 'react-router-dom';
const AboutPage = () => {
  return (
    <Card>
      <h1>About this project</h1>
      <p>This is a react app to give feedback service</p>
      <p>Version 1.0.0.0</p>

      <p>
        <Link to={'/'}>
          Go Back Home
        </Link>
      </p>

    </Card>
  )
}

export default AboutPage