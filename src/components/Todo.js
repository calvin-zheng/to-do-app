    import React, { useState, useEffect } from 'react';
    import Editable from './Editable';

    function Todo() {
        const [currentTodo, setCurrentTodo] = useState("");
        const [todos, setTodos] = useState([]);
        const [nComplete, setComplete] = useState(0);
        const [category, setCategory] = useState("");
        const [categories, setCategories] = useState("");

        useEffect(() => {
            const list = localStorage.getItem('todo');
            const todoItems = JSON.parse(list);
            setTodos(todoItems);
            if(JSON.parse(localStorage.getItem('nComplete')) != null) {
                setComplete(JSON.parse(localStorage.getItem('nComplete')));
            }
        }, []);

        function addTaskCompleted(){
            let new_complete = nComplete + 1;
            setComplete(new_complete);
            localStorage.setItem('nComplete', JSON.stringify(new_complete));
        }

        function removeTaskCompleted(){
            let new_complete = nComplete - 1;
            setComplete(new_complete);
            localStorage.setItem('nComplete', JSON.stringify(new_complete));
        }

        function createNewTodo(currentTodo) {
            if(todos != null) {
                let todosArray = [...todos];
                todosArray.push({
                    todo: currentTodo,
                    isCompleted: false,
                    category: ""
                });
                setTodos(todosArray);
                const todoData = JSON.stringify(todosArray);
                localStorage.setItem('todo', todoData);
            }
            else{
                let firstTodo = [{
                    todo: currentTodo,
                    isCompleted: false,
                    category: ""
                }];
                setTodos(firstTodo);
                const todoData = JSON.stringify(firstTodo);
                localStorage.setItem('todo', todoData);
            }


        }

        function completeTodo(index) {
            let todosArray = [...todos];
            todosArray[index].isCompleted = !todosArray[index].isCompleted;
            if(todosArray[index].isCompleted){
                addTaskCompleted()
            }
            else{
                removeTaskCompleted()
            }
            setTodos(todosArray);
            const todoData = JSON.stringify(todosArray);
            localStorage.setItem('todo', todoData);
        }

        function deleteTodo(index) {
            let todosArray = [...todos];
            todosArray.splice(index, 1);
            setTodos(todosArray);
            const todoData = JSON.stringify(todosArray);
            localStorage.setItem('todo', todoData);
        }

        function addCategory(index, category){
            let todosArray = [...todos];
            todosArray[index].category = category;
            setTodos(todosArray);
            const todoData = JSON.stringify(todosArray);
            localStorage.setItem('todo', todoData);
        }



    return (
        <div>
        <input className="todo-input"
               value={currentTodo}
               onChange={e => {
                   setCurrentTodo(e.target.value);
               }}
               onKeyPress={e => {
                   if (e.key === "Enter") {
                       createNewTodo(currentTodo);
                       setCurrentTodo("");
                   }
               }}
               placeholder="What needs to get done?"
        />
        <div className="list-of-todos">
            {
                todos  && todos.map((todo, index) => (
                    <div key={todo} className="todo">
                        <div className="checkbox" onClick={() => completeTodo(index)}>
                            {todo.isCompleted && <span>&#x2714;</span>}
                        </div>
                        <div className={todo.isCompleted ? "done" : ""}>{todo.todo}</div>
                        <div className = "category">
                            <Editable
                                text={todo.category}
                                placeholder={"Add Category"}
                                type="input"
                                >
                                    <input
                                        type="text"
                                        name="category"
                                        placeholder="Category"
                                        value={todo.category}
                                        onChange={e => addCategory(index, e.target.value)
                                            }
                                        />
                            </Editable>
                        </div>
                        <div className="delete" onClick={() => deleteTodo(index)}>
                            &#128465;
                        </div>
                    </div>
                ))
            }
        </div>
            <div className = "completed" >
                {`${nComplete} items completed`}
            </div>
        </div>
    );
    }



    export default Todo;
