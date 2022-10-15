import React from 'react';
import PropTypes from 'prop-types';

export interface IHeaderModel {
    text: string,
    bgColor: string,
    textColor: string,
}

const Header = (props : IHeaderModel) => {

    const styles = {
        backgroundColor: props.bgColor,
        color: props.textColor
    };
  return (
    <header style={styles}>
        <div className="container">
            {props.text}
        </div>
    </header>
  )
}
Header.defaultProps = {
    text: 'Feedback UIs',
    bgColor: 'rgba(0,0,0,0.4)',
    textColor: '#ff6a95',
};
// Header.propTypes = IHeader;

export default Header