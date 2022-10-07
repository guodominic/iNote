import React, { useState, useEffect } from 'react'
//import notes from '../assets/data';
import { useParams, useNavigate } from 'react-router-dom';
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg'


const NotePage = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    //const note = notes.find(note => note.id === Number(id))
    const [note, setNote] = useState([])


    useEffect(() => {
        getNote();
    }, [id])


    const getNote = async () => {
        if (!isNaN(id)) {
            const res = await fetch(`http://localhost:3000/note/${id}`, { method: 'GET' })
            const data = await res.json()
            setNote(data[0])
        }
    }

    const updateNote = async () => {
        await fetch(`http://localhost:3000/update/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...note, 'updated': new Date() })
        })
    }

    const deleteNote = async () => {
        await fetch(`http://localhost:3000/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        alert('note deleted')
        navigate('/')
    }

    const createNote = async () => {
        await fetch('http://localhost:3000/note/new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...note, 'updated': new Date() })
        })
    }

    const handleSubmit = () => {
        if (id !== 'new' && !note.body) {
            deleteNote();
        } else if (id !== 'new') {
            updateNote()
        } else if (id === 'new') {
            createNote()
        }
        navigate('/')
    }


    return (
        <div className='note'>
            <div className='note-header'>
                <h3>
                    <ArrowLeft onClick={handleSubmit} />
                </h3>
                {id === 'new' ? <button onClick={handleSubmit}>Done</button> : <button onClick={deleteNote}>Delete</button>}
            </div>
            <textarea value={note.body ? note.body : ''} onChange={e => { setNote({ 'id': id, 'body': e.target.value, 'updated': new Date() }) }}>
            </textarea>
        </div >
    )
}

export default NotePage