import { useEffect, useState } from "react"
import { ReactComponent as Remove } from "../assets/remove.svg"

const TodoPage = () => {


    const [todoItems, setTodoItems] = useState([])
    const [todoItem, setTodoItem] = useState({})
    const [todo, setTodo] = useState('')
    const [change, setChange] = useState(false)

    const getTodoItems = async () => {
        const res = await fetch(` https://limitless-temple-30691.herokuapp.com/todolist`, { method: 'GET' })
        const data = await res.json()
        const todoFromDb = data
        //console.log(newData)
        setTodoItems(todoFromDb)
    }

    useEffect(() => {
        getTodoItems();

    }, [])

    const addTodoItemDb = async () => {
        await fetch(`https://limitless-temple-30691.herokuapp.com/todolist/new`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'todo_item': todo })
        })
    }

    const addTodoItem = () => {
        if (!todo) {
            return (alert('please enter todo item'))
        } else if (todoItems.length > 14) {
            return (alert('max number of item is 15 per page'))
        }
        const newData = {
            todo_item: todo,
            is_checked: false
        }
        setTodoItem(newData)
        setTodoItems(prev => prev.concat([newData]))
        addTodoItemDb()
    }
    const strikThroughTodo = (index) => {

        const newIndex = todoItems.length - index - 1;
        console.log(newIndex)

        const { todo_item, is_checked } = todoItems[newIndex]
        const newTodo = {
            todo_item: todo_item,
            is_checked: !is_checked
        }
        todoItems[newIndex] = newTodo
        setChange(!change)  //to make the strikthrough shown immideatly
    }

    const removeTodoItemDb = async (id) => {
        await fetch(`https://limitless-temple-30691.herokuapp.com/todo_delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    const removeTodoItem = (id) => {
        console.log(id)
        setTodoItems(todoItems.filter(todoItem => todoItem.id !== id))
        removeTodoItemDb(id);
    }

    return (
        <div className="todoList">
            <h1 style={{ 'fontSize': '40px', 'paddingBottom': '5px' }}>Todo List</h1>
            <input className="addInput" type='text'
                onChange={e => setTodo(e.target.value)}
                placeholder='When/What need to be done' />
            <button
                onClick={addTodoItem}
                className='addBtn'
            >+
            </button>
            <div style={{ "paddingRight": '15%' }}>
                {todoItems.length
                    ?
                    todoItems.slice(0).reverse().map((oneTodo, index) => {
                        return (
                            <div className='notes-list-item'>
                                <div >
                                    <input
                                        type='checkbox'
                                        name='is_checked'
                                        style={{ 'width': '25px', 'marginRight': '10px' }}
                                        onClick={() => strikThroughTodo(index)}
                                    />
                                    <label
                                        key={oneTodo.id}
                                        htmlFor="is_checked"
                                        className={oneTodo.is_checked ? 'strikeTodo' : ''}
                                    >{oneTodo.todo_item}</label>
                                </div>
                                <Remove
                                    className="deleteBtn"
                                    onClick={() => removeTodoItem(oneTodo.id)}
                                />
                            </div>
                        )
                    })
                    :
                    <div style={{ 'padding': '20px', 'color': 'orange' }}>
                        <h1>You are all clear!</h1>
                    </div>
                }
            </div>

        </div>
    )

}

export default TodoPage