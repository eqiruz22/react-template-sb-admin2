import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../../../hooks/useAuthContext';
import ReactPaginate from 'react-paginate';
import Spinner from '../../layout/Spinner'
import { getZone } from '../../../http/HttpConsume';
import CreateZone from './CreateZone';
import { EditZone } from './EditZone';
import DeleteZone from './DeleteZone';

const MainZone = () => {
    const [data, setData] = useState([])
    const { user } = useAuthContext()
    const [page, setPage] = useState(0)
    const [keyword, setKeyword] = useState('')
    const [rows, setRows] = useState([])
    const [query, setQuery] = useState('')
    const [limit, setLimit] = useState(10)
    const [pages, setPages] = useState(0)
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        getZone(user, keyword, page, limit, setData, setPage, setRows, setLimit, setPages, setLoading)
    }, [page, keyword, limit, user])

    if (!user) return null

    const changePage = ({ selected }) => {
        setPage(selected)
    }

    const searchData = (e) => {
        e.preventDefault()
        setPage(0)
        setKeyword(query)
    }

    if (loading) {
        return <Spinner />
    }

    return (
        <div className='px-5'>
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Data Zone</h1>
                <div className='d-sm-flex align-items-center mr-5'>
                    <form onSubmit={searchData}>
                        <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} className="form-control" placeholder="Search for" />
                    </form>
                </div>
                <CreateZone keyword={keyword} page={page} limit={limit} onDataUpdate={setData} onPage={setPage} onLimit={setLimit} onRow={setRows} onTotalpage={setPages} />
            </div>
            <table className='table table-hover'>
                <thead>
                    <tr>
                        <th scope="colSpan">#</th>
                        <th scope="colSpan">Zone Name</th>
                        <th scope='colSpan'>Transport</th>
                        <th scope='colSpan'>Airplane</th>
                        <th scope="colSpan">Level</th>
                        <th scope='colSpan'>Hotel</th>
                        <th scope="colSpan">Meal Allowance</th>
                        <th scope="colSpan">Allowance</th>
                        <th scope='colSpan'>Action</th>
                    </tr>
                </thead>
                {data.length > 0 ?
                    data.map((item, index) =>
                        <tbody>
                            <tr key={`tr-key-${item.id}`}>
                                <th>{index + 1}</th>
                                <td>{item.name}</td>
                                <td>{item.airplane.toLocaleString().split(',').join('.')}</td>
                                <td>{item.transport.toLocaleString().split(',').join('.')}</td>
                                <td>{item.title}</td>
                                <td>{item.hotel.toLocaleString().split(',').join('.')}</td>
                                <td>{item.meal.toLocaleString().split(',').join('.')}</td>
                                <td>{item.allowance.toLocaleString().split(',').join('.')}</td>
                                <td>
                                    <EditZone id={item.id} keyword={keyword} page={page} limit={limit} onDataUpdate={setData} onPage={setPage} onLimit={setLimit} onRow={setRows} onTotalpage={setPages} />
                                    <DeleteZone id={item.id} keyword={keyword} page={page} limit={limit} onDataUpdate={setData} onPage={setPage} onLimit={setLimit} onRow={setRows} onTotalpage={setPages} />
                                </td>
                            </tr>
                        </tbody>
                    ) : <tbody>
                        <tr>
                            <td className='text-center' colSpan='9'>Data not found</td>
                        </tr>
                    </tbody>
                }
            </table>
            <div className='d-sm-flex align-items-center justify-content-between'>
                <p>Total Zone : {rows}</p>
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

export default MainZone