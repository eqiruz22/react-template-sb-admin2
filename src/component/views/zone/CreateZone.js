import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import { useAuthContext } from '../../../hooks/useAuthContext'
import { Modal } from "react-bootstrap";
import { getLevel } from '../../../http/HttpConsume';
import Select from 'react-select'
const CreateZone = ({ onDataUpdate, onPage, onLimit, onRow, onTotalpage, keyword, page, limit }) => {
    const { user } = useAuthContext()
    const [showCreate, setShowCreate] = useState(false)
    const [zone, setZone] = useState('')
    const [transport, setTransport] = useState(0)
    const [transportAirplane, setTransportAirplane] = useState(0)
    const [levelVal, setValLevel] = useState('')
    const [hotel, setHotel] = useState(0)
    const [level, setLevel] = useState([])
    const [allowance, setAllowance] = useState(0)
    const [mealAllowance, setMealAllowance] = useState(0)
    const [errZone, setErrZone] = useState('')
    const [errTransport, setErrTransport] = useState('')
    const [errAirplane, setErrAirplane] = useState('')
    const [errHotel, setErrHotel] = useState('')
    const [errMealAllowance, setErrMealAllowance] = useState('')
    const [errAllowance, setErrAllowance] = useState('')

    useEffect(() => {
        getLevel(user, setLevel)
    }, [user])

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
        try {
            const res = await fetch('http://localhost:4001/user/zone', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${user['token']}`
                },
                body: JSON.stringify({
                    zone_name: zone,
                    title_id: levelVal['value'],
                    transport_non_airplane: transport.toString().split('.').join(''),
                    transport_airplane: transportAirplane.toString().split('.').join(''),
                    hotel: hotel.toString().split('.').join(''),
                    meal_allowance: mealAllowance.toString().split('.').join(''),
                    allowance: allowance.toString().split('.').join('')
                })
            })
            const response = await res.json()
            if (res.ok) {
                await fetch(`http://localhost:4001/user/zone?query=${keyword}&page=${page}&limit=${limit}`, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user['token']}`
                    }
                }).then(response => response.json())
                    .then(response => {
                        onDataUpdate(response.result)
                        onPage(response.page)
                        onLimit(response.limit)
                        onRow(response.row)
                        onTotalpage(response.totalPage)
                    })
                Swal.fire(
                    'Success',
                    `${response.message}`,
                    'success'
                )
                setZone('')
                setTransport(0)
                setTransportAirplane(0)
                setHotel(0)
                setAllowance(0)
                setMealAllowance(0)
                closeModalCreate(false)
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
        <>
            <button onClick={showModalCreate} className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i
                className="fas fa-plus fa-sm text-white-50"></i> Create Zone</button>

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
        </>
    )
}

export default CreateZone