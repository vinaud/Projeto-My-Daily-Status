import React, { children } from 'react';
import Link from 'next/link';
import { useLocation } from "react-router-dom";
import { BrowserRouter as Router } from 'react-router-dom';

const NavLink = ({href, children}) =>{
    return(
        <Link href = {href} >
            <a className = 'p-2 hover:underline hover:text-red-800'>{children}</a>
        </Link>
    )
}
const NavBar = () =>{
    
    return (
        <div className='bg-gray-500 py-4 text-center'>

            <NavLink href = '/app' > Home </NavLink>

            <NavLink href = '/sobre' > Sobre </NavLink>
               
            <NavLink href = '/create-status'>Cadastrar Status</NavLink>

            <NavLink href = '/api/logout'><a>Logout</a></NavLink>
       </div>
    )
}

export default NavBar;