import React from 'react'
import Swal from 'sweetalert2'
import { useAuthContext } from '../../../hooks/useAuthContext'
export const DeletePerdinDaily = ({ id, onDataUpdate, onPage, onLimit, onRow, onTotalpage, keyword, page, limit, disabled }) => {
    const { user } = useAuthContext()
    const handleDelete = () => {
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
                    const res = await fetch(`http://localhost:4001/user/perdin-daily/${id}`, {
                        method: 'DELETE',
                        headers: {
                            'Authorization': `Bearer ${user['token']}`
                        }
                    })
                    const response = await res.json()
                    if (res.ok) {
                        Swal.fire(
                            'Deleted!',
                            `${response.message}`,
                            'success'
                        )
                        if (user['role'] === 1) {
                            await fetch(`http://localhost:4001/user/perdin-show-daily?query=${keyword}&page=${page}&limit=${limit}`, {
                                method: "GET",
                                headers: {
                                    'Authorization': `Bearer ${user['token']}`
                                }
                            }).then(response => response.json())
                                .then(res => {
                                    onDataUpdate(res?.result[0])
                                    onPage(res?.page)
                                    onLimit(res?.limit)
                                    onRow(res?.row)
                                    onTotalpage(res?.totalPage)
                                })
                        } else {
                            await fetch(`http://localhost:4001/user/perdin-show-daily/${user['id']}?query=${keyword}&page=${page}&limit=${limit}`, {
                                method: "GET",
                                headers: {
                                    'Authorization': `Bearer ${user['token']}`
                                }
                            }).then(response => response.json())
                                .then(res => {
                                    onDataUpdate(res.result)
                                    onPage(res.page)
                                    onLimit(res.limit)
                                    onRow(res.row)
                                    onTotalpage(res.totalPage)
                                })
                        }
                    } else {
                        Swal.fire(
                            'Something wrong?',
                            `${response.message}`,
                            'error'
                        )
                    }
                } catch (error) {
                    console.log(error)
                }
            }
        })
    }

    return (
        <>
            <button onClick={handleDelete} className='btn btn-danger ml-1 mr-1' disabled={disabled}>Delete</button>
        </>
    )
}
