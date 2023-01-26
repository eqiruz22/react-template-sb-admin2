import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const api = 'http://10.80.7.94:4001/user'

const Create = () => {

    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [titles, setTitles] = useState('')
    const [role, setRole] = useState([])
    const [title, setTitle] = useState([])
    const [op, setOp] = useState('')
    const [errRole, setErrRole] = useState('')
    const [errName, setErrName] = useState('')
    const [errEmail, setErrEmail] = useState('')
    const [errPassword, setErrPassword] = useState('')
    const navigate = useNavigate()

    const submitData = async (e) => {
        e.preventDefault()
        await axios.post(api + '/create', {
            email: email,
            name: name,
            password: password,
            role: op,
            title_id: titles
        }).then(res => {
            console.log(res.data.message)
            if (res.status === 201) {
                Swal.fire({
                    title: 'Success',
                    text: 'Success Create User',
                    icon: 'success'
                }).then((result) => {
                    navigate('/user')
                })
            }
        }).catch(error => {
            console.log(error)
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


    const getTitle = async () => {
        await axios.get('http://10.80.7.94:4001/user/title')
            .then(res => {
                setTitle(res.data.value)
            }).catch(error => {
                console.log(error)
            })
    }

    useEffect(() => {
        getTitle()
    }, [])

    const getRole = async () => {
        await axios.get(api + '/role')
            .then(result => {
                setRole(result.data.value)
            })
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
        if (!e.target.value) {
            setErrEmail('Email is required')
        } else {
            setErrEmail('')
        }
    }

    const handleNameChange = (e) => {
        setName(e.target.value)
        if (!e.target.value) {
            setErrName('Full Name is required')
        } else {
            setErrName('')
        }
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
        if (e.target.value < 5) {
            setErrPassword('Password must be more than 5 character')
        } else if (!e.target.value) {
            setErrPassword('Password is required')
        } else {
            setErrPassword('')
        }
    }

    const handleRoleChange = (e) => {
        setOp(e.target.value)
        if (e.target.value === '') {
            setErrRole('Role must be administrator or user')
        } else {
            setErrRole('')
        }
    }

    useEffect(() => {
        getRole()
    }, [])

    const handleTitleChange = (e) => {
        setTitles(e.target.value)
    }

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
                        value={op}
                        className='form-select'
                        onChange={handleRoleChange}
                    >
                        <option value=''>--Select--</option>
                        {role.map((item, index) =>
                            <option key={item.id} value={item.id}>{item.role_name}</option>
                        )}
                    </select>
                    {errRole && <span className='text-danger'>{errRole}</span>}
                </div>
                <div className='mb-3'>
                    <label htmlFor="role" className='form-label'>Title</label>
                    <select
                        multiple={false}
                        value={titles}
                        className='form-select'
                        onChange={handleTitleChange}
                    >
                        <option value=''>--Select--</option>
                        {title.map((item, index) =>
                            <option key={item.id} value={item.id}>{item.title_name}</option>
                        )}
                    </select>
                    {errRole && <span className='text-danger'>{errRole}</span>}
                </div>
                <button type='submit' className="btn btn-primary mt-3">Submit</button>
            </form>

        </div>
    )
}

export default Create