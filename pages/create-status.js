import React, { useState } from 'react';
import auth0 from '../lib/auth0';

const CreateStatus = () => 
{
    const getMyLocation = () => {
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition( position  => {
                console.log(position.coords)
            })
        }
    }

    return (
        <div>
            <h1>Create status</h1>
            <button onClick = { getMyLocation()}>Get my location</button>
        </div>
        
    )
}

export default CreateStatus;

export async function getServerSideProps({ req, res })  {
    const session = await auth0.getSession(req);
    if (session){
    return {
        props: {
            isAuth: true,
            user: session.user,
        }
     }
 }
 return {
     props: {
         isAuth: false,
         user: { }
     }
 }
}
