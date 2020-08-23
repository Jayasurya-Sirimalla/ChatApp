import React from 'react';
import ReactEmoji from 'react-emoji';

const Messages = ({ message:{ user , text }, name }) => {
    let currentUserMsg = false;
    const trimmedName = name.trim().toLowerCase();
    if(user === trimmedName) {
        currentUserMsg = true;
    } 
    return(
        currentUserMsg 
        ?(
            <div className='message-container-sent'>
                <p className='message-text txt-align-end float-right'>{trimmedName}</p>
                <div className='message-sent'>
                <p className='message-text color-white float-right'>{ReactEmoji.emojify(text)}</p>
                </div>
            </div>
        )
        :(
        (user === 'admin')
        ?(
            <div style={{color: '#660066'}}>
                <p>{text}</p>
            </div>
        )
        :(
            <div className='message-container-received'>
                <p className='message-text txt-align-start float-left'>{user}</p>
                <div className='message-received'>
                <p sclassName='message-text float-left'>{ReactEmoji.emojify(text)}</p>
                </div>
            </div>
        )
        )
    )
}

export default Messages;