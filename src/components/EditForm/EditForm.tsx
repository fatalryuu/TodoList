import React, {useEffect, useState} from 'react';
import './EditForm.scss';
import {TodosType} from "../../App";
import Tag from "../Tag/Tag";
import ControlPointOutlinedIcon from '@mui/icons-material/ControlPointOutlined';

type PropsType = {
    editMode: boolean
    setEditMode: (showEditWindow: boolean) => void
    todo: TodosType | undefined
    saveTodo: (text: string, tags: Array<string>, id: number) => void
}

const EditForm: React.FC<PropsType> = ({editMode, setEditMode, todo, saveTodo}) => {
    const [text, setText] = useState("");
    const [tag, setTag] = useState("#");
    const [tags, setTags] = useState<Array<string>>([]);
    useEffect(() => {
        if (todo) {
            setText(todo.text);
            setTags(todo.tags);
        }
    }, [todo]);
    const handleCloseButtonClick = () => {
        setEditMode(false);
    }
    const handleSaveButtonClick = () => {
        if (todo)
            saveTodo(text, tags, todo.id);
        setEditMode(false);
    }
    const handleNewTag = () => {
        if (tag.trim() !== "#")
            setTags([...tags, tag].filter((value, index, self) =>
                self.indexOf(value) === index));
    }
    const deleteTag = (id: number) => {
        const newTags = tags.slice();
        newTags.splice(id, 1);
        setTags(newTags);
    }
    return (
        <div className="window">
            <button className="close" onClick={handleCloseButtonClick}>X</button>
            <form className="edit-form">
                <div className="input-wrapper">
                    <input type="text" value={text} placeholder="Enter new text..." onChange={e => setText(e.target.value)} className="" autoFocus={true}/>
                </div>
                <div>
                    <div className="tags-input-wrapper">
                        <input type="text" value={tag} placeholder="Enter new tag..." onChange={e => setTag(e.target.value)} className="" autoFocus={true}/>
                        <ControlPointOutlinedIcon className="add-tag" onClick={handleNewTag}/>
                    </div>
                    <div className="delete-info">
                        Click the tag to delete
                    </div>
                    <div className="tags-wrapper">
                        {tags.map((t, i) => <Tag text={t} editMode={editMode} deleteTag={deleteTag} id={i} key={i}/>)}
                    </div>
                </div>
                <button type="button" onClick={handleSaveButtonClick} className="save">Save</button>
            </form>
        </div>
    );
};

export default EditForm;