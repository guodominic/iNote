import { createContext } from "react";
import { useParams, useNavigate } from 'react-router-dom';

const ThemeContext = createContext(null);
const ThemeProvider = ({ children }) => {
    const { id } = useParams()
    const navigate = useNavigate()

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

    return (
        <ThemeContext.Provider value={{ deleteNote }}>
            {children}
        </ThemeContext.Provider>
    )
}

export { ThemeProvider, ThemeContext };