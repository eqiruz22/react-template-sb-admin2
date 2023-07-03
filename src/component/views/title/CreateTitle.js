import React, { useState } from 'react'
import { Modal } from "react-bootstrap";
import Swal from 'sweetalert2'
import { useAuthContext } from '../../../hooks/useAuthContext';

export const CreateTitle = ({ onDataUpdate, onPage, onLimit, onRow, onTotalpage, keyword, page, limit }) => {
    const { user } = useAuthContext()
    const [show, setShow] = useState(false)
    const [titleName, setTitleName] = useState('')
    const [error, setError] = useState('')

    const handleOpen = () => setShow(true)
    const handleClose = () => setShow(false)

    const handleChangeTitle = (event) => {
        setTitleName(event.target.value)
        if (!event.target.value) {
            setError('Title name is required!')
        } else {
            setError('')
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const res = await fetch('http://localhost:4001/user/title', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user['token']}`
                },
                body: JSON.stringify({
                    title_name: titleName
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
                setTitleName('')
                handleClose(false)
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
            <button onClick={handleOpen} className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i
                className="fas fa-plus fa-sm text-white-50"></i> Create Title</button>

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
        </>
    )
}
