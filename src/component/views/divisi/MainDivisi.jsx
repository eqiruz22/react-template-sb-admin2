import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import { useAuthContext } from '../../../hooks/useAuthContext'
import Spinner from '../../layout/Spinner'
import { getDivisiData } from '../../../http/HttpConsume'
import { CreateDivisi } from './CreateDivisi'
import { EditDivisi } from './EditDivisi'
import { DeleteDivisi } from './DeleteDivisi'
const MainDivisi = () => {
    const [getDivisi, setGetDivisi] = useState([])
    const [pages, setPages] = useState(0)
    const [rows, setRows] = useState([])
    const [query, setQuery] = useState('')
    const [page, setPage] = useState(0)
    const [limit, setLimit] = useState(10)
    const [keyword, setkeyword] = useState('')
    const { user } = useAuthContext()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getDivisiData(user, keyword, page, limit, setGetDivisi, setPage, setLimit, setRows, setPages, setLoading)
    }, [user, page, keyword, limit])


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
                <h1 className="h3 mb-0 text-gray-800">Data Divisi</h1>
                <div className='d-sm-flex align-items-center mr-5'>
                    <form onSubmit={searchData}>
                        <input type="text" className="form-control" placeholder="Search for" onChange={(e) => setQuery(e.target.value)} value={query} />
                    </form>
                </div>
                <CreateDivisi keyword={keyword} page={page} limit={limit} onDataUpdate={setGetDivisi} onPage={setPage} onLimit={setLimit} onRow={setRows} onTotalpage={setPages} />
            </div>
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th scope="colSpan">#</th>
                        <th scope="colSpan">Divisi Name</th>
                        <th scope="colSpan">Divisi Manager</th>
                        <th scope="colSpan">Divisi Head</th>
                        <th scope='colSpan'>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {getDivisi.length > 0 ?
                        getDivisi.map((item, index) =>
                            <tr key={item.id}>
                                <th>{index + 1}</th>
                                <td>{item.divisi_name}</td>
                                <td>{item.divisi_manager}</td>
                                <td>{item.divisi_head}</td>
                                <td>
                                    <EditDivisi id={item.id} keyword={keyword} page={page} limit={limit} onDataUpdate={setGetDivisi} onPage={setPage} onLimit={setLimit} onRow={setRows} onTotalpage={setPages} />
                                    <DeleteDivisi id={item.id} keyword={keyword} page={page} limit={limit} onDataUpdate={setGetDivisi} onPage={setPage} onLimit={setLimit} onRow={setRows} onTotalpage={setPages} />
                                </td>
                            </tr>
                        ) : <tbody key={'no-data'}>
                            <tr>
                                <td className='text-center' colSpan='5'>Data not found</td>
                            </tr>
                        </tbody>}
                </tbody>
            </table>
            <div className='d-sm-flex align-items-center justify-content-between'>
                <p>Total Divisi : {rows}</p>
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

export default MainDivisi