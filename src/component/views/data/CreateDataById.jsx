import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

const CreateDataById = () => {
    const [title, setTitle] = useState('')
    const [name, setName] = useState('')
    const [hardship, setHardship] = useState('')
    const [meal, setMeal] = useState('')
    const [pulsa, setPulsa] = useState('')
    const [rent, setRent] = useState('')
    const { id } = useParams()

    const getById = async () => {
        try {
            await axios.get(`http://localhost:4001/user/show/title-user/${id}`)
                .then(res => {
                    console.log(res.data)
                    setName(res.data.name)
                    setHardship(res.data.meal_allowance)
                    setMeal(res.data.hardship_allowance)
                    setPulsa(res.data.pulsa_allowance)
                    setRent(res.data.rent_house)
                    setTitle(res.data.title_name)
                })
        } catch (error) {
            console.log(error)
        }
    }

    getById()

    return (
        <div>
            <h1>Create By Id</h1>
            <ol>
                <li>{name}</li>
                <li>{title}</li>
                <li>{hardship}</li>
                <li>{meal}</li>
                <li>{pulsa}</li>
                <li>{rent}</li>
            </ol>
        </div>
    )
}

export default CreateDataById