import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import Select from 'react-select'
import { useAuthContext } from '../../../hooks/useAuthContext';

const Edit = () => {

    const [email, setEmail] = useState('')
    const [errEmail, setErrEmail] = useState('')
    const [name, setName] = useState('')
    const [errName, setErrName] = useState('')
    const [role, setRole] = useState('')
    const [errRole, setErrRole] = useState('')
    const [password, setPassword] = useState('')
    const [opt, setOpt] = useState([])
    const [title, setTitle] = useState([])
    const [optTitle, setOptTitle] = useState('')
    const [divisiVal, setDivisiVal] = useState('')
    const [divisi, setDivisi] = useState([])
    const { id } = useParams()
    const { user } = useAuthContext()
    const navigate = useNavigate()

    useEffect(() => {
        showById()
    }, [])

    useEffect(() => {
        getDivisi()
    }, [])

    const getDivisi = async () => {
        await axios.get('http://localhost:4001/user/divisi')
            .then(res => {
                const opt = res.data.result.map(item => ({ value: item.id, label: item.divisi_name }))
                setDivisi(opt)
            }).catch(error => {
                console.log(error)
            })
    }

    const showById = async () => {
        const response = await axios.get(`http://localhost:4001/user/show/${id}`)
        const response1 = await axios.get('http://localhost:4001/user/role')
        const response2 = await axios.get('http://localhost:4001/user/title')
        console.log(response)
        setEmail(response.data.value[0].email)
        setName(response.data.value[0].name)
        setRole(response.data.value[0].role)
        setOptTitle(response.data.value[0].title_id)
        setDivisiVal({ value: response.data.value[0].divisi_id, label: response.data.value[0].divisi_name })
        setOpt(response1.data.value)
        setTitle(response2.data.value)
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

    const handleTitleChange = (event) => {
        setOptTitle(event.target.value)
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }

    const updateData = async (event) => {
        event.preventDefault()
        await axios.patch(`http://localhost:4001/user/update/${id}`, {
            email: email,
            name: name,
            role: role,
            title_id: optTitle,
            password: password,
            has_role: user['role'],
            divisi_id: divisiVal['value']
        }).then(res => {
            Swal.fire({
                title: 'Success',
                text: `${res.data.message}`,
                icon: 'success'
            })
            navigate('/user')
        }).catch(error => {
            console.log(error)
        })
    }

    return (
        <div className='container'>
            <h1>Edit User</h1>
            <form onSubmit={updateData}>
                {user['role'] === 1 && (
                    <div>
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
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                value={password}
                                onChange={handlePasswordChange}
                                name='password'
                                type="password"
                                className="form-control" />
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
                        <div className='mb-3'>
                            <label htmlFor="role" className='form-label'>Role</label>
                            <select
                                value={optTitle}
                                onChange={handleTitleChange}
                                name='role'
                                className="form-select">
                                <option value=''>Open this select menu</option>
                                {title.map((item, index) =>
                                    <option key={item.id} value={item.id}>{item.title_name}</option>
                                )}
                            </select>
                            {errRole && <span className='text-danger'>{errRole}</span>}
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='divisi' className='form-label'>Divisi</label>
                            <Select options={divisi} value={divisiVal} onChange={(selectOption) => setDivisiVal(selectOption)} />
                        </div>
                        <button type="submit" className="btn btn-primary mt-3">Submit</button>
                    </div>
                )}
                {user['role'] !== 1 && (
                    <div>
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
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                value={password}
                                onChange={handlePasswordChange}
                                name='password'
                                type="password"
                                className="form-control" />
                        </div>
                        <button type="submit" className="btn btn-primary mt-3">Submit</button>
                    </div>
                )}
            </form>

        </div>
    )
}

export default Edit