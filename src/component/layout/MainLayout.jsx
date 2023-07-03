import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import { useAuthContext } from '../../hooks/useAuthContext'

const MainLayout = () => {
    const { user } = useAuthContext()

    if (!user) return null

    return (
        <div id='wrapper'>
            <Sidebar />
            <div id='content-wrapper' className='d-flex flex-column'>
                <div id='content'>
                    <Navbar />
                    <div className='container-fluid'>
                        <dir>{<Outlet />}</dir>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    )
}

export default MainLayout