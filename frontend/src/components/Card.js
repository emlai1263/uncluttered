import React from 'react';
import './Card.css'

function Card({title, body}){
    return (
        <div className='card-container'>
            <div className='card-title'>
                {title}
            </div>
            <div className='card-body'>
                <p>{body}</p>
            </div>
        </div>
        )
}

export default Card