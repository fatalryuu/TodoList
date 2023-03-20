import React from 'react';
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Tag from "../Tag/Tag";
import '../../App.scss'

type TodosType = {
    id: number
    text: string
    tags: Array<string>
}

type PropsType = {
    t: TodosType
    editTodo: (id: number) => void
    removeTodo: (id: number) => void
}

const TodoItem: React.FC<PropsType> = ({t, editTodo, removeTodo}) => {
    return (
        <li className="todo" key={t.id}>
            <div>
                {t.text}
                <EditIcon className="edit" onClick={() => editTodo(t.id)}/>
                <DeleteOutlineIcon className="delete" onClick={() => removeTodo(t.id)}/>
            </div>
            <div className="tags">
                {t.tags.map(tag => <Tag text={tag}/>)}
            </div>
        </li>
    );
};

export default TodoItem;