import React, {useState} from 'react';
import './App.scss';
import Form from "./components/Form/Form";
import TodoItem from "./components/TodoItem/TodoItem";
import EditForm from "./components/EditForm/EditForm";

export type TodosType = {
    id: number
    text: string
    tags: Array<string>
}

const App: React.FC = () => {
    const [todos, setTodos] = useState<TodosType[]>([]);
    const [savedTodos, setSavedTodos] = useState<TodosType[]>([]);
    const [showEditWindow, setShowEditWindow] = useState(false);
    const [selectedTodo, setSelectedTodo] = useState<TodosType>();

    const checkTodosInString = (text: string) => {
        let tags: Array<string> = text.split("#");
        if (tags.length > 1) {
            tags.shift();
            tags = tags.map(t => "#" + t);
            const newText: string = tags.reduce((acc, t) => acc + t);
            tags = newText.split(" ");
            tags = tags.filter(t => t.startsWith("#"));
        }
        else
            tags = [];
        return tags;
    }

    const putTodo = (text: string) => {
        const tags = checkTodosInString(text);
        setTodos([...todos, {id: Date.now(), text, tags}]);
    }

    const removeTodo = (id: number) => {
        setTodos(todos.filter(t => t.id !== id));
    }

    const editTodo = (id: number) => {
        setSelectedTodo(todos.filter(t => t.id === id)[0]);
        setShowEditWindow(true);
    }

    const saveTodo = (text: string, tags: Array<string>, id: number) => {
        const tagsInString = checkTodosInString(text);
        if (tagsInString.length !== 0) {
            tags = tags.concat(tagsInString);
        }
        setTodos(todos.map(t => {
            if (t.id !== id)
                return t;
            else {
                return {id: t.id, text, tags: t.tags};
            }
        }));
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
                {showEditWindow && <EditForm setShowEditWindow={setShowEditWindow} todo={selectedTodo} saveTodo={saveTodo}/>}
            </div>
        </div>
    );
}

export default App;
