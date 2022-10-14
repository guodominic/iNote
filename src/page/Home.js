import './HomePage.css'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate()

    return (
        <main className='bg-pattern'>
            <h1 className='newFont'>iNote</h1>
            <button
                className='homeBtn'
                onClick={() => navigate("/iNote")}
                style={{ 'marginBottom': '60px' }}
            >Create Notes
            </button>
            <button
                className='homeBtn'
                onClick={() => navigate("/todolist")}
            >Create Todo List</button>
        </main>
    )
}

export default Home