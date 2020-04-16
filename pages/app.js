import React, { useEffect} from 'react';
import auth0 from '../lib/auth0';
import router from 'next/router';
import { db } from '../lib/db';
import { distance } from '../lib/geo';
import Map from '../components/Map';


const App = (props) => {
    useEffect(() => {
        if(!props.isAuth)
        {
            router.push('/')
        } else if(props.forceCreate)
        {
            router.push('/create-status')
        }

    })

    if(!props.isAuth || props.forceCreate)
        {
            return null
        }

    return (
        <div className = 'content-center right-auto left-auto'>
            <h1 className = 'text-3xl text-center m-8'>Status próximos a você em um raio de 50 KM: </h1>
            <table className ='table-auto m-auto items-center'>
            <thead>
              <tr>
                <th class="px-4 py-2">Usuário</th>
                <th class="px-4 py-2">Status</th>
                <th class="px-4 py-2">Posição</th>
                <th class="px-4 py-2">Distância</th>
              </tr>
            </thead>
            <tbody>
            {props.checkins.map(checkin => {
                let id = 'Outro usuário'
                if (checkin.id === props.user.sub){
                   id = 'Seu status'
                }

                let dist = 'Longe'
                if (checkin.distance < 10)
                {
                    dist = 'Perto'
                }
               // coordenadas = checkin.coords
                return (
                    <tr>
                        <td className='border px-4 py-2'>{id}</td>
                        <td className='border px-4 py-2'>{checkin.status}</td>
                        <td className='border px-4 py-2'>{dist}</td>
                        <td className='border px-4 py-2'>{checkin.distance} KM</td>
                    </tr>
                )
            })}
            </tbody>
            </table>
           
        </div>
        
    )
}

export default App;

export async function getServerSideProps({ req, res })  {
    const session = await auth0.getSession(req);
    console.log(session)
    if(session){
        const today = new Date();
        const currentDate = today.getFullYear() + '-' + today.getMonth() + '-' + today.getDate();

        const todaysCheckin = await db.collection('markers')
        .doc(currentDate)
        .collection('checks')
        .doc(session.user.sub)
        .get();

        const todaysData = todaysCheckin.data();
        
        let forceCreate = true;

        if(todaysData)
        {
            forceCreate = false;
            console.log(todaysData.coordinates);
            const checkins = await db.collection('markers')
            .doc(currentDate)
            .collection('checks')
            .near({
                center: todaysData.coordinates,
                radius: 50000
            })
            .get()
            let checkinsList = []
            checkins.docs.forEach(doc => {
                checkinsList.push({
                    id: doc.id,
                    status: doc.data().status,
                    coords: {
                        lat: doc.data().coordinates.latitude,
                        long: doc.data().coordinates.longitude,
                    },
                    distance: distance(todaysData.coordinates.latitude, todaysData.coordinates.longitude, doc.data().coordinates.latitude,doc.data().coordinates.longitude)
                    .toFixed(2)
                })
            })

            return {
                props: {
                    isAuth: true,
                    user: session.user,
                    forceCreate: false,
                    checkins: checkinsList
                }
             }
        }

        return {
           props: {
               isAuth: true,
               user: session.user,
               forceCreate
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