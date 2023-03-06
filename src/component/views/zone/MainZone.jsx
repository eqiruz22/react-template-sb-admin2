import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Modal } from "react-bootstrap";
import Select from 'react-select'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';
import { useAuthContext } from '../../../hooks/useAuthContext';
import ReactPaginate from 'react-paginate';

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
    const { user } = useAuthContext()
    const [page, setPage] = useState(0)
    const [keyword, setKeyword] = useState('')
    const [rows, setRows] = useState([])
    const [query, setQuery] = useState('')
    const [limit, setLimit] = useState(10)
    const [pages, setPages] = useState(0)
    const [showEdit, setShowEdit] = useState(false)
    const [editZone, setEditZone] = useState('')
    const [editTransport, setEditTransport] = useState(0)
    const [editAirplane, setEditAirplane] = useState(0)
    const [editLevel, setEditLevel] = useState('')
    const [editHotel, setEditHotel] = useState(0)
    const [editMeal, setEditMeal] = useState(0)
    const [editAllowance, setEditAllowance] = useState(0)
    const [editZoneId, setEditZoneId] = useState(0)

    useEffect(() => {
        getZone()
    }, [page, keyword, limit, user])

    useEffect(() => {
        getLevel()
    }, [user])

    const getZone = async () => {
        await axios.get(`http://localhost:4001/user/zone?query=${keyword}&page=${page}&limit=${limit}`, {
            headers: {
                'Authorization': `Bearer ${user['token']}`
            }
        }).then(res => {
            console.log(res)
            setData(res.data.result)
            setPage(res.data.page)
            setRows(res.data.row)
            setLimit(res.data.limit)
            setPages(res.data.totalPage)
        }).catch(error => {
            console.log(error)
        })
    }

    const getLevel = async () => {
        await axios.get('http://localhost:4001/user/title-name', {
            headers: {
                'Authorization': `Bearer ${user['token']}`
            }
        }).then(res => {
            const opt = res.data.result.map(item => ({ value: item.id, label: item.title_name }))
            setLevel(opt)
        }).catch(error => {
            console.log(error)
        })
    }

    const showModalCreate = () => {
        setShowCreate(true)
    }

    const showModalEdit = async (id) => {
        setShowEdit(true)
        await axios.get(`http://localhost:4001/user/zone-by/${id}`, {
            headers: {
                'Authorization': `Bearer ${user['token']}`
            }
        }).then(res => {
            console.log(res.data)
            setEditZone(res.data.result[0]['zone_name'])
            setEditTransport(res.data.result[0]['transport_non_airplane'])
            setEditAirplane(res.data.result[0]['transport_airplane'])
            setEditLevel({ value: res.data.result[0]['title_id'], label: res.data.result[0]['title_name'] })
            setEditHotel(res.data.result[0]['hotel'])
            setEditMeal(res.data.result[0]['meal_allowance'])
            setEditAllowance(res.data.result[0]['allowance'])
            setEditZoneId(res.data.result[0]['id'])
        }).catch(error => {
            console.log(error)
        })
    }
    const closeModalCreate = () => setShowCreate(false)
    const closeModalEdit = () => setShowEdit(false)
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
            headers: {
                'Authorization': `Bearer ${user['token']}`
            }
        }, {
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
        }).catch(err => {
            console.log(err)
        })
    }

    const changePage = ({ selected }) => {
        setPage(selected)
    }

    const searchData = (e) => {
        e.preventDefault()
        setPage(0)
        setKeyword(query)
    }

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
        await axios.patch(`http://localhost:4001/user/zone/${editZoneId}`, {
            zone_name: editZone,
            transport_airplane: editAirplane.toString().split('.').join(''),
            transport_non_airplane: editTransport.toString().split('.').join(''),
            title_id: editLevel['value'],
            hotel: editHotel.toString().split('.').join(''),
            meal_allowance: editMeal.toString().split('.').join(''),
            allowance: editAllowance.toString().split('.').join('')
        }, {
            headers: {
                'Authorization': `Bearer ${user['token']}`
            }
        }).then(res => {
            console.log(res.data)
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: `${res.data.message}`
            })
            closeModalEdit()
            getZone()
        }).catch(error => {
            console.log(error)
        })
    }

    const handleDelete = async (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Deleted!',
                    'Your data has been deleted.',
                    'success'
                )
                getZone()
            }
        })
        await axios.delete(`http://localhost:4001/user/zone/${id}`, {
            headers: {
                'Authorization': `Bearer ${user['token']}`
            }
        })
    }

    return (
        <div className='px-5'>
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Data Zone</h1>
                <div className='d-sm-flex align-items-center mr-5'>
                    <form onSubmit={searchData}>
                        <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} className="form-control" placeholder="Search for" />
                    </form>
                </div>
                <button onClick={showModalCreate} className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i
                    className="fas fa-plus fa-sm text-white-50"></i> Create Zone</button>
            </div>
            <table className='table table-hover'>
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
                {data.length > 0 ?
                    data.map((item, index) =>
                        <tbody>
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
                                    <button onClick={() => showModalEdit(item.id)} className='btn btn-warning'>Edit</button>
                                    <button onClick={() => handleDelete(item.id)} className='btn btn-danger ml-1'>Delete</button>
                                </td>
                            </tr>
                        </tbody>
                    ) : <tbody>
                        <tr>
                            <td className='text-center' colSpan='9'>Data tidak tersedia</td>
                        </tr>
                    </tbody>
                }
            </table>
            <div className='d-sm-flex align-items-center justify-content-between'>
                <p>Total Zone : {rows}</p>
                <nav aria-label="Page navigation example" key={rows}>
                    <ReactPaginate
                        previousLabel={"<<"}
                        nextLabel={">>"}
                        pageCount={pages}
                        onPageChange={changePage}
                        containerClassName={"pagination"}
                        pageLinkClassName={"page-link"}
                        previousLinkClassName={"page-link"}
                        nextLinkClassName={"page-link"}
                        activeLinkClassName={"page-item active"}
                        disabledLinkClassName={"page-item disabled"}
                    />
                </nav>
            </div>

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

            {/* Modal Create */}
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
        </div>
    )
}

export default MainZone