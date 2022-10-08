import React, { useState, useEffect } from 'react'
//import notes from '../assets/data';
import { useParams, useNavigate } from 'react-router-dom';
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg'
import { ReactComponent as Addlist } from '../assets/addlist.svg';


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
            const res = await fetch(` https://limitless-temple-30691.herokuapp.com/note/${id}`, { method: 'GET' })
            const data = await res.json()
            setNote(data[0])
        }
    }

    const updateNote = async () => {
        await fetch(` https://limitless-temple-30691.herokuapp.com/update/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...note })
        })
    }

    const deleteNote = async () => {
        await fetch(` https://limitless-temple-30691.herokuapp.com/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        alert('note deleted')
        navigate('/iNote')
    }

    const createNote = async () => {
        await fetch(' https://limitless-temple-30691.herokuapp.com/note/new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...note })
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
        navigate('/iNote')
    }

    const addJokeSetUp = () => {
        fetch('https://v2.jokeapi.dev/joke/Any?')
            .then(res => res.json())
            .then(joke => {
                joke.setup ?
                    setNote(prev => ({
                        ...note,
                        'body': prev.body + `\n\nJoke setup: ` + joke.setup + `\nJoke: ` + joke.delivery
                    }))
                    : setNote(prev => ({
                        ...note,
                        'body': prev.body + `\nJoke: ` + joke.joke
                    }))
            })
    }


    return (
        <div className='note'>
            <div className='note-header'>
                <h3>
                    <ArrowLeft onClick={handleSubmit} />
                </h3>
                {
                    id === 'new' ?
                        <button onClick={handleSubmit}>Done</button>
                        : <button onClick={deleteNote}>Delete</button>}
            </div>
            <textarea
                value={note.body ? note.body : ''}
                onChange={e => {
                    setNote({
                        'id': id,
                        'body': e.target.value,
                        'updated': new Date()
                    })
                }}>
            </textarea>
            <div className='floating-button' >
                <Addlist className='smaller' onClick={addJokeSetUp} />
            </div>
        </div >
    )
}

export default NotePage