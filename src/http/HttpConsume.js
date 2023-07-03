import axios from "axios";

export const getDivisiData = async (user, keyword, page, limit, setGetDivisi, setPage, setLimit, setRows, setPages, setLoading) => {
    try {
        await axios.get(`http://localhost:4001/user/divisi-head?query=${keyword}&page=${page}&limit=${limit}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user['token']}`
            }
        }).then(res => {
            console.log(res.data)
            setGetDivisi(res.data.result)
            setPage(res.data.page)
            setLimit(res.data.limit)
            setRows(res.data.row)
            setPages(res.data.totalPage)
            setLoading(false)
        })
    } catch (error) {
        console.log(error)
    }
}

export const getAllUser = async (user, setGetName) => {
    try {
        await axios.get('http://localhost:4001/user/name', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user['token']}`
            }
        }).then(res => {
            const opt = res.data.result.map(item => ({ value: item.user_id, label: item.name }))
            setGetName(opt)
        })
    } catch (error) {
        console.log(error)
    }
}

export const getZone = async (user, keyword, page, limit, setData, setPage, setRows, setLimit, setPages, setLoading) => {
    try {
        await axios.get(`http://localhost:4001/user/zone?query=${keyword}&page=${page}&limit=${limit}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user['token']}`
            }
        }).then(res => {
            console.log(res)
            setData(res.data.result)
            setPage(res.data.page)
            setRows(res.data.row)
            setLimit(res.data.limit)
            setPages(res.data.totalPage)
            setLoading(false)
        })
    } catch (error) {
        console.log(error)
    }
}

export const getLevel = async (user, setLevel) => {
    try {
        await axios.get('http://localhost:4001/user/title-name', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user['token']}`
            }
        }).then(res => {
            const opt = res.data.result.map(item => ({ value: item.id, label: item.title_name }))
            setLevel(opt)
        })
    } catch (error) {
        console.log(error)
    }
}

export const getData = async (user, keyword, page, limit, setUsers, setPage, setLimit, setRows, setPages, setLoading) => {
    try {
        await axios.get(`http://localhost:4001/user/show?query=${keyword}&page=${page}&limit=${limit}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user['token']}`
            }
        }).then(res => {
            console.log(res)
            setUsers(res.data.result)
            setPage(res.data.page)
            setLimit(res.data.limit)
            setRows(res.data.row)
            setPages(res.data.totalPage)
            setLoading(false)
        })
    } catch (error) {
        console.log(error)
    }
}

export const showTitle = async (user, keyword, page, limit, setTitle, setLoading, setLimit, setRows, setPage, setPages) => {
    try {
        await axios.get(`http://localhost:4001/user/title?query=${keyword}&page=${page}&limit=${limit}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user['token']}`
            }
        }).then(res => {
            setTitle(res.data.value)
            setPage(res.data.page)
            setLimit(res.data.limit)
            setRows(res.data.row)
            setPages(res.data.totalPage)
            setLoading(false)
        })
    } catch (error) {
        console.log(error)
    }
}

export const getPrj = async (user, keyword, page, limit, setData, setPage, setLimit, setRows, setPages, setLoading) => {
    try {
        setLoading(true)
        await fetch(`http://localhost:4001/user/prj?query=${keyword}&page=${page}&limit=${limit}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user['token']}`
            }
        }).then(response => response.json())
            .then(res => {
                setData(res.result)
                setPage(res.page)
                setLimit(res.limit)
                setRows(res.row)
                setPages(res.totalPage)
                setLoading(false)
            })
    } catch (error) {
        console.log(error)
    }
}

export const getPerdinAllUser = async (user, keyword, page, limit, setPerdin, setPage, setLimit, setRows, setPages, setLoading) => {
    try {
        await axios.get(`http://localhost:4001/user/perdin-show-daily?query=${keyword}&page=${page}&limit=${limit}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user['token']}`
            }
        }).then(res => {
            console.log(res.data)
            setPerdin(res?.data?.result[0])
            setPage(res?.data?.page)
            setLimit(res?.data?.limit)
            setRows(res?.data?.row)
            setPages(res?.data?.totalPage)
            setLoading(false)
        })
    } catch (error) {
        console.log(error)
    }
}

export const getPerdinDailyById = async (user, keyword, page, limit, setUserdaily, setPage, setLimit, setRows, setPages, setLoading) => {
    try {
        await axios.get(`http://localhost:4001/user/perdin-show-daily/${user['id']}?query=${keyword}&page=${page}&limit=${limit}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user['token']}`
            }
        }).then(res => {
            console.log(res.data.result)
            setUserdaily(res.data.result)
            setPage(res.data.page)
            setLimit(res.data.limit)
            setRows(res.data.row)
            setPages(res.data.totalPage)
            setLoading(false)
        })
    } catch (error) {
        console.log(error)
    }
}

export const getPerdin = async (user, keyword, page, limit, setPerdin, setPage, setLimit, setRows, setPages, setLoading) => {
    try {
        await axios.get(`http://localhost:4001/user/waiting-approve-hc?query=${keyword}&page=${page}&limit=${limit}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user['token']}`
            }
        }).then(res => {
            console.log(res.data)
            setPerdin(res.data.result)
            setPage(res.data.page)
            setLimit(res.data.limit)
            setRows(res.data.row)
            setPages(res.data.totalPage)
            setLoading(false)
        })
    } catch (error) {
        console.log(error)
    }
}

export const showPerdin = async (user, keyword, page, limit, setPage, setLimit, setRows, setPages, setPerdin, setLoading) => {
    try {
        await axios(`http://localhost:4001/user/waiting-approve-divisi?query=${keyword}&page=${page}&limit=${limit}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user['token']}`
            }
        }).then(res => {
            console.log(res.data.result)
            setPerdin(res.data.result)
            setPage(res.data.page)
            setLimit(res.data.limit)
            setRows(res.data.row)
            setPages(res.data.totalPage)
            setLoading(false)
        })
    } catch (error) {
        console.log(error)
    }
}

export const getById = async (user, id, setName, setTitle) => {
    try {
        await axios.get(`http://localhost:4001/user/show/title-user/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user['token']}`
            }
        }).then(res => {
            setName(res.data.name)
            setTitle(res.data.title_name)
        })
    } catch (error) {
        console.log(error)
    }
}

export const getPrjList = async (user, setPrj) => {
    try {
        await axios.get('http://localhost:4001/user/prj', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user['token']}`
            }
        }).then(res => {
            const opt = res.data.result.map(item => ({ value: item.id, label: item.prj_name }))
            setPrj(opt)
        })
    } catch (error) {
        console.log(error)
    }
}

export const getPrjDetail = async (user, id, setProjectName) => {
    try {
        await axios.get(`http://localhost:4001/user/prj/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user['token']}`
            }
        }).then(response => {
            console.log(response)
            setProjectName(response.data.result[0]['project_name'])
        })

    } catch (error) {
        console.log(error)
    }
}

export const getZoneList = async (user, title, setZoneByTitle) => {
    try {
        await axios.get(`http://localhost:4001/user/zone/${title}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user['token']}`
            }
        }).then(res => {
            console.log(res.data)
            const opt = res.data.result.map(item => ({ value: item.id, label: item.zone_name }))
            setZoneByTitle(opt)
        })
    } catch (error) {
        console.log(error)
    }
}

export const getZoneById = async (user, zone, setHotel, setMeal, setAirfare, setTransportation, setHardship) => {
    try {
        await axios.get(`http://localhost:4001/user/zone-by/${zone['value']}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user['token']}`
            }
        }).then(res => {
            console.log(res.data)
            setHotel(res.data.result[0]['hotel'])
            setMeal(res.data.result[0]['meal_allowance'])
            setAirfare(res.data.result[0]['transport_airplane'])
            setTransportation(res.data.result[0]['transport_non_airplane'])
            setHardship(res.data.result[0]['allowance'])
        })
    } catch (error) {
        console.log(error)
    }
}

export const perdinDetails = async (user, id, setName, setTitle, setMPerjalanan, setTujuan, setLamaPerjalanan, setStart, setEnd, setPenginapan, setMeals, setPrj, setLain, setRapid, setLocal, setTransTujuan, setAdvance) => {
    try {
        await axios.get(`http://localhost:4001/user/perdin-daily/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user['token']}`
            }
        }).then(res => {
            console.log(res.data?.result)
            setPrj(res.data?.result['prj_name'])
            setName(res.data?.result['name'])
            setTitle(res.data?.result['title_name'])
            setMPerjalanan(res.data?.result['maksud_perjalanan'])
            setTujuan(res.data?.result['tempat_tujuan'])
            setLamaPerjalanan(res.data?.result['lama_perjalanan'])
            setStart(res.data?.result['start_date'])
            setEnd(res.data?.result['end_date'])
            setLocal(res.data?.result['transport_local'])
            setTransTujuan(res.data?.result['transport_tujuan'])
            setPenginapan(res.data?.result['penginapan'])
            setMeals(res.data?.result['meals'])
            setLain(res.data?.result['lain_lain'])
            setRapid(res.data?.result['rapid_test'])
            setAdvance(res.data?.result['jumlah_advance'])
        })
    } catch (error) {
        console.log(error)
    }
}

export const getZones = async (user, title, setZoneByTitle) => {
    try {
        await axios.get(`http://localhost:4001/user/zone/${title}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user['token']}`
            }
        }).then(res => {
            console.log(res.data)
            const opt = res.data.result.map(item => ({ value: item.id, label: item.zone_name }))
            setZoneByTitle(opt)
        })
    } catch (error) {
        console.log(error)
    }
}

export const getTitle = async (user, name, setTitle) => {
    try {
        await axios.get(`http://localhost:4001/user/show/${name['value']}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user['token']}`
            }
        }).then(res => {
            console.log(res.data.value)
            setTitle(res.data.value[0]['title_name'])
        })
    } catch (error) {
        console.log(error)
    }
}

export const getUser = async (user, setOptName) => {
    try {
        await axios.get('http://localhost:4001/user/show', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user['token']}`
            }
        }).then(res => {
            console.log(res.data)
            const opt = res.data?.result?.map(item => ({ value: item.id, label: item.name }))
            setOptName(opt)
        })
    } catch (error) {
        console.log(error)
    }
}

export const showWaitingToDivisiById = async (user, keyword, page, limit, setWaiting, setPages, setPage, setRows, setLimit, setLoading) => {
    try {
        await fetch(`http://localhost:4001/user/waiting-approve-divisi/${user['id']}?query=${keyword}&page=${page}&limit=${limit}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user['token']}`
            }
        }).then(response => response.json())
            .then(response => {
                console.log(response)
                setWaiting(response?.result)
                setPages(response.totalPage)
                setPage(response.page)
                setRows(response.row)
                setLimit(response.limit)
                setLoading(false)
            })
    } catch (error) {
        console.log(error)
    }
}

export const PerdinEdit = async (user, id, setName, setTitle, setZone, setPrj, setMaksudPerjalanan, setStartDate, setEndDate, setTempatTujuan, setTransportTujuan, setTransportLocal, setPenginapan, setMeal, setAllowance, setRapid, setLain) => {
    try {
        const res = await fetch(`http://localhost:4001/user/perdin-daily/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user['token']}`
            }
        })
        const response = await res.json()
        console.log(response)
        setName({ value: response.result['user_id'], label: response.result['name'] })
        setTitle(response.result['title_name'])
        setZone({ value: response.result['zone_id'], label: response.result['zone_name'] })
        setPrj({ value: response.result['prj_id'], label: response.result['prj_name'] })
        setMaksudPerjalanan(response.result['maksud_perjalanan'])
        setStartDate(response.result['start_date'])
        setEndDate(response.result['end_date'])
        setTempatTujuan(response.result['tempat_tujuan'])
        setTransportTujuan(response.result['transport_tujuan'])
        setTransportLocal(response.result['transport_local'])
        setPenginapan(response.result['penginapan'])
        setMeal(response.result['meals'])
        setAllowance(response.result['allowance'])
        setRapid(response.result['rapid'])
        setLain(response.result['lain'])
    } catch (error) {
        console.log(error)
    }
}