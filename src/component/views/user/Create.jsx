import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Select from 'react-select'
import { useAuthContext } from '../../../hooks/useAuthContext';

const Create = () => {

    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [titles, setTitles] = useState('')
    const [role, setRole] = useState([])
    const [title, setTitle] = useState([])
    const [op, setOp] = useState('')
    const [errName, setErrName] = useState('')
    const [errEmail, setErrEmail] = useState('')
    const [errPassword, setErrPassword] = useState('')
    const [divisi, setDivisi] = useState([])
    const [divisiVal, setDivisiVal] = useState('')
    const { user } = useAuthContext()
    const navigate = useNavigate()

    useEffect(() => {
        const getTitle = async () => {
            try {
                const res = await fetch('http://localhost:4001/user/title', {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user['token']}`
                    }
                })
                const response = await res.json()
                setTitle(response.value.map(item => ({ value: item.id, label: item.title_name })))
            } catch (error) {
                console.log(error)
            }
        }
        getTitle()
    }, [user])

    useEffect(() => {
        const getRole = async () => {
            try {
                const res = await fetch('http://localhost:4001/user/role', {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user['token']}`
                    }
                })
                const response = await res.json()
                setRole(response.value.map(item => ({ value: item.id, label: item.role_name })))
            } catch (error) {
                console.log(error)
            }

        }
        getRole()
    }, [user])

    useEffect(() => {
        const getDivisi = async () => {
            try {
                const res = await fetch('http://localhost:4001/user/divisi', {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user['token']}`
                    }
                })
                const response = await res.json()
                setDivisi(response.result.map(item => ({ value: item.id, label: item.divisi_name })))
            } catch (error) {
                console.log(error)
            }

        }
        getDivisi()
    }, [user])

    if (!user) return null

    const submitData = async (event) => {
        event.preventDefault()
        const data = {
            email: email,
            name: name,
            password: password,
            role: op['value'],
            title_id: titles['value'],
            divisi_id: divisiVal['value']
        }
        try {
            const res = await fetch('http://localhost:4001/user/create', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${user['token']}`
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

    const handleRoleChange = (selectOption) => {
        setOp(selectOption)
    }

    const handleTitleChange = (selectOption) => {
        setTitles(selectOption)
    }

    const handleDivisiChange = (selectOption) => {
        setDivisiVal(selectOption)
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
                    <Select value={op} options={role} onChange={handleRoleChange} />
                </div>
                <div className='mb-3'>
                    <label htmlFor="role" className='form-label'>Title</label>
                    <Select value={titles} options={title} onChange={handleTitleChange} />
                </div>
                <div className='mb-3'>
                    <label htmlFor='divisi' className='form-label'>Divisi</label>
                    <Select value={divisiVal} options={divisi} onChange={handleDivisiChange} />
                </div>
                <button type='submit' className="btn btn-primary mt-3">Submit</button>
            </form>

        </div>
    )
}

export default Create