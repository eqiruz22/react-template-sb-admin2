import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { useAuthContext } from '../../../hooks/useAuthContext'
import Spinner from '../../layout/Spinner'
import { showPerdin, perdinDetails } from '../../../http/HttpConsume'
import { Modal } from 'react-bootstrap'
//import ReactPaginate from 'react-paginate'

const DivisiView = () => {
    const [perdin, setPerdin] = useState([])
    const { user } = useAuthContext()
    const [loading, setLoading] = useState(true)
    const [show, setShow] = useState(false)
    const [name, setName] = useState('')
    const [title, setTitle] = useState('')
    const [oft, setOft] = useState('')
    const [purposes, setPurposes] = useState('')
    const [hotel, setHotel] = useState(0)
    const [start, setStart] = useState('')
    const [end, setEnd] = useState('')
    const [day, setDay] = useState(0)
    const [transport, setTransport] = useState(0)
    const [local, setLocal] = useState(0)
    const [airfare, setAirfare] = useState(0)
    const [airport, setAirport] = useState(0)
    const [entertainment, setEntertainment] = useState(0)
    const [tools, setTools] = useState(0)
    const [others, setOthers] = useState(0)
    const [received, setReceived] = useState(0)
    const handleClose = () => setShow(false)
    useEffect(() => {
        showPerdin(user, setPerdin, setLoading)
    }, [user])

    const handleView = (perdin_id) => {
        setShow(true)
        perdinDetails(user, perdin_id, setName, setTitle, setOft, setPurposes, setHotel, setStart, setEnd, setDay, setTransport, setLocal, setAirfare, setAirport, setEntertainment, setTools, setOthers, setReceived)
    }

    let IDRCurrency = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR'
    })

    const updateApproval = (id, perdin_id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Approved'
        }).then((result) => {
            if (result.isConfirmed) {
                try {
                    axios.post('http://localhost:4001/user/approved-divisi', {
                        id: id,
                        perdin_id: perdin_id,
                        approved_divisi: user['id']
                    }, {
                        headers: {
                            'Authorization': `Bearer ${user['token']}`
                        }
                    }).then(res => {
                        console.log(res)
                        Swal.fire({
                            title: 'Success',
                            text: 'Approved',
                            icon: 'success'
                        })
                        showPerdin(user, setPerdin, setLoading)
                    })
                } catch (error) {
                    console.log(error)
                }
            }
        })
    }

    const formatDate = (dates) => {
        const date = new Date(dates)
        const format = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
        return format
    }

    if (loading) {
        return <Spinner />
    }

    return (
        <div className='px-5'>
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Data</h1>
                <div className='d-sm-flex align-items-center mr-5'>
                    <form>
                        <input type="text" className="form-control" placeholder="Search for" />
                    </form>
                </div>
                <div></div>
            </div>
            <table className='table table-hover'>
                <thead>
                    <tr>
                        <th scope="colSpan">#</th>
                        <th scope="colSpan">Nama</th>
                        <th scope="colSpan">PRJ</th>
                        <th scope='colSpan'>Date</th>
                        <th scope='colSpan'>Official Travel</th>
                        <th scope="colSpan">Total Cash</th>
                        <th scope='colSpan'>Status</th>
                        <th scope='colSpan'>Action</th>
                    </tr>
                </thead>
                {perdin.length > 0 ?
                    perdin.map((item, index) =>
                        <tbody>
                            <tr key={item.id}>
                                <th>{index + 1}</th>
                                <td>{item.name}</td>
                                <td>{item.prj_name}</td>
                                <td>{formatDate(item.start_date)} - {formatDate(item.end_date)}</td>
                                <td>{item.official_travel_site}</td>
                                <td>{IDRCurrency.format(item.total_received)}</td>
                                <td>{item.proses}</td>
                                <td>
                                    <button disabled={item.status_id !== 1 ? true : false} onClick={() => updateApproval(item.id, item.perdin_id)} className='btn btn-success'>Approve</button>
                                    <button className='btn btn-primary ml-1' onClick={() => handleView(item.perdin_id)}><i className='fas fa-eye'></i></button>
                                </td>
                            </tr>
                        </tbody>
                    ) : <tbody>
                        <tr>
                            <td className='text-center' colSpan='7'>Data tidak tersedia</td>
                        </tr>
                    </tbody>}
            </table>

            {/* Modal View */}
            <Modal backdrop='static' show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Detail</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        Name : {name}
                    </div>
                    <div>
                        Title : {title}
                    </div>
                    <div>
                        Official Travel Site : {oft}
                    </div>
                    <div>
                        Purposes : {purposes}
                    </div>
                    <div>
                        Hotel : Rp {hotel.toLocaleString().split(',').join('.')}
                    </div>
                    <div>
                        Start Date : {formatDate(start)}
                    </div>
                    <div>
                        End Date : {formatDate(end)}
                    </div>
                    <div>
                        Days : {day}
                    </div>
                    <div>
                        Transport : Rp {transport.toLocaleString().split(',').join('.')}
                    </div>
                    <div>
                        Local Transport : Rp {local.toLocaleString().split(',').join('.')}
                    </div>
                    <div>
                        Airplane : Rp {airfare.toLocaleString().split(',').join('.')}
                    </div>
                    <div>
                        Airport Tax : Rp {airport.toLocaleString().split(',').join('.')}
                    </div>
                    <div>
                        Entertainment : Rp {entertainment.toLocaleString().split(',').join('.')}
                    </div>
                    <div>
                        Tools : Rp {tools.toLocaleString().split(',').join('.')}
                    </div>
                    <div>
                        Others : Rp {others.toLocaleString().split(',').join('.')}
                    </div>
                    <div>
                        Total Received : Rp {received.toLocaleString().split(',').join('.')}
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default DivisiView