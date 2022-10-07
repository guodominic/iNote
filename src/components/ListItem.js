import React from 'react'
import { Link } from 'react-router-dom'
import { ReactComponent as Delete } from '../assets/delete.svg'

const ListItem = ({ note, isDark }) => {
    const getDate = (note) => {
        return (
            new Date(note.updated).toLocaleDateString() + ' ' + new Date(note.updated).toLocaleTimeString()
        )
    }
    return (
        <Link to={`/note/${note.id}`}>
            <div className='notes-list-item'>
                <div>
                    <h3>
                        {note.body ? note.body.slice(0, 30) : 'empty note'} ...
                    </h3>
                    <p><span>{getDate(note)}</span></p>
                </div>
                <Delete className={isDark ? 'darkDelete' : 'lightDelete'} />
            </div>
        </Link>
    )
}

export default ListItem