import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'

const Main = () => {
    const [perdin, setPerdin] = useState([])

    const showPerdin = async () => {
        await fetch('http://10.80.7.94:4001/user/waiting-approve-manager')
            .then(res => res.json())
            .then(result => {
                console.log(result)
                setPerdin(result.result)
            }).catch(err => {
                console.log(err)
            })
    }
    useEffect(() => {
        showPerdin()
    }, [])

    let IDRCurrency = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR'
    })

    const updateApproval = (id, perdin_id, prj_id, user_id, status_id) => {
        axios.post('http://10.80.7.94:4001/user/approved-manager', {
            id: id,
            perdin_id: perdin_id,
            prj_id: prj_id,
            user_id: user_id,
            status_id: status_id
        }).then(res => {
            console.log(res)
            Swal.fire({
                title: 'Success',
                text: 'Approved',
                icon: 'success'
            })
            showPerdin()
        }).catch(err => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong, please try again later!',
            })
            console.log(err)
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
                                <button disabled={item.status_id === 1 ? false : true} className='btn btn-success' onClick={() => updateApproval(item.id, item.perdin_id, item.prj_id, item.user_id, item.status_id)}>Approve</button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Main