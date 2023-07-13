import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useAuthContext } from '../../../hooks/useAuthContext';
import Select from 'react-select'
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
                setRole({ value: response?.value[0]['role'], label: response?.value[0]['role_name'] })
                setTitle({ value: response?.value[0]['title_id'], label: response?.value[0]['title_name'] })
                setDivisi({ value: response?.value[0]['divisi_id'], label: response?.value[0]['divisi_name'] })
            } catch (error) {
                console.log(error)
            }
        }
        showById()
    }, [user, id])

    useEffect(() => {
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
                setDivisiOpt(response?.result.map(item => ({ value: item.id, label: item.divisi_name })))
            } catch (error) {
                console.log(error)
            }
        }
        getDivisi()
    }, [user])

    useEffect(() => {
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
                setRoleOpt(response?.value.map(item => ({ value: item.id, label: item.role_name })))
            } catch (error) {
                console.log(error)
            }
        }
        getRole()
    }, [user])

    useEffect(() => {
        const getTitle = async () => {
            try {
                const res = await fetch('http://localhost:4001/user/title-name', {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${user['token']}`
                    }
                })
                const response = await res.json()
                console.log(response)
                setTitleOpt(response?.result.map(item => ({ value: item.id, label: item.title_name })))
            } catch (error) {
                console.log(error)
            }
        }
        getTitle()
    }, [user])

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

    const handleRoleChange = (selectOption) => {
        setRole(selectOption)
    }

    const handleTitleChange = (selectOption) => {
        setTitle(selectOption)
    }

    const handleDivisiChange = (selectOption) => {
        setDivisi(selectOption)
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }

    const updateData = async (event) => {
        event.preventDefault()
        const data = {
            email: email,
            name: name,
            role: role['value'],
            title_id: title['value'],
            password: password,
            has_role: user['role'],
            divisi_id: divisi['value']
        }
        try {
            const res = await fetch(`http://localhost:4001/user/update/${id}`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user['token']}`
                },
                body: JSON.stringify(data)
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
                            <Select options={roleOpt} value={role} onChange={handleRoleChange} />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="role" className='form-label'>Title</label>
                            <Select options={titleOpt} value={title} onChange={handleTitleChange} />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='divisi' className='form-label'>Divisi</label>
                            <Select options={divisiOpt} value={divisi} onChange={handleDivisiChange} />
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