import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import Select from 'react-select'
import { useAuthContext } from '../../../hooks/useAuthContext'
import { getAllUser } from '../../../http/HttpConsume'
import { Modal } from 'react-bootstrap'
export const CreateDivisi = ({ onDataUpdate, onPage, onLimit, onRow, onTotalpage, keyword, page, limit }) => {
    const { user } = useAuthContext()
    const [showCreate, setShowCreate] = useState(false)
    const [divisiName, setDivisiName] = useState('')
    const [divisiManager, setDivisiManager] = useState('')
    const [divisiHead, setDivisiHead] = useState('')
    const [errorName, setErrorName] = useState('')
    const [getName, setGetName] = useState([])
    const [title, setTitle] = useState([]);
    useEffect(() => {
        const fetchSuggestions = async () => {
            try {
                const res = await fetch('http://localhost:4001/user/title-name', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user['token']}`
                    }
                });
                const data = await res.json();
                console.log(data)
                setTitle(data.result.map(item => ({ value: item.id, label: item.title_name })));
            } catch (error) {
                console.log(error);
            }
        };

        fetchSuggestions();
    }, []);

    useEffect(() => {
        getAllUser(user, setGetName)
    }, [user])

    const handleClose = () => setShowCreate(false)
    const handleCreate = () => {
        setShowCreate(true)
    }

    const handleDivisiName = (event) => {
        setDivisiName(event.target.value.toUpperCase())
        if (!event.target.value) {
            setErrorName('Divisi name is required!')
        } else {
            setErrorName('')
        }
    }

    const handleDivisiManager = (selectedOption) => {
        setDivisiManager(selectedOption)
    }
    const handleDivisiHead = (selectedOption) => {
        setDivisiHead(selectedOption)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const data = {
            divisi_name: divisiName,
            divisi_manager: divisiManager['value'],
            divisi_head: divisiHead['value']
        }
        try {
            const res = await fetch('http://localhost:4001/user/divisi-create', {
                method: "POST",
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
                setDivisiName('')
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
    var options = [
        { id: 1, name: 'John' },
        { id: 2, name: 'Miles' },
        { id: 3, name: 'Charles' },
        { id: 4, name: 'Herbie' },
    ];

    return (
        <>
            <button onClick={handleCreate} className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i
                className="fas fa-plus fa-sm text-white-50"></i> Create Divisi</button>

            {/* Modal Create */}
            <Modal backdrop='static' show={showCreate} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Create Divisi</Modal.Title>
                </Modal.Header>
                <form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <div className="mb-3 mt-3">
                            <label>Divisi Name</label>
                            <input className='form-control' value={divisiName} onChange={handleDivisiName} type="text" />
                            {errorName && <span className="text-danger">{errorName}</span>}
                        </div>
                        <div className='mb-3 mt-3'>
                            <label className='form-label'>Divisi Manager</label>
                            <Select options={title} value={divisiManager} onChange={handleDivisiManager} placeholder='Choose a name..' />
                        </div>
                        <div className="mb-3 mt-3">
                            <label htmlFor="role" className='form-label'>Divisi Head</label>
                            <Select options={getName} value={divisiHead} onChange={handleDivisiHead} placeholder='Choose a name..' />
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
