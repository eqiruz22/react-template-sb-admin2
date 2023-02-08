import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2';

const EditTitle = () => {

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
    const { id } = useParams()
    const navigate = useNavigate('')

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
        await axios.patch(`http://localhost:4001/user/title/update/${id}`, {
            title: title,
            meal: meal,
            rent: rent,
            hardship: hardship,
            pulsa: pulsa,
            car: car
        }).then(res => {
            console.log(res.data)
            if (res.status === 200) {
                Swal.fire({
                    title: 'Success',
                    text: 'Success Update Title',
                    icon: 'success'
                }).then((result) => {
                    if (result.isConfirmed === true) {
                        navigate('/title')
                    }
                })
            }
        }).catch(error => {
            console.log(error.response)
            if (error.response.status === 401) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong, please check another field!',
                })
            }
        })
    }

    useEffect(() => {
        const getData = async () => {
            await axios.get(`http://localhost:4001/user/title/${id}`)
                .then(res => {
                    setTitle(res.data.value[0]['title_name'])
                    setMeal(res.data.value[0]['meal_allowance'])
                    setRent(res.data.value[0]['rent_house'])
                    setHardship(res.data.value[0]['hardship_allowance'])
                    setPulsa(res.data.value[0]['pulsa_allowance'])
                    setCar(res.data.value[0]['car_rent'])
                })
        }
        getData()
    }, [id])

    return (
        <div>
            <h1>Edit Title</h1>
            <div className='container container-sm'>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3 mt-3">
                        <label>Title Name</label>
                        <input className='form-control' value={title || ''} onChange={handleTitleChange} type="text" placeholder="name@example.com" />
                        {errTitle && <span className='text-danger'>{errTitle}</span>}
                    </div>
                    <div className="mb-3">
                        <label>Meal Allowance</label>
                        <input className='form-control' value={meal || ''} onChange={handleMealChange} type="text" placeholder="Rp 5xxx" />
                        {errMeal && <span className='text-danger'>{errMeal}</span>}
                    </div>
                    <div className="mb-3">
                        <label>Rent House</label>
                        <input className='form-control' value={rent || ''} onChange={handleRentChange} type="text" placeholder="Rp 5xxx" />
                        {errRent && <span className='text-danger'>{errRent}</span>}
                    </div>
                    <div className="mb-3">
                        <label>Hardship Allowance</label>
                        <input className='form-control' value={hardship || ''} onChange={handleHardshipChange} type="text" placeholder="Rp 5xxx" />
                        {errHardship && <span className='text-danger'>{errHardship}</span>}
                    </div>
                    <div className="mb-3">
                        <label>Pulsa Allowance</label>
                        <input className='form-control' value={pulsa || ''} onChange={hanldePulsaChange} type="text" placeholder="Rp 5xxx" />
                        {errPulsa && <span className='text-danger'>{errPulsa}</span>}
                    </div>
                    <div className="mb-3">
                        <label>Rent Car</label>
                        <input className='form-control' value={car || ''} onChange={handleCarChange} type="text" placeholder="Rp 5xxx" />
                        {errCar && <span className='text-danger'>{errCar}</span>}
                    </div>
                    <div>
                        <button type='submit' className='btn btn-primary'>Update</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditTitle