import React, { useState } from 'react'
import Swal from 'sweetalert2'
import { useAuthContext } from '../../../hooks/useAuthContext'
import { Modal } from 'react-bootstrap'
export const EditPrj = ({ id, onDataUpdate, onPage, onLimit, onRow, onTotalpage, keyword, page, limit }) => {
    const { user } = useAuthContext()
    const [prj, setPrj] = useState('')
    const [status, setStatus] = useState('')
    const [project, setProject] = useState('')
    const [showEdit, setShowEdit] = useState(false)
    const [errorPrj, setErrorPrj] = useState('')
    const [errorStatus, setErrorStatus] = useState('')
    const [errorProject, setErrorProject] = useState('')
    const handleEdit = async () => {
        setShowEdit(true)
        await fetch(`http://localhost:4001/user/prj/${id}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user['token']}`
            }
        }).then(response => response.json())
            .then(res => {
                setPrj(res.result[0]['prj_name'])
                setProject(res.result[0]['project_name'])
                setStatus(res.result[0]['status'])
            }).catch(error => {
                console.log(error)
            })
    }
    const handleEditClose = () => setShowEdit(false)

    const handlePrjName = (e) => {
        setPrj(e.target.value)
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

    const handleProjectName = (e) => {
        setProject(e.target.value)
        if (!e.target.value) {
            setErrorProject('Project name is required!')
        } else {
            setErrorProject('')
        }
    }

    const handleUpdatePrj = async (e) => {
        e.preventDefault()
        const data = {
            prj_name: prj,
            project_name: project,
            status: status
        }
        try {
            const res = await fetch(`http://localhost:4001/user/prj/update/${id}`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user['token']}`
                },
                body: JSON.stringify(data)
            })
            const response = await res.json()
            if (res.ok) {
                await fetch(`http://localhost:4001/user/prj?query=${keyword}&page=${page}&limit=${limit}`, {
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
                handleEditClose(false)
            } else {
                Swal.fire(
                    'Something wrong?',
                    `${response.message}`,
                    'error'
                )
            }
        } catch (error) {

        }

    }
    return (
        <>
            <button className='btn btn-warning' onClick={handleEdit}>Edit</button>
            {/* Modal Edit */}
            <Modal backdrop='static' show={showEdit} onHide={handleEditClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Edit PRJ</Modal.Title>
                </Modal.Header>
                <form onSubmit={handleUpdatePrj}>
                    <Modal.Body>
                        <div className="mb-3 mt-3">
                            <label>PRJ Name</label>
                            <input className='form-control' value={prj} onChange={handlePrjName} type="text" />
                            {errorPrj && <span className="text-danger">{errorPrj}</span>}
                        </div>
                        <div className="mb-3 mt-3">
                            <label>Project Name</label>
                            <input className='form-control' value={project} onChange={handleProjectName} type="text" />
                            {errorProject && <span className="text-danger">{errorProject}</span>}
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
        </>
    )
}
