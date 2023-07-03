import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import { useAuthContext } from '../../../hooks/useAuthContext'
import { Modal } from "react-bootstrap";
import { getLevel } from '../../../http/HttpConsume';
import Select from 'react-select'

export const EditZone = ({ id, onDataUpdate, onPage, onLimit, onRow, onTotalpage, keyword, page, limit }) => {
    const { user } = useAuthContext()
    const [zoneId, setZoneId] = useState(0)
    const [showEdit, setShowEdit] = useState(false)
    const [editZone, setEditZone] = useState('')
    const [editTransport, setEditTransport] = useState(0)
    const [editAirplane, setEditAirplane] = useState(0)
    const [editLevel, setEditLevel] = useState('')
    const [editHotel, setEditHotel] = useState(0)
    const [editMeal, setEditMeal] = useState(0)
    const [editAllowance, setEditAllowance] = useState(0)
    const [errZone, setErrZone] = useState('')
    const [errTransport, setErrTransport] = useState('')
    const [errAirplane, setErrAirplane] = useState('')
    const [errHotel, setErrHotel] = useState('')
    const [errMealAllowance, setErrMealAllowance] = useState('')
    const [errAllowance, setErrAllowance] = useState('')
    const [level, setLevel] = useState([])

    useEffect(() => {
        getLevel(user, setLevel)
    }, [user])

    const showModalEdit = async () => {
        setShowEdit(true)
        try {
            await fetch(`http://localhost:4001/user/zone-by/${id}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user['token']}`
                }
            }).then(response => response.json())
                .then(res => {
                    console.log(res)
                    setEditZone(res.result[0]['zone_name'])
                    setEditTransport(res.result[0]['transport_non_airplane'])
                    setEditAirplane(res.result[0]['transport_airplane'])
                    setEditLevel({ value: res.result[0]['title_id'], label: res.result[0]['title_name'] })
                    setEditHotel(res.result[0]['hotel'])
                    setEditMeal(res.result[0]['meal_allowance'])
                    setEditAllowance(res.result[0]['allowance'])
                    setZoneId(res.result[0]['id'])
                })
        } catch (error) {
            console.log(error)
        }
    }
    const closeModalEdit = () => setShowEdit(false)

    const handleEditZone = (event) => {
        setEditZone(event.target.value)
        if (!event.target.value) {
            setErrZone('Zone name is require')
        } else {
            setErrZone('')
        }
    }

    const handleEditTransport = (event) => {
        const input = event.target.value.replace(/[^0-9]/g, '')
        const number = input.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
        setEditTransport(number)
        if (!event.target.value) {
            setErrTransport('Transport is required')
        } else {
            setErrTransport('')
        }
    }

    const handleEditAirplane = (event) => {
        const input = event.target.value.replace(/[^0-9]/g, '')
        const number = input.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
        setEditAirplane(number)
        if (!event.target.value) {
            setErrAirplane('Transport Airplane is required')
        } else {
            setErrAirplane('')
        }
    }

    const handleEditHotel = (event) => {
        const input = event.target.value.replace(/[^0-9]/g, '')
        const number = input.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
        setEditHotel(number)
        if (!event.target.value) {
            setErrHotel('Hotel is required')
        } else {
            setErrHotel('')
        }
    }

    const handleEditMeal = (event) => {
        const input = event.target.value.replace(/[^0-9]/g, '')
        const number = input.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
        setEditMeal(number)
        if (!event.target.value) {
            setErrMealAllowance('Meal Allowance is required')
        } else {
            setErrMealAllowance('')
        }
    }

    const handleEditAllowance = (event) => {
        const input = event.target.value.replace(/[^0-9]/g, '')
        const number = input.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
        setEditAllowance(number)
        if (!event.target.value) {
            setErrAllowance('Allowance Airplane is required')
        } else {
            setErrAirplane('')
        }
    }

    const handleUpdate = async (event) => {
        event.preventDefault()
        const data = {
            zone_name: editZone,
            title_id: editLevel['value'],
            transport_non_airplane: editAirplane.toString().split('.').join(''),
            transport_airplane: editTransport.toString().split('.').join(''),
            hotel: editHotel.toString().split('.').join(''),
            meal_allowance: editMeal.toString().split('.').join(''),
            allowance: editAllowance.toString().split('.').join('')
        }
        try {
            const res = await fetch(`http://localhost:4001/user/zone/${zoneId}`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user['token']}`
                },
                body: JSON.stringify(data)
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
                closeModalEdit(false)
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
            <button onClick={showModalEdit} className='btn btn-warning'>Edit</button>

            {/* Modal Edit */}
            <Modal backdrop='static' show={showEdit} size='lg' onHide={closeModalEdit}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Zone</Modal.Title>
                </Modal.Header>
                <form onSubmit={handleUpdate}>
                    <Modal.Body>
                        <div className="mb-3">
                            <label htmlFor='zone' className='form-label'>Zone Name</label>
                            <input className='form-control' value={editZone} onChange={handleEditZone} type="text" />
                            {errZone && <span className="text-danger">{errZone}</span>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="transport" className='form-label'>Transport</label>
                            <input type="text" className='form-control' value={editTransport} onChange={handleEditTransport} />
                            {errTransport && <span className="text-danger">{errTransport}</span>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="airplane" className='form-label'>Transport Airplane</label>
                            <input type="text" className='form-control' value={editAirplane} onChange={handleEditAirplane} />
                            {errAirplane && <span className="text-danger">{errAirplane}</span>}
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='level'>Level</label>
                            <Select options={level} value={editLevel} onChange={(selectOption) => setEditLevel(selectOption)} />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="hotel" className='form-label'>Hotel</label>
                            <input type="text" className='form-control' value={editHotel} onChange={handleEditHotel} />
                            {errHotel && <span className='text-danger'>{errHotel}</span>}
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="Meal" className='form-label'>Meal Allowance</label>
                            <input type="text" className='form-control' value={editMeal} onChange={handleEditMeal} />
                            {errMealAllowance && <span className='text-danger'>{errMealAllowance}</span>}
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="allowance" className='form-label'>Allowance</label>
                            <input type="text" className='form-control' value={editAllowance} onChange={handleEditAllowance} />
                            {errAllowance && <span className='text-danger'>{errAllowance}</span>}
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button type="submit" className="btn btn-success">
                            Update
                        </button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    )
}
