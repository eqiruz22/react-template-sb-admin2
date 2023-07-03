import React, { useState } from 'react'
import Swal from 'sweetalert2'
import { Modal } from 'react-bootstrap'
import { useAuthContext } from '../../../hooks/useAuthContext'
export const CreatePrj = ({ onDataUpdate, onPage, onLimit, onRow, onTotalpage, keyword, page, limit }) => {
    const { user } = useAuthContext()
    const [show, setShow] = useState(false)
    const [prjName, setPrjName] = useState('')
    const [project, setProject] = useState('')
    const [status, setStatus] = useState('')
    const [errorPrj, setErrorPrj] = useState('')
    const [errorStatus, setErrorStatus] = useState('')
    const [errorProject, setErrorProject] = useState('')
    const handleClose = () => setShow(false)
    const handleOpen = () => setShow(true)

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

    const handleProjectName = (e) => {
        setProject(e.target.value)
        if (!e.target.value) {
            setErrorProject('Project name is required!')
        } else {
            setErrorProject('')
        }
    }

    const handleSubmitPrj = async (e) => {
        e.preventDefault()
        const data = {
            prj_name: prjName,
            project_name: project,
            status: status
        }
        try {
            const res = await fetch('http://localhost:4001/user/prj/create', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${user['token']}`
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
                setPrjName('')
                setErrorProject('')
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
                className="fas fa-plus fa-sm text-white-50"></i> Create PRJ</button>

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
