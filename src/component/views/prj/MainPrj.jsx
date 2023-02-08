import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import axios from 'axios'
import Swal from "sweetalert2";

const MainPrj = () => {
    const [show, setShow] = useState(false)
    const [showEdit, setShowEdit] = useState(false)
    const [prjName, setPrjName] = useState('')
    const [status, setStatus] = useState('')
    const [errorPrj, setErrorPrj] = useState('')
    const [errorStatus, setErrorStatus] = useState('')
    const [data, setData] = useState([])
    const [valPrj, setValPrj] = useState('')
    const [valStatus, setValStatus] = useState('')
    const [idPrj, setIdPrj] = useState('')
    const handleClose = () => setShow(false)
    const handleOpen = () => setShow(true)

    const handleEdit = async (id) => {
        setShowEdit(true)
        await axios.get(`http://localhost:4001/user/prj/${id}`)
            .then(res => {
                setIdPrj(res.data.result[0]['id'])
                setValPrj(res.data.result[0]['prj_name'])
                setValStatus(res.data.result[0]['status'])
            }).catch(error => {
                console.log(error)
            })
    }
    const handleEditClose = () => setShowEdit(false)

    useEffect(() => {
        getPrj()
    }, [])


    const getPrj = async () => {
        await axios.get('http://localhost:4001/user/prj')
            .then(res => {
                console.log(res)
                setData(res.data.result)
            }).catch(error => {
                console.log(error)
            })
    }

    const handlePrjName = (e) => {
        setPrjName(e.target.value)
        if (!e.target.value) {
            setErrorPrj('Prj Name is required!')
        } else {
            setErrorPrj('')
        }
    }

    const handleStatus = (e) => {
        setStatus(e.target.value)
        if (e.target.value === '--Choose One--') {
            setErrorStatus('Status must be Open or Closed')
        } else {
            setErrorStatus('')
        }
    }

    const handleSubmitPrj = async (e) => {
        e.preventDefault()
        await axios.post('http://localhost:4001/user/prj/create', {
            prj_name: prjName,
            status: status
        }).then(res => {
            console.log(res)
            Swal.fire({
                title: 'Success',
                text: 'Success Create User',
                icon: 'success'
            })
            setPrjName('')
            setStatus('')
            handleClose()
            getPrj()
        }).catch(error => {
            console.log(error)
            if (error.response.status === 500) {
                setErrorPrj('PRJ name already created')
            }
        })

    }

    return (
        <div className='px-5'>
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Data PRJ</h1>
                <div className='d-sm-flex align-items-center mr-5'>
                    <form>
                        <input type="text" className="form-control" placeholder="Search for" />
                    </form>
                </div>
                <button onClick={handleOpen} className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i
                    className="fas fa-plus fa-sm text-white-50"></i> Create PRJ</button>
            </div>
            <div className="table-responsive-sm">
                <table className='table'>
                    <thead>
                        <tr>
                            <th scope="colSpan">#</th>
                            <th scope="colSpan">PRJ</th>
                            <th scope="colSpan">Status</th>
                            <th scope='colSpan'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) =>
                            <tr key={item.id}>
                                <th scope="row">{index + 1}</th>
                                <td>{item.prj_name}</td>
                                <td>{item.status}</td>
                                <td>
                                    <button className='btn btn-warning' onClick={() => handleEdit(item.id)}>Edit</button>
                                    <button className='btn btn-danger ml-1'>Delete</button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal Create */}
            <Modal backdrop='static' show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Create PRJ</Modal.Title>
                </Modal.Header>
                <form onSubmit={handleSubmitPrj}>
                    <Modal.Body>
                        <div className="mb-3 mt-3">
                            <label>PRJ Name</label>
                            <input className='form-control' value={prjName} onChange={handlePrjName} type="text" />
                            {errorPrj && <span className="text-danger">{errorPrj}</span>}
                        </div>
                        <div className="mb-3 mt-3">
                            <label htmlFor="role" className='form-label'>Status</label>
                            <select
                                multiple={false}
                                value={status}
                                className='form-select'
                                onChange={handleStatus}
                            >
                                <option defaultValue={''}>--Choose One--</option>
                                <option value={'Open'}>Open</option>
                                <option value={'Closed'}>Closed</option>
                            </select>
                            {errorStatus && <span className="text-danger">{errorStatus}</span>}
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button type="submit" className="btn btn-success">
                            Save
                        </button>
                    </Modal.Footer>
                </form>
            </Modal>

            {/* Modal Edit */}
            <Modal backdrop='static' show={showEdit} onHide={handleEditClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Edit PRJ</Modal.Title>
                </Modal.Header>
                <form onSubmit={handleSubmitPrj}>
                    <Modal.Body>
                        <div className="mb-3 mt-3">
                            <label>PRJ Name</label>
                            <input className='form-control' value={valPrj} onChange={(e) => setValPrj(e.target.value)} type="text" />
                            {errorPrj && <span className="text-danger">{errorPrj}</span>}
                        </div>
                        <div className="mb-3 mt-3">
                            <label htmlFor="role" className='form-label'>Status</label>
                            <select
                                multiple={false}
                                value={valStatus}
                                className='form-select'
                                onChange={(e) => setValStatus(e.target.value)}
                            >
                                <option defaultValue={''}>--Choose One--</option>
                                <option value={'Open'}>Open</option>
                                <option value={'Closed'}>Closed</option>
                            </select>
                            {errorStatus && <span className="text-danger">{errorStatus}</span>}
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

export default MainPrj