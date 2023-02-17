import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Modal } from "react-bootstrap";
import Select from 'react-select'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';

const MainZone = () => {
    const [showCreate, setShowCreate] = useState(false)
    const [zone, setZone] = useState('')
    const [errZone, setErrZone] = useState('')
    const [transport, setTransport] = useState(0)
    const [errTransport, setErrTransport] = useState('')
    const [transportAirplane, setTransportAirplane] = useState(0)
    const [errAirplane, setErrAirplane] = useState('')
    const [level, setLevel] = useState([])
    const [levelVal, setValLevel] = useState('')
    const [hotel, setHotel] = useState(0)
    const [errHotel, setErrHotel] = useState('')
    const [mealAllowance, setMealAllowance] = useState(0)
    const [errMealAllowance, setErrMealAllowance] = useState('')
    const [allowance, setAllowance] = useState(0)
    const [errAllowance, setErrAllowance] = useState('')
    const [data, setData] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getZone()
    }, [])

    useEffect(() => {
        getLevel()
    }, [])

    const getZone = async () => {
        await axios.get('http://localhost:4001/user/zone')
            .then(res => {
                setData(res.data.result)
            }).catch(error => {
                console.log(error)
            })
    }

    const getLevel = async () => {
        await axios.get('http://localhost:4001/user/title-name')
            .then(res => {
                const opt = res.data.result.map(item => ({ value: item.id, label: item.title_name }))
                setLevel(opt)
            }).catch(error => {
                console.log(error)
            })
    }

    const showModalCreate = () => {
        setShowCreate(true)
    }
    const closeModalCreate = () => setShowCreate(false)

    const handleZoneName = (event) => {
        setZone(event.target.value)
        if (!event.target.value) {
            setErrZone('Zone name is required')
        } else {
            setErrZone('')
        }
    }

    const handleTransport = (event) => {
        const input = event.target.value.replace(/[^0-9]/g, '')
        const number = input.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
        setTransport(number)
        if (!event.target.value) {
            setErrTransport('Transport is required')
        } else {
            setErrTransport('')
        }
    }

    const handleLevel = (selectOption) => {
        setValLevel(selectOption)
    }

    const handleHotel = (event) => {
        const input = event.target.value.replace(/[^0-9]/g, '')
        const number = input.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
        setHotel(number)
        if (!event.target.value) {
            setErrHotel('Hotel is required')
        } else {
            setErrHotel('')
        }
    }

    const handleMealAllowance = (event) => {
        const input = event.target.value.replace(/[^0-9]/g, '')
        const number = input.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
        setMealAllowance(number)
        if (!event.target.value) {
            setErrMealAllowance('Meal Allowance is required')
        } else {
            setErrMealAllowance('')
        }
    }

    const handleAllowance = (event) => {
        const input = event.target.value.replace(/[^0-9]/g, '')
        const number = input.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
        setAllowance(number)
        if (!event.target.value) {
            setErrAllowance('Allowance is required')
        } else {
            setErrAllowance('')
        }
    }

    const handleAirplane = (event) => {
        const input = event.target.value.replace(/[^0-9]/g, '')
        const number = input.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
        setTransportAirplane(number)
        if (!event.target.value) {
            setErrAirplane('Transport Airplane is required')
        } else {
            setErrAirplane('')
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        await axios.post('http://localhost:4001/user/zone', {
            zone_name: zone,
            title_id: levelVal['value'],
            transport_non_airplane: transport.toString().split('.').join(''),
            transport_airplane: transport.toString().split('.').join(''),
            hotel: hotel.toString().split('.').join(''),
            meal_allowance: mealAllowance.toString().split('.').join(''),
            allowance: allowance.toString().split('.').join('')
        }).then(res => {
            setZone('')
            setTransport('')
            setTransportAirplane('')
            setValLevel('')
            setHotel('')
            setMealAllowance('')
            setAllowance('')
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: `${res.data.message}`
            })
            closeModalCreate()
            getZone()
            navigate('/zone')
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <div className='px-5'>
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Data Zone</h1>
                <div className='d-sm-flex align-items-center mr-5'>
                    <form >
                        <input type="text" className="form-control" placeholder="Search for" />
                    </form>
                </div>
                <button onClick={showModalCreate} className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i
                    className="fas fa-plus fa-sm text-white-50"></i> Create Zone</button>
            </div>
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th scope="colSpan">#</th>
                        <th scope="colSpan">Zone Name</th>
                        <th scope='colSpan'>Transport</th>
                        <th scope='colSpan'>Airplane</th>
                        <th scope="colSpan">Level</th>
                        <th scope='colSpan'>Hotel</th>
                        <th scope="colSpan">Meal Allowance</th>
                        <th scope="colSpan">Allowance</th>
                        <th scope='colSpan'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) =>
                        <tr key={item.id}>
                            <th>{index + 1}</th>
                            <td>{item.name}</td>
                            <td>{item.airplane.toLocaleString().split(',').join('.')}</td>
                            <td>{item.transport.toLocaleString().split(',').join('.')}</td>
                            <td>{item.title}</td>
                            <td>{item.hotel.toLocaleString().split(',').join('.')}</td>
                            <td>{item.meal.toLocaleString().split(',').join('.')}</td>
                            <td>{item.allowance.toLocaleString().split(',').join('.')}</td>
                            <td>
                                <button className='btn btn-warning'>Edit</button>
                                <button className='btn btn-danger ml-1'>Delete</button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Modal Create */}
            <Modal backdrop='static' show={showCreate} size='lg' onHide={closeModalCreate}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Zone</Modal.Title>
                </Modal.Header>
                <form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <div className="mb-3">
                            <label htmlFor='zone' className='form-label'>Zone Name</label>
                            <input className='form-control' value={zone} onChange={handleZoneName} type="text" />
                            {errZone && <span className="text-danger">{errZone}</span>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="transport" className='form-label'>Transport</label>
                            <input type="text" className='form-control' value={transport} onChange={handleTransport} />
                            {errTransport && <span className="text-danger">{errTransport}</span>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="airplane" className='form-label'>Transport Airplane</label>
                            <input type="text" className='form-control' value={transportAirplane} onChange={handleAirplane} />
                            {errAirplane && <span className="text-danger">{errAirplane}</span>}
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='level'>Level</label>
                            <Select options={level} value={levelVal} onChange={handleLevel} />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="hotel" className='form-label'>Hotel</label>
                            <input type="text" className='form-control' value={hotel} onChange={handleHotel} />
                            {errHotel && <span className='text-danger'>{errHotel}</span>}
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="Meal" className='form-label'>Meal Allowance</label>
                            <input type="text" className='form-control' value={mealAllowance} onChange={handleMealAllowance} />
                            {errMealAllowance && <span className='text-danger'>{errMealAllowance}</span>}
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="allowance" className='form-label'>Allowance</label>
                            <input type="text" className='form-control' value={allowance} onChange={handleAllowance} />
                            {errAllowance && <span className='text-danger'>{errAllowance}</span>}
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button type="submit" className="btn btn-success">
                            Save
                        </button>
                    </Modal.Footer>
                </form>
            </Modal>


        </div>
    )
}

export default MainZone