import React, {useState} from 'react';
import './App.scss';
import Form from "./components/Form/Form";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';

const App: React.FC = () => {
    type todosType = {
        id: number
        text: String
        done: boolean
    }
    const [todos, setTodos] = useState<todosType[]>([]);

    const putTodo = (value: String) => {
        setTodos([...todos, {id: Date.now(), text: value, done: false}]);
    }

    const removeTodo = (id: number) => {
        setTodos(todos.filter(t => t.id !== id));
    }

    const editTodo = (id: number) => {
        setTodos(todos.filter(t => t.id !== id));
    }

    return (
        <div className="app-wrapper">
            <div className="container">
                <h1 className="title">Notes</h1>
                <Form putTodo={putTodo}/>
                <ul className="todos">
                    {todos.map(t =>
                        <li className="todo" key={t.id}>
                            {t.text}
                            <EditIcon className="edit" onClick={() => editTodo(t.id)}/>
                            <DeleteOutlineIcon className="delete" onClick={() => removeTodo(t.id)}/>
                        </li>)}
                </ul>
            </div>
        </div>
    );
}

export default App;
