import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../../../hooks/useAuthContext'
import { PDFDownloadLink } from '@react-pdf/renderer'
import ReportDaily from '../../ReportDaily'
import ReactPaginate from 'react-paginate'
import Spinner from '../../layout/Spinner'
import { getPerdinAllUser, getPerdinDailyById } from '../../../http/HttpConsume'

const MainDaily = ({ selectedUser }) => {

    const [perdin, setPerdin] = useState([])
    const [userdaily, setUserdaily] = useState([])
    const { user } = useAuthContext()
    const [pages, setPages] = useState(0)
    const [rows, setRows] = useState([])
    const [query, setQuery] = useState('')
    const [page, setPage] = useState(0)
    const [limit, setLimit] = useState(10)
    const [keyword, setkeyword] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (user['role'] === 1) {
            getPerdinAllUser(user, keyword, page, limit, setPerdin, setPage, setLimit, setRows, setPages, setLoading)
        }
    }, [page, keyword, user, limit])

    useEffect(() => {
        if (user['role'] !== 1) {
            getPerdinDailyById(user, keyword, page, limit, setUserdaily, setPage, setLimit, setRows, setPages, setLoading)
        }
    }, [page, keyword, user, limit])

    const changePage = ({ selected }) => {
        setPage(selected)
    }

    const searchData = (e) => {
        e.preventDefault()
        setPage(0)
        setkeyword(query)
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
                <Link to={`/data/create/${user['id']}`} className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i
                    className="fas fa-plus fa-sm text-white-50"></i> Create Perdin</Link>
            </div>
            <table className='table table-hover'>
                <thead>
                    <tr>
                        <th scope="colSpan">#</th>
                        <th scope="colSpan">Nama</th>
                        <th scope="colSpan">PRJ</th>
                        <th scope="colSpan">Total Cash</th>
                        <th scope='colSpan'>Status</th>
                        <th scope='colSpan'>Action</th>
                    </tr>
                </thead>
                {user['role'] === 1 && (
                    perdin.length > 0 ?
                        perdin.map((item, index) =>
                            <tbody>
                                <tr key={item.id}>
                                    <th scope='row'>{index + 1}</th>
                                    <td>{item.name}</td>
                                    <td>{item.prj_name}</td>
                                    <td>{item.total_received}</td>
                                    <td>{item.proses}</td>
                                    <td>
                                        <button disabled={item.status_id === 1 ? false : true} className='btn btn-warning'>Edit</button>
                                        <button disabled={item.status_id !== 1 ? true : false} className='btn btn-danger ml-1 mr-1'>Delete</button>
                                        {item.status_id === 3 && (
                                            <button className='btn btn-success'>
                                                <PDFDownloadLink document={<ReportDaily key={item.id} selectedUser={item} />} fileName={`perdin_${item.name}-${item.prj_name}.pdf`}>
                                                    {({ blob, url, loading, error }) =>
                                                        loading ? 'Loading' : 'Download'
                                                    }
                                                </PDFDownloadLink>
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            </tbody>
                        ) :
                        <tbody>
                            <tr>
                                <td className='text-center' colSpan='6'>Data tidak tersedia</td>
                            </tr>
                        </tbody>
                )}
                {user['role'] !== 1 && (
                    userdaily.length > 0 ?
                        userdaily.map((item, index) =>
                            <tbody>
                                <tr key={item.id}>
                                    <td>{index + 1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.prj_name}</td>
                                    <td>{item.total_received}</td>
                                    <td>{item.proses}</td>
                                    <td>
                                        <button disabled={item.status_id === 1 ? false : true} className='btn btn-warning'>Edit</button>
                                        <button disabled={item.status_id !== 1 ? true : false} className='btn btn-danger ml-1 mr-1'>Delete</button>
                                        <button className='btn btn-success'>
                                            <PDFDownloadLink document={<ReportDaily key={item.id} selectedUser={item} />} fileName={`perdin_${item.name}-${item.prj_name}.pdf`}>
                                                {({ blob, url, loading, error }) =>
                                                    loading ? 'Loading' : 'Download'
                                                }
                                            </PDFDownloadLink>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        ) : <tbody>
                            <tr>
                                <td className='text-center' colSpan='6'>Data tidak tersedia</td>
                            </tr>
                        </tbody>
                )}
            </table>
            <div className='d-sm-flex align-items-center justify-content-between'>
                <p>Total Perdin : {rows}</p>
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

export default MainDaily