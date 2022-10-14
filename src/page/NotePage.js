import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg'
import { ReactComponent as Addjokes } from '../assets/addjokes.svg';
import TodoList from '../components/TodoList';
import { ReactComponent as TogglOff } from "../assets/toggle-off.svg";
import { ReactComponent as TogglOn } from "../assets/toggle-on.svg";
import { ReactComponent as Delete } from '../assets/delete.svg';



const NotePage = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [note, setNote] = useState([])
    const [haveTodos, setHaveTodos] = useState(false)

    useEffect(() => {
        getNote();
    }, [id])

    //console.log(note.todolist);

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
            body: JSON.stringify(note)
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
            body: JSON.stringify({ 'body': note.body })
        })
    }

    const handleSubmit = () => {
        setHaveTodos(false)
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
                        'body': (prev.body ? prev.body : 'Thanks for getting random jokes:') + `\n\nJoke setup: ` + joke.setup + `\nJoke: ` + joke.delivery
                    }))
                    : setNote(prev => ({
                        ...note,
                        'body': (prev.body ? prev.body : 'Thanks for getting random jokes:') + `\n\nJoke: ` + joke.joke
                    }))
            })
    }

    const createTodo = () => {
        setHaveTodos(!haveTodos)
    }

    return (
        <div className='note'>
            <div className='note-header'>
                <h3>
                    <ArrowLeft onClick={handleSubmit} style={{ 'cursor': 'pointer', 'width': '25px' }} />
                </h3>
                <div className='switch'>
                    <h2 style={{ 'paddingRight': '10px', 'paddingTop': '3px' }}>Note &#8606;</h2>

                    <div onClick={createTodo} >
                        {
                            haveTodos ?
                                <TogglOn style={{ 'cursor': 'pointer' }} />
                                :
                                <TogglOff style={{ 'cursor': 'pointer' }} />
                        }

                    </div>
                    <h2 style={{ 'paddingLeft': '10px', 'paddingTop': '3px' }}>&#8608; Todo</h2>
                </div >
                {
                    id === 'new' ?
                        <button
                            onClick={handleSubmit}
                            style={{ 'cursor': 'pointer' }}
                        >Done
                        </button>
                        : <Delete
                            onClick={deleteNote}
                            style={{ 'width': '25px', 'cursor': 'pointer', 'fill': 'rgb(255, 200, 0)' }}
                        />
                }
            </div>
            <div>
                {haveTodos ?
                    <TodoList note={note} />
                    :
                    <div>
                        <h1 style={{ 'fontSize': '40px', 'paddingLeft': '25px' }}
                        >Notes
                        </h1>
                        <textarea
                            placeholder='generate random jokes using shuffle icon (botton right corner)... '
                            value={note.body ? note.body : ''}
                            onChange={e => {
                                setNote({
                                    'body': e.target.value,
                                    //s'lastupdate': new Date(),
                                    //'todolist': [{ "todoId": "123", "todo": "noding", "isCheck": false }]
                                })
                            }}>
                        </textarea >
                        <div className='jokeBtn' >
                            <Addjokes className='smaller' onClick={addJokeSetUp} />
                        </div>
                    </div>
                }

            </div>

        </div >
    )
}

export default NotePage