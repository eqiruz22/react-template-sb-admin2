import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useAuthContext } from '../../../hooks/useAuthContext';

const Edit = () => {

    const [email, setEmail] = useState('')
    const [errEmail, setErrEmail] = useState('')
    const [name, setName] = useState('')
    const [errName, setErrName] = useState('')
    const [role, setRole] = useState('')
    const [roleOpt, setRoleOpt] = useState([])
    const [title, setTitle] = useState('')
    const [titleOpt, setTitleOpt] = useState([])
    const [divisi, setDivisi] = useState('')
    const [divisiOpt, setDivisiOpt] = useState([])
    const [errRole, setErrRole] = useState('')
    const [password, setPassword] = useState('')
    const { id } = useParams()
    const { user } = useAuthContext()
    const navigate = useNavigate()

    useEffect(() => {
        showById()
    }, [user, id])

    useEffect(() => {
        getDivisi()
    }, [user])

    useEffect(() => {
        getRole()
    }, [user])

    useEffect(() => {
        getTitle()
    }, [user])
    const getTitle = async () => {
        try {
            const res = await fetch('http://localhost:4001/user/title', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${user['token']}`
                }
            })
            const response = await res.json()
            setTitleOpt(response?.value)
        } catch (error) {
            console.log(error)
        }
    }
    const getRole = async () => {
        try {
            const res = await fetch('http://localhost:4001/user/role', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${user['token']}`
                }
            })
            const response = await res.json()
            setRoleOpt(response?.value)
        } catch (error) {
            console.log(error)
        }
    }
    const showById = async () => {
        try {
            const res = await fetch(`http://localhost:4001/user/show/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${user['token']}`
                }
            })
            const response = await res.json()
            console.log(response.value)
            setEmail(response?.value[0]['email'])
            setName(response?.value[0]['name'])
            setRole(response?.value[0]['role'])
            setTitle(response?.value[0]['title_id'])
            setDivisi(response?.value[0]['divisi_id'])
        } catch (error) {
            console.log(error)
        }
    }
    const getDivisi = async () => {
        try {
            const res = await fetch('http://localhost:4001/user/divisi', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${user['token']}`
                }
            })
            const response = await res.json()
            setDivisiOpt(response?.result)
        } catch (error) {
            console.log(error)
        }
    }


    if (!user) return null

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
        setTitleOpt(event.target.value)
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }

    const updateData = async (event) => {
        event.preventDefault()
        try {
            const res = await fetch(`http://localhost:4001/user/update/${id}`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user['token']}`
                },
                body: JSON.stringify({
                    email: email,
                    name: name,
                    role: role,
                    title_id: title,
                    password: password,
                    has_role: user['role'],
                    divisi_id: divisi
                })
            })
            const response = await res.json()
            if (res.ok) {
                Swal.fire(
                    'Success',
                    `${response.message}`,
                    'success'
                )
                navigate('/user')
            } else {
                Swal.fire(
                    'Something wrong?',
                    `${response.message}`,
                    'error'
                )
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='container'>
            <h1 className='text-center'>Edit User</h1>
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
                                {roleOpt.map(item =>
                                    <option key={item.id} defaultValue={item.id}>{item.role_name}</option>
                                )}
                            </select>
                            {errRole && <span className='text-danger'>{errRole}</span>}
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="role" className='form-label'>Title</label>
                            <select
                                value={title}
                                onChange={handleTitleChange}
                                name='role'
                                className="form-select">
                                {titleOpt.map(item =>
                                    <option defaultValue={item.id} key={item.id}>{item.title_name}</option>
                                )}
                            </select>
                            {errRole && <span className='text-danger'>{errRole}</span>}
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='divisi' className='form-label'>Divisi</label>
                            <select className='form-select' name="divisi" value={divisi} onChange={(event) => setDivisi(event.target.value)}>
                                {divisiOpt.map(item =>
                                    <option defaultValue={item.id} key={item.id}>{item.divisi_name}</option>
                                )}
                            </select>
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