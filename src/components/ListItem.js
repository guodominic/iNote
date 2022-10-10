import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { ReactComponent as Delete } from '../assets/delete.svg'
import { ThemeContext } from './Delete'


const ListItem = ({ note, notes, index }) => {

    const { deleteNote } = useContext(ThemeContext);
    const navigate = useNavigate()

    const getDate = (note) => {
        return (
            new Date(note.lastupdate).toLocaleDateString() + ' ' + new Date(note.lastupdate).toLocaleTimeString()
        )
    }
    let noteNumber = notes.length - index;
    return (
        <div className='notes-list-item' onClick={() => navigate(`/note/${note.id}`)}>
            <div>
                <h3>
                    {note.body ?
                        '#' + noteNumber + ': ' + note.body.slice(0, 30)
                        : 'empty note'} ...
                </h3>
                <p><span>{getDate(note)}</span></p>
            </div>
            <button
                className='deleteBtn'
                onClick={(event) => deleteNote(event, note.id)}>
                <Delete className='deleteIcon' />
            </button>
        </div>

    )
}

export default ListItem