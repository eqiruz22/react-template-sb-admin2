import React, { useEffect, useState } from "react";
import ReactPaginate from 'react-paginate'
import { useAuthContext } from "../../../hooks/useAuthContext";
import Spinner from '../../layout/Spinner'
import { getPrj } from "../../../http/HttpConsume";
import { CreatePrj } from "./CreatePrj";
import { EditPrj } from "./EditPrj";
import { DeletePrj } from "./DeletePrj";
const MainPrj = () => {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [keyword, setkeyword] = useState('')
    const [page, setPage] = useState(0)
    const [limit, setLimit] = useState(10)
    const [query, setQuery] = useState('')
    const [pages, setPages] = useState(0)
    const [rows, setRows] = useState([])
    const { user } = useAuthContext()

    useEffect(() => {
        getPrj(user, keyword, page, limit, setData, setPage, setLimit, setRows, setPages, setLoading)
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
    if (loading) return <Spinner />
    return (
        <div className='px-5'>
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Data PRJ</h1>
                <div className='d-sm-flex align-items-center mr-5'>
                    <form onSubmit={searchData}>
                        <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} className="form-control" placeholder="Search for" />
                    </form>
                </div>
                <CreatePrj keyword={keyword} page={page} limit={limit} onDataUpdate={setData} onPage={setPage} onLimit={setLimit} onRow={setRows} onTotalpage={setPages} />
            </div>
            <div className="table-responsive-sm">
                <table className='table'>
                    <thead>
                        <tr>
                            <th scope="colSpan">#</th>
                            <th scope="colSpan">PRJ</th>
                            <th scope="colSpan">Project Name</th>
                            <th scope="colSpan">Status</th>
                            <th scope='colSpan'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) =>
                            <tr key={item.id}>
                                <th scope="row">{index + 1}</th>
                                <td>{item.prj_name}</td>
                                <td>{item.project_name}</td>
                                <td>{item.status}</td>
                                <td>
                                    <EditPrj id={item.id} keyword={keyword} page={page} limit={limit} onDataUpdate={setData} onPage={setPage} onLimit={setLimit} onRow={setRows} onTotalpage={setPages} />
                                    <DeletePrj id={item.id} keyword={keyword} page={page} limit={limit} onDataUpdate={setData} onPage={setPage} onLimit={setLimit} onRow={setRows} onTotalpage={setPages} />
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
        </div>
    )
}

export default MainPrj