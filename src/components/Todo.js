import React, {Component} from 'react';
import Editable from './Editable';

class Todo extends Component {
    constructor() {
        super();

        this.state = {
            currentTodo: "",
            todos: [],
            nComplete: 0
        };
    }


    addTaskCompleted(){
        let new_complete = this.nComplete + 1;
        this.setState({nComplete: new_complete});
        localStorage.setItem('nComplete', JSON.stringify(new_complete));
    }

    removeTaskCompleted(){
        let new_complete = this.nComplete - 1;
        this.setState({nComplete: new_complete});
        localStorage.setItem('nComplete', JSON.stringify(new_complete));
    }

    createNewTodo(currentTodo) {
        if(this.state.todos != null) {
            let todosArray = [...this.state.todos];
            todosArray.push({
                todo: currentTodo,
                isCompleted: false,
                category: ""
            });
            this.setState({todos: todosArray});
            const todoData = JSON.stringify(todosArray);
            localStorage.setItem('todo', todoData);
        }
        else{
            let firstTodo = [{
                todo: currentTodo,
                isCompleted: false,
                category: ""
            }];
            this.setState({todos: firstTodo});
            const todoData = JSON.stringify(firstTodo);
            localStorage.setItem('todo', todoData);
        }


    }

    completeTodo(index) {
        let todosArray = [...this.state.todos];
        todosArray[index].isCompleted = !todosArray[index].isCompleted;
        if(todosArray[index].isCompleted){
            this.addTaskCompleted();
        }
        else{
            this.removeTaskCompleted();
        }
        this.setState({todos: todosArray});
        const todoData = JSON.stringify(todosArray);
        localStorage.setItem('todo', todoData);
    }

    deleteTodo(index) {
        let todosArray = [...this.state.todos];
        todosArray.splice(index, 1);
        this.setState({todos: todosArray});
        const todoData = JSON.stringify(todosArray);
        localStorage.setItem('todo', todoData);
    }

    addCategory(index, category){
        let todosArray = [...this.state.todos];
        todosArray[index].category = category;
        this.setState({todos: todosArray});
        const todoData = JSON.stringify(todosArray);
        localStorage.setItem('todo', todoData);
    }


    render() {
        return (
            <div>
                <input className="todo-input"
                       value={this.state.currentTodo}
                       onChange={e => {
                           this.setState({currentTodo: e.target.value});
                       }}
                       onKeyPress={e => {
                           if (e.key === "Enter") {
                               this.createNewTodo(this.state.currentTodo);
                               this.setState({currentTodo: ""});
                           }
                       }}
                       placeholder="What needs to get done?"
                />
                <div className="list-of-todos">
                    {
                        this.state.todos && this.state.todos.map((todo, index) => (
                            <div key={todo} className="todo">
                                <div className="checkbox" onClick={() => this.completeTodo(index)}>
                                    {todo.isCompleted && <span>&#x2714;</span>}
                                </div>
                                <div className={todo.isCompleted ? "done" : ""}>{todo.todo}</div>
                                <div className="category">
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
                                            onChange={e => this.addCategory(index, e.target.value)
                                            }
                                        />
                                    </Editable>
                                </div>
                                <div className="delete" onClick={() => this.deleteTodo(index)}>
                                    &#128465;
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className="completed">
                    {`${this.state.nComplete} items completed`}
                </div>
            </div>
        );
    }
}



export default Todo;


