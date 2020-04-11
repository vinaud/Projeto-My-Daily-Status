import React, { useEffect} from 'react';
import auth0 from '../lib/auth0';
import router from 'next/router'
import { db } from '../lib/db'


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
        <div>
            <h1>App</h1>
            <pre>{JSON.stringify(props, null, 2)}</pre>
        </div>
        
    )
}

export default App;

export async function getServerSideProps({ req, res })  {
    const session = await auth0.getSession(req);
    console.log(session)
    if(session){

        const todaysCheckin = await db.collection('markers')
        .doc('2020-04-10')
        .collection('checks')
        .doc(session.user.sub)
        .get();

        const todaysData = todaysCheckin.data();
        console.log(todaysCheckin.data());
        let forceCreate = true;

        if(todaysData)
        {
            forceCreate = false;
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