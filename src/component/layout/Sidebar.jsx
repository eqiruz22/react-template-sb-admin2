import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {

    const [activeNav, setActiveNav] = useState('')

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
                            <Link className={activeNav === '/data' ? 'collapse-item active' : 'collapse-item'}
                                onClick={() => handleActive('/data')} to="/data">Data</Link>
                            <Link className={activeNav === '/user' ? 'collapse-item active' : 'collapse-item'}
                                onClick={() => handleActive('/user')} to="/user">User</Link>
                            <Link className={activeNav === '/title' ? 'collapse-item active' : 'collapse-item'}
                                onClick={() => handleActive('/title')} to="/title">Title</Link>
                        </div>
                    </div>
                </li>
                <li className={activeNav === '/list-perdin' ? 'nav-item active' : 'nav-item'}
                    onClick={() => handleActive('/list-perdin')}
                >
                    <Link className="nav-link" to="/list-perdin">
                        <i className="fas fa-solid fa-clipboard" />
                        <span> Perdin</span></Link>
                </li>
            </ul>

        </div>
    )
}

export default Sidebar