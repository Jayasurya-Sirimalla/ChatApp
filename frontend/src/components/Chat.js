import React, { useState, useEffect } from 'react';
import { Container, Paper } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import {Link} from 'react-router-dom';
import io from 'socket.io-client';
import queryString from 'query-string';
import ChatHeader from './ChatHeader';
import MessageInput from './MessageInput';
import MessagesBlock from './MessagesBlock';

let socket;
const ENDPOINT = 'https://chat-app-jay.herokuapp.com/';

const Chat = ({location}) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [errorMsg, setErrorMsg] = useState('');
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const {name, room} = queryString.parse(location.search);
        setName(name)
        setRoom(room)
        
        socket = io(ENDPOINT);
        console.log("Chat -> socket", socket)
        console.log(name, room)

        socket.emit('join', {name,room}, (errorMsg) => {
            if(errorMsg){
                setErrorMsg(errorMsg);
            }
        })

        return () => {
            socket.emit('disconnect');
            socket.off();
        }

    }, [ENDPOINT, location.search]);

    useEffect(() => {
        socket.on('message',(message) => {
            setMessages([...messages, message])
        })
        socket.on('roomData',({users}) => {
            setUsers(users)
        })
    },[messages])

    const submitMessage = (e) => {
        e.preventDefault();
        console.log('submit Message--------')
        if(message){
            socket.emit('sendMessage',message, () => setMessage(''))
        }
    }
    console.log(messages)
    return(

        <Container className='container'>
            {(errorMsg === '')
                ?(
                <Paper
                    elevation={24}
                    className='test'
                    style={{
                        'margin':'0px auto',
                        width: '35vw',
                        position:'relative'
                    }}
                >
                    <ChatHeader room = {room} users = {users} />
                    <MessagesBlock messages={messages} name={name}/>
                    <MessageInput message={message} setMessage={setMessage} submitMessage={submitMessage}/>
                </Paper>
                )
                :(
                <Link to={`/`}>
                    <Alert style={{justifyContent:'center'}} severity="error">
                        <AlertTitle>{errorMsg} <strong> - click me!</strong> to try again</AlertTitle>          
                    </Alert>
                </Link>
            )}        
        </Container>
    )
}

export default Chat;