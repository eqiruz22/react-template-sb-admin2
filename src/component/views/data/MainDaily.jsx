import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../../../hooks/useAuthContext'
import { PDFDownloadLink } from '@react-pdf/renderer'
import ReportDaily from '../../ReportDaily'
import ReactPaginate from 'react-paginate'
import Spinner from '../../layout/Spinner'
import { DeletePerdinDaily } from './DeletePerdinDaily'

const MainDaily = ({ selectedUser }) => {

    const [perdin, setPerdin] = useState([])
    const { user } = useAuthContext()
    const [pages, setPages] = useState(0)
    const [rows, setRows] = useState([])
    const [query, setQuery] = useState('')
    const [page, setPage] = useState(0)
    const [limit, setLimit] = useState(10)
    const [keyword, setkeyword] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getPerdinAllUser = async () => {
            try {
                const res = await fetch(`http://localhost:4001/user/perdin-show-daily?query=${keyword}&page=${page}&limit=${limit}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user['token']}`
                    }
                })
                const response = await res.json()
                console.log(response)
                if (res.ok) {
                    setPerdin(response.result)
                    setPage(response.page)
                    setLimit(response.limit)
                    setRows(response.row)
                    setPages(response.totalPage)
                    setLoading(false)
                }
            } catch (error) {
                console.log(error)
            }
        }

        const getPerdinDailyById = async () => {
            try {
                const res = await fetch(`http://localhost:4001/user/perdin-show-daily/${user['id']}?query=${keyword}&page=${page}&limit=${limit}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user['token']}`
                    }
                })
                const response = await res.json()
                if (res.ok) {
                    setPerdin(response.result)
                    setPage(response.page)
                    setLimit(response.limit)
                    setRows(response.row)
                    setPages(response.totalPage)
                    setLoading(false)
                }
            } catch (error) {
                console.log(error)
            }
        }
        if (user['role'] === 1) {
            getPerdinAllUser()
        } else {
            getPerdinDailyById()
        }
    }, [page, keyword, user, limit])

    if (!user) return null

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
                <h1 className="h3 mb-0 text-gray-800">Data Perdin</h1>
                <div className='d-sm-flex align-items-center mr-5'>
                    <form onSubmit={searchData}>
                        <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} className="form-control" placeholder="Search for" />
                    </form>
                </div>
                {user['role'] === 1 ? (
                    <div>
                        <Link to={`/data/create/daily`} className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i
                            className="fas fa-plus fa-sm text-white-50"></i> Create Perdin</Link>
                    </div>
                ) : (
                    <div>
                        <Link to={`/data/create/${user['id']}`} className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i
                            className="fas fa-plus fa-sm text-white-50"></i> Create Perdin</Link>
                    </div>
                )}
            </div>
            <table className='table table-hover'>
                <thead>
                    <tr>
                        <th scope="colSpan">#</th>
                        <th scope="colSpan">Nama</th>
                        <th scope="colSpan">PRJ</th>
                        <th scope='colSpan'>Divisi</th>
                        <th scope="colSpan">Total Cash</th>
                        <th scope='colSpan'>Status</th>
                        <th scope='colSpan'>Action</th>
                    </tr>
                </thead>
                {perdin?.length > 0 ?
                    perdin?.map((item, index) =>
                        <tbody key={`tbody-${item.id}-${index}`}>
                            <tr key={`tr-${item.id}-${index}`}>
                                <th scope='row'>{index + 1}</th>
                                <td>{item.name}</td>
                                <td>{item.prj_name}</td>
                                <td>{item.divisi_name}</td>
                                <td>Rp {item.jumlah_advance.toLocaleString().split(',').join('.')}</td>
                                <td>
                                    {item.status_id === 1 ? (
                                        <div>{item.proses}</div>
                                    ) : (
                                        <div>
                                            {(item.approved_divisi !== 'waiting approval' || item.approved_hc !== 'waiting approval') ? (
                                                <div>
                                                    {item.proses}
                                                    {item.approved_hc !== 'waiting approval' ? item.approved_hc : item.approved_divisi}
                                                </div>
                                            ) : (
                                                <div>{item.proses}</div>
                                            )}
                                        </div>
                                    )}
                                </td>
                                <td>
                                    {item.status_id === 1 ? (
                                        <Link to={`/data/edit/${item.id}`}>
                                            <button className='btn btn-warning'>Edit</button>
                                        </Link>

                                    ) :
                                        <>
                                            <button className='btn btn-warning' disabled={true}>Edit</button>
                                        </>
                                    }

                                    <DeletePerdinDaily disabled={item.status_id !== 1 ? true : false} id={item.id} keyword={keyword} page={page} limit={limit} onDataUpdate={setPerdin} onPage={setPage} onLimit={setLimit} onRow={setRows} onTotalpage={setPages} />
                                    {item.status_id === 2 && item.approved_hc !== 'waiting approval' && (
                                        <button className='btn btn-success'>
                                            <PDFDownloadLink key={`pdf-link-${item.id}-${index}`} document={<ReportDaily selectedUser={item} />} fileName={`perdin_${item.name}-${item.prj_name}.pdf`}>
                                                {({ blob, url, loading, error }) =>
                                                    loading ? (<span className='d-none d-sm-inline-block' style={{ color: 'white' }}>
                                                        Loading
                                                    </span>) : (<span className='d-none d-sm-inline-block' style={{ color: 'white' }}>
                                                        Download
                                                    </span>)
                                                }
                                            </PDFDownloadLink>
                                        </button>
                                    )}
                                </td>
                            </tr>
                        </tbody>
                    ) :
                    <tbody key={'no-data'}>
                        <tr>
                            <td className='text-center' colSpan='7'>Data not found</td>
                        </tr>
                    </tbody>
                }
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