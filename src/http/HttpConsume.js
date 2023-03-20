import axios from "axios";

export const getDivisiData = async (user, keyword, page, limit, setGetDivisi, setPage, setLimit, setRows, setPages, setLoading) => {
    try {
        await axios.get(`http://localhost:4001/user/divisi-head?query=${keyword}&page=${page}&limit=${limit}`, {
            headers: {
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
                'Authorization': `Bearer ${user['token']}`
            }
        }).then(res => {
            console.log(res.data)
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

export const showTitle = async (user, keyword, page, limit, setTitle, setLoading, setLimit, setRow) => {
    try {
        await axios(`http://localhost:4001/user/title?query=${keyword}&page=${page}&limit=${limit}`, {
            headers: {
                'Authorization': `Bearer ${user['token']}`
            }
        }).then(res => {
            setTitle(res.data.value)
            setLoading(false)
            setLimit(res.data.limit)
            setRow(res.data.row)
        })
    } catch (error) {
        console.log(error)
    }
}

export const getPrj = async (user, keyword, page, limit, setData, setPage, setLimit, setRow, setLoading) => {
    try {
        await axios.get(`http://localhost:4001/user/prj?query=${keyword}&page=${page}&limit=${limit}`, {
            headers: {
                'Authorization': `Bearer ${user['token']}`
            }
        }).then(res => {
            console.log(res)
            setData(res.data.result)
            setPage(res.data.page)
            setLimit(res.data.limit)
            setRow(res.data.row)
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

export const getPerdin = async (user, setPerdin, setLoading) => {
    try {
        await axios.get('http://localhost:4001/user/waiting-approve-hc', {
            headers: {
                'Authorization': `Bearer ${user['token']}`
            }
        }).then(res => {

            setPerdin(res.data.result[0])
            setLoading(false)
        })
    } catch (error) {
        console.log(error)
    }
}

export const showPerdin = async (user, setPerdin, setLoading) => {
    try {
        await axios('http://localhost:4001/user/waiting-approve-divisi', {
            headers: {
                'Authorization': `Bearer ${user['token']}`
            }
        }).then(res => {
            console.log(res.data.result)
            setPerdin(res.data.result)
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
                'Authorization': `Bearer ${user['token']}`
            }
        })
            .then(res => {
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
                'Authorization': `Bearer ${user['token']}`
            }
        })
            .then(res => {
                const opt = res.data.result.map(item => ({ value: item.id, label: item.prj_name }))
                setPrj(opt)
            })
    } catch (error) {
        console.log(error)
    }
}

export const getZoneList = async (user, title, setZoneByTitle) => {
    try {
        await axios.get(`http://localhost:4001/user/zone/${title}`, {
            headers: {
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

export const perdinDetails = async (user, perdin_id, setName, setTitle, setOft, setPurposes, setHotel, setStart, setEnd, setDay, setTransport, setLocal, setAirfare, setAirport, setEntertainment, setTools, setOthers, setReceived) => {
    try {
        await axios.get(`http://localhost:4001/user/perdin-daily/${perdin_id}`, {
            headers: {
                'Authorization': `Bearer ${user['token']}`
            }
        }).then(res => {
            console.log(res.data.result)
            setName(res.data.result['name'])
            setTitle(res.data.result['title_name'])
            setOft(res.data.result['official_travel_site'])
            setPurposes(res.data.result['purposes'])
            setHotel(res.data.result['hotel'])
            setStart(res.data.result['start_date'])
            setEnd(res.data.result['end_date'])
            setDay(res.data.result['days'])
            setTransport(res.data.result['transport'])
            setLocal(res.data.result['local_transport'])
            setAirfare(res.data.result['airfare'])
            setAirport(res.data.result['airport_tax'])
            setEntertainment(res.data.result['entertainment'])
            setTools(res.data.result['tools'])
            setOthers(res.data.result['others'])
            setReceived(res.data.result['total_received'])
        })
    } catch (error) {
        console.log(error)
    }
}