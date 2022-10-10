import { useEffect, useState } from "react"
import { ReactComponent as Remove } from "../assets/remove.svg"
import { nanoid } from "nanoid"

const TodoList = () => {

    const [todoItems, setTodoItems] = useState([])
    let item

    const addTodoItem = () => {
        if (!item) {
            return;
        }
        setTodoItems(todoItems.concat({
            todoId: nanoid(),
            todo: item,
            isCheck: false
        }))
    }

    const strikThroughTodo = (index) => {
        const { todoId, todo, isCheck } = todoItems[index]
        const newTodo = {
            todoId: todoId,
            todo: todo,
            isCheck: !isCheck
        }
        todoItems[index] = newTodo
        setTodoItems(() => todoItems)
    }

    const removeTodoItem = (id) => {
        setTodoItems(todoItems.filter(todoItem => todoItem.todoId !== id))
    }

    return (
        <div className="todoList">
            <h1 style={{ 'fontSize': '40px', 'paddingBottom': '5px' }}>Todo List</h1>
            <input className="addInput" type='text'
                onChange={e => item = e.target.value}
                placeholder='What need to be done?' />
            <button
                onClick={addTodoItem}
                className='addBtn'
            >Add
            </button>
            <div style={{ "paddingRight": '15%' }}>
                {todoItems.map((oneTodo, index) => {
                    return (
                        <div key={oneTodo.todoId} className='notes-list-item'>
                            <div >
                                <input
                                    type='checkbox'
                                    style={{ 'width': '25px', 'marginRight': '10px' }}
                                    onClick={() => strikThroughTodo(index)}
                                />
                                <label
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