import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { useAuthContext } from '../../../hooks/useAuthContext'

const DirectorView = () => {

    const [perdin, setPerdin] = useState([])
    const { user } = useAuthContext()
    const getPerdin = async () => {
        await fetch('http://localhost:4001/user/waiting-approve-director', {
            headers: {
                'Authorization': `Bearer ${user['token']}`
            }
        })
            .then(res => res.json())
            .then(res => {
                console.log(res.result)
                setPerdin(res.result)
            }).catch(error => {
                console.log(error)
            })
    }
    let IDRCurrency = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR'
    })

    useEffect(() => {
        getPerdin()
    }, [])

    const handleApproval = (id, perdin_id) => {
        axios.post('http://localhost:4001/user/approved-director', {
            headers: {
                'Authorization': `Bearer ${user['token']}`
            }
        }, {
            id: id,
            perdin_id: perdin_id
        }).then(res => {
            console.log(res)
            Swal.fire({
                title: 'Success',
                text: 'Approved',
                icon: 'success'
            })
            getPerdin()
        }).catch(error => {
            console.log(error)
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
                                <button disabled={item.status_id === 1 ? false : true} onClick={() => handleApproval(item.id, item.perdin_id)} className='btn btn-success'>Approve</button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default DirectorView