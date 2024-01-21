import React, { useState } from 'react'
import axios from 'axios'

const initialState = { title: '', location: '', description: '' }

const Add = () => {
    const [state, setState] = useState(initialState)
    const URL = 'http://localhost:8000'

    const handleChange = e => {
        const { name, value } = e.target
        setState(s => ({ ...s, [name]: value }))
    }

    const handleSubmit = e => {
        e.preventDefault();

        let { title, location, description } = state;
        title = title.trim()
        location = location.trim()
        description = description.trim()

        if (title.length < 3) { return alert("Please Enter Title") }
        if (location.length < 3) { return alert("Please Enter location") }
        if (description.length < 8) { return alert("Please Enter description") }

        let todo = {
            title, location, description,
            // state: "active", 
            // dateCreated: new Date().getTime() 
        }

        axios.post(`${URL}/createTodo`, todo)
            .then(res => {
                console.log('Response', res)
            })
            .catch(err => {
                console.log('err', err)
            })
    }

    return (
        <div className='py-5'>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h1 className="text-center pb-4">Add Todo</h1>
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="row w-75 mx-auto">
                        <div className="col-12 col-md-6 mb-3">
                            <input type="text" name="title" placeholder='Title' className='form-control' onChange={handleChange} />
                        </div>
                        <div className="col-12 col-md-6 mb-3">
                            <input type="text" name="location" placeholder='Location' className='form-control' onChange={handleChange} />
                        </div>
                        <div className="col-12 mb-3">
                            <textarea name="description" placeholder='Description' className='form-control' onChange={handleChange} />
                        </div>
                        <div className="col-12 col-md-6 offset-md-3">
                            <button className="btn btn-primary w-100" type='submit'>Add Todo</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Add
