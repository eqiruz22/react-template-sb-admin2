import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import axios from 'axios'
import Swal from "sweetalert2";
import ReactPaginate from 'react-paginate'

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
    const [keyword, setkeyword] = useState('')
    const [page, setPage] = useState(0)
    const [limit, setLimit] = useState(10)
    const [query, setQuery] = useState('')
    const [row, setRow] = useState([])
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
    }, [page, keyword])


    const getPrj = async () => {
        await axios.get(`http://localhost:4001/user/prj?query=${keyword}&page=${page}&limit=${limit}`)
            .then(res => {
                console.log(res)
                setData(res.data.result)
                setPage(res.data.page)
                setLimit(res.data.limit)
                setRow(res.data.row)
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

    const handleUpdatePrj = async (e) => {
        e.preventDefault()
        await axios.patch(`http://localhost:4001/user/prj/update/${idPrj}`, {
            prj_name: valPrj,
            status: valStatus
        }).then(res => {
            console.log(res)
            Swal.fire({
                title: 'Success',
                text: `${res.data.message}`,
                icon: 'success'
            })
            handleEditClose()
            getPrj()
        }).catch(error => {
            console.log(error)
        })
    }

    const handleDeletePrj = async (id) => {
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
                getPrj()
            }
        })
        await axios.delete(`http://localhost:4001/user/prj/delete/${id}`)
            .then(res => {
                console.log(res)
            }).catch(error => {
                console.log(error)
            })
    }
    const changePage = ({ selected }) => {
        setPage(selected)
    }

    const searchData = (e) => {
        e.preventDefault()
        setPage(0)
        setkeyword(query)
    }

    return (
        <div className='px-5'>
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Data PRJ</h1>
                <div className='d-sm-flex align-items-center mr-5'>
                    <form onSubmit={searchData}>
                        <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} className="form-control" placeholder="Search for" />
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
                                    <button className='btn btn-danger ml-1' onClick={() => handleDeletePrj(item.id)}>Delete</button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <div className='d-sm-flex align-items-center justify-content-between'>
                    <p>Total Data : {row}</p>
                    <nav aria-label="Page navigation example" key={row}>
                        <ReactPaginate
                            previousLabel={"<<"}
                            nextLabel={">>"}
                            pageCount={page}
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
                <form onSubmit={handleUpdatePrj}>
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