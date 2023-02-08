import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../../../hooks/useAuthContext'
import { PDFDownloadLink } from '@react-pdf/renderer'
import ReportDaily from '../../ReportDaily'


const MainDaily = ({ selectedUser }) => {

    const [perdin, setPerdin] = useState([])
    const [userdaily, setUserdaily] = useState([])
    const [nodata, setNoData] = useState('')
    const { user } = useAuthContext()

    useEffect(() => {
        getPerdinUser()
    }, [])

    useEffect(() => {
        getPerdinDaily()
    }, [])

    const getPerdinUser = async () => {
        await axios.get('http://localhost:4001/user/perdin-show-daily')
            .then(res => {
                setPerdin(res.data.result)
            }).catch(error => {
                console.log(error)
            })
    }

    const getPerdinDaily = async () => {
        try {
            await axios.get(`http://localhost:4001/user/perdin-show-daily/${user['id']}`)
                .then(res => {
                    console.log(res.data)
                    if (res.data.message === 'no data for show') {
                        setNoData('you must created data first')
                    } else {
                        setUserdaily(res.data.result)
                    }
                })
        } catch (error) {
            console.log(error)
        }
    }

    console.log(perdin)

    if (nodata) {
        return (
            <div className='px-5'>
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800">Data</h1>
                    <div className='d-sm-flex align-items-center mr-5'>
                        <form>
                            <input type="text" className="form-control" placeholder="Search for" />
                        </form>
                    </div>
                    <Link to={`/data/create/${user['id']}`} className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i
                        className="fas fa-plus fa-sm text-white-50"></i> Create Perdin</Link>
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
                    {nodata}
                </table>
            </div>
        )
    } else {
        return (
            <div className='px-5'>
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800">Data</h1>
                    <div className='d-sm-flex align-items-center mr-5'>
                        <form>
                            <input type="text" className="form-control" placeholder="Search for" />
                        </form>
                    </div>
                    <Link to={`/data/create/${user['id']}`} className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i
                        className="fas fa-plus fa-sm text-white-50"></i> Create Perdin</Link>
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

                    {user['role'] === 1 && (
                        <tbody>
                            {perdin.map((item, index) =>
                                <tr key={item.id}>
                                    <td>{index + 1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.prj_name}</td>
                                    <td>{item.total_received}</td>
                                    <td>{item.proses}</td>
                                    <td>
                                        <button disabled={item.status_id === 1 ? false : true} className='btn btn-warning'>Edit</button>
                                        <button disabled={item.status_id !== 1 ? true : false} className='btn btn-danger ml-1 mr-1'>Delete</button>
                                        <button className='btn btn-success'>
                                            <PDFDownloadLink document={<ReportDaily key={item.id} selectedUser={item} />} fileName={`perdin_${item.name}-${item.prj_name}.pdf`}>
                                                {({ blob, url, loading, error }) =>
                                                    loading ? 'Loading' : 'Download'
                                                }
                                            </PDFDownloadLink>
                                        </button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    )}
                    {user['role'] !== 1 && (
                        <tbody>
                            {userdaily.map((item, index) =>
                                <tr key={item.id}>
                                    <td>{index + 1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.prj_name}</td>
                                    <td>{item.total_received}</td>
                                    <td>{item.proses}</td>
                                    <td>
                                        <button disabled={item.status_id === 1 ? false : true} className='btn btn-warning'>Edit</button>
                                        <button disabled={item.status_id !== 1 ? true : false} className='btn btn-danger ml-1 mr-1'>Delete</button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    )}

                </table>
            </div>
        )
    }
}

export default MainDaily