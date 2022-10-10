
import { useNavigate } from 'react-router-dom'
import { ReactComponent as Delete } from '../assets/delete.svg'



const ListItem = ({ note, notes, index, setNotes }) => {


    const navigate = useNavigate()

    const deleteNote = async (event) => {
        //event.stopPropagation()
        await fetch(`https://limitless-temple-30691.herokuapp.com/delete/${note.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        navigate('/iNote')
    }

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
                onClick={event => deleteNote(event)}>
                <Delete className='deleteIcon' />
            </button>
        </div>

    )
}

export default ListItem