import { isDisabled } from '@testing-library/user-event/dist/utils'
import React from 'react'
import { ReactNode } from 'react'
import { OneOrMore } from './SharedTypes'

export interface ButtonModelInterface {
    children ? : ReactNode,
    version ?: string,
    type ?: any,
    isDisabled ?: boolean;
    onClick ? : (e: React.MouseEvent<HTMLButtonElement>) => void

}

const Button = ({children, version, type, isDisabled, onClick} : ButtonModelInterface) => {
  return (
    <div>
        <button type={type} disabled={isDisabled} className={`btn btn-${version}`} onClick={onClick}>
            {children}
        </button>
    </div>
  )
}

Button.defaultProps = {
    version: 'primary',
    type: 'button',
    isDisabled: false,
}

export default Button