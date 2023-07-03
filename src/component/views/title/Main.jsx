import React, { useEffect, useState } from 'react'
import Spinner from '../../layout/Spinner'
import ReactPaginate from 'react-paginate'
import { useAuthContext } from '../../../hooks/useAuthContext'
import { showTitle } from '../../../http/HttpConsume'
import { CreateTitle } from './CreateTitle'
import { EditTitle } from './EditTitle'
import { DeleteTitle } from './DeleteTitle'
const Main = () => {

    const [title, setTitle] = useState([])
    const [loading, setLoading] = useState(true)
    const [keyword, setkeyword] = useState('')
    const [page, setPage] = useState(0)
    const [limit, setLimit] = useState(10)
    const [query, setQuery] = useState('')
    const [pages, setPages] = useState(0)
    const [rows, setRows] = useState([])
    const { user } = useAuthContext()

    useEffect(() => {
        showTitle(user, keyword, page, limit, setTitle, setLoading, setLimit, setRows, setPage, setPages)
    }, [user, limit, keyword, page])

    if (!user) return null

    const changePage = ({ selected }) => {
        setPage(selected)
    }

    const search = (e) => {
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
                <h1 className="h3 mb-0 text-gray-800">Title</h1>
                <div className='d-sm-flex align-items-center mr-5'>
                    <form onSubmit={search}>
                        <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} className="form-control" placeholder="Search for" />
                    </form>
                </div>
                <CreateTitle keyword={keyword} page={page} limit={limit} onDataUpdate={setTitle} onPage={setPage} onLimit={setLimit} onRow={setRows} onTotalpage={setPages} />
            </div>

            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th scope="colSpan">#</th>
                        <th scope="colSpan">Title</th>
                        <th scope='colSpan'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {title.map((item, index) =>
                        <tr key={item.id}>
                            <th scope="row">{index + 1}</th>
                            <td>{item.title_name}</td>
                            <td>
                                <EditTitle id={item.id} keyword={keyword} page={page} limit={limit} onDataUpdate={setTitle} onPage={setPage} onLimit={setLimit} onRow={setRows} onTotalpage={setPages} />
                                <DeleteTitle id={item.id} keyword={keyword} page={page} limit={limit} onDataUpdate={setTitle} onPage={setPage} onLimit={setLimit} onRow={setRows} onTotalpage={setPages} />
                            </td>
                        </tr>
                    )}
                </tbody>
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

export default Main