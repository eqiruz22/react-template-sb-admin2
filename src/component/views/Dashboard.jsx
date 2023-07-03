import React from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'

const Dashboard = () => {
    const { user } = useAuthContext()

    if (!user) {
        return null
    }
    return (
        <div>
            <h1>Dashboard</h1>
        </div>
    )
}

export default Dashboard