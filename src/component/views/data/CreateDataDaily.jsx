import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import { useAuthContext } from '../../../hooks/useAuthContext'
import { getPrjList, getUser, getTitle, getZones, getZoneById } from '../../../http/HttpConsume'

const CreateDataDaily = () => {
    const { user } = useAuthContext()
    const [optName, setOptName] = useState([])
    const [name, setName] = useState('')
    const [title, setTitle] = useState('')
    const [zoneBytitle, setZoneByTitle] = useState([])
    const [zone, setZone] = useState('')
    const [prjOpt, setPrjOpt] = useState([])
    const [prj, setPrj] = useState('')
    const [maksudPerjalan, setMaksudPerjalanan] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [tempatTujuan, setTempatTujuan] = useState('')
    const [transportTujuan, setTransportTujuan] = useState(0)
    const [transportLocal, setTransportLocal] = useState(0)
    const [penginapan, setPenginapan] = useState(0)
    const [meal, setMeal] = useState(0)
    const [allowance, setAllowance] = useState(0)
    const [rapidTest, setRapidTest] = useState(0)
    const [lainLain, setLainLain] = useState(0)
    const [errorMP, setErrorMP] = useState('')
    const [errorTempatTujuan, setErrorTempatTujuan] = useState('')
    useEffect(() => {
        getUser(user, setOptName)
    }, [user])

    useEffect(() => {
        if (name && name !== '') {
            getTitle(user, name, setTitle)
        }
    }, [user, name])

    useEffect(() => {
        if (title && title !== '') {
            getZones(user, title, setZoneByTitle)
        }
    }, [user, title])

    useEffect(() => {
        getPrjList(user, setPrjOpt)
    }, [user])

    useEffect(() => {
        if (zone && zone !== '') {
            getZoneById(user, zone, setTransportTujuan, setTransportLocal, setPenginapan, setMeal, setAllowance)
        }
    }, [user, zone])

    const handleChangeName = (selectedOption) => {
        setName(selectedOption)
    }

    const handleChangeOfficial = (event) => {
        setMaksudPerjalanan(event.target.value)
        if (!event.target.value) {
            setErrorMP('this field is required!')
        } else {
            setErrorMP('')
        }
    }

    const handleChangeStart = (event) => {
        const select = event.target.value
        if (select <= endDate || !endDate) {
            setStartDate(select)
        }
    }

    const handleChangeEnd = (event) => {
        const select = event.target.value
        if (select >= startDate) {
            setEndDate(select)
        }
    }

    const date1 = new Date(startDate)
    const date2 = new Date(endDate)
    const dtime = date2.getTime() - date1.getTime()
    const diff = dtime / (1000 * 60 * 60 * 24)
    const days = Math.max(diff, 0)

    const handleChangetempatTujuan = (event) => {
        setTempatTujuan(event.target.value)
        if (!event.target.value) {
            setErrorTempatTujuan('this field is required!')
        } else {
            setErrorTempatTujuan('')
        }
    }

    const handleChangetransportTujuan = (event) => {
        setTransportTujuan(event.target.value)
    }

    const handleChangeTransportLocal = (event) => {
        setTransportLocal(event.target.value)
    }

    const handleChangePenginapan = (event) => {
        setPenginapan(event.target.value)
    }

    const handleChangeMeal = (event) => {
        setMeal(event.target.value)
    }

    const handleChangeAllowance = (event) => {
        setAllowance(event.target.value)
    }

    const handleChangeRapidTest = (event) => {
        setRapidTest(event.target.value)
    }

    const handleChangeLainLain = (event) => {
        setLainLain(event.target.value)
    }

    let total = 0
    if (days === 0) {
        total += parseFloat(meal) + parseFloat(lainLain) + parseFloat(rapidTest) + parseFloat(allowance) + parseFloat(transportTujuan) + parseFloat(penginapan) + parseFloat(transportLocal)
    } else {
        total += parseFloat(meal * days) + parseFloat(lainLain * days) + parseFloat(rapidTest * days) + parseFloat(allowance * days) + parseFloat(transportTujuan * days) + parseFloat(penginapan * days) + parseFloat(transportLocal * days)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            await fetch('http://localhost:4001/user/perdin-daily', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user['token']}`
                },
                body: JSON.stringify({
                    prj_id: prj['value'],
                    user_id: name['value'],
                    title_name: title,
                    maksud_perjalanan: maksudPerjalan,
                    tempat_tujuan: tempatTujuan,
                    start_date: startDate,
                    end_date: endDate,
                    lama_perjalanan: days,
                    transport_tujuan: transportTujuan,
                    transport_local: transportLocal,
                    penginapan: penginapan,
                    meals: meal,
                    allowance: allowance,
                    rapid_test: rapidTest,
                    lain_lain: lainLain,
                    jumlah_advance: total
                })
            })
                .then(response => response.json())
                .then(res => console.log(res))
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <div className='container container-fluid'>
                <form onSubmit={handleSubmit} className='row g-3'>
                    <div className="col-md-3">
                        <label htmlFor="title" className="form-label">Name</label>
                        <Select options={optName} value={name} onChange={handleChangeName} />
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <div className='form-control'>{title}</div>
                    </div>
                    <div className='col-md-3'>
                        <label htmlFor="zone">Zone</label>
                        <Select options={zoneBytitle} value={zone} onChange={(selectedOption) => setZone(selectedOption)} />
                    </div>
                    <div className='col-md-3'>
                        <label htmlFor="prj">PRJ</label>
                        <Select options={prjOpt} value={prj} onChange={(selectedOption) => setPrj(selectedOption)} />
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="maksudPerjalan" className="form-label">Maksud Perjalanan</label>
                        <input type="text" value={maksudPerjalan} onChange={handleChangeOfficial} className="form-control" id="maksudPerjalan" />
                        {errorMP && <span className='text-danger'>{errorMP}</span>}
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="start_date" className="form-label">Start Date</label>
                        <input type="date" value={startDate} onChange={handleChangeStart} className="form-control" id="start_date" />
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="end_date" className="form-label">End Date</label>
                        <input type="date" value={endDate} onChange={handleChangeEnd} className="form-control" id="end_date" />
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="end_date" className="form-label">Lama Perjalanan</label>
                        <div className='form-control'>{days.toString()}</div>
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="tempatTujuan" className="form-label">Tempat Tujuan</label>
                        <input type="text" value={tempatTujuan} onChange={handleChangetempatTujuan} className="form-control" id="tempatTujuan" />
                        {errorTempatTujuan && <span className='text-danger'>{errorTempatTujuan}</span>}
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="transportTujuan" className="form-label">Transport Tujuan</label>
                        <input type="text" value={transportTujuan} onChange={handleChangetransportTujuan} className="form-control" id="transportTujuan" />
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="transportLocal" className="form-label">Transport Local</label>
                        <input type="text" value={transportLocal} onChange={handleChangeTransportLocal} className="form-control" id="meals" />
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="travel" className="form-label">Penginapan</label>
                        <input type="text" value={penginapan} onChange={handleChangePenginapan} className="form-control" id="travel" />
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="meal" className="form-label">Meal</label>
                        <input type="text" value={meal} onChange={handleChangeMeal} className="form-control" id="meal" />
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="allowance" className="form-label">Allowance</label>
                        <input type="text" value={allowance} onChange={handleChangeAllowance} className="form-control" id="allowance" />
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="rented" className="form-label">Rapid Test</label>
                        <input type="text" value={rapidTest} onChange={handleChangeRapidTest} className="form-control" id="rented" />
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="pulse" className="form-label">Lain-Lain</label>
                        <input type="text" className="form-control" id="pulse" value={lainLain} onChange={handleChangeLainLain} />
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="Others" className="form-label">Jumlah Advance</label>
                        <div className='form-control'>{total.toLocaleString().split(',').join('.')}</div>
                    </div>
                    <div>
                        <button type='submit' className='btn btn-primary'>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateDataDaily