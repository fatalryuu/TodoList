import React, {useState} from 'react';
import './App.scss';
import Form from "./components/Form/Form";
import TodoItem from "./components/TodoItem/TodoItem";

const App: React.FC = () => {
    type TodosType = {
        id: number
        text: string
        tags: Array<string>
    }
    const [todos, setTodos] = useState<TodosType[]>([]);
    const [savedTodos, setSavedTodos] = useState<TodosType[]>([]);

    const putTodo = (value: string) => {
        setTodos([...todos, {id: Date.now(), text: value, tags: ["#home", "#shop"]}]);
    }

    const removeTodo = (id: number) => {
        setTodos(todos.filter(t => t.id !== id));
    }

    const editTodo = (id: number) => {

    }

    const filterTags = (tag: string) => {
        setSavedTodos(todos);
        setTodos(todos.filter(t => t.tags.includes(tag)));
    }

    const showTodos = () => {
        setTodos(savedTodos);
    }

    return (
        <div className="app-wrapper">
            <div className="container">
                <h1 className="title">Notes</h1>
                <Form putTodo={putTodo} filterTags={filterTags} showTodos={showTodos}/>
                <ul className="todos">
                    {todos.map(t => <TodoItem t={t} editTodo={editTodo} removeTodo={removeTodo}/>)}
                </ul>
            </div>
        </div>
    );
}

export default App;
