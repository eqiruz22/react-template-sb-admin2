import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const api = 'http://localhost:4001/user'

const Create = () => {

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('')
    const navigate = useNavigate()

    const submitData = async (data, e) => {
        e.preventDefault()
        Swal.fire({
            title: 'Success',
            text: 'data has been created',
            icon: 'success'
        }).then((result) => {
            if (result.isConfirmed === true) {
                navigate('/user')
            }
        })
        await axios.post(api + '/insert', {
            email: email,
            username: username,
            password: password,
            role: role
        })
    }

    return (
        <div className='container'>
            <h1>Create User</h1>
            <form onSubmit={handleSubmit(submitData)}>
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
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        {...register('password', { required: true })}
                        value={password}
                        name='password'
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        className="form-control" />

                    {errors?.password?.type === "required" && <p className="text-danger">Field password is required.</p>}
                </div>
                <div className='mb-3'>
                    <label htmlFor="role" className='form-label'>Role</label>
                    <select
                        onChange={(e) => setRole(e.target.value)}
                        name='role'
                        value={role}
                        className="form-select">
                        <option defaultValue={''}>Open this select menu</option>
                        <option value="1">Administrator</option>
                        <option value="2">User</option>
                    </select>
                    {errors?.role?.type === "required" && <p className="text-danger">Field role is required.</p>}
                </div>
                <button type="submit" className="btn btn-primary mt-3">Submit</button>
            </form>

        </div>
    )
}

export default Create