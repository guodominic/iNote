import React from 'react'
//import notes from '../assets/data';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ListItem from '../components/ListItem';
import { ReactComponent as Plus } from '../assets/plus.svg';
import { ThemeProvider } from '../components/Delete'

const NoteListPage = ({ isDark }) => {

    const [notes, setNotes] = useState([])

    useEffect(() => {
        getNotes()
    }, [notes])

    const getNotes = async () => {
        const res = await fetch('http://localhost:3000/notes/', { method: 'GET' })
        const data = await res.json()
        setNotes(data)
    }

    return (
        <div >
            <div className='notes-header'>
                <h2 className='notes-title'>Total Notes:</h2>
                <p className='notes-count'>{notes.length}</p>
            </div>
            <ThemeProvider>
                <div className='notes-list'>
                    {notes.slice(0).reverse().map((note, index) => (
                        <ListItem key={index} note={note} isDark={isDark} notes={notes} index={index} />
                    ))}
                </div>
            </ThemeProvider>
            <Link to='/note/new' className='floating-button'>
                <Plus />
            </Link>
        </div>
    )
}

export default NoteListPage