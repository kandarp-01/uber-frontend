import React from 'react'
import { useEffect } from 'react';
import { createContext } from 'react'
import {io} from 'socket.io-client';

// eslint-disable-next-line react-refresh/only-export-components
export const SocketContext = createContext();
const socket = io(`${import.meta.env.VITE_BASE_URL || window.location.origin}`, {
  withCredentials: true,
});

const SocketProvider = ({children}) => {
    useEffect(()=>{
        socket.on('connect',()=>{
            console.log("Connected to server");
        });

        socket.on('disconnect',()=>{
            console.log('Disconnected from server');
        });
    },[]);

  return (
    <SocketContext.Provider value={{socket}}>
        {children}
    </SocketContext.Provider>
  )
}

export default SocketProvider;