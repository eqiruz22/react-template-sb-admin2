import axios from 'axios'
import React from 'react'
import Swal from 'sweetalert2'
import { useAuthContext } from '../../../hooks/useAuthContext'

export const DeleteUser = ({ id, onDataUpdate, onPage, onLimit, onRow, onTotalpage, keyword, page, limit }) => {
    const { user } = useAuthContext()
    const deleteUser = () => {
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
                    const res = await axios.delete(`http://localhost:4001/user/delete/${id}`, {
                        headers: {
                            'Authorization': `Bearer ${user['token']}`
                        }
                    })
                    if (res) {
                        await axios.get(`http://localhost:4001/user/show?query=${keyword}&page=${page}&limit=${limit}`, {
                            headers: {
                                'Authorization': `Bearer ${user['token']}`
                            }
                        }).then(response => {
                            onDataUpdate(response?.data?.result)
                            onPage(response.data.page)
                            onLimit(response.data.limit)
                            onRow(response.data.row)
                            onTotalpage(response.data.totalPage)
                        })
                        Swal.fire(
                            'Success',
                            `${res.data.message}`,
                            'success'
                        )
                    } else {
                        Swal.fire(
                            'Something wrong?',
                            `${res.data.message}`,
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
            <button className='btn btn-danger ml-1' onClick={deleteUser}>Delete</button>
        </>
    )
}
