import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { useAuthContext } from '../../../hooks/useAuthContext'
import Spinner from '../../layout/Spinner'
import { showPerdin, perdinDetails } from '../../../http/HttpConsume'
import { Modal } from 'react-bootstrap'
import { showWaitingToDivisiById } from '../../../http/HttpConsume'
import ReactPaginate from 'react-paginate'

const DivisiView = () => {
    const [perdin, setPerdin] = useState([])
    const { user } = useAuthContext()
    const [loading, setLoading] = useState(true)
    const [show, setShow] = useState(false)
    const [name, setName] = useState('')
    const [title, setTitle] = useState('')
    const handleClose = () => setShow(false)
    const [pages, setPages] = useState(0)
    const [rows, setRows] = useState([])
    const [query, setQuery] = useState('')
    const [page, setPage] = useState(0)
    const [limit, setLimit] = useState(10)
    const [keyword, setkeyword] = useState('')
    const [waiting, setWaiting] = useState([])
    const [mPerjalanan, setMPerjalanan] = useState('')
    const [tujuan, setTujuan] = useState('')
    const [lamaPerjalanan, setLamaPerjalanan] = useState(0)
    const [start, setStart] = useState('')
    const [end, setEnd] = useState('')
    const [penginapan, setPenginapan] = useState(0)
    const [meals, setMeals] = useState(0)
    const [prj, setPrj] = useState('')
    const [lain, setLain] = useState(0)
    const [rapid, setRapid] = useState(0)
    const [local, setLocal] = useState(0)
    const [transTujuan, setTransTujuan] = useState(0)
    const [advance, setAdvance] = useState(0)
    useEffect(() => {
        if (user['role'] === 1) {
            showPerdin(user, keyword, page, limit, setPage, setLimit, setRows, setPages, setPerdin, setLoading)
        }
    }, [user, page, keyword, limit])

    useEffect(() => {
        if (user['role'] !== 1) {
            showWaitingToDivisiById(user, keyword, page, limit, setWaiting, setPages, setPage, setRows, setLimit, setLoading)
        }
    }, [user, page, keyword, limit])

    const changePage = ({ selected }) => {
        setPage(selected)
    }

    const searchData = (e) => {
        e.preventDefault()
        setPage(0)
        setkeyword(query)
    }

    const handleView = (perdin_id) => {
        setShow(true)
        perdinDetails(user, perdin_id, setName, setTitle, setMPerjalanan, setTujuan, setLamaPerjalanan, setStart, setEnd, setPenginapan, setMeals, setPrj, setLain, setRapid, setLocal, setTransTujuan, setAdvance)
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
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.post('http://localhost:4001/user/approved-divisi', {
                        id: id,
                        perdin_id: perdin_id,
                        approved_divisi: user['id'],
                        divisi_check: user['id'],
                        dv_name: user['divisi']
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
                        if (user['role'] === 1) {
                            showPerdin(user, keyword, page, limit, setPage, setLimit, setRows, setPages, setPerdin, setLoading)
                        } else {
                            showWaitingToDivisiById(user, keyword, page, limit, setWaiting, setPages, setPage, setRows, setLimit, setLoading)
                        }
                    })
                } catch (error) {
                    console.log(error)
                    if (error.response.data.message === 'you dont have permission to perform this action') {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: `${error.response.data.message}`
                        })
                    }
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
                    <form onSubmit={searchData}>
                        <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} className="form-control" placeholder="Search for" />
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
                {user['role'] === 1 && (
                    perdin.length > 0 ?
                        perdin.map((item, index) =>
                            <tbody key={`tbody-${item.id}+${index}`}>
                                <tr key={`trx-${item.id}`}>
                                    <th>{index + 1}</th>
                                    <td>{item.name}</td>
                                    <td>{item.prj_name}</td>
                                    <td>{formatDate(item.start_date)} - {formatDate(item.end_date)}</td>
                                    <td>{item.maksud_perjalanan}</td>
                                    <td>{IDRCurrency.format(item.jumlah_advance)}</td>
                                    <td>{item.proses}</td>
                                    <td>
                                        <button disabled={item.status_id !== 1} onClick={() => updateApproval(item.id, item.perdin_id)} className='btn btn-success'>Approve</button>
                                        <button className='btn btn-primary ml-1' onClick={() => handleView(item.perdin_id)}><i className='fas fa-eye'></i></button>
                                    </td>
                                </tr>
                            </tbody>
                        ) : <tbody>
                            <tr>
                                <td className='text-center' colSpan='8'>Data tidak tersedia</td>
                            </tr>
                        </tbody>
                )}
                {user['role'] !== 1 && (
                    waiting?.length > 0 ?
                        waiting?.map((item, index) =>
                            <tbody key={`tb-${item.id}+${index}`}>
                                <tr key={`trk-${item.id}`}>
                                    <th>{index + 1}</th>
                                    <td>{item.name}</td>
                                    <td>{item.prj_name}</td>
                                    <td>{formatDate(item.start_date)} - {formatDate(item.end_date)}</td>
                                    <td>{item.maksud_perjalanan}</td>
                                    <td>{IDRCurrency.format(item.jumlah_advance)}</td>
                                    <td>{item.proses}</td>
                                    <td>
                                        <button disabled={item.status_id !== 1} onClick={() => updateApproval(item.id, item.perdin_id)} className='btn btn-success'>Approve</button>
                                        <button className='btn btn-primary ml-1'><i className='fas fa-eye'></i></button>
                                    </td>
                                </tr>
                            </tbody>
                        ) : <tbody>
                            <tr>
                                <td className='text-center' colSpan='8'>Data tidak tersedia</td>
                            </tr>
                        </tbody>
                )}
            </table>
            <div className='d-sm-flex align-items-center justify-content-between'>
                <p>Total Data : {rows}</p>
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

            {/* Modal View */}
            <Modal backdrop='static' show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Detail</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        PRJ : {prj}
                    </div>
                    <div>
                        Name : {name}
                    </div>
                    <div>
                        Title : {title}
                    </div>
                    <div>
                        Maksud Perjalanan : {mPerjalanan}
                    </div>
                    <div>
                        Tujuan Perjalanan : {tujuan}
                    </div>
                    <div>
                        Tanggal Berangkat : {formatDate(start)} - {formatDate(end)}
                    </div>
                    <div>
                        Lama Perjalanan : {lamaPerjalanan}
                    </div>
                    <div>
                        Transport Local : {local}
                    </div>
                    <div>
                        Transport Tujuan : {transTujuan}
                    </div>
                    <div>
                        Penginapan : {penginapan}
                    </div>
                    <div>
                        Meals : {meals}
                    </div>
                    <div>
                        Rapid Test : {rapid}
                    </div>
                    <div>
                        Lain Lain : {lain}
                    </div>
                    <div>
                        Jumlah Advance : {advance}
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default DivisiView