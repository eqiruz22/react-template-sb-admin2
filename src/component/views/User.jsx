import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'


const api = 'http://localhost:4001/user'

const User = () => {

    const [user, setUser] = useState([])

    const getData = async () => {
        await axios.get(api + '/show')
            .then(res => {
                setUser(res.data.value)
            })
    }

    useEffect(() => {
        getData()
    }, [])

    const deleteUser = async (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Deleted!',
                    'Your data has been deleted.',
                    'success'
                )
                getData()
            }
        })
        await axios.delete(api + `/delete/${id}`)
    }


    return (
        <div className='px-5'>
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Data User</h1>
                <Link to="/user/create" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i
                    className="fas fa-plus fa-sm text-white-50"></i> Create User</Link>
            </div>
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th scope="colSpan">#</th>
                        <th scope="colSpan">Email</th>
                        <th scope="colSpan">Username</th>
                        <th scope="colSpan">Role</th>
                        <th scope='colSpan'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {user.map((us, index) =>
                        <tr key={us.id}>
                            <th scope="row">{index + 1}</th>
                            <td>{us.email}</td>
                            <td>{us.username}</td>
                            <td>{us.name}</td>
                            <td>
                                <Link
                                    style={{ textDecoration: 'none' }}
                                    to={`/user/edit/${us.id}`}>
                                    <button className='btn btn-warning'>Edit</button>
                                </Link>
                                <button className='btn btn-danger ml-1' onClick={() => deleteUser(us.id)}>Delete</button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default User