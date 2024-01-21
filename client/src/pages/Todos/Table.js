import React, { useEffect, useState } from 'react'
import axios from 'axios'


const Index = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [documents, setDocuments] = useState([])
    const URL = 'http://localhost:8000'


    useEffect(() => {
        axios.get(`${URL}/readTodos`)
            .then((res) => {
                const { data } = res;
                setDocuments(data)
            })
            .catch((err) => {
                console.log('err', err)
            })
        // .finally(() => {
        //     setIsLoading(false)
        // })
    }, []);

    const handleEdit = todo => {
        console.log('todo for edit', todo)

        axios.post(`${URL}/updateTodo`, todo)
            .then(res => {
                console.log('Response', res)
            })
            .catch(err => {
                console.log('err', err)
            })
    }
    const handleDelete = todo => {
        console.log('todo for delete', todo)

        axios.post(`${URL}/deleteTodo`, todo)
            .then(res => {
                console.log('Response', res)
                if (res.data === 'Deleted Successfully') {
                    let documentAfterDelete = documents.filter(doc => doc._id !== todo._id)
                    setDocuments(documentAfterDelete)
                }
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
                        <h1 className="text-center pb-4">Todos</h1>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Title</th>
                                    <th scope="col">Location</th>
                                    <th scope="col">Description</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {documents.map((todo, i) => {
                                    return (
                                        <tr key={i}>
                                            <th scope="row">{i + 1}</th>
                                            <td>{todo.title}</td>
                                            <td>{todo.location}</td>
                                            <td>{todo.description}</td>
                                            <td>
                                                <button className="btn btn-sm btn-outline-info mx-1" onClick={() => { handleEdit(todo) }}>Edit</button>
                                                <button className="btn btn-sm btn-outline-danger" onClick={() => { handleDelete(todo) }}>Delete</button>
                                            </td>
                                        </tr>
                                    )
                                })}

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Index
