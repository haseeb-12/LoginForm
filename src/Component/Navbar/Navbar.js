import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../store/AuthContextProvider'
import './Navbar.css'

const Navbar = () => {

    const {isLoggedIn,logout} = useContext(AuthContext)

    const logoutHandler=()=>{
        logout()
    }

    
    return (
        <header className='header'>
            <Link>
                <div className='login_logo'>React Auth</div>
            </Link>
            <nav>
                <ul>
                    {!isLoggedIn &&  <li>
                        <Link to='login'>Login</Link>
                    </li>}
                   {isLoggedIn && 
                     <li>
                     <Link to='profile'>Profile</Link>
                 </li>}
                  {isLoggedIn &&
                  <li>
                  <button onClick={logoutHandler}>Logout</button>
              </li>
                  }
                    
                </ul>
            </nav>
        </header>
    )
}
export default Navbar
