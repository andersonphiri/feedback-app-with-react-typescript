import React from 'react'
import { ReactNode } from 'react'
import { OneOrMore } from './SharedTypes'

export interface CardModelInterface {
  children : ReactNode,
  reverse ? : boolean
}

const Card = ({children, reverse } : CardModelInterface) => {
  const style = {
    backgroundColor: reverse ? 'rgba(0,0,0,0.4)' : '#fff',
    color: reverse ? '#fff' : '#000'
  }
  return (
    <div className={`card ${reverse && 'reverse'}`}>{children}</div>
  )
}

export default Card
