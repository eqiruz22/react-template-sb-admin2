import React, { useState, useEffect } from 'react'
import { useAuthContext } from '../../../hooks/useAuthContext'
import { Modal } from 'react-bootstrap'
import Select from 'react-select'
import Swal from 'sweetalert2'
import { getAllUser } from '../../../http/HttpConsume'
export const EditDivisi = ({ id, onDataUpdate, onPage, onLimit, onRow, onTotalpage, keyword, page, limit }) => {
    const [showEdit, setShowEdit] = useState(false)
    const { user } = useAuthContext()
    const [editName, setEditName] = useState('')
    const [editHead, setEditHead] = useState('')
    const [editManager, setEditManager] = useState('')
    const [getName, setGetName] = useState([])

    useEffect(() => {
        getAllUser(user, setGetName)
    }, [user])
    const handleClose = () => setShowEdit(false)
    const handleEdit = async () => {
        setShowEdit(true)
        try {
            await fetch(`http://localhost:4001/user/divisi/${id}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user['token']}`
                }
            }).then(response => response.json())
                .then(res => {
                    console.log(res)
                    setEditName(res.result[0]['divisi_name'])
                    setEditManager({ value: res.result[0]['manager_id'], label: res.result[0]['divisi_manager'] })
                    setEditHead({ value: res.result[0]['head_id'], label: res.result[0]['divisi_of_head'] })
                })
        } catch (error) {
            console.log(error)
        }
    }

    const handleEditName = (event) => {
        setEditName(event.target.value)
    }

    const handleUpdate = async (event) => {
        event.preventDefault()
        const data = {
            divisi_name: editName,
            divisi_manager: editManager['value'],
            divisi_head: editHead['value']
        }
        try {
            const res = await fetch(`http://localhost:4001/user/divisi/${id}`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user['token']}`
                },
                body: JSON.stringify(data)
            })
            const response = await res.json()
            if (res.ok) {
                await fetch(`http://localhost:4001/user/divisi-head?query=${keyword}&page=${page}&limit=${limit}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${user['token']}`
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
                setEditName('')
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

    const handleEditManager = (selectedOption) => {
        setEditManager(selectedOption)
    }

    const handleEditHead = (selectedOption) => {
        setEditHead(selectedOption)
    }
    return (
        <>
            <button className='btn btn-warning' onClick={handleEdit}>Edit</button>
            {/* Modal Edit */}
            <Modal backdrop='static' show={showEdit} onHide={handleClose} centered>
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
        </>
    )
}
