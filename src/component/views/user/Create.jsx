import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const api = 'http://localhost:4001/user'

const Create = () => {

    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState([])
    const [op, setOp] = useState('')
    const [errRole, setErrRole] = useState('')
    const [errName, setErrName] = useState('')
    const [errEmail, setErrEmail] = useState('')
    const [errPassword, setErrPassword] = useState('')
    const navigate = useNavigate()

    const submitData = async (event) => {
        event.preventDefault()
        await axios.post(api + '/create', {
            email: email,
            name: name,
            password: password,
            role: op
        }).then(res => {
            if (res.status === 201) {
                Swal.fire({
                    title: 'Success',
                    text: 'Success Create User',
                    icon: 'success'
                }).then((result) => {
                    if (result.isConfirmed === true) {
                        navigate('/user')
                    }
                })
            }
        }).catch(error => {
            if (error.response.status === 500) {
                setErrEmail('Email must be unique')
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong, please check another field!',
                })
            }
        })
    }


    const getRole = async () => {
        await axios.get(api + '/role')
            .then(result => {
                setRole(result.data.value)
            })
    }

    const handleEmailChange = async (event) => {
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

    const handlePassword = (event) => {
        setPassword(event.target.value)
        if (event.target.value < 5) {
            setErrPassword('Password must be more than 5 character')
        } else if (!event.target.value) {
            setErrPassword('Password is required')
        } else {
            setErrPassword('')
        }
    }

    const handleRoleChange = (event) => {
        const id = event.target.value
        setOp(id)
        if (event.target.value === null) {
            setErrRole('Role must be administrator or user')
        } else {
            setErrRole('')
        }
    }

    useEffect(() => {
        getRole()
    }, [])


    return (
        <div className='container'>
            <h1>Create User</h1>
            <form onSubmit={submitData}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input
                        value={email}
                        onChange={handleEmailChange}
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
                        type="text"
                        className="form-control" />
                    {errName && <span className='text-danger'>{errName}</span>}
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        value={password}
                        onChange={handlePassword}
                        type="password"
                        className="form-control" />
                    {errPassword && <span className='text-danger'>{errPassword}</span>}
                </div>
                <div className='mb-3'>
                    <label htmlFor="role" className='form-label'>Role</label>
                    <select
                        multiple={false}
                        value={op}
                        className='form-select'
                        onChange={handleRoleChange}
                    >
                        <option defaultValue={''}>--Select--</option>
                        {role.map((r, index) =>
                            <option key={r.id} value={r.id}>{r.role_name}</option>
                        )}
                    </select>
                    {errRole && <span className='text-danger'>{errRole}</span>}
                </div>
                <button type="submit" className="btn btn-primary mt-3">Submit</button>
            </form>

        </div>
    )
}

export default Create