import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const api = 'http://localhost:4001/user'

const Edit = () => {

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [role, setRole] = useState('')
    const { id } = useParams()
    const navigate = useNavigate()

    const showById = async () => {
        const response = await axios.get(api + `/show/${id}`)
        setEmail(response.data.value[0].email)
        setUsername(response.data.value[0].username)
        setRole(response.data.value[0].role)
    }

    useEffect(() => {
        showById()
    }, [])

    const updateData = async (data, e) => {
        e.preventDefault()
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
            username: username,
            role: role
        })
    }

    return (
        <div className='container'>
            <h1>Edit User</h1>
            <form onSubmit={handleSubmit(updateData)}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input
                        {...register('email', { required: true })}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        name='email'
                        type="email"
                        className="form-control"
                    />
                    {errors?.email?.type === "required" && <p className='text-danger'>Field email is required.</p>}
                </div>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username </label>
                    <input
                        {...register('username', { required: true })}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        name='username'
                        type="text"
                        className="form-control" />
                    {errors?.username?.type === "required" && <p className="text-danger">Field username is required.</p>}
                </div>
                <div className='mb-3'>
                    <label htmlFor="role" className='form-label'>Role</label>
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        name='role'
                        className="form-select">
                        <option defaultValue={''}>Open this select menu</option>
                        <option value="1">Administrator</option>
                        <option value="2">User</option>
                    </select>

                </div>
                <button type="submit" className="btn btn-primary mt-3">Submit</button>
            </form>

        </div>
    )
}

export default Edit