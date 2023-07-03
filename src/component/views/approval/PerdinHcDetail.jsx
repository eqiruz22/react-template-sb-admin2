import React, { useState } from 'react'
import { useAuthContext } from '../../../hooks/useAuthContext'
import { Modal } from 'react-bootstrap'
export const PerdinHcDetail = ({ id }) => {
    const { user } = useAuthContext()
    const [show, setShow] = useState(false)
    const [name, setName] = useState('')
    const [title, setTitle] = useState('')
    const [mPerjalanan, setMPerjalanan] = useState('')
    const [tujuan, setTujuan] = useState('')
    const [lamaPerjalanan, setLamaPerjalanan] = useState(0)
    const [start, setStart] = useState('')
    const [end, setEnd] = useState('')
    const [penginapan, setPenginapan] = useState(0)
    const [meals, setMeals] = useState(0)
    const [prj, setPrj] = useState('')
    const [lain, setLain] = useState(0)
    const [rapid, setRapid] = useState(0)
    const [local, setLocal] = useState(0)
    const [transTujuan, setTransTujuan] = useState(0)
    const [advance, setAdvance] = useState(0)
    const handleClose = () => setShow(false)
    const handleView = async () => {
        setShow(true)
        try {
            const res = await fetch(`http://localhost:4001/user/perdin-daily/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${user['token']}`
                }
            })
            const response = await res.json()
            setPrj(response.result['prj_name'])
            setName(response.result['name'])
            setTitle(response.result['title_name'])
            setMPerjalanan(response.result['maksud_perjalanan'])
            setTujuan(response.result['tempat_tujuan'])
            setLamaPerjalanan(response.result['lama_perjalanan'])
            setStart(response.result['start_date'])
            setEnd(response.result['end_date'])
            setLocal(response.result['transport_local'])
            setTransTujuan(response.result['transport_tujuan'])
            setPenginapan(response.result['penginapan'])
            setMeals(response.result['meals'])
            setLain(response.result['lain_lain'])
            setRapid(response.result['rapid_test'])
            setAdvance(response.result['jumlah_advance'])
        } catch (error) {
            console.log(error)
        }
    }

    const formatDate = (dates) => {
        const date = new Date(dates)
        const format = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
        return format
    }

    return (
        <>
            <button className='btn btn-primary ml-1' onClick={handleView}><i className='fas fa-eye'></i></button>

            {/* Modal View */}
            <Modal backdrop='static' show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Detail</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        PRJ : {prj}
                    </div>
                    <div>
                        Name : {name}
                    </div>
                    <div>
                        Title : {title}
                    </div>
                    <div>
                        Maksud Perjalanan : {mPerjalanan}
                    </div>
                    <div>
                        Tujuan Perjalanan : {tujuan}
                    </div>
                    <div>
                        Tanggal Berangkat : {formatDate(start)} - {formatDate(end)}
                    </div>
                    <div>
                        Lama Perjalanan : {lamaPerjalanan}
                    </div>
                    <div>
                        Transport Local : {local}
                    </div>
                    <div>
                        Transport Tujuan : {transTujuan}
                    </div>
                    <div>
                        Penginapan : {penginapan}
                    </div>
                    <div>
                        Meals : {meals}
                    </div>
                    <div>
                        Rapid Test : {rapid}
                    </div>
                    <div>
                        Lain Lain : {lain}
                    </div>
                    <div>
                        Jumlah Advance : {advance}
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}
