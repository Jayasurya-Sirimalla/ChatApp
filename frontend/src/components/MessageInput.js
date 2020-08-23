import React from 'react';
import { Container, Paper, TextField, Button } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';


const MessageInput = ({ message, setMessage, submitMessage }) => {
    return(
        <Container className='message-input-container'>
            <TextField
            id="outlined-textarea"
            placeholder="type something intresting..."
            multiline
            variant="outlined"
            style={{'min-width':'20vw', paddingRight:'1rem',overflow: 'auto'}}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' ? submitMessage(e) : null}
            size="small"
            rowsMax={4}
            />
            <Button
            variant="contained"
            color="primary"
            endIcon={<SendIcon/>}
            onClick={(e) => submitMessage(e)}
            size="medium"
            >
            Send
            </Button>
        </Container>
    )
}

export default MessageInput;