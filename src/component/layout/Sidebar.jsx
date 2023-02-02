import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../../hooks/useAuthContext'

const Sidebar = () => {

    const [activeNav, setActiveNav] = useState('')
    const { user } = useAuthContext()

    const handleActive = (navItem) => {
        setActiveNav(navItem)
    }

    return (
        <div>
            <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
                <Link className="sidebar-brand d-flex align-items-center justify-content-center" to="/">
                    <div className="sidebar-brand-icon rotate-n-15">
                        <i className="fas fa-laugh-wink" />
                    </div>
                    <div className="sidebar-brand-text mx-3">SB Admin <sup>2</sup></div>
                </Link>
                <hr className="sidebar-divider my-0" />
                <li className={activeNav === '' ? 'nav-item active' : 'nav-item'}
                    onClick={() => handleActive('')}
                >
                    <Link className="nav-link" to="/">
                        <i className="fas fa-fw fa-tachometer-alt" />
                        <span>Dashboard</span></Link>
                </li>
                <hr className="sidebar-divider" />
                <div className="sidebar-heading">
                    Interface
                </div>
                <li className='nav-item'>
                    <Link className="nav-link collapsed" to="#" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                        <i className="fas fa-fw fa-cog" />
                        <span>Components</span>
                    </Link>
                    <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                        <div className="bg-white py-2 collapse-inner rounded">
                            <h6 className="collapse-header">List</h6>
                            {user['role'] === 1 && (
                                <div>
                                    <Link className={activeNav === '/data' ? 'collapse-item active' : 'collapse-item'}
                                        onClick={() => handleActive('/data')} to="/data">Perdin Bulanan</Link>
                                    <Link className={activeNav === '/data/harian' ? 'collapse-item active' : 'collapse-item'}
                                        onClick={() => handleActive('/data/harian')} to="/data/harian">Perdin Harian</Link>
                                    <Link className={activeNav === '/user' ? 'collapse-item active' : 'collapse-item'}
                                        onClick={() => handleActive('/user')} to="/user">User</Link>
                                    <Link className={activeNav === '/title' ? 'collapse-item active' : 'collapse-item'}
                                        onClick={() => handleActive('/title')} to="/title">Title</Link>
                                </div>
                            )}
                            {user['role'] !== 1 && (
                                <div>
                                    <Link className={activeNav === '/data/harian' ? 'collapse-item active' : 'collapse-item'}
                                        onClick={() => handleActive('/data/harian')} to="/data/harian">Perdin Harian</Link>
                                </div>
                            )}
                        </div>
                    </div>
                </li>
                {user['role'] === 1 && (
                    <div>
                        <li className={activeNav === '/waiting-to-approve-manager' ? 'nav-item active' : 'nav-item'}
                            onClick={() => handleActive('/waiting-to-approve-manager')}
                        >
                            <Link className="nav-link" to="/waiting-to-approve-manager">
                                <i className="fas fa-solid fa-clipboard" />
                                <span> Perdin list Manager</span></Link>
                        </li>
                        <li className={activeNav === '/waiting-to-approve-director' ? 'nav-item active' : 'nav-item'}
                            onClick={() => handleActive('/waiting-to-approve-director')}
                        >
                            <Link className="nav-link" to="/waiting-to-approve-director">
                                <i className="fas fa-solid fa-clipboard" />
                                <span> Perdin list Director</span></Link>
                        </li>
                    </div>
                )}
                {user['role'] === 2 && user['title_id'] === 3 && (
                    <div>
                        <li className={activeNav === '/waiting-to-approve-manager' ? 'nav-item active' : 'nav-item'}
                            onClick={() => handleActive('/waiting-to-approve-manager')}
                        >
                            <Link className="nav-link" to="/waiting-to-approve-manager">
                                <i className="fas fa-solid fa-clipboard" />
                                <span> Perdin list Manager</span></Link>
                        </li>
                    </div>
                )}
                {user['role'] === 2 && user['title_id'] === 4 && (
                    <div>
                        <li className={activeNav === '/waiting-to-approve-manager' ? 'nav-item active' : 'nav-item'}
                            onClick={() => handleActive('/waiting-to-approve-manager')}
                        >
                            <Link className="nav-link" to="/waiting-to-approve-manager">
                                <i className="fas fa-solid fa-clipboard" />
                                <span> Perdin list Manager</span></Link>
                        </li>
                    </div>
                )}
                {user['role'] === 2 && user['title_id'] === 19 && (
                    <div>
                        <li className={activeNav === '/waiting-to-approve-director' ? 'nav-item active' : 'nav-item'}
                            onClick={() => handleActive('/waiting-to-approve-director')}
                        >
                            <Link className="nav-link" to="/waiting-to-approve-director">
                                <i className="fas fa-solid fa-clipboard" />
                                <span> Perdin list Director</span></Link>
                        </li>
                    </div>
                )}
            </ul>

        </div>
    )
}

export default Sidebar