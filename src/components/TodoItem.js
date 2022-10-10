import { useState } from "react"
import { ReactComponent as Remove } from "../assets/remove.svg"

const TodoList = ({ id }) => {

    const [todoItems, setTodoItems] = useState([])
    const [todoItem, setTodoItem] = useState([])
    const [isCheck, setIsCheck] = useState(false)

    const handleChange = (e) => {
        const item = e.target.value;
        setTodoItem({
            id: id,
            todo: item,
            stauts: isCheck
        });
    }

    const addTodoItem = () => {
        if (!todoItem) {
            return;
        }
        setTodoItems(todoItems.concat(todoItem))
    }

    const removeTodoItem = () => {

    }

    return (
        <div className="todoList">
            <h1 style={{ 'fontSize': '40px', 'paddingBottom': '5px' }}>Todo List</h1>
            <input className="addInput" type='text' onChange={handleChange} placeholder='What need to be done?' />
            <button onClick={addTodoItem} className='addBtn'>Add</button>
            <div style={{ "paddingRight": '15%' }}>
                {todoItems.map(todoitem => {
                    return (
                        <div className='notes-list-item'>
                            <div>
                                <input type='checkbox' style={{ 'width': '25px', 'marginRight': '10px' }} />
                                <label>{todoitem}</label>
                            </div>
                            <Remove className="deleteBtn" onClick={removeTodoItem} />
                        </div>
                    )
                })
                }
            </div>

        </div>
    )

}

export default TodoList