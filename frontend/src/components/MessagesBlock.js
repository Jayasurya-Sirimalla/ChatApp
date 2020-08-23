import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import { Container } from '@material-ui/core';

import Message from './Message';

const MessagesBlock = ({ messages, name }) => {
    return(
        <ScrollToBottom className='scroll'>
        <Container style={{height:'60vh'}}>
            {
            messages.map((message, i) => <div key={i}><Message message={message} name={name}/></div>)
            }
        </Container>
        </ScrollToBottom>

    )
}

export default MessagesBlock;