import React from 'react'
import { useAuthContext } from '../../../hooks/useAuthContext'
import Swal from 'sweetalert2'

export const UpdatePerdinDivisi = ({ id, perdin_id, keyword, page, limit, onDataUpdate, onPage, onLimit, onRow, onTotalpage, disabled }) => {

    const { user } = useAuthContext()

    const updateApproval = () => {
        const data = {
            id: id,
            perdin_id: perdin_id,
            approved_divisi: user['id'],
            divisi_check: user['id'],
            dv_name: user['divisi']
        }
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Approved'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await fetch('http://localhost:4001/user/approved-divisi', {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${user['token']}`
                        },
                        body: JSON.stringify(data)
                    })
                    const response = await res.json()
                    if (res.ok) {
                        if (user['role'] === 1) {
                            await fetch(`http://localhost:4001/user/waiting-approve-divisi?query=${keyword}&page=${page}&limit=${limit}`, {
                                method: "GET",
                                headers: {
                                    "Content-Type": "application/json",
                                    "Authorization": `Bearer ${user['token']}`
                                }
                            }).then(response => response.json())
                                .then(response => {
                                    onDataUpdate(response.result)
                                    onPage(response.page)
                                    onLimit(response.limit)
                                    onRow(response.row)
                                    onTotalpage(response.totalPage)
                                })
                        } else {
                            await fetch(`http://localhost:4001/user/waiting-approve-divisi/${user['id']}?query=${keyword}&page=${page}&limit=${limit}`, {
                                method: 'GET',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': `Bearer ${user['token']}`
                                }
                            }).then(response => response.json())
                                .then(response => {
                                    console.log(response)
                                    onDataUpdate(response?.result)
                                    onPage(response.page)
                                    onLimit(response.limit)
                                    onRow(response.row)
                                    onTotalpage(response.totalPage)
                                })
                        }
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
            <button className='btn btn-success' onClick={updateApproval} disabled={disabled}>Approve</button>
        </>
    )
}
