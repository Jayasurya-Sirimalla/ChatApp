import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Paper, TextField, Button } from '@material-ui/core';

const Join = () => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [submitClicked, setSubmitClicked] = useState(false);
    const linkClicked = (e) => {
        if(!name || !room){
            setSubmitClicked(true)
            e.preventDefault()
        }
    }
    return (
        <Container className='container'>
            <Paper
                elevation={24}
                style={{
                    'margin':'0px auto',
                    width:'25vw',
                    backgroundColor:'#f2f2f2'
                }}
            >
                <div className='padding'>
                    <h1 className='padding'>Join Chat</h1>
                    <div className='padding'>
                        <TextField required 
                        id="standard-basic" 
                        label="User Name" 
                        onChange={(e) => setName(e.target.value)} 
                        error = {!name && submitClicked}
                        helperText={!name && submitClicked ? "enter name" : ""}
                        fullWidth={true}
                        />
                    </div>
                    <div className='padding'>
                        <TextField required 
                        id="standard-basic" 
                        label="Group Name" 
                        onChange={(e) => setRoom(e.target.value)} 
                        error = {!room && submitClicked}
                        helperText={!room && submitClicked ? "enter room" : ""}
                        fullWidth={true}
                        />
                    </div>
                    <div  className='padding'>
                        <Link onClick={(e) => linkClicked(e)} to={`/chat?name=${name}&room=${room}`}>
                            <Button variant="contained" color="primary">
                                Submit
                            </Button>
                        </Link>
                    </div>     
                </div>
            </Paper>
        </Container>
    )
}

export default Join;