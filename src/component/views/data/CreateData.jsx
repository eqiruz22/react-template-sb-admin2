import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

const CreateData = () => {

    const [un, setUn] = useState([])
    const [tn, setTn] = useState([])
    const [prj, setPrj] = useState([])
    const [userM, setUserM] = useState([])
    const [car, setCar] = useState(0)
    const [hardship, setHardship] = useState(0)
    const [meal, setMeal] = useState(0)
    const [pulsa, setPulsa] = useState(0)
    const [rent, setRent] = useState(0)
    const [hotel, setHotel] = useState(0)
    const [transport, setTransport] = useState(0)
    const [localTransport, setLocalTransport] = useState(0)
    const [otherTransport, setOtherTransport] = useState(0)
    const [airport, setAirport] = useState(0)
    const [entertainment, setEntertainment] = useState(0)
    const [support, setSupport] = useState(0)
    const [tools, setTools] = useState(0)
    const [others, setOthers] = useState(0)
    const [vlPrj, setVlPrj] = useState('')
    const [delegate, setDelegate] = useState('')
    const [travel, setTravel] = useState('')
    const [purposes, setPurposes] = useState('')
    const [name, setName] = useState('')
    const [getId, setGetId] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const navigate = useNavigate()

    let IDRCurrency = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR'
    })

    useEffect(() => {
        const getUser = async () => {
            await axios.get('http://localhost:4001/user/show')
                .then(res => {
                    setUn(res.data.result)
                }).catch(error => {
                    console.log(error)
                })
        }
        getUser()
    }, [])

    useEffect(() => {
        const getTitle = async () => {
            await axios.get('http://localhost:4001/user/title')
                .then(res => {
                    setTn(res.data.value)
                }).catch(error => {
                    console.log(error)
                })
        }
        getTitle()
    }, [])


    useEffect(() => {
        const getManager = async () => {
            await axios.get('http://localhost:4001/user/show-manager')
                .then(res => {
                    setUserM(res.data.result)
                }).catch(error => {
                    console.log(error)
                })
        }
        getManager()
    }, [])


    const handleChangeTravel = (event) => {
        const data = event.target.value
        setTravel(data)
    }

    const handleChangePurpose = (event) => {
        const data = event.target.value
        setPurposes(data)
    }

    const handleChangeStartDate = (event) => {
        const data = event.target.value
        setStartDate(data)
    }

    const handleChangeEndDate = (event) => {
        const data = event.target.value
        setEndDate(data)
    }

    const handleChangeTransport = (event) => {
        const data = event.target.value
        setTransport(data)
    }

    const handleChangeLocal = (event) => {
        const data = event.target.value
        setLocalTransport(data)
    }

    const handleChangeOtherTransport = (event) => {
        const data = event.target.value
        setOtherTransport(data)
    }

    const handleChangeAirport = (event) => {
        const data = event.target.value
        setAirport(data)
    }

    const handleChangeEntertainment = (event) => {
        const data = event.target.value
        setEntertainment(data)
    }

    const handleChangeSupport = (event) => {
        const data = event.target.value
        setSupport(data)
    }

    const handleChangeTools = (event) => {
        const data = event.target.value
        setTools(data)
    }

    const handleChangeOthers = (event) => {
        const data = event.target.value
        setOthers(data)
    }

    const handleChangeDelegate = (event) => {
        const data = event.target.value
        setDelegate(data)
    }

    const handleTitleChange = async (event) => {
        const id = event.target.value
        await axios.get(`http://localhost:4001/user/title/${id}`)
            .then(res => {
                setCar(res.data.value[0]['car_rent'])
                setHardship(res.data.value[0]['hardship_allowance'])
                setMeal(res.data.value[0]['meal_allowance'])
                setPulsa(res.data.value[0]['pulsa_allowance'])
                setRent(res.data.value[0]['rent_house'])
                setGetId(id)
            }).catch(error => {
                console.log(error)
            })

    }

    useEffect(() => {
        const getPrj = async (event) => {
            await axios.get(`http://localhost:4001/user/prj`)
                .then(res => {
                    setPrj(res.data.result)
                })
                .catch(error => {
                    console.log(error)
                })
        }
        getPrj()
    }, [])

    const handlePrjChange = (event) => {
        const id = event.target.value
        setVlPrj(id)
    }

    const totals = parseFloat(meal) + parseFloat(car) + parseFloat(rent) + parseFloat(pulsa) + parseFloat(hardship) + parseFloat(hotel) + parseFloat(transport) + parseFloat(localTransport) + parseFloat(otherTransport) + parseFloat(airport) + parseFloat(entertainment) + parseFloat(support) + parseFloat(tools) + parseFloat(others)

    const handleHotelChange = (event) => {
        setHotel(event.target.value)
    }

    const handleChangeName = (event) => {
        const data = event.target.value
        setName(data)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        await axios.post('http://localhost:4001/user/perdin-create', {
            prj_id: vlPrj,
            user_id: name,
            title_id: getId,
            delegate_approval: delegate,
            official_travel_site: travel,
            purposes: purposes,
            hotel: hotel,
            transport: transport,
            local_transport: localTransport,
            airfare: otherTransport,
            airport_tax: airport,
            entertainment: entertainment,
            start_date: startDate,
            end_date: endDate,
            fee_support: support,
            tools: tools,
            others: others,
            total_received: totals
        }).then(res => {
            console.log(res)
            if (res.status === 201) {
                Swal.fire({
                    title: 'Success',
                    text: 'Success Create User',
                    icon: 'success'
                }).then((result) => {
                    if (result.isConfirmed === true) {
                        navigate('/data')
                    }
                })
            }
        }).catch(error => {
            console.log(error)
            if (error.response.status === 500) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong, please check another field!',
                })
            }
        })
    }

    return (
        <div>
            <h1>Create Data</h1>
            <div className='container container-fluid'>
                <form onSubmit={handleSubmit} className='row g-3'>
                    <div className="col-md-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <select
                            value={name}
                            onChange={handleChangeName}
                            className='form-select'>
                            <option defaultValue={''}>Choose one</option>
                            {un.map((item, index) =>
                                <option key={item.id} value={item.id}>{item.name}</option>
                            )}
                        </select>
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <select
                            className='form-select'
                            value={getId}
                            onChange={handleTitleChange}
                        >
                            <option defaultValue={''}>Choose one</option>
                            {tn.map((item, index) =>
                                <option key={item.id} value={item.id}>{item.title_name}</option>
                            )}
                        </select>
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="prj" className="form-label">PRJ</label>
                        <select
                            className='form-select'
                            value={vlPrj}
                            onChange={handlePrjChange}
                        >
                            <option defaultValue={''}>Choose one</option>
                            {prj.map((item, index) =>
                                <option key={item.id} value={item.id}>{item.prj_name}</option>
                            )}
                        </select>
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="prj" className="form-label">Delegate Approval</label>
                        <select
                            className='form-select'
                            value={delegate}
                            onChange={handleChangeDelegate}
                        >
                            <option defaultValue={''}>Choose one</option>
                            {userM.map((item, index) =>
                                <option key={item.id} value={item.email}>{item.name}</option>
                            )}
                        </select>
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="official" className="form-label">Official Travel Site</label>
                        <input type="text" value={travel} onChange={handleChangeTravel} className="form-control" id="official" />
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="start_date" className="form-label">Start Date</label>
                        <input type="date" value={startDate} onChange={handleChangeStartDate} className="form-control" id="start_date" />
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="end_date" className="form-label">End Date</label>
                        <input type="date" value={endDate} onChange={handleChangeEndDate} className="form-control" id="end_date" />
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="purposes" className="form-label">Purposes Business Trip</label>
                        <input type="text" value={purposes} onChange={handleChangePurpose} className="form-control" id="purposes" />
                    </div>

                    <div className="col-md-3">
                        <label htmlFor="hotel" className="form-label">Hotel</label>
                        <input type="text" value={hotel} onChange={handleHotelChange} className="form-control" id="hotel" />
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="rented" className="form-label">Rented House</label>
                        <input type="text" value={rent} onChange={(e) => setRent(e.target.value)} className="form-control" id="rented" />
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="meals" className="form-label">Meal Allowance</label>
                        <input type="text" value={meal} onChange={(e) => setMeal(e.target.value)} className="form-control" id="meals" />
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="hardship" className="form-label">Hardship Allowance</label>
                        <input type="text" value={hardship} onChange={(e) => setHardship(e.target.value)} className="form-control" id="hardship" />
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="pulse" className="form-label">Pulse Allowance</label>
                        <input type="text" value={pulsa} onChange={(e) => setPulsa(e.target.value)} className="form-control" id="pulse" />
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="transportation" className="form-label">Transportation</label>
                        <input type="text" value={transport} onChange={handleChangeTransport} className="form-control" id="transportation" />
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="local" className="form-label">Local Transport Area</label>
                        <input type="text" value={localTransport} onChange={handleChangeLocal} className="form-control" id="local" />
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="travel" className="form-label">Airfare/Bus/Travel/Train</label>
                        <input type="text" value={otherTransport} onChange={handleChangeOtherTransport} className="form-control" id="travel" />
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="pulse" className="form-label">Vehicle Rent</label>
                        <input type="text" value={car} onChange={(e) => setCar(e.target.value)} className="form-control" id="pulse" />
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
                        <input type="text" value={support} onChange={handleChangeSupport} className="form-control" id="support_worker" />
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="tools" className="form-label">Tools</label>
                        <input type="text" value={tools} onChange={handleChangeTools} className="form-control" id="tools" />
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="Others" className="form-label">Others</label>
                        <input type="text" value={others} onChange={handleChangeOthers} className="form-control" id="Others" />
                    </div>
                    <div className='col-md-6'>
                        <label htmlFor="Others" className="form-label">Total Received</label>
                        <input type="text" value={IDRCurrency.format(totals)} className="form-control" id="Others" readOnly />
                    </div>
                    <div>
                        <button type='submit' className='btn btn-primary'>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateData