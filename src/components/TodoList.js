import { useEffect, useState } from "react"
import { ReactComponent as Remove } from "../assets/remove.svg"
import { nanoid } from "nanoid"

const TodoList = ({ note }) => {
    const id = note.id;
    const [todoItems, setTodoItems] = useState([])
    const [todoItem, setTodoItem] = useState({})
    const [todo, setTodo] = useState('')
    const [change, setChange] = useState(false)

    const getTodoItems = async () => {
        if (!isNaN(id)) {
            const res = await fetch(` https://limitless-temple-30691.herokuapp.com/note/${id}`, { method: 'GET' })
            const data = await res.json()
            const todoFromDb = data[0].todolist
            //console.log(newData)
            setTodoItems(todoFromDb)
        }
    }

    useEffect(() => {
        // getTodoItems();

    }, [])

    const addTodo = async () => {
        await fetch(`https://limitless-temple-30691.herokuapp.com/addTodo/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ todolist: todoItem })
        })
    }

    const addTodoItem = () => {
        if (!todo) {
            return (alert('please enter todo item'))
        } else if (todoItems.length > 14) {
            return (alert('max number of item is 15 per page'))
        }
        const newData = {
            todoId: nanoid(),
            todo: todo,
            isCheck: false
        }
        setTodoItem(newData)
        setTodoItems(prev => prev.concat([newData]))
        //addTodo()
    }
    //console.log('todoitems', todoItems)
    const strikThroughTodo = (index) => {
        console.log(index)
        const { todoId, todo, isCheck } = todoItems[index]
        const newTodo = {
            todoId: todoId,
            todo: todo,
            isCheck: !isCheck
        }
        todoItems[index] = newTodo
        setChange(!change)  //to make the strikthrough shown immideatly
    }


    const removeTodoItem = (id) => {
        setTodoItems(todoItems.filter(todoItem => todoItem.todoId !== id))
    }

    return (
        <div className="todoList">
            <h1 style={{ 'fontSize': '40px', 'paddingBottom': '5px' }}>Todo List</h1>
            <input className="addInput" type='text'
                onChange={e => setTodo(e.target.value)}
                placeholder='demo only, no db set up...' />
            <button
                onClick={addTodoItem}
                className='addBtn'
            >+
            </button>
            <div style={{ "paddingRight": '15%' }}>
                {todoItems.length
                    ?
                    todoItems.map((oneTodo, index) => {
                        return (
                            <div key={oneTodo.todoId} className='notes-list-item'>
                                <div >
                                    <input
                                        type='checkbox'
                                        name='isCheck'
                                        style={{ 'width': '25px', 'marginRight': '10px' }}
                                        onClick={() => strikThroughTodo(index)}
                                    />
                                    <label
                                        htmlFor="isCheck"
                                        className={oneTodo.isCheck ? 'strikeTodo' : ''}
                                    >{oneTodo.todo}</label>
                                </div>
                                <Remove
                                    className="deleteBtn"
                                    onClick={() => removeTodoItem(oneTodo.todoId)}
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

export default TodoList