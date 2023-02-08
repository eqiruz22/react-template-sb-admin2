import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAuthContext } from '../../../hooks/useAuthContext'
import Select from 'react-select'

const CreateDataById = () => {
    const [title, setTitle] = useState('')
    const [name, setName] = useState('')
    const [hardship, setHardship] = useState(0)
    const [meal, setMeal] = useState(0)
    const [pulsa, setPulsa] = useState(0)
    const [rent, setRent] = useState(0)
    const [car, setCar] = useState(0)
    const [prjval, setPrjval] = useState('')
    const [approval, setApproval] = useState('')
    const [hotel, setHotel] = useState(0)
    const [travel, setTravel] = useState('')
    const [start, setStart] = useState(null)
    const [end, setEnd] = useState(null)
    const [purposes, setPurposes] = useState('')
    const [transportation, setTransportation] = useState(0)
    const [local, setLocal] = useState(0)
    const [airfare, setAirfare] = useState(0)
    const [airport, setAirport] = useState(0)
    const [entertainment, setEntertainment] = useState(0)
    const [fee, setFee] = useState(0)
    const [tools, setTools] = useState(0)
    const [other, setOther] = useState(0)
    const [manager, setManager] = useState([])
    const [prj, setPrj] = useState([])
    const { id } = useParams()
    const [first, setFirst] = useState('')
    const [second, setSecond] = useState('')
    const [errHotel, setErrHotel] = useState('')
    const [errPurposes, setErrPurposes] = useState('')
    const [errStart, setErrStart] = useState('')
    const [errEnd, setErrEnd] = useState('')
    const [errTravel, setErrTravel] = useState('')
    const [errPrj, setErrPrj] = useState('')
    const [errApproval, setErrApproval] = useState('')
    const { user } = useAuthContext()
    useEffect(() => {
        getManager()
    }, [])

    useEffect(() => {
        getPrj()
    }, [])

    useEffect(() => {
        getById()
    }, [])

    const getById = async () => {
        try {
            await axios.get(`http://localhost:4001/user/show/title-user/${id}`)
                .then(res => {
                    console.log(res.data)
                    setName(res.data.name)
                    setHardship(res.data.meal_allowance)
                    setMeal(res.data.hardship_allowance)
                    setPulsa(res.data.pulsa_allowance)
                    setRent(res.data.rent_house)
                    setCar(res.data.car_rent)
                    setTitle(res.data.title_name)
                })
        } catch (error) {
            console.log(error)
        }
    }

    const getManager = async () => {
        try {
            await axios.get('http://localhost:4001/user/show-manager')
                .then(res => {
                    const opt = res.data.result.map(item => ({ value: item.name, label: item.name }))
                    console.log(opt)
                    setManager(opt)
                })
        } catch (error) {
            console.log(error)
        }
    }

    const getPrj = async () => {
        try {
            await axios.get('http://localhost:4001/user/prj')
                .then(res => {
                    const opt = res.data.result.map(item => ({ value: item.id, label: item.prj_name }))

                    setPrj(opt)
                })
        } catch (error) {
            console.log(error)
        }
    }

    const handleChangeHotel = (e) => {
        setHotel(e.target.value)
        if (!e.target.value) {
            setErrHotel('this field is required')
        } else {
            setErrHotel('')
        }
    }

    const handleChangeRent = (e) => {
        setRent(e.target.value)
    }

    const handleChangeName = (e) => {
        setName(e.target.value)
    }

    const handleChangeTitle = (e) => {
        setTitle(e.target.value)
    }

    const handleChangePrj = (selectedOption) => {
        setPrjval(selectedOption)
        // console.log(selectedOption.value)
    }

    const handleChangeApproval = (selectedOption) => {
        setApproval(selectedOption)
    }

    const handleChangeTravel = (e) => {
        setTravel(e.target.value)
        if (!e.target.value) {
            setErrTravel('this field is required')
        } else {
            setErrTravel('')
        }
    }

    const handleChangeStart = (e) => {
        const select = e.target.value
        if (select <= end || !end) {
            setStart(select)
            setErrStart('')
        } else {
            setErrStart('start date cannot be more than end date')
        }
    }

    const handleChangeEnd = (e) => {
        const select = e.target.value
        if (select >= start) {
            setEnd(select)
            setErrEnd('')
        } else {
            setErrEnd('end date cannot be less than start date')
        }
    }

    const handleChangePurposes = (e) => {
        setPurposes(e.target.value)
        if (!e.target.value) {
            setErrPurposes('this field is required')
        } else {
            setErrPurposes('')
        }
    }

    const handleChangeMeal = (e) => {
        setMeal(e.target.value)
    }

    const handleChangeHardship = (e) => {
        setHardship(e.target.value)
    }

    const handleChangePulsa = (e) => {
        setPulsa(e.target.value)
    }

    const handleChangeTransportation = (e) => {
        setTransportation(e.target.value)
    }

    const handleChangeLocal = (e) => {
        setLocal(e.target.value)
    }

    const handleChangeAirfare = (e) => {
        setAirfare(e.target.value)
    }

    const handleChangeAirport = (e) => {
        setAirport(e.target.value)
    }

    const handleChangeCar = (e) => {
        setCar(e.target.value)
    }

    const handleChangeEntertainment = (e) => {
        setEntertainment(e.target.value)
    }

    const handleChangeFee = (e) => {
        setFee(e.target.value)
    }

    const handleChangeTools = (e) => {
        setTools(e.target.value)
    }

    const handleChangeOther = (e) => {
        setOther(e.target.value)
    }

    const date1 = new Date(start)
    const date2 = new Date(end)
    const dtime = date2.getTime() - date1.getTime()
    const diff = dtime / (1000 * 60 * 60 * 24)
    const days = Math.max(diff, 0)

    var total = 0

    if (days === 0) {
        total = parseFloat(meal) + parseFloat(car) + parseFloat(pulsa) + parseFloat(rent) + parseFloat(hardship) + parseFloat(hotel) + parseFloat(transportation) + parseFloat(local) + parseFloat(airfare) + parseFloat(airport) + parseFloat(entertainment) + parseFloat(tools) + parseFloat(other)
    } else {
        total = parseFloat(meal * days) + parseFloat(car * days) + parseFloat(pulsa * days) + parseFloat(rent * days) + parseFloat(hardship * days) + parseFloat(hotel) + parseFloat(transportation) + parseFloat(local) + parseFloat(airfare) + parseFloat(airport) + parseFloat(entertainment) + parseFloat(tools) + parseFloat(other)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        await axios.post('http://10.80.7.94:4001/user/perdin-daily', {
            prj_id: prjval['value'],
            user_id: user['id'],
            title_name: title,
            delegate_approval: approval['value'],
            official_travel_site: travel,
            purposes: purposes,
            hotel: hotel,
            rent_house: rent,
            meal_allowance: meal,
            hardship_allowance: hardship,
            pulsa_allowance: pulsa,
            car_rent: car,
            transport: transportation,
            local_transport: local,
            airfare: airfare,
            airport_tax: airport,
            entertainment: entertainment,
            start_date: start,
            end_date: end,
            days: days,
            fee_support: fee,
            tools: tools,
            others: other,
            total_received: total
        }).then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <div>
            <div className='container container-fluid'>
                <form onSubmit={handleSubmit} className='row g-3'>
                    <div className="col-md-3">
                        <label htmlFor="title" className="form-label">Name</label>
                        <input type="text" value={name} className='form-control' onChange={handleChangeName} />
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" value={title} className='form-control' onChange={handleChangeTitle} />
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="prj" className="form-label">PRJ</label>
                        <Select value={prjval} onChange={handleChangePrj} options={prj} />
                        {errPrj && <span className='text-danger'>{errPrj}</span>}
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="prj" className="form-label">Delegate Approval</label>
                        <Select onChange={handleChangeApproval} options={manager} />
                        {errApproval && <span className='text-danger'>{errApproval}</span>}
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="official" className="form-label">Official Travel Site</label>
                        <input type="text" value={travel} onChange={handleChangeTravel} className="form-control" id="official" />
                        {errTravel && <span className='text-danger'>{errTravel}</span>}
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="start_date" className="form-label">Start Date</label>
                        <input type="date" value={start} onChange={handleChangeStart} className="form-control" id="start_date" />
                        {errStart && <span className='text-danger'>{errStart}</span>}
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="end_date" className="form-label">End Date</label>
                        <input type="date" value={end} onChange={handleChangeEnd} className="form-control" id="end_date" />
                        {errEnd && <span className='text-danger'>{errEnd}</span>}
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="end_date" className="form-label">Days</label>
                        <input type="text" value={days} className="form-control" readOnly />
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="purposes" className="form-label">Purposes Business Trip</label>
                        <input type="text" value={purposes} onChange={handleChangePurposes} className="form-control" id="purposes" />
                        {errPurposes && <span className='text-danger'>{errPurposes}</span>}
                    </div>

                    <div className="col-md-3">
                        <label htmlFor="hotel" className="form-label">Hotel</label>
                        <input type="text" value={hotel} onChange={handleChangeHotel} className="form-control" id="hotel" />
                        {errHotel && <span className='text-danger'>{errHotel}</span>}
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="rented" className="form-label">Rented House</label>
                        <input type="text" value={rent} onChange={handleChangeRent} className="form-control" id="rented" />
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="meals" className="form-label">Meal Allowance</label>
                        <input type="text" value={meal} onChange={handleChangeMeal} className="form-control" id="meals" />
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="hardship" className="form-label">Hardship Allowance</label>
                        <input type="text" value={hardship} onChange={handleChangeHardship} className="form-control" id="hardship" />
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="pulse" className="form-label">Pulse Allowance</label>
                        <input type="text" value={pulsa} onChange={handleChangePulsa} className="form-control" id="pulse" />
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="transportation" className="form-label">Transportation</label>
                        <input type="text" value={transportation} onChange={handleChangeTransportation} className="form-control" id="transportation" />
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="local" className="form-label">Local Transport Area</label>
                        <input type="text" value={local} onChange={handleChangeLocal} className="form-control" id="local" />
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="travel" className="form-label">Airfare/Bus/Travel/Train</label>
                        <input type="text" value={airfare} onChange={handleChangeAirfare} className="form-control" id="travel" />
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="pulse" className="form-label">Vehicle Rent</label>
                        <input type="text" value={car} onChange={handleChangeCar} className="form-control" id="pulse" />
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="airport" className="form-label">Airport Tax</label>
                        <input type="text" value={airport} onChange={handleChangeAirport} className="form-control" id="airport" />
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="entertainment" className="form-label">Entertainment</label>
                        <input type="text" value={entertainment} onChange={handleChangeEntertainment} className="form-control" id="entertainment" />
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="support_worker" className="form-label">Fee Support Worker</label>
                        <input type="text" value={fee} onChange={handleChangeFee} className="form-control" id="support_worker" />
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="tools" className="form-label">Tools</label>
                        <input type="text" value={tools} onChange={handleChangeTools} className="form-control" id="tools" />
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="Others" className="form-label">Others</label>
                        <input type="text" value={other} onChange={handleChangeOther} className="form-control" id="Others" />
                    </div>
                    <div className='col-md-3'>
                        <label htmlFor="Others" className="form-label">Total Received</label>
                        <input type="text" value={total.toLocaleString().split(',').join('.')} className="form-control" id="Others" readOnly />
                    </div>
                    <div>
                        <button type='submit' className='btn btn-primary'>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateDataById