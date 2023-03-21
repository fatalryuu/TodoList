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
    editMode: boolean
}

const TodoItem: React.FC<PropsType> = ({t, editTodo, removeTodo, editMode}) => {
    const disabledClass: string = editMode ? "disabled" : "";
    return (
        <li className={`todo ${disabledClass}`} key={t.id}>
            <div>
                <span className="text">{t.text}</span>
                <EditIcon className={`edit ${disabledClass}`} onClick={() => editMode ? null : editTodo(t.id)}/>
                <DeleteOutlineIcon className={`delete ${disabledClass}`} onClick={() => editMode ? null : removeTodo(t.id)}/>
            </div>
            <div className="tags">
                {t.tags.map((tag, i) => <Tag editMode={editMode} text={tag} deleteTag={null} id={i} key={i}/>)}
            </div>
        </li>
    );
};

export default TodoItem;