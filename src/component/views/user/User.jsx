import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
import ReactPaginate from 'react-paginate'
import { useAuthContext } from '../../../hooks/useAuthContext.js'

const api = 'http://localhost:4001/user'

const User = () => {

    const [users, setUsers] = useState([])
    const [pages, setPages] = useState(0)
    const [rows, setRows] = useState([])
    const [query, setQuery] = useState('')
    const [page, setPage] = useState(0)
    const [limit, setLimit] = useState(10)
    const [keyword, setkeyword] = useState('')
    const { user } = useAuthContext()

    const getData = async () => {
        await axios.get(`http://localhost:4001/user/show?query=${keyword}&page=${page}&limit=${limit}`, {
            headers: {
                'Authorization': `Bearer ${user['token']}`
            }
        }
        ).then(res => {
            setUsers(res.data.result)
            setPage(res.data.page)
            setLimit(res.data.limit)
            setRows(res.data.row)
            setPages(res.data.totalPage)
        }).catch(error => {
            alert(error.response)
        })
    }



    useEffect(() => {

        if (user) {
            getData()
        }
    }, [page, keyword, user])

    const changePage = ({ selected }) => {
        setPage(selected)
    }

    const searchData = (e) => {
        e.preventDefault()
        setPage(0)
        setkeyword(query)
    }

    const deleteUser = async (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Deleted!',
                    'Your data has been deleted.',
                    'success'
                )
                getData()
            }
        })
        await axios.delete(api + `/delete/${id}`)
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
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th scope="colSpan">#</th>
                        <th scope="colSpan">Email</th>
                        <th scope="colSpan">Name</th>
                        <th scope="colSpan">Role</th>
                        <th scope='colSpan'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((us, index) =>

                        <tr key={us.id}>
                            <th scope="row">{index + 1}</th>
                            <td>{us.email}</td>
                            <td>{us.name}</td>
                            <td>{us.role_name}</td>
                            <td>
                                <Link
                                    to={`/user/edit/${us.id}`}
                                >
                                    <button className='btn btn-warning'>Edit</button>
                                </Link>
                                <button className='btn btn-danger ml-1' onClick={() => deleteUser(us.id)}>Delete</button>
                            </td>
                        </tr>

                    )}
                </tbody>
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