    import React, { useState, useEffect, useRef } from 'react';

    function Todo() {
        const [currentTodo, setCurrentTodo] = useState("");
        const [todos, setTodos] = useState([]);
        const nTasks = useRef();

        useEffect(() => {
            const list = localStorage.getItem('todo');
            const todoItems = JSON.parse(list);
            setTodos(todoItems);
            nTasks.current = JSON.parse(localStorage.getItem('nTasks'));
            if(nTasks.current === null)
            {
                nTasks.current = 0;
            }
        }, []);

        function addTaskCompleted(){
            nTasks.current += 1;
            console.log(nTasks.current);
            localStorage.setItem('nTasks', JSON.stringify(nTasks));
        }

        function removeTaskCompleted(){
            nTasks.current -= 1;
            console.log(nTasks.current);
            localStorage.setItem('nTasks', JSON.stringify(nTasks));
        }

        function createNewTodo(currentTodo) {
            if(todos != null) {
                let todosArray = [...todos];
                todosArray.push({
                    todo: currentTodo,
                    isCompleted: false
                });
                setTodos(todosArray);
                const todoData = JSON.stringify(todosArray);
                localStorage.setItem('todo', todoData);
            }
            else{
                let firstTodo = [{
                    todo: currentTodo,
                    isCompleted: false
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


    return <div>
        <input className="todo-input"
               value={currentTodo}
               onChange={e => {
                   setCurrentTodo(e.target.value);
               }}
               onKeyPress={e => {
                   if (e.key === "Enter") {
                       createNewTodo(currentTodo);
                       setCurrentTodo("")
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
                        <div className="delete" onClick={() => deleteTodo(index)}>
                            &#128465;
                        </div>
                    </div>
                ))
            }
<<<<<<< HEAD
=======
            </div>

            <div className = "completed" >
                {`${nTasks.current} items completed`}
            </div>
>>>>>>> parent of 734511a... let's try again
        </div>

    </div>;
    }



    export default Todo;
