import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { useAuthContext } from '../../../hooks/useAuthContext'
import Spinner from '../../layout/Spinner'
import { getPerdin } from '../../../http/HttpConsume'

const HcView = () => {

    const [perdin, setPerdin] = useState([])
    const [loading, setLoading] = useState(true)
    const { user } = useAuthContext()

    let IDRCurrency = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR'
    })

    useEffect(() => {
        getPerdin(user, setPerdin, setLoading)
    }, [user])

    const handleApproval = (id, perdin_id) => {
        axios.post('http://localhost:4001/user/approved-hc', {
            id: id,
            perdin_id: perdin_id
        }, {
            headers: {
                'Authorization': `Bearer ${user['token']}`
            }
        }).then(res => {
            console.log(res)
            Swal.fire({
                title: 'Success',
                text: 'Approved',
                icon: 'success'
            })
            getPerdin(user, setPerdin, setLoading)
        }).catch(error => {
            console.log(error)
        })
    }
    if (loading) {
        return <Spinner />
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
            <table className='table table-hover'>
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
                {perdin.length > 0 ?
                    perdin.map((item, index) =>
                        <tbody>
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
                        </tbody>
                    ) : <tbody>
                        <tr>
                            <td className='text-center' colSpan='7'>Data tidak tersedia</td>
                        </tr>
                    </tbody>}
            </table>
        </div>
    )
}

export default HcView