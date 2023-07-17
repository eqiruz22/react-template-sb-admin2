import React, { useState } from 'react'
import { useAuthContext } from '../../../hooks/useAuthContext'
import Swal from 'sweetalert2'
const ReportUser = () => {
    const { user } = useAuthContext()
    const [loading, setLoading] = useState(false)
    const handleDownload = () => {
        setLoading(true);
        Swal.fire({
            title: 'Loading',
            text: 'Proccessing file...',
            allowOutsideClick: false,
            showConfirmButton: false,
            willOpen: () => {
                setTimeout(async () => {
                    setLoading(false);
                    try {
                        await fetch('http://localhost:4001/user/report-user', {
                            method: "GET",
                            headers: {
                                'Authorization': `Bearer ${user['token']}`
                            }
                        }).then(response => response.blob())
                            .then(blob => {
                                console.log(blob)
                                const url = window.URL.createObjectURL(blob)
                                const link = document.createElement('a')
                                link.href = url
                                link.setAttribute('download', 'users_report.xlsx')
                                document.body.appendChild(link)
                                link.click()
                                document.body.removeChild(link)
                            })
                    } catch (error) {
                        console.log(error)
                    }
                    Swal.fire({
                        title: 'Download Complete',
                        icon: 'success',
                        timer: 2000,
                        showConfirmButton: false
                    });
                }, 5000);
            }
        });
    }

    return (
        <>
            <button onClick={handleDownload} className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm mb-2" disabled={loading}><i
                className="fas fa-download fa-sm text-white-50"></i> {loading ? 'Loading' : 'Download'}</button>
        </>
    )
}

export default ReportUser