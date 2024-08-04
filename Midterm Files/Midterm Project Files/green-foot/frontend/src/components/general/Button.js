import React from 'react'
import './general-css/Button.css'
import {Link} from 'react-router-dom'

const STYLES = ['btn--primary', 'btn--outline'];

const SIZES = ['btn--medium', 'btn--large'];

export const Button = ({children, type, onClick, buttonStyle, buttonSize}) => {
    const checkButtonStyle = STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0];

    const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

    return (
        <Link to='/login' className='btn-mobile'>
            <button 
            className={`btn btn-outline-light ${checkButtonStyle} ${checkButtonSize}`} 
            onClick={onClick}
            type={type}
            id="general-button"
            >
                {children}
            </button>
        </Link>
    );
};


