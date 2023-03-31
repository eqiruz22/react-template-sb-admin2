import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
import ReactPaginate from 'react-paginate'
import { useAuthContext } from '../../../hooks/useAuthContext.js'
import Spinner from '../../layout/Spinner'
import { getData } from '../../../http/HttpConsume.js'

const User = ({ selectedUser }) => {

    const [users, setUsers] = useState([])
    const [pages, setPages] = useState(0)
    const [rows, setRows] = useState([])
    const [query, setQuery] = useState('')
    const [page, setPage] = useState(0)
    const [limit, setLimit] = useState(10)
    const [keyword, setkeyword] = useState('')
    const { user } = useAuthContext()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (user) {
            getData(user, keyword, page, limit, setUsers, setPage, setLimit, setRows, setPages, setLoading)
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

    const deleteUser = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`http://localhost:4001/user/delete/${id}`, {
                        headers: {
                            'Authorization': `Bearer ${user['token']}`
                        }
                    }).then(res =>
                        console.log(res),
                        Swal.fire(
                            'Deleted!',
                            'Your data has been deleted.',
                            'success'
                        ),
                        getData(user, keyword, page, limit, setUsers, setPage, setLimit, setRows, setPages, setLoading)
                    )
                } catch (error) {
                    console.log(error)
                }
            }
        })
    }

    if (loading) {
        return <Spinner />
    }

    return (
        <div className='px-5'>
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Data User</h1>
                <div className='d-sm-flex align-items-center mr-5'>
                    <form onSubmit={searchData}>
                        <input type="text" value={query} className="form-control" placeholder="Search for" onChange={(e) => setQuery(e.target.value)} />
                    </form>
                </div>
                <Link to="/user/create" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i
                    className="fas fa-plus fa-sm text-white-50"></i> Create User</Link>
            </div>
            <table className='table table-hover'>
                <thead>
                    <tr>
                        <th scope="colSpan">#</th>
                        <th scope="colSpan">Email</th>
                        <th scope="colSpan">Name</th>
                        <th scope="colSpan">Role</th>
                        <th scope="colSpan">Title</th>
                        <th scope="colSpan">Divisi</th>
                        <th scope='colSpan'>Action</th>
                    </tr>
                </thead>
                {users.length > 0 ?
                    users.map((item, index) =>
                        <tbody>
                            <tr key={item.id}>
                                <th scope="row">{index + 1}</th>
                                <td>{item.email}</td>
                                <td>{item.name}</td>
                                <td>{item.role_name}</td>
                                <td>{item.title_name}</td>
                                <td>{item.divisi_name}</td>
                                <td>
                                    <Link
                                        to={`/user/edit/${item.id}`}
                                    >
                                        <button className='btn btn-warning'>Edit</button>
                                    </Link>
                                    <button className='btn btn-danger ml-1' onClick={() => deleteUser(item.id)}>Delete</button>
                                </td>
                            </tr>
                        </tbody>
                    ) : <tbody>
                        <tr>
                            <td className='text-center' colSpan='6'>Data tidak tersedia</td>
                        </tr>
                    </tbody>}
            </table>
            <div className='d-sm-flex align-items-center justify-content-between'>
                <p>Total User : {rows}</p>
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

export default User