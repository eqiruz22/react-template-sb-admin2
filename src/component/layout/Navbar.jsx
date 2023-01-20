import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../hooks/useAuthContext'

const Navbar = () => {
    const { dispatch, user } = useAuthContext()
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('user')
        dispatch({ type: 'LOGOUT' })
        navigate('/login')
    }

    return (
        <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
            <ul className="navbar-nav ml-auto">
                <div className="topbar-divider d-none d-sm-block" />
                <li className="nav-item dropdown no-arrow">
                    <Link className="nav-link dropdown-toggle" to="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <span className="mr-2 d-none d-lg-inline text-gray-600 small">Hi, {user['name']}</span>
                        <img alt='' className="img-profile rounded-circle" src='img/undraw_profile.svg' />
                    </Link>
                    <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
                        <Link className="dropdown-item" to="#">
                            <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400" />
                            Profile
                        </Link>
                        <Link className="dropdown-item" to="#">
                            <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400" />
                            Settings
                        </Link>
                        <Link className="dropdown-item" to="#">
                            <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400" />
                            Activity Log
                        </Link>
                        <div className="dropdown-divider" />
                        <button onClick={handleLogout} className="dropdown-item">
                            <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400" />
                            Logout
                        </button>
                    </div>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar