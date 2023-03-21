import React, {useEffect, useState} from 'react';
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
    const [editMode, setEditMode] = useState(false);
    const [selectedTodo, setSelectedTodo] = useState<TodosType>();

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify([
            {id: 1, text: "feels #good", tags: ["#good"]},
            {id: 2, text: "buy #pizza with a lot of #cheese", tags: ["#pizza", "#cheese"]},
        ]));
        
        const storedTodoList = localStorage.getItem('todos');
        setTodos(storedTodoList ? JSON.parse(storedTodoList) : []);
    }, []);

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const findTagsInString = (text: string) => {
        let tags: Array<string> = text.split("#");
        if (tags.length > 1) {
            tags.shift();
            tags = tags.map(t => "#" + t);
            const newText: string = tags.reduce((acc, t) => acc + t + " ", "");
            tags = newText.split(" ")
                .filter(t => t !== "#")
                .filter(t => t.startsWith("#"));
        }
        else
            tags = [];
        return tags;
    }

    const putTodo = (text: string) => {
        const tags: Array<string> = findTagsInString(text);
        setTodos([...todos, {id: Date.now(), text, tags:
                tags.filter((value, index, self) =>
                    self.indexOf(value) === index)}]
        );
    }

    const removeTodo = (id: number) => {
        setTodos(todos.filter(t => t.id !== id));
    }

    const editTodo = (id: number) => {
        setSelectedTodo(todos.filter(t => t.id === id)[0]);
        setEditMode(true);
    }

    const saveTodo = (text: string, tags: Array<string>, id: number) => {
        const tagsInString: Array<string> = findTagsInString(text);
        if (tagsInString.length !== 0) {
            tags = tags.concat(tagsInString);
        }
        setTodos(todos.map(t => {
            if (t.id !== id)
                return t;
            else {
                return {id: t.id, text, tags:
                        tags.filter((value, index, self) =>
                                self.indexOf(value) === index)};
            }
        }));
    }

    const filterTags = (tag: string) => {
        if (savedTodos.length === 0) {
            setSavedTodos(todos);
            setTodos(todos.filter(t => t.tags.includes(tag)));
        } else {
            setTodos(savedTodos.filter(t => t.tags.includes(tag)));
        }
    }

    const showTodos = () => {
        if (savedTodos.length !== 0) {
            setTodos(savedTodos);
            setSavedTodos([]);
        }
    }

    return (
        <div className="app-wrapper">
            <div className="container">
                <h1 className="title">Notes</h1>
                <Form putTodo={putTodo} filterTags={filterTags} showTodos={showTodos} editMode={editMode}/>
                <ul className="todos">
                    {todos.map((t, i) => <TodoItem t={t} editTodo={editTodo} removeTodo={removeTodo} editMode={editMode} key={i}/>)}
                </ul>
                {editMode && <EditForm editMode={editMode} setEditMode={setEditMode} todo={selectedTodo} saveTodo={saveTodo}/>}
            </div>
        </div>
    );
}

export default App;
