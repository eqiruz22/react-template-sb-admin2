import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../../../hooks/useAuthContext'
import Spinner from '../../layout/Spinner'
import ReactPaginate from 'react-paginate'
import { PerdinDivisiDetail } from './PerdinDivisiDetail'
import { UpdatePerdinDivisi } from './UpdatePerdinDivisi'

const DivisiView = () => {
    const [perdin, setPerdin] = useState([])
    const { user } = useAuthContext()
    const [loading, setLoading] = useState(true)
    const [pages, setPages] = useState(0)
    const [rows, setRows] = useState([])
    const [query, setQuery] = useState('')
    const [page, setPage] = useState(0)
    const [limit, setLimit] = useState(10)
    const [keyword, setkeyword] = useState('')

    useEffect(() => {
        if (user['role'] === 1) {
            showPerdin()
        } else {
            showPerdinByUser()
        }
    }, [user, page, keyword, limit])

    const showPerdin = async () => {
        try {
            await fetch(`http://localhost:4001/user/waiting-approve-divisi?query=${keyword}&page=${page}&limit=${limit}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${user['token']}`
                }
            }).then(response => response.json())
                .then(response => {
                    setPerdin(response.result)
                    setPage(response.page)
                    setLimit(response.limit)
                    setRows(response.row)
                    setPages(response.totalPage)
                    setLoading(false)
                })
        } catch (error) {
            console.log(error)
        }
    }

    const showPerdinByUser = async () => {
        try {
            await fetch(`http://localhost:4001/user/waiting-approve-divisi/${user['id']}?query=${keyword}&page=${page}&limit=${limit}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user['token']}`
                }
            }).then(response => response.json())
                .then(response => {
                    setPerdin(response?.result)
                    setPage(response.page)
                    setLimit(response.limit)
                    setRows(response.row)
                    setPages(response.totalPage)
                    setLoading(false)
                })
        } catch (error) {
            console.log(error)
        }
    }

    const changePage = ({ selected }) => {
        setPage(selected)
    }

    const searchData = (e) => {
        e.preventDefault()
        setPage(0)
        setkeyword(query)
    }

    let IDRCurrency = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR'
    })

    const formatDate = (dates) => {
        const date = new Date(dates)
        const format = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
        return format
    }

    if (!user) return null

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
                {perdin.length > 0 ?
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
                                    <UpdatePerdinDivisi disabled={item.status_id !== 1} id={item.id} perdin_id={item.perdin_id} keyword={keyword} page={page} limit={limit} onDataUpdate={setPerdin} onPage={setPage} onLimit={setLimit} onRow={setRows} onTotalpage={setPages} />
                                    <PerdinDivisiDetail id={item.id} />
                                </td>
                            </tr>
                        </tbody>
                    ) : <tbody>
                        <tr>
                            <td className='text-center' colSpan='8'>Data tidak tersedia</td>
                        </tr>
                    </tbody>
                }
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

export default DivisiView