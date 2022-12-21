import React, { useEffect, useState } from 'react'
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
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState([])
    const [op, setOp] = useState('')
    const navigate = useNavigate()

    const submitData = async (data, e) => {
        e.preventDefault()
        Swal.fire({
            title: 'Success',
            text: 'Success Create User',
            icon: 'success'
        }).then((result) => {
            if (result.isConfirmed === true) {
                navigate('/user')
            }
        })
        await axios.post(api + '/create', {
            email: email,
            name: name,
            password: password,
            role: op
        }).then(res => {
            console.log(res.data.message)
        }).catch(error => {
            if (error.response) {
                console.log(error.response.data)
            }
        })
    }

    const getRole = async () => {
        await axios.get(api + '/role')
            .then(result => {
                console.log(result.data.value)
                setRole(result.data.value)
            })
    }
    const handleChange = (e) => {
        const id = e.target.value
        setOp(id)
    }

    useEffect(() => {
        getRole()
    }, [])



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
                    {/* {errorEmail && <p className='text-danger'>{errorEmail}</p>} */}
                </div>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Full Name</label>
                    <input
                        {...register('name', { required: true })}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        name='name'
                        type="text"
                        className="form-control" />
                    {/* {errorUsername && <p className='text-danger'>{errorUsername}</p>} */}
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

                    {/* {errors?.password?.type === "required" && <p className="text-danger">Field password is required.</p>} */}
                </div>
                <div className='mb-3'>
                    <label htmlFor="role" className='form-label'>Role</label>
                    <select
                        multiple={false}
                        value={op}
                        className='form-select'
                        onChange={(e) => handleChange(e)}
                    >
                        <option defaultValue={''}>--Select--</option>
                        {role.map((r, index) =>
                            <option key={r.id} value={r.id}>{r.role_name}</option>
                        )}
                    </select>
                </div>
                <button type="submit" className="btn btn-primary mt-3">Submit</button>
            </form>

        </div>
    )
}

export default Create