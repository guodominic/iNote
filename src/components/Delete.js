import { createContext } from "react";

const ThemeContext = createContext(null);
const ThemeProvider = ({ children }) => {

    const deleteNote = async (event, id) => {
        event.stopPropagation()
        await fetch(` https://limitless-temple-30691.herokuapp.com/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    return (
        <ThemeContext.Provider value={{ deleteNote }}>
            {children}
        </ThemeContext.Provider>
    )
}

export { ThemeProvider, ThemeContext };