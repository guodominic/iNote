import { useEffect, useState } from "react"
import { ReactComponent as Remove } from "../assets/remove.svg"

const TodoPage = () => {

    const [todoItems, setTodoItems] = useState([])
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
            created_at: new Date(),
            is_checked: false
        }
        setTodoItems(prev => prev.concat([newData]))
        addTodoItemDb()
    }
    const strikThroughTodo = (index) => {
        const newIndex = todoItems.length - index - 1;
        const { id, is_checked } = todoItems[newIndex]
        const newTodo = {
            ...todoItems[newIndex],
            is_checked: !is_checked
        }
        if (!isNaN(id)) {
            todoItems[newIndex] = newTodo
            updateTodoItems(id)
        } else (
            alert('you just created it! Comeback to check')
        )
        setChange(!change)
    }

    const updateTodoItems = async (id) => {
        const todoItem = todoItems.filter(todoItem => todoItem.id === id);
        console.log(JSON.stringify(todoItem[0]))
        await fetch(`https://limitless-temple-30691.herokuapp.com/todo_update/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(todoItem[0])
        })
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
        if (!isNaN(id)) {
            setTodoItems(todoItems.filter(todoItem => todoItem.id !== id))
            removeTodoItemDb(id);
        } else (
            alert('you just created it! Comeback to delete')
        )
    }

    //this is to show the date the todo item was created
    const dateCreated = (oneTodo) => {
        return new Date(oneTodo.created_at).toLocaleDateString()
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
                            <div
                                key={index}
                                className='notes-list-item'>
                                <div >
                                    <label
                                        className={oneTodo.is_checked ? 'strikeTodo' : ''}
                                    >
                                        <input
                                            type='checkbox'
                                            name='is_checked'
                                            style={{ 'width': '25px', 'marginRight': '10px' }}
                                            onChange={() => strikThroughTodo(index)}
                                            checked={oneTodo.is_checked}
                                        />
                                        {oneTodo.todo_item}
                                    </label>
                                </div >
                                <p className="deleteBtn"><span>{dateCreated(oneTodo)}</span></p>
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