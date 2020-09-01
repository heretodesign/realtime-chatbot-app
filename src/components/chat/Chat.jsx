import React, { useState, useEffect } from 'react'
import io from 'socket.io-client'
import queryString from 'query-string'

import InfoBar from '../infoBar/InfoBar'
import Input from '../input/Input'
import Messages from '../messages/Messages'
import TextContainer from '../textContainer/TextContainer'

import './Chat.css'
let socket;

const Chat = ({ location }) => {
    const [name, setName] = useState('')
    const [room, setRoom] = useState('')
    const [users, setUsers] = useState('')
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    const ENDPOINT = 'localhost:5000'


    useEffect(() => {
        const { name, room } = queryString.parse(location.search)

        socket = io(ENDPOINT)

        setName(name)
        setRoom(room)

        socket.emit('join', { name, room }, (error) => {
            if(error) {
                alert(error);
            }
        })
    }, [ENDPOINT, location.search])

    //second lifecycle method
    useEffect(() => {
        socket.on('message', (message) => {
            setMessages(messages => [ ...messages, message])
        })

        socket.on("roomData", ({ users }) => {
            setUsers(users);
        })
    }, [])

    const sendMessage = (event) => {
        event.preventDefault()

        if (message) {
            socket.emit('sendMessage', message, () => setMessage(''))
        }
    }

    console.log(message, messages)

    return (
        <div className="outerContainer">
            <div className="container">
                <InfoBar room={room} />
                <Messages messages={messages} />
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </div>
            <TextContainer users={users}/>
        </div>
    )
}

export default Chat