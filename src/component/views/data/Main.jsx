import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Main = () => {

    const [perdin, setPerdin] = useState([])

    useEffect(() => {
        const showPerdin = async () => {
            await fetch('http://10.80.7.94:4001/user/perdin-show')
                .then(res => res.json())
                .then(result => {
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

    return (
        <div className='px-5'>
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Data</h1>
                <div className='d-sm-flex align-items-center mr-5'>
                    <form>
                        <input type="text" className="form-control" placeholder="Search for" />
                    </form>
                </div>
                <Link to="/data/create" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i
                    className="fas fa-plus fa-sm text-white-50"></i> Create Data</Link>
            </div>
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th scope="colSpan">#</th>
                        <th scope="colSpan">Nama</th>
                        <th scope="colSpan">PRJ</th>
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
                            <td>{IDRCurrency.format(item.total_received)}</td>
                            <td>{item.proses}</td>
                            <td>
                                <button disabled={item.status_id === 1 ? false : true} className='btn btn-warning'>Edit</button>
                                <button disabled={item.status_id !== 1 ? true : false} className='btn btn-danger ml-1'>Delete</button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>

    )
}

export default Main