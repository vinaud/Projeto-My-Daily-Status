import React from 'react';

const index = () =>{
    return (
        <div>
            <h1 className = 'text-3xl text-center m-8'>Mantenha-se protegido.
            Sua comunidade também.</h1>
            <h1 className = 'text-3xl text-center m-8'>Compartilhe
            como você está.</h1>
            <h1 className = 'text-3xl text-center m-8'>Veja como pessoas a seu redor estão</h1>
            <a href ='/api/login' className = 'py-4 px-2 rounded bg-pink-800 font-bold shadow-xl hover:shadow block w-1/4 text-center mx-auto text-white'>
                Comece por aqui
            </a>
        </div>
        )
}

export default index