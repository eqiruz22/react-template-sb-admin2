import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import axios from 'axios'
import Select from 'react-select'
import Swal from 'sweetalert2'
import ReactPaginate from 'react-paginate'
import { useAuthContext } from '../../../hooks/useAuthContext'
import Spinner from '../../layout/Spinner'
import { getDivisiData, getAllUser } from '../../../http/HttpConsume'
const MainDivisi = () => {
    const [showCreate, setShowCreate] = useState(false)
    const [showEdit, setShowEdit] = useState(false)
    const [divisiName, setDivisiName] = useState('')
    const [divisiManager, setDivisiManager] = useState('')
    const [divisiHead, setDivisiHead] = useState('')
    const [getDivisi, setGetDivisi] = useState([])
    const [getName, setGetName] = useState([])
    const [editName, setEditName] = useState('')
    const [editHead, setEditHead] = useState('')
    const [editManager, setEditManager] = useState('')
    const [idDivisi, setIdDivisi] = useState('')
    const [pages, setPages] = useState(0)
    const [rows, setRows] = useState([])
    const [query, setQuery] = useState('')
    const [page, setPage] = useState(0)
    const [limit, setLimit] = useState(10)
    const [keyword, setkeyword] = useState('')
    const { user } = useAuthContext()
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        getDivisiData(user, keyword, page, limit, setGetDivisi, setPage, setLimit, setRows, setPages, setLoading)
    }, [user, page, keyword, limit])
    useEffect(() => {
        getAllUser(user, setGetName)
    }, [user])

    const handleCloseCreate = () => setShowCreate(false)
    const handleCreate = () => {
        setShowCreate(true)
    }
    const handleCloseEdit = () => setShowEdit(false)
    const handleEdit = async (id) => {
        setShowEdit(true)
        await axios.get(`http://localhost:4001/user/divisi/${id}`, {
            headers: {
                'Authorization': `Bearer ${user['token']}`
            }
        })
            .then(res => {
                console.log(res)
                setIdDivisi(res.data.result[0]['id'])
                setEditName(res.data.result[0]['divisi_name'])
                setEditManager({ value: res.data.result[0]['manager_id'], label: res.data.result[0]['divisi_manager'] })
                setEditHead({ value: res.data.result[0]['head_id'], label: res.data.result[0]['divisi_of_head'] })
            }).catch(error => {
                console.log(error)
            })
    }

    const handleDivisiName = (event) => {
        setDivisiName(event.target.value.toUpperCase())
    }

    const handleDivisiManager = (selectedOption) => {
        setDivisiManager(selectedOption)
    }

    const handleDivisiHead = (selectedOption) => {
        setDivisiHead(selectedOption)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        await axios.post('http://localhost:4001/user/divisi-create', {
            headers: {
                'Authorization': `Bearer ${user['token']}`
            }
        }, {
            divisi_name: divisiName,
            divisi_manager: divisiManager['value'],
            divisi_head: divisiHead['value']
        }).then(res => {
            setDivisiHead('')
            setDivisiName('')
            handleCloseCreate()
            Swal.fire({
                title: 'Success',
                text: `${res.data.message}`,
                icon: 'success'
            })
            getDivisiData()
        }).catch(error => {
            console.log(error)
        })
    }

    const handleEditName = (event) => {
        setEditName(event.target.value)
    }

    const handleUpdate = async (event) => {
        event.preventDefault()
        await axios.patch(`http://localhost:4001/user/divisi/${idDivisi}`, {
            headers: {
                'Authorization': `Bearer ${user['token']}`
            }
        }, {
            divisi_name: editName,
            divisi_manager: editManager['value'],
            divisi_head: editHead['value']
        }).then(res => {
            console.log(res)
            getDivisiData()
            handleCloseEdit(true)
            Swal.fire({
                title: 'Success',
                text: `${res.data.message}`,
                icon: 'success'
            })
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
                getDivisiData()
            }
        })
        await axios.delete(`http://localhost:4001/user/divisi/${id}`, {
            headers: {
                'Authorization': `Bearer ${user['token']}`
            }
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

    const handleEditManager = (selectedOption) => {
        setEditManager(selectedOption)
    }

    const handleEditHead = (selectedOption) => {
        setEditHead(selectedOption)
    }

    if (loading) {
        return <Spinner />
    }
    return (
        <div className='px-5'>
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Data Divisi</h1>
                <div className='d-sm-flex align-items-center mr-5'>
                    <form onSubmit={searchData}>
                        <input type="text" className="form-control" placeholder="Search for" onChange={(e) => setQuery(e.target.value)} value={query} />
                    </form>
                </div>
                <button onClick={handleCreate} className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i
                    className="fas fa-plus fa-sm text-white-50"></i> Create Divisi</button>
            </div>
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th scope="colSpan">#</th>
                        <th scope="colSpan">Divisi Name</th>
                        <th scope="colSpan">Divisi Manager</th>
                        <th scope="colSpan">Divisi Head</th>
                        <th scope='colSpan'>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {getDivisi.map((item, index) =>
                        <tr key={item.id}>
                            <th>{index + 1}</th>
                            <td>{item.divisi_name}</td>
                            <td>{item.divisi_manager}</td>
                            <td>{item.name}</td>
                            <td>
                                <button className='btn btn-warning' onClick={() => handleEdit(item.id)}>Edit</button>
                                <button className='btn btn-danger ml-1' onClick={() => handleDelete(item.id)}>Delete</button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <div className='d-sm-flex align-items-center justify-content-between'>
                <p>Total Divisi : {rows}</p>
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
            <Modal backdrop='static' show={showCreate} onHide={handleCloseCreate} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Create Divisi</Modal.Title>
                </Modal.Header>
                <form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <div className="mb-3 mt-3">
                            <label>Divisi Name</label>
                            <input className='form-control' value={divisiName} onChange={handleDivisiName} type="text" />
                            {/* {errorPrj && <span className="text-danger">{errorPrj}</span>} */}
                        </div>
                        <div className='mb-3 mt-3'>
                            <label className='form-label'>Divisi Manager</label>
                            <Select options={getName} value={divisiManager} onChange={handleDivisiManager} placeholder='Choose one' />
                        </div>
                        <div className="mb-3 mt-3">
                            <label htmlFor="role" className='form-label'>Divisi Head</label>
                            <Select options={getName} value={divisiHead} onChange={handleDivisiHead} placeholder='Choose one' />
                            {/* {errorStatus && <span className="text-danger">{errorStatus}</span>} */}
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
            <Modal backdrop='static' show={showEdit} onHide={handleCloseEdit} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Divisi</Modal.Title>
                </Modal.Header>
                <form onSubmit={handleUpdate}>
                    <Modal.Body>
                        <div className="mb-3 mt-3">
                            <label className='form-label'>Divisi Name</label>
                            <input className='form-control' value={editName} onChange={handleEditName} type="text" />
                        </div>
                        <div className='mb-3 mt-3'>
                            <label className='form-label'>Divisi Manager</label>
                            <Select placeholder='Choose one' options={getName} value={editManager} onChange={handleEditManager} />
                        </div>
                        <div className="mb-3 mt-3">
                            <label htmlFor="role" className='form-label'>Divisi Head</label>
                            <Select placeholder='Choose one' options={getName} value={editHead} onChange={handleEditHead} />
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

export default MainDivisi