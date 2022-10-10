import { useEffect, useState } from "react"
import { ReactComponent as Remove } from "../assets/remove.svg"
import { nanoid } from "nanoid"

const TodoList = ({ id }) => {

    const [todoItems, setTodoItems] = useState([])
    let item  //use for new input for the new todo task item

    const getTodoItems = async () => {
        if (!isNaN(id)) {
            const res = await fetch(` https://limitless-temple-30691.herokuapp.com/note/${id}`, { method: 'GET' })
            const data = await res.json()
            const newData = data[0].todolist
            setTodoItems(newData)
        }
    }

    /*     const getTodoItems = async () => {
            if (!isNaN(id)) {
                const res = await fetch(`https://limitless-temple-30691.herokuapp.com/todolist/${id}`, { method: 'GET' })
                const data = await res.json()
                const newData = data[0].todolist
                setTodoItems([newData])
                //console.log(newData)
                //setTodoItems(prev => ([...prev, newData]))
            }
        } */
    useEffect(() => {
        getTodoItems();
    }, [])

    const updateTodo = async (id) => {
        await fetch(`https://limitless-temple-30691.herokuapp.com/todolist/${id}/update`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(todoItems)
        })
    }

    const addTodoItem = () => {
        if (!item) {
            return;
        }
        const newData = {
            todoId: nanoid(),
            todo: item,
            isCheck: false
        }
        setTodoItems(prev => ([...prev, newData]))
        //updateTodo(id)
    }
    //console.log(todoItems)
    const strikThroughTodo = (index) => {
        const { todoId, todo, isCheck } = todoItems[index]
        const newTodo = {
            todoId: todoId,
            todo: todo,
            isCheck: !isCheck
        }
        todoItems[index] = newTodo

    }

    /*     useEffect(() => {
            setTodoItems(() => todoItems)
        }, [count]) */

    const removeTodoItem = (id) => {
        setTodoItems(todoItems.filter(todoItem => todoItem.todoId !== id))
    }

    return (
        <div className="todoList">
            <h1 style={{ 'fontSize': '40px', 'paddingBottom': '5px' }}>Todo List</h1>
            <input className="addInput" type='text'
                onChange={e => item = e.target.value}
                placeholder='when/What need to be done?' />
            <button
                onClick={addTodoItem}
                className='addBtn'
            >+
            </button>
            <div style={{ "paddingRight": '15%' }}>
                {todoItems.map((oneTodo, index) => {
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
                }
            </div>

        </div>
    )

}

export default TodoList