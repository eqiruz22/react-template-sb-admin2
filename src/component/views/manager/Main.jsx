import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'

const Main = () => {
    const [perdin, setPerdin] = useState([])

    useEffect(() => {
        const showPerdin = async () => {
            await fetch('http://localhost:4001/user/list-perdin')
                .then(res => res.json())
                .then(result => {
                    console.log(result.result)
                    setPerdin(result.result)
                }).catch(err => {
                    console.log(err)
                })
        }
        showPerdin()
    }, [])

    let IDRCurrency = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR'
    })

    const updateApproval = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Success!',
                    'Approved',
                    'success'
                )
            }
        })
    }

    return (
        <div className='px-5'>
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Data</h1>
                <div className='d-sm-flex align-items-center mr-5'>
                    <form>
                        <input type="text" className="form-control" placeholder="Search for" />
                    </form>
                </div>
                {/* <Link to="/data/create" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i
                    className="fas fa-plus fa-sm text-white-50"></i> </Link> */}
                <div></div>
            </div>
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th scope="colSpan">#</th>
                        <th scope="colSpan">Nama</th>
                        <th scope="colSpan">PRJ</th>
                        <th scope='colSpan'>Official Travel</th>
                        <th scope="colSpan">Total Cash</th>
                        <th scope='colSpan'>Status</th>
                        <th scope='colSpan'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {perdin.map((item, index) =>
                        <tr key={item.id}>
                            <th scope='row'>{index + 1}</th>
                            <td>{item.name}</td>
                            <td>{item.prj_name}</td>
                            <td>{item.official_travel_site}</td>
                            <td>{IDRCurrency.format(item.total_received)}</td>
                            <td>{item.proses}</td>
                            <td>
                                <button className='btn btn-success' onClick={() => updateApproval()}>Approve</button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Main