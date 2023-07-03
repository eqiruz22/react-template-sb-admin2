import React from 'react'
import { useAuthContext } from '../../../hooks/useAuthContext'
import Swal from 'sweetalert2'
export const DeleteTitle = ({ id, onDataUpdate, onPage, onLimit, onRow, onTotalpage, keyword, page, limit }) => {
    const { user } = useAuthContext()
    const deleteTitle = () => {
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
                    const res = await fetch(`http://localhost:4001/user/title/${id}`, {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${user['token']}`
                        }
                    })
                    const response = await res.json()
                    if (res.ok) {
                        await fetch(`http://localhost:4001/user/title?query=${keyword}&page=${page}&limit=${limit}`, {
                            method: "GET",
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": `Bearer ${user['token']}`
                            }
                        }).then(response => response.json())
                            .then(response => {
                                onDataUpdate(response.value)
                                onPage(response.page)
                                onLimit(response.limit)
                                onRow(response.row)
                                onTotalpage(response.totalPage)
                            })
                        Swal.fire(
                            'Success',
                            `${response.message}`,
                            'success'
                        )
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
            <button className='btn btn-danger ml-1' onClick={deleteTitle}>Delete</button>
        </>
    )
}
