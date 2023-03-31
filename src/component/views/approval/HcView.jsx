import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { useAuthContext } from '../../../hooks/useAuthContext'
import Spinner from '../../layout/Spinner'
import { getPerdin } from '../../../http/HttpConsume'
import ReactPaginate from 'react-paginate'

const HcView = () => {

    const [perdin, setPerdin] = useState([])
    const [loading, setLoading] = useState(true)
    const { user } = useAuthContext()
    const [pages, setPages] = useState(0)
    const [rows, setRows] = useState([])
    const [query, setQuery] = useState('')
    const [page, setPage] = useState(0)
    const [limit, setLimit] = useState(10)
    const [keyword, setkeyword] = useState('')

    let IDRCurrency = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR'
    })

    useEffect(() => {
        getPerdin(user, keyword, page, limit, setPerdin, setPage, setLimit, setRows, setPages, setLoading)
    }, [user, page, keyword, limit])

    const handleApproval = (id, perdin_id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Approved'
        }).then(async (result) => {
            if (result.isConfirmed)
                try {
                    await axios.post('http://localhost:4001/user/approved-hc', {
                        id: id,
                        perdin_id: perdin_id,
                        approved_hc: user['id'],
                        divisi: user['divisi'],
                        title: user['title']
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
                        getPerdin(user, keyword, page, limit, setPerdin, setPage, setLimit, setRows, setPages, setLoading)
                    })
                } catch (error) {
                    console.log(error.response.data)
                    if (error.response.data.message === 'you dont have permission to perform this action') {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: `${error.response.data.message}`
                        })
                    }
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
                        <th scope='colSpan'>Maksud Perjalanan</th>
                        <th scope="colSpan">Jumlah Advance</th>
                        <th scope='colSpan'>Status</th>
                        <th scope='colSpan'>Action</th>
                    </tr>
                </thead>
                {perdin.length > 0 ?
                    perdin.map((item, index) =>
                        <tbody key={`tbody-${item.id}+${index}`}>
                            <tr key={item.id}>
                                <th scope='row'>{index + 1}</th>
                                <td>{item.name}</td>
                                <td>{item.prj_name}</td>
                                <td>{formatDate(item.start_date)} - {formatDate(item.end_date)}</td>
                                <td>{item.maksud_perjalanan}</td>
                                <td>{IDRCurrency.format(item.jumlah_advance)}</td>
                                <td>{item.proses}</td>
                                <td>
                                    <button disabled={item.status_id !== 1} onClick={() => handleApproval(item.id, item.perdin_id)} className='btn btn-success'>Approve</button>
                                    <button className='btn btn-primary ml-1'><i className='fas fa-eye'></i></button>
                                </td>
                            </tr>
                        </tbody>
                    ) : <tbody>
                        <tr>
                            <td className='text-center' colSpan='8'>Data tidak tersedia</td>
                        </tr>
                    </tbody>}
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
        </div>
    )
}

export default HcView