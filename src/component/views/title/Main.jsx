import React, { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import Swal from 'sweetalert2'
import axios from 'axios'
import Spinner from '../../layout/Spinner'
import ReactPaginate from 'react-paginate'
import { useAuthContext } from '../../../hooks/useAuthContext'
import { showTitle } from '../../../http/HttpConsume'
import { Modal } from "react-bootstrap";
const Main = () => {

    const [title, setTitle] = useState([])
    const [loading, setLoading] = useState(true)
    const [keyword, setkeyword] = useState('')
    const [page, setPage] = useState(0)
    const [limit, setLimit] = useState(10)
    const [query, setQuery] = useState('')
    const [row, setRow] = useState([])
    const { user } = useAuthContext()
    const [show, setShow] = useState(false)
    const [titleName, setTitleName] = useState('')
    const [error, setError] = useState('')
    const [titleVal, setTitleVal] = useState('')
    const [errorEdit, setErrorEdit] = useState('')
    const [idTitle, setIdTitle] = useState('')
    useEffect(() => {
        showTitle(user, keyword, page, limit, setTitle, setLoading, setLimit, setRow)
    }, [user, limit, keyword, page])

    const handleOpen = () => setShow(true)
    const handleClose = () => setShow(false)
    const handleCloseEdit = () => setShow(false)
    const handleEdit = async (id) => {
        setShow(true)
        try {
            await fetch(`http://localhost:4001/user/title/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user['token']}`
                }
            }).then(response => response.json())
                .then(response => {
                    console.log(response)
                    setIdTitle(response.value[0]['id'])
                    setTitleVal(response.value[0]['title_name'])
                })
        } catch (error) {
            console.log(error)
        }
    }

    const deleteTitle = async (id) => {
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
                showTitle(user, keyword, page, limit, setTitle, setLoading, setLimit, setRow)
            }
        })
        await axios.delete(`http://localhost:4001/user/title/${id}`)
    }


    const changePage = ({ selected }) => {
        setPage(selected)
    }

    const search = (e) => {
        e.preventDefault()
        setPage(0)
        setkeyword(query)
    }

    const handleChangeTitle = (event) => {
        setTitleName(event.target.value)
        if (!event.target.value) {
            setError('Title name is required!')
        } else {
            setError('')
        }
    }

    const handleEditTitle = (event) => {
        setTitleVal(event.target.value)
        if (!event.target.value) {
            setErrorEdit('Title name is required!')
        } else {
            setErrorEdit('')
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            await fetch('http://localhost:4001/user/title', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user['token']}`
                },
                body: JSON.stringify({
                    title_name: titleName
                })
            }).then(response => response.json())
                .then(response => {
                    console.log(response)
                    Swal.fire(
                        'Success!',
                        'New title has been created.',
                        'success'
                    )
                    setShow(false)
                    setTitleName('')
                    showTitle(user, keyword, page, limit, setTitle, setLoading, setLimit, setRow)
                })
        } catch (error) {
            console.log(error)
        }
    }

    const handleUpdate = async (event) => {
        event.preventDefault()
        try {
            await fetch(`http://localhost:4001/user/title/${idTitle}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user['token']}`
                },
                body: JSON.stringify({
                    title_name: titleVal
                })
            }).then(response => response.json())
                .then(response => {
                    console.log(response)
                    Swal.fire(
                        'Success!',
                        'Update success.',
                        'success'
                    )
                    setShow(false)
                    showTitle(user, keyword, page, limit, setTitle, setLoading, setLimit, setRow)
                })
        } catch (error) {
            console.log(error)
        }
    }

    if (loading) {
        return <Spinner />
    }

    return (
        <div className='px-5'>
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Title</h1>
                <div className='d-sm-flex align-items-center mr-5'>
                    <form onSubmit={search}>
                        <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} className="form-control" placeholder="Search for" />
                    </form>
                </div>
                <Button onClick={handleOpen} className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i
                    className="fas fa-plus fa-sm text-white-50"></i> Create Title</Button>
            </div>

            <Table className='table table-striped'>
                <thead>
                    <tr>
                        <th scope="colSpan">#</th>
                        <th scope="colSpan">Title</th>
                        <th scope='colSpan'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {title.map((item, index) =>
                        <tr key={item.id}>
                            <th scope="row">{index + 1}</th>
                            <td>{item.title_name}</td>
                            <td>
                                <Button className='btn btn-warning' onClick={() => handleEdit(item.id)}>Edit</Button>
                                <Button className='btn btn-danger ml-1' onClick={() => deleteTitle(item.id)}>Delete</Button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
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
            {/* Modal Create */}
            <Modal backdrop='static' show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Create Title</Modal.Title>
                </Modal.Header>
                <form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <div className="mb-3 mt-3">
                            <label>Title Name</label>
                            <input className='form-control' value={titleName} onChange={handleChangeTitle} type="text" />
                            {error && <span className='text-danger'>{error}</span>}
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
            <Modal backdrop='static' show={show} onHide={handleCloseEdit} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Title</Modal.Title>
                </Modal.Header>
                <form onSubmit={handleUpdate}>
                    <Modal.Body>
                        <div className="mb-3 mt-3">
                            <label>Title Name</label>
                            <input className='form-control' value={titleVal} onChange={handleEditTitle} type="text" />
                            {errorEdit && <span className='text-danger'>{errorEdit}</span>}
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

export default Main