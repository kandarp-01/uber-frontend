import React, { useState } from 'react'
import { useContext } from 'react'
import { UserDataContext } from '../context/UserContext'
import { Navigate, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import api from '../api/api';

const UserProtectedRoute = ({children}) => {
    const { user, setUser } = useContext(UserDataContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await api.get("/users/profile");
                if(response.data.user.role=="User"){
                setUser(response.data.user);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [setUser]);
    if(loading){
        return <h2>Loading...</h2>
    }
    if(!user.email || !user.role=='User'){
        return <Navigate to='/login' replace/>
    }
    return children
}

export default UserProtectedRoute