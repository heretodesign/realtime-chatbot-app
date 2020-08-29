import React, { useState, import { Socket } from 'dgram';
import { parse } from 'url';
useEffect } from 'react'
import io from 'socket.io-client'
import queryString from 'query-string'

let Socket;

const Chat = ({ location }) => {
    const [name, setName] = useState('')
    const [room, setRoom] = useState('')
    const ENDPOINT = 'localhost:5000'


    useEffect(() => {
        const { name, room } from queryString.parse(location.search)

        socket = io(ENDPOINT)

        setName(name)
        setRoom(room)

        Socket.emit('join', { name, room })

    }, [ENDPOINT, location.search])

    return (
        <h1>
            Chat
        </h1>
    )
}
export default Chat