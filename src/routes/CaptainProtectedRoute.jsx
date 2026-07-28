import React, { useContext, useEffect, useState } from 'react'
import api from '../api/api';
import { Navigate } from 'react-router-dom';
import { CaptainDataContext } from '../context/CaptainContext';

const CaptainProtectedRoute = ({children}) => {
  const { captain, setCaptain } = useContext(CaptainDataContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCaptain = async () => {
            try {
                const response = await api.get("/captains/profile");
                if(response.data.captain.role=="Captain"){
                setCaptain(response.data.captain);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchCaptain();
    }, [setCaptain]);
    if(loading){
        return <h2>Loading...</h2>
    }
    if(!captain.email || !captain.role=='Captain'){
        return <Navigate to='/captain-login' replace/>
    }
    return children
}

export default CaptainProtectedRoute