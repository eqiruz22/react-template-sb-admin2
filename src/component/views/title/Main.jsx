import React, { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import axios from 'axios'
import Spinner from '../../layout/Spinner'
import ReactPaginate from 'react-paginate'
import { useAuthContext } from '../../../hooks/useAuthContext'

const Main = () => {

    const [title, setTitle] = useState([])
    const [loading, setLoading] = useState(true)
    const [keyword, setkeyword] = useState('')
    const [page, setPage] = useState(0)
    const [limit, setLimit] = useState(10)
    const [query, setQuery] = useState('')
    const [row, setRow] = useState([])
    const { user } = useAuthContext()

    const showTitle = async () => {
        await axios(`http://localhost:4001/user/title?query=${keyword}&page=${page}&limit=${limit}`, {
            headers: {
                'Authorization': `Bearer ${user['token']}`
            }
        })
            .then(res => {
                setTitle(res.data.value)
                setLoading(false)
                setLimit(res.data.limit)
                setRow(res.data.row)
            }).catch(err => {
                console.log(err)
            })
    }
    useEffect(() => {
        showTitle()
    }, [keyword, page])

    let IDRCurrency = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR'
    })

    const deleteTitle = async (id) => {
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
                showTitle()
            }
        })
        await axios.delete(`http://localhost:4001/user/title/delete/${id}`)
    }

    if (loading) {
        return <Spinner />
    }

    const changePage = ({ selected }) => {
        setPage(selected)
    }

    const search = (e) => {
        e.preventDefault()
        setPage(0)
        setkeyword(query)
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
                <Link to='/title/create'>
                    <Button className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i
                        className="fas fa-plus fa-sm text-white-50"></i> Create Title</Button>
                </Link>
            </div>

            <Table className='table table-striped'>
                <thead>
                    <tr>
                        <th scope="colSpan">#</th>
                        <th scope="colSpan">Title</th>
                        <th scope="colSpan">Rent House</th>
                        <th scope="colSpan">Meal Allowance</th>
                        <th scope='colSpan'>Hardship Allowance</th>
                        <th scope='colSpan'>Pulsa Allowance</th>
                        <th scope='colSpan'>Car Rent</th>
                        <th scope='colSpan'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {title.map((item, index) =>
                        <tr key={item.id}>
                            <th scope="row">{index + 1}</th>
                            <td>{item.title_name}</td>
                            <td>{IDRCurrency.format(item.rent_house)}</td>
                            <td>{IDRCurrency.format(item.meal_allowance)}</td>
                            <td>{IDRCurrency.format(item.hardship_allowance)}</td>
                            <td>{IDRCurrency.format(item.pulsa_allowance)}</td>
                            <td>{IDRCurrency.format(item.car_rent)}</td>
                            <td>
                                <Link to={`/title/edit/${item.id}`}>
                                    <Button className='btn btn-warning'>Edit</Button>
                                </Link>
                                <Button className='btn btn-danger ml-1' onClick={() => deleteTitle(item.id)}>Delete</Button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
            <div className='d-sm-flex align-items-center justify-content-between'>
                <p>Total Data : {row}</p>
                <nav aria-label="Page navigation example" key={row}>
                    <ReactPaginate
                        previousLabel={"<<"}
                        nextLabel={">>"}
                        pageCount={page}
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