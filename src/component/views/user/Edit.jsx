import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const api = 'http://10.80.7.94:4001/user'

const Edit = () => {

    const [email, setEmail] = useState('')
    const [errEmail, setErrEmail] = useState('')
    const [name, setName] = useState('')
    const [errName, setErrName] = useState('')
    const [role, setRole] = useState('')
    const [errRole, setErrRole] = useState('')
    const [opt, setOpt] = useState([])
    const { id } = useParams()
    const navigate = useNavigate()

    const showById = async () => {
        const response = await axios.get(api + `/show/${id}`)
        const response1 = await axios.get(api + '/role')
        setEmail(response.data.value[0].email)
        setName(response.data.value[0].name)
        setRole(response.data.value[0].role)
        setOpt(response1.data.value)
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value)
        if (!event.target.value) {
            setErrEmail('Email is required')
        } else {
            setErrEmail('')
        }
    }

    const handleNameChange = (event) => {
        setName(event.target.value)
        if (!event.target.value) {
            setErrName('Full Name is required')
        } else {
            setErrName('')
        }
    }

    const handleRoleChange = (event) => {
        const id = event.target.value
        setRole(id)
        if (event.target.value === null) {
            setErrRole('Role must be administrator or user')
        } else {
            setErrRole('')
        }
    }


    useEffect(() => {
        showById()
    }, [])


    const updateData = async (event) => {
        event.preventDefault()
        Swal.fire({
            title: 'Success',
            text: 'data has been updated',
            icon: 'success'
        }).then((result) => {
            if (result.isConfirmed === true) {
                navigate('/user')
            }
        })
        await axios.patch(api + `/update/${id}`, {
            email: email,
            name: name,
            role: role
        })
    }

    return (
        <div className='container'>
            <h1>Edit User</h1>
            <form onSubmit={updateData}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input
                        value={email}
                        onChange={handleEmailChange}
                        name='email'
                        type="email"
                        className="form-control"
                    />
                    {errEmail && <span className='text-danger'>{errEmail}</span>}
                </div>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Full Name</label>
                    <input
                        value={name}
                        onChange={handleNameChange}
                        name='name'
                        type="text"
                        className="form-control" />
                    {errName && <span className='text-danger'>{errName}</span>}
                </div>
                <div className='mb-3'>
                    <label htmlFor="role" className='form-label'>Role</label>
                    <select
                        value={role}
                        onChange={handleRoleChange}
                        name='role'
                        className="form-select">
                        <option value=''>Open this select menu</option>
                        {opt.map((item, index) =>
                            <option key={item.id} value={item.id}>{item.role_name}</option>
                        )}
                    </select>
                    {errRole && <span className='text-danger'>{errRole}</span>}
                </div>
                <button type="submit" className="btn btn-primary mt-3">Submit</button>
            </form>
        </div>
    )
}

export default Edit