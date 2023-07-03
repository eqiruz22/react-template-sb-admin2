import React, { useState } from 'react'
import Swal from 'sweetalert2'
import { useAuthContext } from '../../../hooks/useAuthContext'
import { Modal } from 'react-bootstrap'

export const EditTitle = ({ id, onDataUpdate, onPage, onLimit, onRow, onTotalpage, keyword, page, limit }) => {
    const { user } = useAuthContext()
    const [edit, setEdit] = useState(false)
    const [title, setTitle] = useState('')
    const [errorEdit, setErrorEdit] = useState('')

    const handleCloseEdit = () => setEdit(false)
    const handleEdit = async () => {
        setEdit(true)
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
                    setTitle(response.value[0]['title_name'])
                })
        } catch (error) {
            console.log(error)
        }
    }

    const handleEditTitle = (event) => {
        setTitle(event.target.value)
        if (!event.target.value) {
            setErrorEdit('Title name is required!')
        } else {
            setErrorEdit('')
        }
    }

    const handleUpdate = async (event) => {
        event.preventDefault()
        try {
            const res = await fetch(`http://localhost:4001/user/title/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user['token']}`
                },
                body: JSON.stringify({
                    title_name: title
                })
            })
            const response = await res.json()
            if (res.ok) {
                await fetch(`http://localhost:4001/user/title?query=${keyword}&page=${page}&limit=${limit}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${user['token']}`
                    }
                }).then(response => response.json())
                    .then(response => {
                        onDataUpdate(response.value)
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
                handleCloseEdit(false)
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
            <button className='btn btn-warning' onClick={handleEdit}>Edit</button>
            {/* Modal Edit */}
            <Modal backdrop='static' show={edit} onHide={handleCloseEdit} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Title</Modal.Title>
                </Modal.Header>
                <form onSubmit={handleUpdate}>
                    <Modal.Body>
                        <div className="mb-3 mt-3">
                            <label>Title Name</label>
                            <input className='form-control' value={title} onChange={handleEditTitle} type="text" />
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
        </>
    )
}
