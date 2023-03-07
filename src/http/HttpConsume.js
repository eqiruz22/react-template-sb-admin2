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
            setPerdin(res.data.result[0])
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

export const getPerdinDailyById = async (user, keyword, page, limit, setUserdaily, setPage, setLimit, setRows, setPages, setLoading) => {
    try {
        await axios.get(`http://localhost:4001/user/perdin-show-daily/${user['id']}?query=${keyword}&page=${page}&limit=${limit}`, {
            headers: {
                'Authorization': `Bearer ${user['token']}`
            }
        }).then(res => {
            console.log(res.data)
            setUserdaily(res.data.result[0])
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
            console.log(res.result)
            setPerdin(res.result[0])
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
        }).then(result => {
            console.log(result)
            setPerdin(result.result[0])
            setLoading(false)
        })
    } catch (error) {
        console.log(error)
    }
}