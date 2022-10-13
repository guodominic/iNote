import React from 'react'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ListItem from '../components/ListItem';
import { ReactComponent as Plus } from '../assets/plus.svg';


const NoteListPage = ({ isDark }) => {

    const [notes, setNotes] = useState([])

    useEffect(() => {
        getNotes()
    }, [notes.length])


    const getNotes = async () => {
        const res = await fetch('https://limitless-temple-30691.herokuapp.com/iNote/', { method: 'GET' })
        const data = await res.json()
        setNotes(data)
    }

    return (
        <div >
            <div className='notes-header'>
                <h2 className='notes-title'>Total Notes:</h2>
                <p className='notes-count'>{notes.length}</p>
            </div>

            <div className='notes-list'>
                {notes.slice(0).reverse().map((note, index) => (
                    <ListItem key={index} note={note} isDark={isDark} notes={notes} index={index} setNotes={setNotes} />
                ))}
            </div>

            <Link to='/note/new' className='floating-button'>
                <Plus />
            </Link>
        </div>
    )
}

export default NoteListPage