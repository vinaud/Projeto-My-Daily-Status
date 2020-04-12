import React, { useState } from 'react';
import auth0 from '../lib/auth0';
import axios from 'axios';
import {browserHistory} from 'react-router';
import {withRouter} from 'react-router-dom'
import { useHistory } from "react-router-dom";

const CreateStatus = (props) => 
{
    const [dados, setDados] = useState({

        status: 'bem',
        coords: {
            lat: null,
            long: null
        }
    })
    const getMyLocation = () => {
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition( position  => {
                setDados(old => {
                    return{
                        ...old,
                        coords: {
                            lat: position.coords.latitude,
                            long: position.coords.longitude
                        }
                    }
                })
            })
        }
    };

    const onStatusChange = evt => {
        const value = evt.target.value
        setDados(old => {
            return{
                ...old,
                status: value
            }
        })
    };

   
    const save = async() => {
        await axios.post('/api/save-status', dados)

        
    }

    return (
        <div>
            <h1 className='text-3xl text-center m-8'>Cadastrar status do dia:</h1>
            <label className = 'block text-lg text-center m-8 '><input type ='radio' name = 'status' value = 'bem' onClick = { onStatusChange}/>Estou bem e sem sintomas.</label>
            <label className = 'block text-lg text-center m-8' ><input type ='radio' name = 'status' value = 'gripe' onClick = { onStatusChange}/>Estou com sintomas de gripe.</label>
            <label className = 'block text-lg text-center m-8'><input type ='radio' name = 'status' value = 'covid' onClick = { onStatusChange} />Estou com sintomas de COVID-19.</label>
            
            <button className= 'py-4 px-2 rounded bg-pink-800 font-bold shadow-xl hover:shadow block w-1/4 text-center mx-auto text-white'  onClick = { getMyLocation }>Pegar minha localização</button>
            <p className='text-3xl text-center m-8'>Sua posição atual:{dados.coords.lat} ; {dados.coords.long} </p>
            <button className= 'py-4 px-2 rounded bg-pink-800 font-bold shadow-xl hover:shadow block w-1/4 text-center mx-auto text-white' onClick = { save }>Salvar meu status </button>
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
