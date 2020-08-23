import React from 'react';
import { Card, Grid, Container } from '@material-ui/core';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import RoomIcon from '@material-ui/icons/Room';
import onlineIcon from '../onlineIcon.png';

const ChatHeader = ({ room, users }) => {
    return(
            <Container className='header-container'>
                <div className='padding' style={{height:'1rem'}}>
                    <RoomIcon style={{float:'left'}}/>
                    <h2 style={{float:'left',margin:'0'}}>{room}</h2>
                    <a href='/' style={{float:'right'}}><CloseRoundedIcon/></a>
                </div>
                <div>
                    {
                    users
                    ? (
                    <div className="active-user-container">
                        <div className="active-users">
                            {' Active users:'}
                        </div>
                        {users.map((user) => (
                        <div key={user.name} className="active-users">
                            <div style={{paddingRight: '10%'}}>
                                <img alt="Online Icon" src={onlineIcon}/> 
                            </div>  
                            <div style={{paddingRight: '10%'}}>
                                {user.name}{(users.slice(-1)[0] === user) ? '.' : ','}
                            </div>
                        </div>
                        ))}
                    </div>
                    )
                    : null
                    }
                </div>
            </Container>
    )
}

export default ChatHeader;