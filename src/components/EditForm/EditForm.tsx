import React, {useEffect, useState} from 'react';
import './EditForm.scss';
import {TodosType} from "../../App";
import Tag from "../Tag/Tag";

type PropsType = {
    setShowEditWindow: (showEditWindow: boolean) => void
    todo: TodosType | undefined
    saveTodo: (text: string, tags: Array<string>, id: number) => void
}

const EditForm: React.FC<PropsType> = ({setShowEditWindow, todo, saveTodo}) => {
    const [text, setText] = useState("");
    const [tags, setTags] = useState<Array<string>>([]);
    useEffect(() => {
        if (todo) {
            setText(todo.text);
            setTags(todo.tags);
        }
    }, []);
    const handleCloseButtonClick = () => {
        setShowEditWindow(false);
    }
    const handleInputChange = (e: any) => {
        setText(e.target.value);
    }
    const handleSaveButtonClick = () => {
        if (todo)
            saveTodo(text, tags, todo.id);
        setShowEditWindow(false);
    }
    return (
        <div className="window">
            <button className="close" onClick={handleCloseButtonClick}>X</button>
            <h2>Edit</h2>
            <form>
                <div>
                    <input type="text" value={text} onChange={handleInputChange}/>
                </div>
                <div>
                    {tags.map(t => <Tag text={t} />)}
                </div>
                <button type="button" onClick={handleSaveButtonClick}>
                    Save
                </button>
            </form>
        </div>
    );
};

export default EditForm;