import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'


const CreateTitle = () => {

    const navigate = useNavigate('')
    const [title, setTitle] = useState('')
    const [meal, setMeal] = useState('')
    const [hardship, setHardship] = useState('')
    const [rent, setRent] = useState('')
    const [pulsa, setPulsa] = useState('')
    const [car, setCar] = useState('')
    const [errMeal, setErrMeal] = useState('')
    const [errHardship, setErrHardship] = useState('')
    const [errRent, setErrRent] = useState('')
    const [errPulsa, setErrPulsa] = useState('')
    const [errTitle, setErrTitle] = useState('')
    const [errCar, setErrCar] = useState('')

    const handleTitleChange = (event) => {
        setTitle(event.target.value)
        if (!event.target.value) {
            setErrTitle('Title is required')
        } else {
            setErrTitle('')
        }
    }

    const handleMealChange = (event) => {
        setMeal(event.target.value)
        if (!event.target.value) {
            setErrMeal('Meal Allowance is required')
        } else {
            setErrMeal('')
        }
    }

    const handleRentChange = (event) => {
        setRent(event.target.value)
        if (!event.target.value) {
            setErrRent('Rent House is required')
        } else {
            setErrRent('')
        }
    }

    const handleHardshipChange = (event) => {
        setHardship(event.target.value)
        if (!event.target.value) {
            setErrHardship('Hardship Allowance is required')
        } else {
            setErrHardship('')
        }
    }

    const hanldePulsaChange = (event) => {
        setPulsa(event.target.value)
        if (!event.target.value) {
            setErrPulsa('Pulsa Allowance is required')
        } else {
            setErrPulsa('')
        }
    }

    const handleCarChange = (event) => {
        setCar(event.target.value)
        if (!event.target.value) {
            setErrCar('Car Rent is required')
        } else {
            setErrCar('')
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        Swal.fire({
            title: 'Success',
            text: 'Success Create Title',
            icon: 'success'
        }).then((result) => {
            if (result.isConfirmed === true) {
                navigate('/title')
            }
        })
        await axios.post('http://localhost:4001/user/title/create', {
            title: title,
            meal: meal,
            rent: rent,
            hardship: hardship,
            pulsa: pulsa,
            car: car
        }).then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <div>
            <h1>Create Title</h1>
            <div className='container container-sm'>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3 mt-3">
                        <label>Title Name</label>
                        <input className='form-control' value={title} onChange={handleTitleChange} type="text" placeholder="name@example.com" />
                        {errTitle && <span className='text-danger'>{errTitle}</span>}
                    </div>
                    <div className="mb-3">
                        <label>Meal Allowance</label>
                        <input className='form-control' value={meal} onChange={handleMealChange} type="text" placeholder="Rp 5xxx" />
                        {errMeal && <span className='text-danger'>{errMeal}</span>}
                    </div>
                    <div className="mb-3">
                        <label>Rent House</label>
                        <input className='form-control' value={rent} onChange={handleRentChange} type="text" placeholder="Rp 5xxx" />
                        {errRent && <span className='text-danger'>{errRent}</span>}
                    </div>
                    <div className="mb-3">
                        <label>Hardship Allowance</label>
                        <input className='form-control' value={hardship} onChange={handleHardshipChange} type="text" placeholder="Rp 5xxx" />
                        {errHardship && <span className='text-danger'>{errHardship}</span>}
                    </div>
                    <div className="mb-3">
                        <label>Pulsa Allowance</label>
                        <input className='form-control' value={pulsa} onChange={hanldePulsaChange} type="text" placeholder="Rp 5xxx" />
                        {errPulsa && <span className='text-danger'>{errPulsa}</span>}
                    </div>
                    <div className="mb-3">
                        <label>Rent Car</label>
                        <input className='form-control' value={car} onChange={handleCarChange} type="text" placeholder="Rp 5xxx" />
                        {errCar && <span className='text-danger'>{errCar}</span>}
                    </div>
                    <div>
                        <button type='submit' className='btn btn-primary'>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateTitle